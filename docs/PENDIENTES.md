# Contenido pendiente

Lo que el sitio no puede inventar y necesita del equipo de Vesta.

## Imprescindible para publicar

1. **Enlaces oficiales de descarga de los APK** (`apkUrl` en `src/content/downloads.ts`).
   Los APK pesan 179,9 MB (Padre) y 56,7 MB (Tracker): conviene GitHub Releases o un almacenamiento propio con HTTPS.
   Sin enlace, el botón muestra «Descarga disponible próximamente».
2. **Fecha de publicación** de Vesta Padre 1.0.0 y Vesta Tracker 1.0 (`releases[].date`).
3. **Preparar el servidor** según `docs/DESPLIEGUE.md` (root de Nginx en `/var/www/vesta-web/current`).

## Confirmar

4. **Textos de misión, visión y valores** (`src/content/institutional.ts`): redactados a partir de los documentos oficiales; requieren aprobación.
5. **Versión de los documentos**: los documentos dicen «1.0»; el brief menciona «1.0.0». El sitio muestra lo que dice el documento.

## Opcional

6. **PDF oficiales** de Términos, Política y Guía (`pdfUrl` en `src/content/legal.ts`).
7. **Capturas nuevas**:
   - Filtros: la captura actual muestra una pestaña «Palabras» que no existe en el código actual.
   - Vesta Tracker en teléfono (las actuales son de tableta).
   - Pantalla «Privacidad y autorizaciones» de Vesta Padre (se representa con una ilustración).
8. **Ficha de Google Play** si se publica (`playStoreUrl`).

## Confirmado

- Dominios: `https://vestasecurity.date` y `https://www.vestasecurity.date`, en Cloudflare.
- La vinculación por QR y el botón SOS no están implementados: no aparecen en el sitio.
- Despliegue: GitHub Actions → rama `deploy` → servidor con Nginx (ver `docs/DESPLIEGUE.md`).
