# Contenido pendiente

Lo que el sitio no puede inventar y necesita del equipo de Vesta.

## Imprescindible para publicar

1. **Enlaces oficiales de descarga de los APK** (`apkUrl` en `src/content/downloads.ts`).
   Sin enlace, el botón muestra «Descarga disponible próximamente».
2. **Fecha de publicación** de Vesta Padre y Vesta Tracker 1.1.0 (`releases[].date`).
3. **Tamaño y SHA-256 definitivos** de los APK 1.1.0 si se vuelven a compilar (`sizeBytes`, `sha256`).

## Capturas nuevas (interfaz 1.1)

Las capturas actuales son de la versión 1.0. Hacen falta capturas reales del teléfono, en español
y, si es posible, en inglés, de:

- Vesta Padre: panel (con avatares de color), tarjeta de vinculación con QR, pestaña Alertas,
  Filtros (con «Búsqueda segura»), Modo estudio, Zonas seguras, Límites de tiempo, Peticiones, Ajustes.
- Vesta Tracker: pantalla principal (botón SOS, «Pedir permiso», «Qué comparte Vesta»), escáner de QR,
  aviso de app bloqueada.

Formato: WebP a 420 y 840 px de ancho (teléfono) o 800 y 1600 px (tableta), en `public/img/`.

## Confirmar

4. **Textos de «Quiénes somos»** (`src/content/institutional.ts`): requieren aprobación.
5. **Dirección de correspondencia**: la dirección física se retiró a petición del responsable. La
   normativa colombiana (Decreto 1377 de 2013) pide indicarla en la Política de privacidad; conviene
   usar una dirección comercial o de correspondencia.

## Opcional

6. **PDF oficiales** de Términos, Política y Guía (`pdfUrl` en `src/content/legal.ts`).
7. **Ficha de Google Play** si se publica (`playStoreUrl`).

## Confirmado

- Dominios: `https://vestasecurity.date` y `https://www.vestasecurity.date`, en Cloudflare.
- Versión 1.1: vinculación por QR, zonas seguras, botón SOS, modo estudio, límites, peticiones,
  búsqueda segura, versión en inglés.
- Despliegue: GitHub Actions → rama `deploy` → servidor con Nginx (ver `docs/DESPLIEGUE.md`).
