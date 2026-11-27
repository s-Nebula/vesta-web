# Nebulosa de fondo

`render.html` dibuja las nubes de la nebulosa (filtros feTurbulence + desenfoque)
a 1560×1170. Para regenerar `public/img/nebula.webp`:

1. Captura con Chrome sin interfaz:
   `chromium --headless --hide-scrollbars --window-size=1560,1170 --screenshot=gas.png render.html`
2. Convierte con sharp:
   `sharp('gas.png').removeAlpha().resize(1200, 900).webp({ quality: 90 })`
