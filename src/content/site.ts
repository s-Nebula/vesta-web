/**
 * Información institucional y de contacto.
 * Fuente: documentos oficiales v1.0 (Términos, Política de Privacidad y Guía de usuario,
 * 20 de noviembre de 2026). Si algún dato cambia, actualízalo aquí y en los documentos.
 */
export const site = {
  name: "Vesta Security",
  shortName: "Vesta",
  descriptor: "Protección familiar",
  description:
    "Vesta Security es una plataforma de protección digital familiar para Android, formada por Vesta Padre y Vesta Tracker. Ubicación autorizada, estado del dispositivo, estadísticas de uso, filtros y alertas, con autorizaciones por finalidad.",
  /** Dominio público del sitio. Configurable con NEXT_PUBLIC_SITE_URL. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://vestasecurity.date").replace(/\/$/, ""),
  locale: "es_CO",
  platform: "Android",
  license: "GNU GPL v3",
  sourceCode: {
    padre: "https://github.com/s-Nebula/vesta-tutor",
    tracker: "https://github.com/s-Nebula/vesta-tracker",
  },
} as const;

export const company = {
  legalName: "FORBIDDEN S.A.S.",
  nit: "901653270-2",
  registry: "Matrícula mercantil 262746 · Cámara de Comercio de Santa Marta para el Magdalena",
  author: "Nebula",
  address: "Cra. 66 # 46a - 128",
  city: "Santa Marta, Magdalena, Colombia",
  email: "nebulagnu@proton.me",
  phone: "+57 324 616 7956",
  phoneHref: "tel:+573246167956",
  jurisdiction: "República de Colombia",
} as const;

export type NavItem = { href: string; label: string };

export const mainNav: NavItem[] = [
  { href: "/", label: "Inicio" },
  { href: "/plataforma/", label: "La plataforma" },
  { href: "/funcionalidades/", label: "Funcionalidades" },
  { href: "/mision-y-vision/", label: "Misión y visión" },
  { href: "/ayuda/", label: "Centro de ayuda" },
  { href: "/documentacion/", label: "Documentación" },
];

export const downloadNav: NavItem = { href: "/descargas/", label: "Descargar aplicaciones" };
