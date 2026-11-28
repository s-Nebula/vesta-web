/**
 * CENTRAL DOWNLOAD SETTINGS
 * -------------------------
 * This is the only file to edit when publishing a new version.
 * Every page (home, downloads, footer, help) reads from here.
 *
 * Fields set to `null` are PENDING. The site never makes anything up: if the
 * link is missing, the download button is not shown and a notice appears
 * (visible in development only).
 */
import type { Locale } from "@/i18n";

export type Release = {
  version: string;
  versionCode: number;
  /** Publication date in ISO format (YYYY-MM-DD). null = pending. */
  date: string | null;
  notes: Record<Locale, string[]>;
};

type Localized = { name: string; role: string; summary: string; installOn: string; minAndroid: string };

export type AppDownload = {
  id: "padre" | "tracker";
  text: Record<Locale, Localized>;
  packageId: string;
  minSdk: number;
  targetSdk: number;
  /** Exact APK size in bytes. */
  sizeBytes: number | null;
  sha256: string | null;
  /** Direct link to the official APK (HTTPS). */
  apkUrl: string | null;
  /** Google Play listing, once published. */
  playStoreUrl: string | null;
  releases: Release[];
};

const notes11 = {
  es: [
    "Vinculación con código QR y códigos que caducan a las 24 horas.",
    "Zonas seguras, botón SOS, modo estudio, límites de tiempo y peticiones del menor.",
    "Búsqueda segura, bloqueo de DNS cifrado y filtros recomendados por edad.",
    "Notificaciones push, resumen semanal y funcionamiento sin conexión.",
    "Versión en inglés (también en los avisos) y modo claro.",
  ],
  en: [
    "Linking with a QR code, and codes that expire after 24 hours.",
    "Safe zones, SOS button, study mode, time limits and requests from the minor.",
    "Safe search, encrypted DNS blocking and filters recommended by age.",
    "Push notifications, weekly summary and offline operation.",
    "English version (notifications included) and light mode.",
  ],
};

const notesPadre111: Release["notes"] = {
  es: [
    "Eliminar perfiles desde el panel (si otro tutor lo comparte, lo conserva).",
    "Actualizaciones automáticas: la app se instala sola las versiones nuevas.",
    "Panel web en app.vestasecurity.date con la misma cuenta.",
  ],
  en: [
    "Delete profiles from the dashboard (if another guardian shares it, they keep it).",
    "Automatic updates: the app installs new versions by itself.",
    "Web dashboard at app.vestasecurity.date with the same account.",
  ],
};

const notesTracker111: Release["notes"] = {
  es: [
    "Actualizaciones automáticas: Vesta Tracker se mantiene al día sola.",
    "El filtrado web se reactiva solo después de cada actualización.",
  ],
  en: [
    "Automatic updates: Vesta Tracker keeps itself up to date.",
    "Web filtering turns itself back on after each update.",
  ],
};

export const apps: AppDownload[] = [
  {
    id: "padre",
    text: {
      es: {
        name: "Vesta Padre",
        role: "Para el padre, la madre o el tutor",
        summary:
          "Gestiona los perfiles y los teléfonos vinculados, consulta la ubicación y las zonas seguras, revisa los informes, configura filtros, modo estudio y límites, y responde a las peticiones del menor.",
        installOn: "Se instala en el teléfono del adulto responsable.",
        minAndroid: "Android 7.0 o superior",
      },
      en: {
        name: "Vesta Parent",
        role: "For the parent or guardian",
        summary:
          "Manage profiles and linked phones, check location and safe zones, review reports, set up filters, study mode and limits, and answer the minor's requests.",
        installOn: "Install it on the responsible adult's phone.",
        minAndroid: "Android 7.0 or later",
      },
    },
    packageId: "org.vestaopensource.tutor",
    minSdk: 24,
    targetSdk: 36,
    sizeBytes: 68_449_644,
    sha256: "6bdf9786bb3fec4fd7e3174e71d9c7f031670813900b188dafe0dd2f217a7ed7",
    apkUrl: "https://vestasecurity.date/downloads/Vesta-Padre.apk",
    playStoreUrl: null,
    releases: [
      { version: "1.1.1", versionCode: 11, date: "2026-11-28", notes: notesPadre111 },
      { version: "1.1.0", versionCode: 9, date: "2026-11-22", notes: notes11 },
      { version: "1.0.0", versionCode: 1, date: null, notes: { es: ["Versión inicial."], en: ["First version."] } },
    ],
  },
  {
    id: "tracker",
    text: {
      es: {
        name: "Vesta Tracker",
        role: "Para el teléfono del menor",
        summary:
          "Se vincula con Vesta Padre escaneando un código QR, envía la información autorizada, aplica las reglas incluso sin conexión y permite al menor pedir permiso o enviar un aviso SOS.",
        installOn: "Se instala en el teléfono o la tableta del menor.",
        minAndroid: "Android 7.0 o superior",
      },
      en: {
        name: "Vesta Tracker",
        role: "For the minor's phone",
        summary:
          "Links to Vesta Parent by scanning a QR code, sends the authorised information, applies the rules even offline, and lets the minor ask for permission or send an SOS alert.",
        installOn: "Install it on the minor's phone or tablet.",
        minAndroid: "Android 7.0 or later",
      },
    },
    packageId: "org.vestaopensource.tracker",
    minSdk: 24,
    targetSdk: 36,
    sizeBytes: 78_355_973,
    sha256: "19b7bd6ba71da9286a65ec73a7129a74dd801e704f9bd758325557c1fee27450",
    apkUrl: "https://vestasecurity.date/downloads/Vesta-Tracker.apk",
    playStoreUrl: null,
    releases: [
      { version: "1.1.1", versionCode: 7, date: "2026-11-28", notes: notesTracker111 },
      { version: "1.1.0", versionCode: 6, date: "2026-11-22", notes: notes11 },
      { version: "1.0", versionCode: 1, date: null, notes: { es: ["Versión inicial."], en: ["First version."] } },
    ],
  },
];

export const latest = (app: AppDownload) => app.releases[0];

const numberLocale = { es: "es-CO", en: "en-US" } as const;

export function formatBytes(bytes: number | null, locale: Locale) {
  if (!bytes) return null;
  const mb = bytes / (1024 * 1024);
  return `${mb.toLocaleString(numberLocale[locale], { maximumFractionDigits: 1 })} MB`;
}

export function formatDate(iso: string | null, locale: Locale) {
  if (!iso) return null;
  const d = new Date(`${iso}T12:00:00`);
  return d.toLocaleDateString(numberLocale[locale], { day: "numeric", month: "long", year: "numeric" });
}
