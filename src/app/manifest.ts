import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Vesta Security",
    short_name: "Vesta",
    description: "Ciberseguridad para pequeños negocios y aplicaciones de Vesta Security.",
    start_url: "/",
    display: "browser",
    background_color: "#0E1014",
    theme_color: "#0E1014",
    lang: "es",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
