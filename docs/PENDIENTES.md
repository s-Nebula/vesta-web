# Contenido pendiente

Lo que el sitio no puede inventar y necesita del equipo de Vesta.

## Hecho en la 1.1

- Enlaces de descarga en `https://vestasecurity.date/downloads/` (servidos por Nginx desde
  `/var/www/vesta-downloads/`). Si se recompila un APK, hay que actualizar `sizeBytes` y `sha256`.
- Fecha de publicación de la 1.1.0: 22/11/2026.
- Capturas reales de la 1.1 (el mapa y el código QR van difuminados).
- Faltan capturas de la interfaz en inglés y del aviso de app bloqueada del Tracker.

## Confirmar

4. **Textos de «Quiénes somos»** (`src/content/institutional.ts`): requieren aprobación.
5. **Dirección**: la Política de privacidad indica «Cra 28 #12-50, Santa Marta» (Decreto 1377 de 2013).

## Opcional

6. **PDF oficiales** de Términos, Política y Guía (`pdfUrl` en `src/content/legal.ts`).
7. **Ficha de Google Play** si se publica (`playStoreUrl`).

## Confirmado

- Dominios: `https://vestasecurity.date` y `https://www.vestasecurity.date`, en Cloudflare.
- Versión 1.1: vinculación por QR, zonas seguras, botón SOS, modo estudio, límites, peticiones,
  búsqueda segura, versión en inglés.
- Despliegue: GitHub Actions → rama `deploy` → servidor con Nginx (ver `docs/DESPLIEGUE.md`).
