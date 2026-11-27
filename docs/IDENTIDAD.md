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
  componente. La nebulosa de fondo es `public/img/nebula.webp`, generada con `scripts/nebula/render-claro.html`.
  Los bloques de código siguen oscuros, como una terminal. Pendiente: el icono de pestaña y las imágenes OG
  todavía usan el fondo grafito.

- **Tipografía**: Space Grotesk para todo; palabras destacadas en Source Serif 4 cursiva (`.sx-em`);
  rótulos y datos técnicos en monoespaciada (`.sx-label`, `.sx-mono`).
- **Recursos**: botones en píldora, tarjetas con filete fino, degradé lavanda solo en bloques destacados
  (`.sx-glass`), cinta inclinada con nombres de servicios, ejemplo de hallazgo con formato de informe.
- **Regla**: nada de cifras de relleno, iconos genéricos ni emojis. Todo dato que aparece es real.
- **Aplicaciones**: marco común (cabecera y pie de Vesta Security) y cada app con su acento y su logo:
  Vesta borgoña `#421827`, Financial Security verde `#0B6E4F` + dorado `#E9B949`, Nebula PDF azul `#6CB3FF`.
