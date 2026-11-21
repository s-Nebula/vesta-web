/**
 * CONFIGURACIÓN CENTRAL DE DESCARGAS
 * ----------------------------------
 * Este es el único archivo que hay que editar para publicar una nueva versión.
 * Todas las páginas (inicio, descargas, pie de página, ayuda) leen de aquí.
 *
 * Datos verificados el 21/11/2026 a partir de los APK entregados
 * (Vesta-Padre.apk y Vesta-Tracker.apk): versionName, versionCode, minSdk,
 * targetSdk, tamaño exacto y SHA-256.
 *
 * Campos con valor `null` = PENDIENTE. El sitio no inventa nada: si falta el enlace,
 * el botón de descarga no se muestra y aparece un aviso (visible en desarrollo).
 */

export type Release = {
  version: string;
  versionCode: number;
  /** Fecha de publicación en formato ISO (AAAA-MM-DD). null = pendiente. */
  date: string | null;
  /** Notas de la versión. Déjalo vacío si no hay notas aprobadas. */
  notes: string[];
};

export type AppDownload = {
  id: "padre" | "tracker";
  name: string;
  role: string;
  summary: string;
  installOn: string;
  packageId: string;
  icon: string;
  /** Versión mínima de Android (minSdkVersion del APK). */
  minAndroid: string;
  minSdk: number;
  targetSdk: number;
  /** Tamaño exacto del APK en bytes. */
  sizeBytes: number | null;
  sha256: string | null;
  /** Enlace directo al APK oficial (HTTPS). PENDIENTE. */
  apkUrl: string | null;
  /** Ficha de Google Play, cuando exista publicación. */
  playStoreUrl: string | null;
  releases: Release[];
};

export const apps: AppDownload[] = [
  {
    id: "padre",
    name: "Vesta Padre",
    role: "Para el padre, la madre o el tutor",
    summary:
      "Administra los perfiles y dispositivos vinculados, consulta la ubicación y el estado del equipo, revisa los informes de uso, configura los filtros y gestiona las autorizaciones de privacidad.",
    installOn: "Se instala en el teléfono del adulto responsable.",
    packageId: "org.vestaopensource.tutor",
    icon: "/brand/vesta_simbolo.svg",
    minAndroid: "Android 7.0 o superior",
    minSdk: 24,
    targetSdk: 36,
    sizeBytes: 188_687_018,
    sha256: "32076a67bc6fc46b22b31e91800d9cb46faef62341b25791eb04bb7bf2a48a8f",
    apkUrl: null, // PENDIENTE: URL oficial del APK (p. ej. GitHub Releases o servidor propio)
    playStoreUrl: null,
    releases: [{ version: "1.0.0", versionCode: 1, date: null, notes: [] }],
  },
  {
    id: "tracker",
    name: "Vesta Tracker",
    role: "Para el dispositivo del menor",
    summary:
      "Se vincula con Vesta Padre mediante un código, envía la información autorizada (ubicación, estado del equipo y uso de aplicaciones) y aplica en el dispositivo las reglas de protección configuradas.",
    installOn: "Se instala en el teléfono o la tableta del menor.",
    packageId: "org.vestaopensource.tracker",
    icon: "/brand/vesta_simbolo.svg",
    minAndroid: "Android 7.0 o superior",
    minSdk: 24,
    targetSdk: 35,
    sizeBytes: 59_415_171,
    sha256: "eb60d8f429be9c2f6c2f9ca18ddfe5d9c40139bccc1b25e3704df93bbe6e222d",
    apkUrl: null, // PENDIENTE: URL oficial del APK
    playStoreUrl: null,
    releases: [{ version: "1.0", versionCode: 1, date: null, notes: [] }],
  },
];

export const getApp = (id: AppDownload["id"]) => apps.find((a) => a.id === id)!;

export const latest = (app: AppDownload) => app.releases[0];

export function formatBytes(bytes: number | null) {
  if (!bytes) return null;
  const mb = bytes / (1024 * 1024);
  return `${mb.toLocaleString("es-CO", { maximumFractionDigits: 1 })} MB`;
}

export function formatDate(iso: string | null) {
  if (!iso) return null;
  const d = new Date(`${iso}T12:00:00`);
  return d.toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" });
}
