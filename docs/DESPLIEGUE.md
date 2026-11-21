# Despliegue

El sitio se publica en el servidor propio de Vesta mediante GitHub Actions y Nginx.
El dominio (`vestasecurity.date` y `www.vestasecurity.date`) está en Cloudflare, que
reenvía el tráfico al servidor por Cloudflare Tunnel. No se usa Vercel ni otro hosting.

## Flujo

```
push a main ──► GitHub Action «Compilar y publicar»
                 1. npm ci
                 2. npm run typecheck
                 3. npm run build            (genera out/)
                 4. deploy/verify-build.sh   (páginas presentes, sin código fuente ni secretos)
                 5. commit de out/ en la rama deploy  (un commit por publicación)

servidor ──► /opt/vesta-web/vesta-deploy.sh deploy
                 6. descarga solo la rama deploy
                 7. la extrae en /var/www/vesta-web/releases/<fecha>-<commit>/
                 8. cambia el enlace /var/www/vesta-web/current (cambio atómico)

visitante ──► Cloudflare ──► Cloudflare Tunnel ──► Nginx (root /var/www/vesta-web/current)
```

- `main` contiene solo código fuente. `deploy` contiene solo el sitio compilado.
- En un pull request la Action compila y verifica, pero no publica.
- La Action usa únicamente el `GITHUB_TOKEN` temporal que GitHub crea en cada ejecución,
  con permiso de escritura solo en el paso de publicación. No hay secretos en el repositorio.
- El historial de `deploy` nunca se reescribe: cada versión publicada sigue disponible para volver a ella.

## Archivos

| Archivo | Dónde se usa | Qué hace |
|---|---|---|
| `.github/workflows/deploy.yml` | GitHub | Comprueba, compila, verifica y publica en `deploy`. |
| `deploy/verify-build.sh` | GitHub | Falla si falta una página o si el resultado contiene código fuente, `.env` o claves. |
| `deploy/vesta-deploy.sh` | Servidor | Descarga `deploy`, crea la versión, cambia `current`, permite volver atrás. |
| `deploy/nginx-vesta-web.conf.example` | Servidor (ejemplo) | `server` de Nginx con `root` en `current`. Se revisa y adapta a mano. |
| `deploy/vesta-deploy.service.example` y `.timer.example` | Servidor (opcional) | Ejecutan el despliegue cada 5 minutos con systemd. |

## Preparación del servidor (una sola vez)

Requisitos: `git`, `tar` y `flock` (paquete `util-linux`). No hace falta Node.js en el servidor.

```bash
sudo mkdir -p /opt/vesta-web /var/www/vesta-web
sudo curl -fsSL https://raw.githubusercontent.com/s-Nebula/vesta-web/main/deploy/vesta-deploy.sh \
     -o /opt/vesta-web/vesta-deploy.sh      # o cópialo desde un clon del repositorio
sudo chmod 755 /opt/vesta-web/vesta-deploy.sh
sudo chown -R www-data:www-data /var/www/vesta-web

# Primer despliegue (cuando la Action ya haya creado la rama deploy)
sudo -u www-data /opt/vesta-web/vesta-deploy.sh deploy
```

Después, en la configuración de Nginx del sitio, el `root` debe ser `/var/www/vesta-web/current`.
`deploy/nginx-vesta-web.conf.example` sirve de referencia; ajusta el puerto al que ya usa el túnel.
Comprueba con `sudo nginx -t` y recarga con `sudo systemctl reload nginx`.

Opcional, para publicar automáticamente cada 5 minutos:

```bash
sudo cp deploy/vesta-deploy.service.example /etc/systemd/system/vesta-deploy.service
sudo cp deploy/vesta-deploy.timer.example   /etc/systemd/system/vesta-deploy.timer
sudo systemctl daemon-reload && sudo systemctl enable --now vesta-deploy.timer
```

Sin el temporizador, se publica ejecutando `vesta-deploy.sh deploy` a mano.

## Uso diario

```bash
sudo -u www-data /opt/vesta-web/vesta-deploy.sh deploy            # publicar la última versión
sudo -u www-data /opt/vesta-web/vesta-deploy.sh status            # versión activa y commit de origen
sudo -u www-data /opt/vesta-web/vesta-deploy.sh list              # versiones guardadas (se conservan 10)
```

## Volver a una versión anterior

```bash
sudo -u www-data /opt/vesta-web/vesta-deploy.sh rollback          # vuelve a la versión anterior
sudo -u www-data /opt/vesta-web/vesta-deploy.sh deploy <commit>   # o a cualquier commit de la rama deploy
sudo -u www-data /opt/vesta-web/vesta-deploy.sh unpin             # cuando el problema esté corregido
```

Tras `rollback` o `deploy <commit>`, la versión queda **fijada**: el temporizador no la sustituye
hasta ejecutar `unpin`. El cambio es inmediato porque solo se mueve el enlace `current`; Nginx no se recarga.
Si una versión ya no está en el servidor, `deploy <commit>` la vuelve a extraer de la rama `deploy`.

Cloudflare no guarda en caché el HTML por defecto. Si en tu zona hay reglas que sí lo hacen,
purga la caché después de un despliegue o de un rollback.

## Lo que no cambia

- Configuración de Cloudflare (DNS y Cloudflare Tunnel).
- Backend `api.vestasecurity.date`.
- Configuración de OpenMediaVault.
- Repositorios `vesta-tutor` y `vesta-tracker`.

## Si el repositorio pasa a ser privado

Crea una deploy key **de solo lectura** en GitHub (Settings > Deploy keys), guarda la clave privada
solo en el servidor y usa la URL SSH:

```bash
export VESTA_REPO_URL=git@github.com:s-Nebula/vesta-web.git
```

La clave nunca se sube al repositorio.
