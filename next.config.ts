import type { NextConfig } from "next";

// Sitio 100 % estático: `next build` genera la carpeta `out/`.
// La GitHub Action (.github/workflows/deploy.yml) publica `out/` en la rama
// `deploy`, que es la que sirve Nginx. Ver docs/DESPLIEGUE.md.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
