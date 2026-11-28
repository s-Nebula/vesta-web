import type { Metadata, Viewport } from "next";
import "@fontsource-variable/montserrat/wght.css";
import "@fontsource-variable/space-grotesk/wght.css";
import "@fontsource-variable/source-serif-4/opsz.css";
import "@fontsource-variable/source-serif-4/opsz-italic.css";
import "@/styles/globals.css";
import { site } from "@/content/site";
import { TEMA_SCRIPT } from "@/components/layout/TemaBoton";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} · Ciberseguridad para pequeños negocios`, template: `%s · ${site.name}` },
  description:
    "Auditorías de seguridad y pruebas de penetración para pequeños negocios en Santa Marta y toda Colombia. También, Vesta: protección digital familiar para Android.",
  applicationName: site.name,
  authors: [{ name: "FORBIDDEN S.A.S." }],
  formatDetection: { telephone: false, email: false, address: false },
  icons: {
    icon: [{ url: "/favicon.ico?v=3", sizes: "any" }, { url: "/icon.svg?v=3", type: "image/svg+xml" }],
    apple: "/apple-touch-icon.png?v=3",
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
};

/**
 * The document is Spanish by default; English pages wrap their content in
 * lang="en" (see components/layout/Shell.tsx) and declare hreflang alternates.
 *
 * TEMA_SCRIPT pone data-tema="oscuro" en <html> antes de pintar si el visitante eligió
 * el modo oscuro; por eso <html> lleva suppressHydrationWarning.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: TEMA_SCRIPT }} />
      </head>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
