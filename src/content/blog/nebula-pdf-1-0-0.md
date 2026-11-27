---
title: Nebula PDF 1.0.0, la primera versión beta
description: Ya se puede descargar la primera versión de Nebula PDF, el traductor de PDF para libros de ciberseguridad. Qué incluye, cómo instalarla y qué viene después.
date: 2026-11-26
tags: Nebula PDF, Novedades
app: nebula-pdf
---

Nebula PDF 1.0.0 es la primera versión pública del traductor de PDF de Vesta Security. Es una **beta**: funciona y se puede usar todos los días, pero todavía es una compilación de pruebas y no la versión firmada de publicación.

## Qué incluye

- Traducción de PDF del inglés al español **conservando el diseño**: imágenes, tablas, columnas, colores, títulos y numeración.
- **Modo ciberseguridad** con un glosario editable de más de 200 términos que no se traducen.
- **Código y comandos intactos**, y detección automática de IPs, URLs, rutas, CVE, técnicas de MITRE ATT&CK y opciones de comandos.
- **OCR** para páginas escaneadas.
- Traducción de **libros largos** en segundo plano, con notificación de progreso y botón para cancelar.
- **Mis traducciones**: la lista de todos los PDF traducidos, para abrirlos, compartirlos o borrarlos.
- **Abrir con** y **Compartir** desde el gestor de archivos, el navegador o el correo.

Todo se hace en el teléfono. La app solo usa internet una vez, para descargar el modelo de idioma.

## Cómo instalarla

1. Descarga el APK desde la [página de Nebula PDF](/aplicaciones/nebula-pdf/#descargar).
2. Si quieres, verifica la huella SHA-256 del archivo con la que aparece en la página.
3. Ábrelo y permite la instalación de apps de origen desconocido cuando Android lo pida.

Necesitas Android 8.0 o superior.

## Limitaciones conocidas

- Las páginas giradas se dejan sin traducir.
- Los PDF protegidos con contraseña de apertura no se pueden abrir.
- Si una página tiene muy poco espacio libre, la letra traducida puede quedar algo más pequeña que la original.

## El código

Nebula PDF está escrito en Kotlin y su código está en [GitHub](https://github.com/s-Nebula/nebula-pdf). Si encuentras un error o un término técnico que se tradujo cuando no debía, escríbeme por [WhatsApp](https://wa.me/573246167956) o por correo a nebulagnu@proton.me.
