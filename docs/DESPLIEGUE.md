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
                 6. descarga solo la rama deploy (SSH con deploy key de solo lectura)
                 7. la extrae en /var/www/vesta-web/releases/<fecha>-<commit>/
                 8. cambia el enlace /var/www/vesta-web/current (cambio atómico)

visitante ──► Cloudflare ──► Cloudflare Tunnel ──► Nginx 127.0.0.1:8082 (root /var/www/vesta-web/current)
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
| `deploy/nginx-vesta-web.conf.example` | Servidor (ejemplo) | `server` de Nginx en `127.0.0.1:8082` con `root` en `current`. Solo el `root` es obligatorio. |
| `deploy/vesta-deploy.service.example` y `.timer.example` | Servidor (opcional) | Ejecutan el despliegue cada 5 minutos con systemd. |

## Preparación del servidor (una sola vez)

Requisitos: `git`, `openssh-client`, `tar` y `flock` (paquete `util-linux`). No hace falta Node.js.
Los comandos usan `www-data`, el usuario con el que corre Nginx; cámbialo si el tuyo es otro.

### 1. Instalar el script

El repositorio es privado, así que el script se copia desde un equipo que ya tenga acceso
(por ejemplo, tu clon local), no se descarga anónimamente:

```bash
# En tu equipo, desde el clon de vesta-web
scp deploy/vesta-deploy.sh usuario@servidor:/tmp/vesta-deploy.sh

# En el servidor
sudo install -d -m 755 /opt/vesta-web
sudo install -m 755 /tmp/vesta-deploy.sh /opt/vesta-web/vesta-deploy.sh
sudo install -d -o www-data -g www-data -m 755 /var/www/vesta-web
```

Cuando el script cambie en el repositorio, repite la copia.

### 2. Crear la deploy key de solo lectura

La clave privada se genera en el servidor y nunca sale de él. GitHub solo recibe la pública.

```bash
sudo install -d -o root -g www-data -m 750 /etc/vesta-web
sudo ssh-keygen -t ed25519 -N "" -C "vesta-web deploy (servidor)" -f /etc/vesta-web/deploy_key
sudo chown root:www-data /etc/vesta-web/deploy_key /etc/vesta-web/deploy_key.pub
sudo chmod 640 /etc/vesta-web/deploy_key
sudo cat /etc/vesta-web/deploy_key.pub     # copia esta línea
```

En GitHub: **s-Nebula/vesta-web > Settings > Deploy keys > Add deploy key**.
Título: `servidor (solo lectura)`. Pega la clave pública y **deja sin marcar «Allow write access»**.

La clave solo sirve para este repositorio y solo puede leerlo. Si el servidor se ve comprometido,
bórrala en esa misma pantalla y genera otra.

### 3. Fijar la huella de github.com

El script no acepta huellas desconocidas, para evitar suplantaciones:

```bash
ssh-keyscan -t ed25519 github.com | sudo tee /etc/vesta-web/known_hosts >/dev/null
ssh-keygen -lf /etc/vesta-web/known_hosts
```

Compara la huella que muestra el segundo comando con la publicada por GitHub en
<https://docs.github.com/es/authentication/keeping-your-account-and-data-secure/githubs-ssh-key-fingerprints>.
Si no coincide, no sigas.

### 4. Configurar `VESTA_REPO_URL`

El script lee `/etc/vesta-web/deploy.env`. Los valores por defecto ya son estos, pero conviene dejarlos escritos:

```bash
sudo tee /etc/vesta-web/deploy.env >/dev/null <<'CONF'
VESTA_REPO_URL=git@github.com:s-Nebula/vesta-web.git
VESTA_SSH_KEY=/etc/vesta-web/deploy_key
VESTA_KNOWN_HOSTS=/etc/vesta-web/known_hosts
VESTA_BASE=/var/www/vesta-web
CONF
sudo chown root:root /etc/vesta-web/deploy.env
sudo chmod 644 /etc/vesta-web/deploy.env
```

Este archivo no contiene secretos: solo rutas. La única credencial es `deploy_key`, en el servidor.

### 5. Comprobar el acceso y hacer el primer despliegue

Cuando la Action haya creado la rama `deploy` (tras fusionar en `main`):

```bash
sudo -u www-data /opt/vesta-web/vesta-deploy.sh check     # «Acceso correcto: <commit> en deploy»
sudo -u www-data /opt/vesta-web/vesta-deploy.sh deploy
```

### 6. Nginx: cambiar solo el `root`

Cloudflare Tunnel ya usa `http://127.0.0.1:8082` como origen. Se conserva ese listener y, en el
bloque `server` actual del sitio, se cambia **únicamente** la línea `root`:

```nginx
server {
    listen 127.0.0.1:8082;               # sin cambios
    ...
    root /var/www/vesta-web/current;     # antes: la carpeta actual del sitio
    ...
}
```

```bash
sudo nginx -t && sudo systemctl reload nginx
```

`deploy/nginx-vesta-web.conf.example` muestra el bloque completo con mejoras **opcionales**
(redirecciones sin el puerto 8082, página 404 propia, caché y encabezados de seguridad). No son
necesarias para que el sitio funcione: con solo el cambio de `root`, las URLs del sitio (con barra
final, como `/plataforma/`) funcionan porque cada una es una carpeta con `index.html`.

### 7. Opcional: publicar automáticamente cada 5 minutos

Copia los dos ejemplos al servidor igual que el script (`scp deploy/vesta-deploy.*.example usuario@servidor:/tmp/`) y luego:

```bash
sudo cp /tmp/vesta-deploy.service.example /etc/systemd/system/vesta-deploy.service
sudo cp /tmp/vesta-deploy.timer.example   /etc/systemd/system/vesta-deploy.timer
sudo systemctl daemon-reload && sudo systemctl enable --now vesta-deploy.timer
```

Sin el temporizador, se publica ejecutando `vesta-deploy.sh deploy` a mano.

## Uso diario

```bash
sudo -u www-data /opt/vesta-web/vesta-deploy.sh deploy            # publicar la última versión
sudo -u www-data /opt/vesta-web/vesta-deploy.sh status            # versión activa y commit de origen
sudo -u www-data /opt/vesta-web/vesta-deploy.sh list              # versiones guardadas (se conservan 10)
sudo -u www-data /opt/vesta-web/vesta-deploy.sh check             # probar el acceso con la deploy key
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

## Credenciales

- En GitHub: la Action solo usa el `GITHUB_TOKEN` temporal de cada ejecución. No hay secretos configurados.
- En el servidor: solo la deploy key de lectura en `/etc/vesta-web/deploy_key`.
- En el repositorio: ninguna. No se usan tokens personales (PAT).
