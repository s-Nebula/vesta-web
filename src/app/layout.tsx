import type { Metadata, Viewport } from "next";
import "@fontsource-variable/montserrat/wght.css";
import "@fontsource-variable/source-serif-4/opsz.css";
import "@fontsource-variable/source-serif-4/opsz-italic.css";
import "@/styles/globals.css";
import { site } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} · Ciberseguridad para pequeños negocios`, template: `%s · ${site.name}` },
  description:
    "Auditorías de seguridad y pruebas de penetración para pequeños negocios en Santa Marta y toda Colombia. También, Vesta: protección digital familiar para Android.",
  applicationName: site.name,
  authors: [{ name: "FORBIDDEN S.A.S." }],
  formatDetection: { telephone: false, email: false, address: false },
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }, { url: "/icon.svg", type: "image/svg+xml" }],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#F4EDEA",
  width: "device-width",
  initialScale: 1,
};

/**
 * The document is Spanish by default; English pages wrap their content in
 * lang="en" (see components/layout/Shell.tsx) and declare hreflang alternates.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
