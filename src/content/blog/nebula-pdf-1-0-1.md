---
title: Nebula PDF 1.0.1, la primera versión firmada
description: Nebula PDF deja de ser beta. La 1.0.1 está firmada por FORBIDDEN S.A.S. e incluye correcciones de traducción. Si tienes la 1.0.0, hay que desinstalarla antes.
date: 2026-11-27
tags: Nebula PDF, Novedades
app: nebula-pdf
---

Nebula PDF 1.0.1 es la primera versión **firmada para publicación**. La 1.0.0 era una compilación de pruebas; esta ya es la versión estable.

## Qué cambia

- **Firma de publicación.** El APK está firmado con el certificado de FORBIDDEN S.A.S. Las próximas versiones usarán la misma firma, así que se podrán instalar encima sin perder tus traducciones.
- **Correcciones de traducción** encontradas al traducir portadas:
    - Los títulos grandes con letras muy juntas ya no salen con espacios falsos ("PROGR AMMING").
    - Un renglón suelto ya no se parte en dos: la letra se reduce un poco para que quepa sin montarse sobre el texto de al lado.
    - El texto alineado a la derecha se respeta.
    - Se conservan los colores aunque el PDF use espacios de color distintos de RGB.
    - C++, C#, .NET y similares ya no se separan.
    - Los precios, los ISBN y los textos que son casi todo números no se traducen.

## Si tenías la 1.0.0: desinstálala primero

Android solo deja instalar una actualización encima de otra si las dos tienen **la misma firma**. La 1.0.0 estaba firmada con una clave de pruebas, así que Android no dejará instalar la 1.0.1 encima.

1. Si quieres conservar algún PDF traducido, ábrelo desde **Mis traducciones** y usa **Guardar como…** para copiarlo a tu carpeta de descargas.
2. Desinstala Nebula PDF.
3. Instala la 1.0.1 desde la [página de Nebula PDF](/aplicaciones/nebula-pdf/#descargar).

Esto solo pasa esta vez. Desde la 1.0.1, cada versión nueva se instala encima.

## Cómo comprobar que el APK es auténtico

En la página de descarga están dos huellas:

- La **huella SHA-256 del archivo**, para confirmar que el APK que descargaste no fue modificado (`sha256sum Nebula-PDF-1.0.1.apk`).
- La **huella del certificado de firma**, para confirmar quién lo firmó. Puedes verla con `apksigner verify --print-certs` o con apps como *App Manager*.

Si alguna no coincide, no lo instales y escríbeme.
