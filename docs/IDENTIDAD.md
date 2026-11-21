# Identidad visual de Vesta Security (web)

## 1. Análisis del logotipo

Archivos analizados: `public/brand/vesta_logo.svg` y `public/brand/vesta_simbolo.svg` (sin modificar).

| Elemento del SVG | Color | Lectura |
|---|---|---|
| Contorno del pin y figura adulta | `#421827` (borgoña) | Estructura, protección, el adulto que acompaña. Color institucional. |
| Figura menor y arco protector | `#C15B68` (rosa) | El menor y el cuidado. Acento, nunca fondo extenso. |
| Interior del pin | `#F4EDEA` (marfil) | Espacio seguro. Fondo principal del sitio. |
| Filete bajo el nombre | `#D6B7A6` (beige) | Separadores y superficies secundarias. |
| Nombre y descriptor | Montserrat 700 / 600, versalitas espaciadas | Tipografía de interfaz y rótulos del sitio. |

El README de la carpeta de logos indica que es un «primer borrador de identidad». La web lo usa tal cual,
sin redibujar ni cambiar proporciones; si el logotipo cambia, basta con sustituir los SVG y los trazados de
`src/components/brand/Logo.tsx` (copiados literalmente del archivo).

## 2. Paleta propuesta

Los cuatro colores del logotipo son la base. El resto son escalones de esos mismos tonos, calculados para
cumplir contraste WCAG AA (verificado con axe-core en todas las páginas).

| Token | Hex | Uso |
|---|---|---|
| `wine` | `#421827` | Botones principales, secciones oscuras, filetes fuertes |
| `wine-950` / `wine-900` | `#1F0B13` / `#2C101B` | Texto principal (`ink`), marcos de dispositivo |
| `wine-700` | `#5B2537` | Estado hover de botones |
| `rose` | `#C15B68` | Acentos gráficos, interruptores, arco (no para texto pequeño: 3,7:1 sobre marfil) |
| `rose-700` | `#A2434F` | Rosa para texto y rótulos sobre marfil (5,3:1) |
| `rose-300` | `#DD9AA2` | Rótulos sobre borgoña |
| `ivory` | `#F4EDEA` | Fondo principal |
| `paper` | `#FAF7F5` | Superficie alterna (secciones claras) |
| `beige` / `beige-100` | `#D6B7A6` / `#EFE4DD` | Bordes de controles / superficie cálida |
| `line` | `#DCC8BD` | Filetes y divisores |
| `muted` | `#6A4C56` | Texto secundario |
| `ok` / `warn` / `error` | `#3C6A4F` / `#8A5A14` / `#A2434F` | Estados |

## 3. Tipografía

- **Source Serif 4** (titulares y textos largos, incluidos los documentos legales): registro editorial y muy legible en lectura extensa.
- **Montserrat** (interfaz, rótulos, botones): es la tipografía del logotipo.
- Ambas se sirven desde el propio sitio (paquetes `@fontsource-variable`), sin llamadas a Google Fonts.

## 4. Recursos gráficos propios

- **Arco protector**: el trazo inferior del símbolo, aislado (`<Arc />`), como elemento de composición en cabeceras y secciones.
- **Rótulo en versalitas** (`.kicker`): heredado de «PROTECCIÓN FAMILIAR».
- **Filete beige**: heredado de la línea bajo el nombre; organiza tablas y listas.
- **Numeración editorial** (01, 02…) en lugar de tarjetas repetidas.
- Capturas reales en marcos sobrios de teléfono y tableta.
