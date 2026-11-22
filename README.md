# Vesta Security · Sitio web oficial

Sitio corporativo de Vesta Security (Vesta Padre + Vesta Tracker). Next.js 16 + TypeScript + Tailwind CSS 4,
exportado como **sitio estático**: no depende del backend (`api.vestasecurity.date`) ni de ningún servidor.

## Requisitos

- Node.js 20 o superior
- Python 3 + `python-docx` (solo para actualizar los documentos legales)

## Comandos

```bash
npm install          # instalar dependencias
npm run dev          # desarrollo en http://localhost:3000 (muestra los avisos de contenido pendiente)
npm run build        # versión de producción → carpeta out/
npm run preview      # servir out/ localmente
npm run typecheck    # comprobación de tipos
npm run legal        # regenerar documentos legales desde los .docx de legal-source/
```

## Desplegar

El sitio se publica en `https://vestasecurity.date` y `https://www.vestasecurity.date`
(dominio en Cloudflare, Cloudflare Tunnel hacia Nginx en `127.0.0.1:8082`).

1. Cada push a `main` ejecuta la GitHub Action `.github/workflows/deploy.yml`.
2. La Action instala dependencias, compila y publica **solo** el contenido de `out/` en la rama `deploy`
   (en la raíz de esa rama está `index.html`).
3. En el servidor, `deploy/vesta-deploy.sh` descarga solo la rama `deploy` con una deploy key SSH
   de solo lectura, la guarda como una versión nueva y Nginx sirve `/var/www/vesta-web/current`.
   `rollback` vuelve a la versión anterior.

El servidor no necesita Node.js y nunca recibe el código fuente. Instrucciones completas
(deploy key, Nginx y rollback) en `docs/DESPLIEGUE.md`.

## Estructura

```
src/
  app/                      Páginas (una carpeta por ruta) + sitemap, robots, manifest
  components/
    brand/Logo.tsx          Logotipo, símbolo y arco (SVG oficiales en línea)
    layout/                 Encabezado y pie
    sections/               Bloques reutilizables (descarga, pasos, finalidades)
    legal/                  Render de documentos, índice, imprimir
    ui/                     Piezas pequeñas (marcos de dispositivo, avisos pendientes…)
  content/                  ← TODO EL CONTENIDO EDITABLE
    site.ts                 Empresa, contacto, navegación, dominio
    downloads.ts            Versiones, tamaños, enlaces de los APK
    features.ts             Funcionalidades verificadas
    help.ts                 Centro de ayuda y preguntas frecuentes
    institutional.ts        Misión, visión, valores
    legal.ts                Metadatos de los documentos legales
    legal/*.json            Texto de los documentos (generado; no editar a mano)
  styles/globals.css        Sistema visual (paleta, tipografía, componentes)
public/
  brand/                    SVG oficiales del logotipo
  img/padre, img/tracker    Capturas reales en WebP (2 tamaños)
legal-source/               .docx oficiales de los que se genera el texto legal
scripts/convert_legal.py    Conversor .docx → JSON
docs/IDENTIDAD.md           Análisis del logotipo, paleta y tipografía
docs/PENDIENTES.md          Lo que falta aportar
docs/DESPLIEGUE.md          Flujo de despliegue y configuración sugerida de Nginx
.github/workflows/deploy.yml  Compilación y publicación en la rama deploy
```

## Publicar una nueva versión de las apps

Todo está en `src/content/downloads.ts`:

1. Sube el APK a su ubicación oficial (no lo añadas a este repositorio: pesa más de 100 MB).
2. Edita la app correspondiente: `apkUrl`, `sizeBytes`, `sha256` y, si cambian, `minSdk`/`minAndroid`.
3. Añade la versión **al principio** de `releases` con `version`, `versionCode`, `date` (AAAA-MM-DD) y `notes`.
4. Haz push a `main`: la Action compila y publica. Inicio, descargas y pie de página se actualizan solos.

Para obtener tamaño y huella: `stat -c %s archivo.apk` y `sha256sum archivo.apk`.
Si la app se publica en Google Play, rellena `playStoreUrl`: el botón apuntará a la ficha.

## Idiomas

El español vive en la raíz (`/`, `/plataforma/`, …) y el inglés en `/en/` (`/en/platform/`, …).
Las rutas de cada idioma se definen en `src/i18n/index.ts`; las páginas son vistas compartidas en
`src/views/` que reciben el idioma, y los textos de contenido están en `src/content/*` en ambos idiomas.

## Actualizar los documentos legales

1. Copia el nuevo `.docx` oficial en `legal-source/` y su traducción al inglés en `legal-source/en/`
   (los nombres en inglés deben contener «Terms and Conditions», «Privacy Policy» o «User Guide»;
   los españoles, «Términos y condiciones»,
   «Política de tratamiento» o «Guía de usuario»).
2. `npm run legal` (convierte el .docx sin reescribir el texto: párrafos, listas, tablas y títulos).
3. Actualiza `version`, `effectiveDate` y `updatedDate` en `src/content/legal.ts`.
4. Si hay PDF oficial, súbelo a `public/legal/` y pon su ruta en `pdfUrl`; aparecerá el botón «Descargar PDF oficial».
5. Para retirar un documento hasta que esté aprobado, pon `status: "pendiente"`: la página muestra un aviso y no publica texto.

Las capturas que acompañan a la Guía se configuran en `guideFigures` (mismo archivo), por identificador de sección.

## Modificar contenido institucional

- Misión, visión, valores y compromisos: `src/content/institutional.ts`.
- Datos de empresa y contacto: `src/content/site.ts` (provienen de los documentos oficiales v1.1).
- Funcionalidades: `src/content/features.ts`. Marca `status: "en-desarrollo"` o usa `upcoming` para funciones no terminadas.
- Preguntas frecuentes y ayuda: `src/content/help.ts`.

## Contenido pendiente

`<Pending>` marca lo que falta. En `npm run dev` se ve como aviso amarillo; en producción se oculta o muestra
un texto neutro. La lista completa está en `docs/PENDIENTES.md`.

## Seguridad

- Sitio estático, sin formularios, sin cookies, sin analítica ni scripts de terceros; fuentes autoalojadas.
- Encabezados: HSTS, CSP, `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy`, `Permissions-Policy`.
- Sin secretos ni credenciales en el código. No se modificó el backend ni las apps.
- La captura del mapa tiene el fondo difuminado para no exponer una ubicación real.

## Licencia

Software propietario. © FORBIDDEN S.A.S. Todos los derechos reservados.
Este repositorio es privado: no lo publiques ni lo redistribuyas sin autorización.
