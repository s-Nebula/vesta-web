/**
 * Site languages.
 *
 * Spanish lives at the root ("/", "/plataforma/", ...) and English under
 * "/en/" ("/en/", "/en/platform/", ...). Each page has a stable key so links
 * and the language switcher can find its counterpart in the other language.
 */

export type Locale = "es" | "en";
export const locales: Locale[] = ["es", "en"];

const pages = {
  home: { es: "/", en: "/en/" },
  platform: { es: "/plataforma/", en: "/en/platform/" },
  features: { es: "/funcionalidades/", en: "/en/features/" },
  mission: { es: "/mision-y-vision/", en: "/en/mission/" },
  help: { es: "/ayuda/", en: "/en/help/" },
  docs: { es: "/documentacion/", en: "/en/docs/" },
  downloads: { es: "/descargas/", en: "/en/downloads/" },
} as const;

export type PageKey = keyof typeof pages;

/** Legal document slugs per language (same document, translated URL). */
export const docSlugs = {
  terms: { es: "terminos-y-condiciones", en: "terms" },
  privacy: { es: "politica-de-privacidad", en: "privacy" },
  guide: { es: "guia-de-usuario", en: "user-guide" },
} as const;

export type DocKey = keyof typeof docSlugs;

export function href(locale: Locale, page: PageKey, hash = ""): string {
  return pages[page][locale] + (hash ? `#${hash}` : "");
}

export function docHref(locale: Locale, doc: DocKey, hash = ""): string {
  return `${pages.docs[locale]}${docSlugs[doc][locale]}/` + (hash ? `#${hash}` : "");
}

/** Path of the same page in the other language (used by the switcher). */
export function translatePath(pathname: string, to: Locale): string {
  const path = pathname.endsWith("/") ? pathname : `${pathname}/`;
  for (const p of Object.values(pages)) {
    if (path === p.es || path === p.en) return p[to];
  }
  for (const d of Object.values(docSlugs)) {
    for (const from of locales) {
      if (path === `${pages.docs[from]}${d[from]}/`) return `${pages.docs[to]}${d[to]}/`;
    }
  }
  return pages.home[to];
}

export const localeFromPath = (pathname: string): Locale =>
  pathname === "/en" || pathname.startsWith("/en/") ? "en" : "es";

/** Interface strings shared by several components. */
export const ui = {
  es: {
    skip: "Saltar al contenido",
    homeAria: "Vesta Security, inicio",
    mainNav: "Principal",
    mobileNav: "Menú móvil",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    download: "Descargar aplicaciones",
    android: "Disponible para Android",
    language: "Idioma",
    otherLanguage: "English",
    otherLanguageShort: "EN",
    padre: "Vesta Padre",
    tracker: "Vesta Tracker",
    both: "Ambas apps",
    print: "Imprimir",
    pendingLabel: "Pendiente:",
  },
  en: {
    skip: "Skip to content",
    homeAria: "Vesta Security, home",
    mainNav: "Main",
    mobileNav: "Mobile menu",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    download: "Download the apps",
    android: "Available for Android",
    language: "Language",
    otherLanguage: "Español",
    otherLanguageShort: "ES",
    padre: "Vesta Parent",
    tracker: "Vesta Tracker",
    both: "Both apps",
    print: "Print",
    pendingLabel: "Pending:",
  },
} as const;
