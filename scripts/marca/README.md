# Icono e imagen para redes de Vesta Security

Tema claro (blanco y lila) desde el 2026-11-27.

- `public/icon.svg` es la fuente del icono. Los PNG se exportan desde `icono.html` con Chrome sin interfaz:
  `chromium --headless --hide-scrollbars --default-background-color=00000000 --window-size=512,512 --screenshot=icon-512.png icono.html`
  (lo mismo con 192 y 180 para `icon-192.png` y `apple-touch-icon.png`, y con 32 para el `favicon.ico`).
  El `apple-touch-icon.png` va sin transparencia: Apple pone negro donde no hay color.
- `og-servicios.html` → `public/og-servicios.png` (1200×630). Necesita `npm ci` (usa las fuentes de `node_modules`):
  `chromium --headless --hide-scrollbars --window-size=1200,630 --screenshot=og-servicios.png og-servicios.html`
  El precio «desde» está escrito a mano: actualízalo cuando cambie el servicio más económico.
- `public/og.png` (app Vesta, borgoña) y `public/og-financial.png` (Financial, verde) tienen la identidad de cada
  app y no siguen este tema.
