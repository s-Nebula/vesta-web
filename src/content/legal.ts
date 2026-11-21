/**
 * Registro de documentos legales.
 *
 * El texto de cada documento se genera desde el .docx oficial con:
 *   npm run legal      (python3 scripts/convert_legal.py)
 * que escribe src/content/legal/<slug>.json. Ver README → «Actualizar documentos».
 *
 * `status`:
 *   - "oficial": documento aprobado y vigente. Se publica.
 *   - "pendiente": aún no existe versión aprobada. Se muestra un aviso y no se publica texto.
 */
import terminos from "./legal/terminos-y-condiciones.json";
import privacidad from "./legal/politica-de-privacidad.json";
import guia from "./legal/guia-de-usuario.json";

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
  slug: "terminos-y-condiciones" | "politica-de-privacidad" | "guia-de-usuario";
  shortTitle: string;
  title: string;
  kicker: string;
  summary: string;
  status: "oficial" | "pendiente";
  version: string;
  effectiveDate: string;
  updatedDate: string;
  /** PDF oficial, si existe. null = no se muestra botón de descarga. */
  pdfUrl: string | null;
  source: LegalSource;
};

export const legalDocs: LegalDoc[] = [
  {
    slug: "terminos-y-condiciones",
    shortTitle: "Términos y condiciones",
    title: "Términos y condiciones de uso",
    kicker: "Documento 01",
    summary:
      "Condiciones que regulan el acceso, la instalación y el uso de Vesta Padre, Vesta Tracker y los servicios relacionados: elegibilidad, responsabilidades del administrador, usos prohibidos y limitaciones del servicio.",
    status: "oficial",
    version: "1.0",
    effectiveDate: "20 de noviembre de 2026",
    updatedDate: "20 de noviembre de 2026",
    pdfUrl: null,
    source: terminos as LegalSource,
  },
  {
    slug: "politica-de-privacidad",
    shortTitle: "Política de privacidad",
    title: "Política de tratamiento de datos personales y privacidad",
    kicker: "Documento 02",
    summary:
      "Cómo FORBIDDEN S.A.S. recolecta, usa, protege y conserva los datos personales tratados mediante Vesta, conforme a la Ley 1581 de 2012: finalidades, datos de menores, derechos, plazos y revocación.",
    status: "oficial",
    version: "1.0",
    effectiveDate: "20 de noviembre de 2026",
    updatedDate: "20 de noviembre de 2026",
    pdfUrl: null,
    source: privacidad as LegalSource,
  },
  {
    slug: "guia-de-usuario",
    shortTitle: "Guía de usuario",
    title: "Guía de usuario",
    kicker: "Documento 03",
    summary:
      "Cómo instalar, vincular y utilizar Vesta Padre y Vesta Tracker de forma responsable: requisitos, permisos, panel, reglas, desvinculación y solución de problemas.",
    status: "oficial",
    version: "1.0",
    effectiveDate: "20 de noviembre de 2026",
    updatedDate: "20 de noviembre de 2026",
    pdfUrl: null,
    source: guia as LegalSource,
  },
];

export const getDoc = (slug: LegalDoc["slug"]) => legalDocs.find((d) => d.slug === slug)!;

/**
 * Capturas reales que se intercalan en la Guía de usuario, por id de sección.
 * Las capturas no forman parte del documento oficial; se muestran como apoyo visual.
 */
export const guideFigures: Record<string, { src: string; alt: string; kind: "phone" | "tablet"; sizes: [number, number]; caption: string }[]> = {
  "3-1-vesta-padre": [
    { src: "/img/padre/inicio-sesion", alt: "Pantalla de inicio de sesión de Vesta Padre", kind: "phone", sizes: [420, 840], caption: "Inicio de sesión en Vesta Padre" },
  ],
  "desde-vesta-padre": [
    { src: "/img/padre/registro-menor", alt: "Formulario para añadir el perfil de un menor en Vesta Padre", kind: "phone", sizes: [420, 840], caption: "Crear el perfil del menor" },
  ],
  "desde-vesta-tracker": [
    { src: "/img/tracker/vinculacion", alt: "Pantalla Vincular dispositivo de Vesta Tracker con el campo para el código", kind: "tablet", sizes: [800, 1600], caption: "Introducir el código en Vesta Tracker" },
  ],
  "6-panel-de-vesta-padre": [
    { src: "/img/padre/panel-dispositivos", alt: "Panel de control con un dispositivo vinculado", kind: "phone", sizes: [420, 840], caption: "Panel de control" },
  ],
  "alertas": [
    { src: "/img/padre/alertas", alt: "Lista de alertas de batería en Vesta Padre", kind: "phone", sizes: [420, 840], caption: "Alertas" },
  ],
  "bloquear-una-aplicacion": [
    { src: "/img/padre/filtros", alt: "Pantalla de filtros con una regla de bloqueo de aplicación", kind: "phone", sizes: [420, 840], caption: "Reglas de bloqueo" },
  ],
};
