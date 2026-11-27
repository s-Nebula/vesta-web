import Link from "next/link";
import { ArrowRight, ArrowUpRight, Download } from "lucide-react";
import { Head, securityMeta } from "@/components/security/parts";
import { JsonLd } from "@/lib/seo";
import { allPosts, formatDate } from "@/lib/blog";
import { site, company } from "@/content/site";
import { nebulaPdf } from "@/content/apps";

export const metadata = securityMeta(
  "Nebula PDF · Traduce libros de ciberseguridad sin romper los comandos",
  "App para Android que traduce PDF del inglés al español conservando el diseño. Deja en inglés exploits, payloads, comandos y nombres de herramientas. Traducción en el teléfono.",
  "/aplicaciones/nebula-pdf/",
);

const BLUE = "#6CB3FF";

const features: [string, string][] = [
  ["Mismo diseño", "El texto traducido se escribe en la misma posición, con el mismo tamaño, color y tipo de letra aproximado. Imágenes, gráficos y fondos no se tocan."],
  ["Modo ciberseguridad", "Un glosario editable con más de 200 términos (exploit, payload, reverse shell, Burp Suite, Mimikatz…) que nunca se traducen."],
  ["Código intacto", "Los bloques en letra monoespaciada, las líneas de comandos y el código fuente se copian tal cual."],
  ["Detección automática", "Se conservan IPs, URLs, correos, rutas de Unix y Windows, claves de registro, CVE/CWE, técnicas MITRE ATT&CK, opciones de comandos, siglas, hashes y nombres de funciones."],
  ["Libros largos", "La traducción corre en segundo plano con una notificación de progreso. Puedes cerrar la app o apagar la pantalla."],
  ["PDF escaneados", "Si una página es solo imagen, la app reconoce el texto (OCR) y escribe la traducción encima."],
];

const steps: [string, string][] = [
  ["Análisis de cada página", "Se leen los glifos con su posición, tamaño, fuente y color, y se agrupan en párrafos, títulos, celdas, listas y bloques de código. Se detectan columnas y sangrías."],
  ["Protección de términos", "Antes de traducir, los términos técnicos se cambian por marcadores {{0}}, {{1}}… que el traductor no toca, y luego se restauran. El código no pasa por el traductor."],
  ["Traducción en el teléfono", "Cada bloque se traduce con Google ML Kit en el dispositivo. Solo se descarga una vez el modelo de idioma, de unos 30 MB."],
  ["Reescritura de la página", "Se borra solo el texto original, sin tocar imágenes ni gráficos, y la traducción se escribe en el mismo lugar."],
];

const limits = [
  "La traducción automática es buena pero no perfecta: revisa el resultado en textos legales o para publicar.",
  "El texto traducido usa fuentes estándar (Helvetica, Times y Courier), así que el aspecto es parecido pero no idéntico.",
  "Si una página tiene poco espacio libre, la letra traducida puede quedar algo más pequeña.",
  "Las páginas giradas se dejan sin traducir y los PDF con contraseña de apertura no se pueden abrir.",
];

/** Vista de la app, con su estilo de escritorio clásico. */
function RetroWindow() {
  return (
    <figure className="mx-auto w-full max-w-[26rem] select-none">
      <div className="overflow-hidden rounded-t-lg border border-[#0831d9] bg-[#ece9d8] font-[Tahoma,Verdana,sans-serif] text-[13px] text-black shadow-2xl shadow-black/60">
        <div className="flex items-center justify-between bg-gradient-to-b from-[#3b8bf5] via-[#1f60d8] to-[#1847b9] px-2 py-1.5 text-white">
          <span className="flex items-center gap-1.5 font-bold [text-shadow:1px_1px_#0a246a]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/nebula_pdf_icon.svg" alt="" width={16} height={16} className="size-4" /> Nebula PDF
          </span>
          <span aria-hidden="true" className="flex gap-0.5">
            {["_", "□", "×"].map((c, i) => (
              <span key={c} className={`flex size-[21px] items-center justify-center rounded-[3px] border border-white/70 text-[12px] font-bold ${i === 2 ? "bg-[#e04b28]" : "bg-[#2c6ef0]"}`}>
                {c}
              </span>
            ))}
          </span>
        </div>
        <div className="space-y-3 p-4">
          <fieldset className="border border-[#a0a0a0] px-3 pb-3 pt-1">
            <legend className="px-1">Documento</legend>
            <div className="flex items-center gap-2">
              <span className="flex-1 truncate border border-[#7f9db9] bg-white px-1.5 py-1">manual-de-pentesting-web.pdf</span>
              <span className="rounded-[3px] border border-[#003c74] bg-gradient-to-b from-white to-[#e3e0d1] px-2.5 py-1">Examinar…</span>
            </div>
          </fieldset>
          <fieldset className="space-y-1.5 border border-[#a0a0a0] px-3 pb-3 pt-1">
            <legend className="px-1">Opciones</legend>
            {[
              ["Conservar términos técnicos en inglés", true],
              ["Reconocer texto en páginas escaneadas (OCR)", true],
            ].map(([l, c]) => (
              <p key={String(l)} className="flex items-center gap-2">
                <span className="flex size-[13px] items-center justify-center border border-[#1c5180] bg-white text-[10px] leading-none">{c ? "✓" : ""}</span>
                {l}
              </p>
            ))}
          </fieldset>
          <div>
            <p className="mb-1">Traduciendo página 142 de 527…</p>
            <div className="h-[18px] border border-[#7f9db9] bg-white p-[2px]">
              <div className="h-full w-[27%] bg-[repeating-linear-gradient(90deg,#2fb22f_0_8px,transparent_8px_10px)]" />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <span className="rounded-[3px] border border-[#003c74] bg-gradient-to-b from-white to-[#e3e0d1] px-4 py-1">Cancelar</span>
            <span className="rounded-[3px] border border-[#003c74] bg-gradient-to-b from-white to-[#e3e0d1] px-4 py-1 font-bold">Traducir</span>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-[0.8rem] text-dim">La interfaz de Nebula PDF tiene estilo de escritorio clásico. Recreación.</figcaption>
    </figure>
  );
}

