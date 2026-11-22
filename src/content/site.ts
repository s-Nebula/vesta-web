/**
 * Company and contact details, and the site navigation.
 * Source: official documents v1.1 (Terms, Privacy Policy and User Guide,
 * 22 November 2026). If any detail changes, update it here and in the documents.
 */
import { href, type Locale, type PageKey } from "@/i18n";

export const site = {
  name: "Vesta Security",
  shortName: "Vesta",
  /** Public domain of the site. Configurable with NEXT_PUBLIC_SITE_URL. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://vestasecurity.date").replace(/\/$/, ""),
  platform: "Android",
} as const;

export const siteText = {
  es: {
    descriptor: "Protección familiar",
    ogLocale: "es_CO",
    title: "Protección digital familiar para Android",
    description:
      "Vesta Security es una plataforma de protección digital familiar para Android, formada por Vesta Padre y Vesta Tracker: ubicación y zonas seguras, botón SOS, modo estudio, límites de tiempo, filtros web y alertas, con autorizaciones por finalidad.",
  },
  en: {
    descriptor: "Family protection",
    ogLocale: "en_US",
    title: "Family digital protection for Android",
    description:
      "Vesta Security is a family digital protection platform for Android, made up of Vesta Parent and Vesta Tracker: location and safe zones, an SOS button, study mode, time limits, web filters and alerts, with authorisation for each purpose.",
  },
} as const;

export const company = {
  legalName: "FORBIDDEN S.A.S.",
  nit: "901653270-2",
  author: "Nebula",
  city: "Santa Marta, Magdalena, Colombia",
  email: "nebulagnu@proton.me",
  phone: "+57 324 616 7956",
  phoneHref: "tel:+573246167956",
} as const;

export const companyText = {
  es: {
    registry: "Matrícula mercantil 262746 · Cámara de Comercio de Santa Marta para el Magdalena",
    jurisdiction: "República de Colombia",
  },
  en: {
    registry: "Commercial registration 262746 · Santa Marta para el Magdalena Chamber of Commerce",
    jurisdiction: "Republic of Colombia",
  },
} as const;

export type NavItem = { page: PageKey; href: string; label: string };

const navLabels: Record<Locale, Record<Exclude<PageKey, "downloads">, string>> = {
  es: {
    home: "Inicio",
    platform: "La plataforma",
    features: "Funcionalidades",
    mission: "Quiénes somos",
    help: "Ayuda",
    docs: "Documentación",
  },
  en: {
    home: "Home",
    platform: "Platform",
    features: "Features",
    mission: "About us",
    help: "Help",
    docs: "Documentation",
  },
};

export function mainNav(locale: Locale): NavItem[] {
  return (Object.keys(navLabels[locale]) as Exclude<PageKey, "downloads">[]).map((page) => ({
    page,
    href: href(locale, page),
    label: navLabels[locale][page],
  }));
}
