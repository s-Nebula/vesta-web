import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { docHref, href, type DocKey, type Locale, type PageKey } from "@/i18n";
import { legalDocsFor } from "@/content/legal";

const pages: Record<PageKey, Record<Locale, { title: string; description: string }>> = {
  home: {
    es: {
      title: "Protección digital familiar para Android",
      description:
        "Vesta Padre y Vesta Tracker: ubicación y zonas seguras, botón SOS, modo estudio, límites de tiempo, filtros web y alertas, con autorizaciones por finalidad.",
    },
    en: {
      title: "Family digital protection for Android",
      description:
        "Vesta Parent and Vesta Tracker: location and safe zones, an SOS button, study mode, time limits, web filters and alerts, with authorisation for each purpose.",
    },
  },
  platform: {
    es: { title: "La plataforma", description: "Cómo funcionan Vesta Padre y Vesta Tracker, qué permisos de Android necesitan y cuáles son sus límites." },
    en: { title: "The platform", description: "How Vesta Parent and Vesta Tracker work, which Android permissions they need and what their limits are." },
  },
  features: {
    es: {
      title: "Funcionalidades",
      description: "Ubicación, zonas seguras, botón SOS, modo estudio, límites de tiempo, peticiones, filtros web y búsqueda segura, alertas y privacidad en Vesta.",
    },
    en: {
      title: "Features",
      description: "Location, safe zones, SOS button, study mode, time limits, requests, web filters and safe search, alerts and privacy in Vesta.",
    },
  },
  mission: {
    es: { title: "Quiénes somos", description: "Quiénes somos, la misión y la visión de Vesta Security, sus valores y su compromiso con la privacidad de los menores." },
    en: { title: "About us", description: "Who we are, Vesta Security's mission and vision, its values and its commitment to minors' privacy." },
  },
  help: {
    es: { title: "Ayuda", description: "Ayuda para instalar Vesta, vincular con código QR, resolver problemas de conexión, permisos y ubicación, y gestionar la privacidad." },
    en: { title: "Help", description: "Help installing Vesta, linking with a QR code, solving connection, permission and location problems, and managing privacy." },
  },
  docs: {
    es: { title: "Documentación legal y privacidad", description: "Términos y condiciones, Política de privacidad y Guía de usuario de Vesta Security, versión 1.1." },
    en: { title: "Legal documents and privacy", description: "Vesta Security Terms and Conditions, Privacy Policy and User Guide, version 1.1." },
  },
  downloads: {
    es: { title: "Descargar Vesta", description: "Descarga Vesta Padre y Vesta Tracker para Android: requisitos, versión, huella SHA-256 e instalación desde APK." },
    en: { title: "Download Vesta", description: "Download Vesta Parent and Vesta Tracker for Android: requirements, version, SHA-256 fingerprint and installation from APK." },
  },
};

export function metaFor(locale: Locale, page: PageKey): Metadata {
  const m = pages[page][locale];
  const meta = pageMeta({ locale, ...m, paths: { es: href("es", page), en: href("en", page) } });
  return page === "home" ? { ...meta, title: { absolute: `Vesta Security · ${m.title}` } } : meta;
}

export function docMetaFor(locale: Locale, key: DocKey): Metadata {
  const doc = legalDocsFor(locale).find((d) => d.key === key)!;
  return pageMeta({ locale, title: doc.shortTitle, description: doc.summary, paths: { es: docHref("es", key), en: docHref("en", key) } });
}
