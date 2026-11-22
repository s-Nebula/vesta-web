import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Vesta Security",
    short_name: "Vesta",
    description: "Protección digital familiar para Android · Family digital protection for Android.",
    start_url: "/",
    display: "browser",
    background_color: "#F4EDEA",
    theme_color: "#421827",
    lang: "es",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
