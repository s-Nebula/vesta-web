/**
 * Aplicaciones de Vesta Security. Cada una conserva su color de acento y su
 * logo; el marco (cabecera y pie) es el de la empresa.
 */
export type AppInfo = {
  id: "vesta" | "financial" | "nebula-pdf";
  name: string;
  kind: string;
  href: string;
  summary: string;
  security: string;
  platform: string;
  /** Color de acento de la app (sobre fondo oscuro). */
  accent: string;
  logo: string;
};

export const apps: AppInfo[] = [
  {
    id: "vesta",
    name: "Vesta",
    kind: "Control parental",
    href: "/control-parental/",
    summary: "Dos apps para Android, una para el tutor y otra para el menor: ubicación y zonas seguras, botón SOS, modo estudio, límites y filtros web.",
    security: "Autorizaciones por finalidad, reglas de Firestore reforzadas y código abierto bajo AGPL-3.0.",
    platform: "Android 7.0+",
    accent: "#DD9AA2",
    logo: "/brand/vesta_simbolo.svg",
  },
  {
    id: "financial",
    name: "Financial Security",
    kind: "Créditos y cobranza",
    href: "/aplicaciones/financial-security/",
    summary: "El cobrador registra los pagos en el celular, aunque no tenga señal; el dueño ve recaudo, mora y ganancia desde el computador.",
    security: "Cada negocio aislado a nivel de fila en la base de datos, cobradores que no pueden borrar pagos y copia cifrada cada noche.",
    platform: "Android 7+ · Windows 10/11",
    accent: "#E9B949",
    logo: "/brand/financial_logo.svg",
  },
  {
    id: "nebula-pdf",
    name: "Nebula PDF",
    kind: "Traductor de PDF",
    href: "/aplicaciones/nebula-pdf/",
    summary: "Traduce libros y manuales en PDF del inglés al español sin perder el diseño. Pensado para libros de ciberseguridad.",
    security: "Deja en inglés más de 200 términos técnicos, comandos y payloads, y traduce en el teléfono: el PDF nunca sale del dispositivo.",
    platform: "Android 8.0+",
    accent: "#6CB3FF",
    logo: "/brand/nebula_pdf_icon.svg",
  },
];

export const appById = (id: AppInfo["id"]) => apps.find((a) => a.id === id)!;

/** Financial Security: datos de su antigua web (financial.vestasecurity.date). */
export const financial = {
  version: "1.2.18",
  downloadsBase: "https://financial.vestasecurity.date/downloads",
  android: {
    file: "Financial-Security.apk",
    sha256: "29ab1f7590ccc0c5be8bc644de99c7e0686c6fe85aefc090b940509b74bbfbba",
    req: "Android 7 o superior",
  },
  windows: {
    file: "Financial-Security-Setup.exe",
    sha256: "c28e9e7030e7b969d6589c27f13948a5c64c077b20e44b6436178526a6a0bf34",
    req: "Windows 10 u 11 de 64 bits",
  },
  priceMonth: 100_000,
  priceYear: 1_000_000,
};

/** Nebula PDF: el APK se sirve desde /downloads/ de este sitio. */
export const nebulaPdf = {
  version: "1.0.1",
  date: "2026-11-27",
  apk: "/downloads/Nebula-PDF-1.0.1.apk",
  sizeMb: 116,
  sha256: "a1a118afe6c693acb86067b0e6c4b09838b051696b6a08e28965d0caa12dd78a",
  /** Huella SHA-256 del certificado de firma (FORBIDDEN S.A.S.). */
  certSha256: "BA:9D:18:17:AB:88:9F:35:7E:77:4F:A4:9D:04:59:16:B9:D8:02:D1:C6:BB:7D:35:08:B2:62:DD:5B:5F:0C:B9",
  beta: false,
  repo: "https://github.com/s-Nebula/nebula-pdf",
};
