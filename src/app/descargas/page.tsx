import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { DownloadPanel } from "@/components/sections/DownloadPanel";
import { Pending } from "@/components/ui/Pending";
import { apps, formatDate } from "@/content/downloads";
import { pageMeta, JsonLd } from "@/lib/seo";
import { appsSchema } from "@/lib/schema";

export const metadata = pageMeta({
  title: "Descargar Vesta",
  description:
    "Descarga Vesta Padre y Vesta Tracker para Android: requisitos, versión, tamaño, huella SHA-256, instrucciones de instalación desde APK e historial de versiones.",
  path: "/descargas/",
});

const install: Record<string, string[]> = {
  padre: [
    "Descarga el APK de Vesta Padre en el teléfono del adulto responsable.",
    "Abre el archivo descargado. Si Android lo solicita, permite «Instalar apps desconocidas» para el navegador o el gestor de archivos.",
    "Pulsa «Instalar» y abre Vesta Padre.",
    "Crea tu cuenta o inicia sesión y acepta los documentos legales vigentes.",
    "Registra el perfil del menor y copia el código de vinculación.",
  ],
  tracker: [
    "Descarga el APK de Vesta Tracker en el dispositivo del menor.",
    "Abre el archivo y permite la instalación si Android lo solicita.",
    "Abre Vesta Tracker y lee la información sobre permisos y tratamiento de datos.",
    "Concede los permisos de las funciones que vas a usar e introduce el código de vinculación.",
    "Activa, si corresponde, el acceso a datos de uso y el servicio de accesibilidad desde los ajustes de Android.",
  ],
};

export default function DescargasPage() {
  return (
    <>
      {appsSchema.map((s) => (
        <JsonLd key={s.name} data={s} />
      ))}
      <PageHero
        kicker="Descargar Vesta"
        title="Vesta Padre y Vesta Tracker para Android."
        lead="Se instalan en dispositivos distintos: Vesta Padre en el teléfono del adulto responsable y Vesta Tracker en el dispositivo del menor. Ambas requieren Android 7.0 o superior."
      >
        <nav aria-label="Aplicaciones" className="flex flex-wrap gap-3">
          {apps.map((a) => (
            <a key={a.id} href={`#${a.id}`} className="btn btn-ghost">
              {a.name}
            </a>
          ))}
        </nav>
      </PageHero>

      {/* Aviso APK */}
      <section aria-labelledby="aviso-apk" className="border-b border-line bg-paper">
        <div className="wrap flex gap-5 py-8">
          <AlertTriangle aria-hidden="true" className="mt-1 size-5 shrink-0 text-warn" />
          <div className="max-w-4xl text-[0.95rem]">
            <h2 id="aviso-apk" className="font-sans text-sm font-semibold uppercase tracking-[0.12em] text-ink">
              Instalación desde APK
            </h2>
            <p className="mt-2 text-muted">
              Vesta se distribuye como archivo APK, fuera de Google Play. Android pedirá permiso para instalar aplicaciones de origen
              desconocido: concédelo solo al navegador o gestor de archivos que uses, y retíralo al terminar. Descarga Vesta únicamente desde
              este sitio y, si quieres verificar el archivo, compara su huella SHA-256 con la publicada aquí.
            </p>
          </div>
        </div>
      </section>

      {apps.map((a, idx) => (
        <section key={a.id} aria-label={a.name} className={`py-20 md:py-28 ${idx === 1 ? "border-t border-line" : ""}`}>
          <div className="wrap grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <DownloadPanel app={a} detailed />
            </div>

            <div className="space-y-14 lg:col-span-5 lg:col-start-8">
              <div>
                <h3 className="kicker">Requisitos del sistema</h3>
                <ul className="mt-5 space-y-2 text-[0.95rem]">
                  <li>{a.minAndroid} (API {a.minSdk}).</li>
                  <li>Conexión a Internet.</li>
                  {a.id === "padre" ? (
                    <li>Cuenta de Vesta (correo y contraseña, Google o GitHub).</li>
                  ) : (
                    <>
                      <li>Código de vinculación generado en Vesta Padre.</li>
                      <li>Permisos de ubicación, datos de uso, accesibilidad y VPN local según las funciones autorizadas.</li>
                    </>
                  )}
                </ul>
                <p className="mt-4 text-xs text-muted">La disponibilidad de funciones puede variar según la versión de Android y el fabricante.</p>
              </div>

              <div>
                <h3 className="kicker">Instalación</h3>
                <ol className="mt-5 space-y-3 text-[0.95rem]">
                  {install[a.id].map((s, i) => (
                    <li key={s} className="grid grid-cols-[1.75rem_1fr]">
                      <span className="font-serif text-rose-700">{i + 1}</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ol>
                {a.id === "tracker" && (
                  <p className="mt-5 border-l-2 border-rose pl-4 text-sm text-muted">
                    No instales Vesta Tracker en un dispositivo sin informar a su usuario y sin contar con la autoridad y las autorizaciones
                    legalmente necesarias.
                  </p>
                )}
              </div>

              <div>
                <h3 className="kicker">Historial de versiones</h3>
                <table className="mt-5 w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-wine text-[0.68rem] uppercase tracking-[0.14em] text-muted">
                      <th scope="col" className="py-2 pr-4 font-semibold">Versión</th>
                      <th scope="col" className="py-2 pr-4 font-semibold">Fecha</th>
                      <th scope="col" className="py-2 font-semibold">Notas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {a.releases.map((r) => (
                      <tr key={r.version} className="border-b border-line align-top">
                        <td className="py-3 pr-4 font-medium">
                          {r.version} <span className="text-xs text-muted">({r.versionCode})</span>
                        </td>
                        <td className="py-3 pr-4">{formatDate(r.date) ?? <Pending what="fecha" fallback="—" />}</td>
                        <td className="py-3 text-muted">
                          {r.notes.length ? r.notes.join(" ") : r.versionCode === 1 ? "Versión inicial." : "—"}
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
        <div className="wrap flex flex-col gap-4 text-[0.95rem] md:flex-row md:items-center md:justify-between">
          <p className="text-muted">¿Problemas al instalar o vincular?</p>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            <Link className="link font-semibold" href="/ayuda/#instalacion">
              Ayuda con la instalación
            </Link>
            <Link className="link font-semibold" href="/ayuda/#problemas-de-vinculacion">
              Ayuda con la vinculación
            </Link>
            <Link className="link font-semibold" href="/documentacion/guia-de-usuario/">
              Guía de usuario
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
