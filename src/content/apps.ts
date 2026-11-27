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
    sha256: "818a4c5c9b76fe80d0b6af7e4d50f518c6cebf7796e7c95f734d0505853ddf13",
    req: "Android 7 o superior",
  },
  windows: {
    file: "Financial-Security-Setup.exe",
    sha256: "02f14cac9111afc926354107e323ed720e0515978f8285a3a3df519c74dcfeed",
    req: "Windows 10 u 11 de 64 bits",
  },
  priceMonth: 100_000,
  priceYear: 1_000_000,
};

/** Nebula PDF: el APK se sirve desde /downloads/ de este sitio. */
export const nebulaPdf = {
  version: "1.0.0",
  date: "2026-11-26",
  apk: "/downloads/Nebula-PDF.apk",
  sizeMb: 120,
  sha256: "283627fb1fafdb91e939d1695362c348c61bf4476591ad4b491ccd7790cfe427",
  beta: true,
  repo: "https://github.com/s-Nebula/nebula-pdf",
};
