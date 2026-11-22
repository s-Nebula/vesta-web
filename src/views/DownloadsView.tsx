import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { DownloadPanel } from "@/components/sections/DownloadPanel";
import { Pending } from "@/components/ui/Pending";
import { apps, formatDate } from "@/content/downloads";
import { JsonLd } from "@/lib/seo";
import { appsSchema } from "@/lib/schema";
import { docHref, href, type Locale } from "@/i18n";

const copy = {
  es: {
    kicker: "Descargas",
    title: "Vesta Padre y Vesta Tracker para Android.",
    lead: "Se instalan en teléfonos distintos: Vesta Padre en el del adulto responsable y Vesta Tracker en el del menor. Ambas requieren Android 7.0 o superior.",
    appsAria: "Aplicaciones",
    apkTitle: "Instalación desde APK",
    apkText:
      "Vesta se distribuye como archivo APK, fuera de Google Play. Android pedirá permiso para instalar aplicaciones de origen desconocido: concédelo solo al navegador o gestor de archivos que uses y retíralo al terminar. Descarga Vesta solo desde este sitio y, si quieres verificar el archivo, compara su huella SHA-256 con la publicada aquí.",
    req: "Requisitos",
    internet: "Conexión a internet.",
    padreReq: "Cuenta de Vesta (correo y contraseña, Google o GitHub).",
    trackerReq: ["Código QR o código de vinculación generado en Vesta Padre.", "Permisos de ubicación, datos de uso, accesibilidad y VPN local según las funciones autorizadas."],
    reqNote: "La disponibilidad de funciones puede variar según la versión de Android y el fabricante.",
    install: "Instalación",
    steps: {
      padre: [
        "Descarga el APK de Vesta Padre en el teléfono del adulto responsable.",
        "Abre el archivo. Si Android lo pide, permite «Instalar apps desconocidas» para el navegador o el gestor de archivos.",
        "Toca «Instalar» y abre Vesta Padre.",
        "Crea tu cuenta o inicia sesión y acepta los documentos vigentes.",
        "Crea el perfil del menor: aparecerá el código QR de vinculación.",
      ],
      tracker: [
        "Descarga el APK de Vesta Tracker en el teléfono del menor.",
        "Abre el archivo y permite la instalación si Android lo pide.",
        "Abre Vesta Tracker y toca «Escanear código QR».",
        "Apunta al código de Vesta Padre y concede los permisos de las funciones que vayas a usar.",
        "Activa, si corresponde, el acceso a datos de uso y el servicio de accesibilidad en los ajustes de Android.",
      ],
    },
    trackerWarning:
      "No instales Vesta Tracker en un teléfono sin informar a su usuario y sin contar con la autoridad y las autorizaciones legalmente necesarias.",
    history: "Historial de versiones",
    hVersion: "Versión",
    hDate: "Fecha",
    hNotes: "Novedades",
    problems: "¿Problemas al instalar o vincular?",
    helpInstall: "Ayuda con la instalación",
    helpLink: "Ayuda con la vinculación",
    guide: "Guía de usuario",
  },
  en: {
    kicker: "Downloads",
    title: "Vesta Parent and Vesta Tracker for Android.",
    lead: "They are installed on different phones: Vesta Parent on the responsible adult's and Vesta Tracker on the minor's. Both require Android 7.0 or later.",
    appsAria: "Apps",
    apkTitle: "Installing from an APK",
    apkText:
      "Vesta is distributed as an APK file, outside Google Play. Android will ask for permission to install apps from unknown sources: grant it only to the browser or file manager you use, and remove it when you are done. Only download Vesta from this site and, if you want to verify the file, compare its SHA-256 fingerprint with the one published here.",
    req: "Requirements",
    internet: "An Internet connection.",
    padreReq: "A Vesta account (email and password, Google or GitHub).",
    trackerReq: ["A QR code or linking code generated in Vesta Parent.", "Location, usage access, accessibility and local VPN permissions, depending on the authorised features."],
    reqNote: "Feature availability may vary by Android version and manufacturer.",
    install: "Installation",
    steps: {
      padre: [
        "Download the Vesta Parent APK on the responsible adult's phone.",
        "Open the file. If Android asks, allow “Install unknown apps” for the browser or file manager.",
        "Tap “Install” and open Vesta Parent.",
        "Create your account or sign in, and accept the current documents.",
        "Create the minor's profile: the linking QR code will appear.",
      ],
      tracker: [
        "Download the Vesta Tracker APK on the minor's phone.",
        "Open the file and allow the installation if Android asks.",
        "Open Vesta Tracker and tap “Scan QR code”.",
        "Point at the code in Vesta Parent and grant the permissions for the features you will use.",
        "If needed, turn on usage access and the accessibility service in Android settings.",
      ],
    },
    trackerWarning:
      "Do not install Vesta Tracker on a phone without informing its user and without the legally required authority and authorisations.",
    history: "Version history",
    hVersion: "Version",
    hDate: "Date",
    hNotes: "What's new",
    problems: "Trouble installing or linking?",
    helpInstall: "Installation help",
    helpLink: "Linking help",
    guide: "User guide",
  },
} as const;

