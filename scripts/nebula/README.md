# Nebulosa de fondo

La web usa la versión **clara** desde el 2026-11-27: `render-claro.html` (fondo blanco, nubes lila
y un velo grafito tenue). `render.html` es la versión oscura anterior. El procedimiento es el mismo.

**Si cambias la imagen, cámbiale también el nombre** (y la referencia en `globals.css`): Cloudflare y los
navegadores la guardan 7 días, y con el mismo nombre seguirían mostrando la anterior. Así pasó el 2026-11-27:
la nebulosa oscura vieja quedó debajo del texto oscuro nuevo.

`render.html` dibuja las nubes de la nebulosa (filtros feTurbulence + desenfoque)
a 1560×1170. Para regenerar `public/img/nebula-claro.webp`:

1. Captura con Chrome sin interfaz:
   `chromium --headless --hide-scrollbars --window-size=1560,1170 --screenshot=gas.png render.html`
2. Convierte con sharp:
   `sharp('gas.png').removeAlpha().resize(1200, 900).webp({ quality: 90 })`
