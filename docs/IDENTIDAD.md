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

## 5. Vesta Security (la empresa)

Desde noviembre de 2026 el sitio separa la **empresa** (Vesta Security, servicios de ciberseguridad) de sus
**aplicaciones**. Lo descrito en las secciones 1 a 4 (borgoña, marfil, pin) es la identidad de la app de control
parental Vesta y solo se usa en sus páginas.

- **Logotipo**: solo texto, «VESTA» en Space Grotesk 700 y «Security» en Space Grotesk 400 lavanda
  (`src/components/brand/Wordmark.tsx`). Icono de pestaña: una V lila sobre blanco lavanda (`public/icon.svg`).
- **Colores** (tokens `night-*`, `haze`, `mist`, `dim`, `violet-*` en `globals.css`):

| Token | Hex | Uso |
|---|---|---|
| `night-900` | `#FFFFFF` | Fondo |
| `night-800` / `night-700` | `#FBFAFF` / `#F1EEFA` | Tarjetas, menús |
| `night-950` | `#F3F0FC` | Bandas lavanda entre secciones y pie |
| `night-600` / `night-500` | `#E4E0F1` / `#CDC6E3` | Filetes |
| `haze` | `#17161F` | Texto (grafito) |
| `mist` / `dim` | `#4E4C60` / `#6A687E` | Texto secundario |
| `violet-300` / `violet-200` | `#5944C2` / `#4A3AA3` | Acento: palabras en cursiva, rótulos, enlaces |
| `violet-500` → `violet-600` | `#8B7AE0` → `#6D5BC8` | Botón principal (texto blanco) |

  Desde el 2026-11-27 el tema es **claro** (antes grafito `#0E1014` con texto claro): blanco con lila y un
  poco de grafito. Los nombres de los tokens vienen del tema oscuro y se conservaron para no tocar cada
  componente. La nebulosa de fondo es `public/img/nebula-claro.webp`, generada con `scripts/nebula/render-claro.html`.
  Los bloques de código siguen oscuros, como una terminal. El icono y la imagen para redes de los servicios
  también son claros; se generan con `scripts/marca/`.

- **Modo oscuro (opcional, 2026-11-27).** El sitio abre claro para todos. El botón de luna de la cabecera
  (`components/layout/TemaBoton.tsx`) pone `data-tema="oscuro"` en `<html>` y lo recuerda en `localStorage`
  (`vs-tema`); un script en el `<head>` lo aplica antes de pintar, y la CSP le calcula la huella al compilar.
  En oscuro vuelven los valores grafito + violeta de antes (`night-900` `#0E1014`, `haze` `#ECEAF3`,
  `mist` `#A6A4B5`, `dim` `#8B899E`, violetas claros `#DDD6FB`/`#C6BCF4`/`#A99BEB`, botón principal violeta
  claro con texto grafito) y la nebulosa `public/img/nebula-oscuro.webp`. Todo está en `globals.css`
  («Modo oscuro»); para un color fijo en un componente se usa la variante `dark:` (solo actúa dentro de `.sx`).
  Alcance: marco común (cabecera y pie), páginas de Vesta Security y las de Financial Security y Nebula PDF.
  El contenido de Control parental sigue claro. Financial usa los tokens `fin-*` (verde/dorado) con su
  versión oscura; la maqueta del celular y la ventana de Nebula PDF son imágenes de las apps y no cambian.

- **Tipografía**: Space Grotesk para todo; palabras destacadas en Source Serif 4 cursiva (`.sx-em`);
  rótulos y datos técnicos en monoespaciada (`.sx-label`, `.sx-mono`).
- **Recursos**: botones en píldora, tarjetas con filete fino, degradé lavanda solo en bloques destacados
  (`.sx-glass`), cinta inclinada con nombres de servicios, ejemplo de hallazgo con formato de informe.
- **Regla**: nada de cifras de relleno, iconos genéricos ni emojis. Todo dato que aparece es real.
- **Aplicaciones**: marco común (cabecera y pie de Vesta Security) y cada app con su acento y su logo:
  Vesta borgoña `#421827`, Financial Security verde `#0B6E4F` + dorado `#E9B949`, Nebula PDF azul `#6CB3FF`.