export function DownloadsView({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <>
      {appsSchema(locale).map((s) => (
        <JsonLd key={s.name} data={s} />
      ))}
      <PageHero kicker={t.kicker} title={t.title} lead={t.lead}>
        <nav aria-label={t.appsAria} className="flex flex-wrap gap-3">
          {apps.map((a) => (
            <a key={a.id} href={`#${a.id}`} className="btn btn-ghost">
              {a.text[locale].name}
            </a>
          ))}
        </nav>
      </PageHero>

      <section aria-labelledby="aviso-apk" className="border-b border-line bg-paper">
        <div className="wrap flex gap-5 py-8">
          <AlertTriangle aria-hidden="true" className="mt-1 size-5 shrink-0 text-warn" />
          <div className="max-w-4xl text-[0.97rem]">
            <h2 id="aviso-apk" className="font-sans text-base font-semibold text-ink">
              {t.apkTitle}
            </h2>
            <p className="mt-2 text-muted">{t.apkText}</p>
          </div>
        </div>
      </section>

      {apps.map((a, idx) => (
        <section key={a.id} aria-label={a.text[locale].name} className={`py-20 md:py-28 ${idx === 1 ? "border-t border-line" : ""}`}>
          <div className="wrap grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <DownloadPanel app={a} locale={locale} detailed />
            </div>

            <div className="space-y-14 lg:col-span-5 lg:col-start-8">
              <div>
                <h3 className="kicker">{t.req}</h3>
                <ul className="mt-5 space-y-2 text-[0.97rem]">
                  <li>
                    {a.text[locale].minAndroid} (API {a.minSdk}).
                  </li>
                  <li>{t.internet}</li>
                  {a.id === "padre" ? <li>{t.padreReq}</li> : t.trackerReq.map((r) => <li key={r}>{r}</li>)}
                </ul>
                <p className="mt-4 text-sm text-muted">{t.reqNote}</p>
              </div>

              <div>
                <h3 className="kicker">{t.install}</h3>
                <ol className="mt-5 space-y-3 text-[0.97rem]">
                  {t.steps[a.id].map((s, i) => (
                    <li key={s} className="grid grid-cols-[1.75rem_1fr]">
                      <span className="font-serif text-rose-700">{i + 1}</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ol>
                {a.id === "tracker" && <p className="mt-5 border-l-2 border-rose pl-4 text-sm text-muted">{t.trackerWarning}</p>}
              </div>

              <div>
                <h3 className="kicker">{t.history}</h3>
                <table className="mt-5 w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-wine text-muted">
                      <th scope="col" className="py-2 pr-4 font-semibold">
                        {t.hVersion}
                      </th>
                      <th scope="col" className="py-2 pr-4 font-semibold">
                        {t.hDate}
                      </th>
                      <th scope="col" className="py-2 font-semibold">
                        {t.hNotes}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {a.releases.map((r) => (
                      <tr key={r.version} className="border-b border-line align-top">
                        <td className="py-3 pr-4 font-medium">
                          {r.version} <span className="text-xs text-muted">({r.versionCode})</span>
                        </td>
                        <td className="py-3 pr-4">{formatDate(r.date, locale) ?? <Pending what="release date" fallback="—" />}</td>
                        <td className="py-3 text-muted">
                          <ul className="space-y-1">
                            {r.notes[locale].map((n) => (
                              <li key={n}>{n}</li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="border-t border-line bg-paper py-16">
        <div className="wrap flex flex-col gap-4 text-[0.97rem] md:flex-row md:items-center md:justify-between">
          <p className="text-muted">{t.problems}</p>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            <Link className="link font-semibold" href={href(locale, "help", locale === "es" ? "instalacion" : "installation")}>
              {t.helpInstall}
            </Link>
            <Link className="link font-semibold" href={href(locale, "help", locale === "es" ? "problemas-de-vinculacion" : "linking")}>
              {t.helpLink}
            </Link>
            <Link className="link font-semibold" href={docHref(locale, "guide")}>
              {t.guide}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
