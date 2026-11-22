/**
 * Legal documents registry.
 *
 * The text of each document is generated from the official .docx with:
 *   npm run legal      (python3 scripts/convert_legal.py)
 * which writes src/content/legal/<slug>.json (Spanish, official text) and
 * src/content/legal/en/<slug>.json (English courtesy translation).
 */
import type { DocKey, Locale } from "@/i18n";
import { docSlugs } from "@/i18n";
import terminos from "./legal/terminos-y-condiciones.json";
import privacidad from "./legal/politica-de-privacidad.json";
import guia from "./legal/guia-de-usuario.json";
import terms from "./legal/en/terms.json";
import privacy from "./legal/en/privacy.json";
import userGuide from "./legal/en/user-guide.json";

export type LegalBlock =
  | { type: "h2" | "h3"; id: string; text: string }
  | { type: "p"; text: string }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "table"; rows: string[][] };

export type LegalSource = {
  title: string | null;
  subtitle: string | null;
  meta: Record<string, string>;
  blocks: LegalBlock[];
  closing: string[];
  sourceFile: string;
};

export type LegalDoc = {
  key: DocKey;
  slug: string;
  shortTitle: string;
  title: string;
  summary: string;
  version: string;
  effectiveDate: string;
  updatedDate: string;
  /** Official PDF, if any. null = no download button. */
  pdfUrl: string | null;
  source: LegalSource;
};

const VERSION = "1.1";

const es: LegalDoc[] = [
  {
    key: "terms",
    slug: docSlugs.terms.es,
    shortTitle: "Términos y condiciones",
    title: "Términos y condiciones de uso",
    summary:
      "Las condiciones para instalar y usar Vesta Padre y Vesta Tracker: quién puede usarlas, responsabilidades del tutor, usos prohibidos, propiedad intelectual y límites del servicio.",
    version: VERSION,
    effectiveDate: "22 de noviembre de 2026",
    updatedDate: "22 de noviembre de 2026",
    pdfUrl: null,
    source: terminos as LegalSource,
  },
  {
    key: "privacy",
    slug: docSlugs.privacy.es,
    shortTitle: "Política de privacidad",
    title: "Política de tratamiento de datos personales y privacidad",
    summary:
      "Qué datos trata Vesta y para qué, cómo se protegen los datos de menores, cuánto tiempo se guardan y cómo ejercer tus derechos, conforme a la Ley 1581 de 2012.",
    version: VERSION,
    effectiveDate: "22 de noviembre de 2026",
    updatedDate: "22 de noviembre de 2026",
    pdfUrl: null,
    source: privacidad as LegalSource,
  },
  {
    key: "guide",
    slug: docSlugs.guide.es,
    shortTitle: "Guía de usuario",
    title: "Guía de usuario",
    summary:
      "Cómo instalar, vincular y usar Vesta Padre y Vesta Tracker: permisos, panel, modo estudio, zonas, límites, peticiones, desvinculación y solución de problemas.",
    version: VERSION,
    effectiveDate: "22 de noviembre de 2026",
    updatedDate: "22 de noviembre de 2026",
    pdfUrl: null,
    source: guia as LegalSource,
  },
];

const en: LegalDoc[] = [
  {
    key: "terms",
    slug: docSlugs.terms.en,
    shortTitle: "Terms and Conditions",
    title: "Terms and Conditions of Use",
    summary:
      "The conditions for installing and using Vesta Parent and Vesta Tracker: who can use them, the guardian's responsibilities, prohibited uses, intellectual property and the limits of the service.",
    version: VERSION,
    effectiveDate: "22 November 2026",
    updatedDate: "22 November 2026",
    pdfUrl: null,
    source: terms as LegalSource,
  },
  {
    key: "privacy",
    slug: docSlugs.privacy.en,
    shortTitle: "Privacy Policy",
    title: "Personal Data Processing and Privacy Policy",
    summary:
      "What data Vesta processes and why, how minors' data is protected, how long it is kept and how to exercise your rights, under Colombian Law 1581 of 2012.",
    version: VERSION,
    effectiveDate: "22 November 2026",
    updatedDate: "22 November 2026",
    pdfUrl: null,
    source: privacy as LegalSource,
  },
  {
    key: "guide",
    slug: docSlugs.guide.en,
    shortTitle: "User Guide",
    title: "User Guide",
    summary:
      "How to install, link and use Vesta Parent and Vesta Tracker: permissions, dashboard, study mode, zones, limits, requests, unlinking and troubleshooting.",
    version: VERSION,
    effectiveDate: "22 November 2026",
    updatedDate: "22 November 2026",
    pdfUrl: null,
    source: userGuide as LegalSource,
  },
];

export const legalDocsFor = (locale: Locale): LegalDoc[] => (locale === "en" ? en : es);

export const getDoc = (locale: Locale, slug: string) => legalDocsFor(locale).find((d) => d.slug === slug);

type Figure = { src: string; alt: string; kind: "phone" | "tablet"; sizes: [number, number]; caption: string };

/**
 * Real screenshots shown inside the User Guide, by section id.
 * They are not part of the official document; they are a visual aid.
 */
export const guideFigures: Record<Locale, Record<string, Figure[]>> = {
  es: {
    "3-1-vesta-padre": [
      { src: "/img/padre/inicio-sesion", alt: "Pantalla de inicio de sesión de Vesta Padre", kind: "phone", sizes: [420, 840], caption: "Inicio de sesión en Vesta Padre" },
    ],
    "desde-vesta-padre": [
      { src: "/img/padre/registro-menor", alt: "Formulario para añadir el perfil de un menor en Vesta Padre", kind: "phone", sizes: [420, 840], caption: "Crear el perfil del menor" },
    ],
    "6-panel-de-vesta-padre": [
      { src: "/img/padre/panel-dispositivos", alt: "Panel de control con un dispositivo vinculado", kind: "phone", sizes: [420, 840], caption: "Panel de control" },
    ],
    alertas: [{ src: "/img/padre/alertas", alt: "Lista de alertas en Vesta Padre", kind: "phone", sizes: [420, 840], caption: "Alertas" }],
    "bloquear-una-aplicacion": [
      { src: "/img/padre/filtros", alt: "Pantalla de filtros con una regla de bloqueo de aplicación", kind: "phone", sizes: [420, 840], caption: "Reglas de bloqueo" },
    ],
  },
  en: {
    "3-1-vesta-parent": [
      { src: "/img/padre/inicio-sesion", alt: "Vesta Parent sign-in screen", kind: "phone", sizes: [420, 840], caption: "Signing in to Vesta Parent (Spanish interface)" },
    ],
    "from-vesta-parent": [
      { src: "/img/padre/registro-menor", alt: "Form to add a minor's profile in Vesta Parent", kind: "phone", sizes: [420, 840], caption: "Creating the minor's profile (Spanish interface)" },
    ],
    "6-vesta-parent-dashboard": [
      { src: "/img/padre/panel-dispositivos", alt: "Dashboard with a linked device", kind: "phone", sizes: [420, 840], caption: "Dashboard (Spanish interface)" },
    ],
    alerts: [{ src: "/img/padre/alertas", alt: "List of alerts in Vesta Parent", kind: "phone", sizes: [420, 840], caption: "Alerts (Spanish interface)" }],
    "block-an-app": [
      { src: "/img/padre/filtros", alt: "Filters screen with an app blocking rule", kind: "phone", sizes: [420, 840], caption: "Blocking rules (Spanish interface)" },
    ],
  },
};