/** Antes y después: lo que se traduce y lo que no. */
function BeforeAfter() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="sx-panel p-6">
        <p className="sx-label !text-mist">Original</p>
        <p className="mt-4 leading-relaxed">
          Start a listener with <code className="sx-mono text-violet-200">nc -lvnp 4444</code> and send the <b>reverse shell</b> payload through the vulnerable
          parameter. Then use <b>Mimikatz</b> to dump the hashes.
        </p>
      </div>
      <div className="sx-panel p-6" style={{ borderColor: `${BLUE}55` }}>
        <p className="sx-label" style={{ color: BLUE }}>
          Nebula PDF
        </p>
        <p className="mt-4 leading-relaxed">
          Inicia un listener con <code className="sx-mono text-violet-200">nc -lvnp 4444</code> y envía el <b style={{ color: BLUE }}>payload</b> de{" "}
          <b style={{ color: BLUE }}>reverse shell</b> por el parámetro vulnerable. Luego usa <b style={{ color: BLUE }}>Mimikatz</b> para extraer los{" "}
          <b style={{ color: BLUE }}>hashes</b>.
        </p>
      </div>
      <p className="text-[0.82rem] text-dim md:col-span-2">
        En azul, lo que el glosario deja en inglés. El comando se copia tal cual. Ejemplo ilustrativo; la traducción real depende del modelo de ML Kit.
      </p>
    </div>
  );
}

