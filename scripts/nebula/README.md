# Nebulosa de fondo

La web usa la versión **clara** desde el 2026-11-27: `render-claro.html` (fondo blanco, nubes lila
y un velo grafito tenue). `render.html` es la versión oscura anterior. El procedimiento es el mismo.

`render.html` dibuja las nubes de la nebulosa (filtros feTurbulence + desenfoque)
a 1560×1170. Para regenerar `public/img/nebula.webp`:

1. Captura con Chrome sin interfaz:
   `chromium --headless --hide-scrollbars --window-size=1560,1170 --screenshot=gas.png render.html`
2. Convierte con sharp:
   `sharp('gas.png').removeAlpha().resize(1200, 900).webp({ quality: 90 })`