export default function Page() {
  const posts = allPosts().filter((p) => p.app === "nebula-pdf");
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Nebula PDF",
          operatingSystem: "Android 8.0+",
          applicationCategory: "UtilitiesApplication",
          softwareVersion: nebulaPdf.version,
          downloadUrl: `${site.url}${nebulaPdf.apk}`,
          offers: { "@type": "Offer", price: 0, priceCurrency: "COP" },
          publisher: { "@type": "Organization", name: company.legalName, url: site.url },
        }}
      />

      {/* Portada */}
      <section className="relative overflow-hidden border-b border-night-600">
        <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-0 size-[38rem] rounded-full blur-3xl" style={{ background: `${BLUE}14` }} />
        <div className="sx-wrap relative grid items-center gap-14 pb-16 pt-16 md:pb-24 md:pt-20 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="flex flex-wrap items-center gap-2">
              <span className="sx-chip" style={{ borderColor: `${BLUE}66`, color: BLUE }}>
                Aplicaciones · Traductor de PDF
              </span>
              {nebulaPdf.beta && <span className="sx-chip">Beta</span>}
            </p>
            <h1 className="sx-display mt-7">
              Traduce libros de hacking <span className="sx-em">sin romper los comandos.</span>
            </h1>
            <p className="sx-lead mt-7 max-w-xl">
              Nebula PDF toma un PDF en inglés (un artículo, un manual o un libro entero) y genera el mismo PDF en español: mismas páginas, mismas
              imágenes y tablas. Los exploits, los payloads y los nombres de herramientas se quedan en inglés, como deben estar.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#descargar" className="sx-btn text-night-950" style={{ background: BLUE }}>
                <Download aria-hidden="true" className="size-4" /> Descargar para Android
              </a>
              <a href={nebulaPdf.repo} target="_blank" rel="noopener noreferrer" className="sx-btn sx-btn-ghost">
                Código en GitHub <ArrowUpRight aria-hidden="true" className="size-4" />
              </a>
            </div>
          </div>
          <div className="lg:col-span-5">
            <RetroWindow />
          </div>
        </div>
      </section>

      {/* Antes / después */}
      <section className="py-20 md:py-24">
        <div className="sx-wrap">
          <Head
            label="Modo ciberseguridad"
            title={
              <>
                Lo técnico se queda <span className="sx-em">en inglés.</span>
              </>
            }
            lead="Un traductor normal convierte «reverse shell» en «concha inversa» y rompe los comandos. Nebula PDF los protege antes de traducir."
          />
          <div className="mt-12">
            <BeforeAfter />
          </div>
        </div>
      </section>

      {/* Características */}
      <section className="border-y border-night-600 bg-night-950/60 py-20 md:py-24">
        <div className="sx-wrap">
          <Head label="Qué hace" title="Pensado para libros técnicos." />
          <dl className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map(([t, d]) => (
              <div key={t} className="sx-panel p-6">
                <dt className="sx-h3 !text-[1.15rem]" style={{ color: t === "Modo ciberseguridad" ? BLUE : undefined }}>
                  {t}
                </dt>
                <dd className="mt-2 text-[0.93rem] leading-relaxed text-mist">{d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="py-20 md:py-24">
        <div className="sx-wrap grid gap-14 lg:grid-cols-12">
          <Head
            className="lg:col-span-5"
            label="Por dentro"
            title={
              <>
                Tu PDF <span className="sx-em">nunca sale</span> del teléfono.
              </>
            }
            lead="La traducción y el OCR se hacen en el dispositivo. La app solo usa internet una vez, para descargar el modelo de idioma inglés-español."
          />
          <ol className="lg:col-span-7">
            {steps.map(([t, d], i) => (
              <li key={t} className="grid grid-cols-[3.2rem_1fr] gap-4 border-t border-night-600 py-6 last:border-b">
                <span className="sx-mono pt-1 text-sm" style={{ color: BLUE }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-[1.1rem] font-semibold tracking-[-0.015em]">{t}</h3>
                  <p className="mt-1 text-mist">{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Descargar */}
      <section id="descargar" className="scroll-mt-24 pb-20 md:pb-24">
        <div className="sx-wrap grid gap-5 lg:grid-cols-12">
          <div className="sx-panel p-8 md:p-10 lg:col-span-7" style={{ borderColor: `${BLUE}55` }}>
            <p className="sx-label" style={{ color: BLUE }}>
              Descargar
            </p>
            <h2 className="sx-h2 mt-4">Nebula PDF {nebulaPdf.version}</h2>
            <p className="mt-3 text-mist">
              Android 8.0 o superior · APK de {nebulaPdf.sizeMb} MB · Gratis · Publicada el {formatDate(nebulaPdf.date)}
            </p>
            <a href={nebulaPdf.apk} className="sx-btn mt-7 text-night-950" style={{ background: BLUE }}>
              <Download aria-hidden="true" className="size-4" /> Descargar APK
            </a>
            <p className="sx-mono mt-6 text-[0.72rem] text-dim">SHA-256</p>
            <p className="sx-mono mt-1 break-all text-[0.78rem] text-mist">{nebulaPdf.sha256}</p>
            {nebulaPdf.beta && (
              <p className="mt-6 border-l pl-4 text-[0.88rem] text-mist" style={{ borderColor: BLUE }}>
                Versión beta: es una compilación de pruebas, todavía no la versión firmada de publicación. Android te pedirá permitir la instalación de
                apps de origen desconocido.
              </p>
            )}
          </div>
          <div className="sx-panel p-8 md:p-10 lg:col-span-5">
            <p className="sx-label !text-mist">Limitaciones conocidas</p>
            <ul className="mt-5 space-y-3 text-[0.92rem] leading-relaxed text-mist">
              {limits.map((l) => (
                <li key={l} className="flex gap-3">
                  <span aria-hidden="true" className="sx-mono text-xs" style={{ color: BLUE }}>
                    !
                  </span>
                  {l}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Artículos */}
      <section className="border-t border-night-600 py-20 md:py-24">
        <div className="sx-wrap">
          <Head
            label="Blog de Nebula PDF"
            title={
              <>
                Novedades y <span className="sx-em">guías.</span>
              </>
            }
          />
          {posts.length === 0 ? (
            <p className="mt-8 text-mist">Pronto habrá artículos.</p>
          ) : (
            <ul className="mt-12 grid gap-4 md:grid-cols-2">
              {posts.map((p) => (
                <li key={p.slug}>
                  <Link href={`/blog/${p.slug}/`} className="sx-panel group flex h-full flex-col p-7 transition-colors hover:border-night-500">
                    <p className="sx-mono text-[0.72rem] text-dim">
                      {formatDate(p.date)} · {p.minutes} min
                    </p>
                    <h3 className="mt-3 text-[1.3rem] font-medium leading-snug tracking-[-0.025em]">{p.title}</h3>
                    <p className="mt-3 flex-1 text-[0.93rem] leading-relaxed text-mist">{p.description}</p>
                    <span className="sx-arrow mt-5" style={{ color: BLUE }}>
                      Leer <ArrowRight aria-hidden="true" className="size-4" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
