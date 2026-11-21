import Link from "next/link";
import { ArrowRight, ArrowDownToLine } from "lucide-react";
import { Arc } from "@/components/brand/Logo";
import { Device } from "@/components/ui/Device";
import { AppTag } from "@/components/ui/AppTag";
import { SectionHead } from "@/components/ui/SectionHead";
import { Faq } from "@/components/ui/Faq";
import { Steps } from "@/components/sections/Steps";
import { PurposeList } from "@/components/sections/PurposeList";
import { DownloadPanel } from "@/components/sections/DownloadPanel";
import { features } from "@/content/features";
import { apps } from "@/content/downloads";
import { faq } from "@/content/help";
import { mission, vision } from "@/content/institutional";
import { pageMeta, JsonLd } from "@/lib/seo";
import { organizationSchema, appsSchema } from "@/lib/schema";
import { site } from "@/content/site";

export const metadata = {
  ...pageMeta({
    title: "Protección digital familiar para Android",
    description: site.description,
    path: "/",
  }),
  title: { absolute: "Vesta Security · Protección digital familiar para Android" },
};

const padreFunctions = [
  "Administración de dispositivos vinculados",
  "Consulta de la ubicación autorizada",
  "Estado e información del dispositivo",
  "Estadísticas de uso e informes en PDF",
  "Filtros de aplicaciones y dominios",
  "Recepción y consulta de alertas",
  "Gestión de autorizaciones de privacidad",
];

const trackerFunctions = [
  "Vinculación con Vesta Padre mediante código",
  "Envío de la ubicación, si está autorizada",
  "Reporte de batería, conexión y datos del equipo",
  "Informes de uso de aplicaciones",
  "Aplicación de las reglas de bloqueo",
  "Comprobación periódica de las autorizaciones",
];

const facts = [
  ["Plataforma", "Android 7.0 o superior"],
  ["Aplicaciones", "Vesta Padre y Vesta Tracker"],
  ["Finalidades", "6, autorizables por separado"],
  ["Código fuente", "Abierto, licencia GPL v3"],
  ["Documentos", "Versión 1.0 · 20 nov. 2026"],
];

export default function Home() {
  return (
    <>
      <JsonLd data={organizationSchema} />
      {appsSchema.map((s) => (
        <JsonLd key={s.name} data={s} />
      ))}

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="wrap grid items-center gap-14 pb-16 pt-12 md:pt-16 lg:grid-cols-12 lg:gap-8 lg:pb-24 lg:pt-20">
          <div className="lg:col-span-6">
            <p className="kicker flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-current" />
              Protección digital familiar · Android
            </p>
            <h1 className="display mt-7 !text-[clamp(2.5rem,1.3rem+4vw,4.45rem)]">
              Acompaña la vida digital de tus hijos, con reglas claras y <em className="font-[430] italic text-rose-700">autorizaciones</em> que
              tú decides.
            </h1>
            <p className="lead mt-8 max-w-xl">
              Vesta Security une dos aplicaciones: <strong className="font-semibold text-ink">Vesta Padre</strong>, para el adulto
              responsable, y <strong className="font-semibold text-ink">Vesta Tracker</strong>, para el dispositivo del menor. Ubicación,
              estado del equipo, uso de aplicaciones, filtros y alertas, activados finalidad por finalidad.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
              <Link href="/descargas/" className="btn btn-primary">
                <ArrowDownToLine aria-hidden="true" className="size-4" />
                Descargar aplicaciones
              </Link>
              <Link href="/plataforma/" className="arrow-link">
                Conocer la plataforma <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
          </div>

          {/* Composición: teléfono del tutor + tableta del menor, unidos por el arco de la marca */}
          <div className="relative lg:col-span-6">
            <div className="relative mx-auto aspect-[1.02] w-full max-w-[36rem]">
              <figure className="absolute right-0 top-[3%] z-10 w-[71%]">
                <Device
                  priority
                  shot={{ src: "/img/tracker/rastreo-activo", alt: "Vesta Tracker en una tableta mostrando Rastreo activo, la última señal y las estadísticas habilitadas", kind: "tablet", sizes: [800, 1600] }}
                  sizesAttr="(min-width: 64rem) 430px, 75vw"
                />
                <figcaption className="mt-3 hidden items-center justify-end gap-2 text-[0.66rem] sm:flex font-semibold uppercase tracking-[0.14em] text-rose-700 sm:text-[0.7rem]">
                  <span aria-hidden="true" className="h-px w-6 bg-current" /> Vesta Tracker · dispositivo del menor
                </figcaption>
              </figure>
              <Arc className="absolute -bottom-[3%] left-[6%] w-[94%]" />
              <figure className="absolute bottom-[4%] left-[4%] z-10 w-[30%]">
                <Device
                  priority
                  shot={{ src: "/img/padre/panel-dispositivos", alt: "Panel de control de Vesta Padre con un dispositivo vinculado", kind: "phone", sizes: [420, 840] }}
                  sizesAttr="(min-width: 64rem) 190px, 33vw"
                />
              </figure>
              <p className="absolute bottom-[30%] left-[38%] z-10 hidden items-center sm:flex gap-2 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-wine sm:text-[0.7rem]">
                <span aria-hidden="true" className="h-px w-6 bg-current" /> Vesta Padre · teléfono del tutor
              </p>
            </div>
            <p className="mt-5 text-center text-xs text-muted sm:hidden">Vesta Padre en el teléfono del tutor y Vesta Tracker en el dispositivo del menor. Capturas reales.</p>
          </div>
        </div>

        {/* Datos verificados */}
        <div className="wrap">
          <dl className="grid grid-cols-2 border-y border-line md:grid-cols-5">
            {facts.map(([k, v], i) => (
              <div
                key={k}
                className={`py-5 pr-4 ${i > 0 ? "md:border-l md:border-line md:pl-5" : ""} ${i % 2 === 1 ? "border-l border-line pl-4 md:pl-5" : ""} ${i >= 2 ? "border-t border-line md:border-t-0" : ""}`}
              >
                <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted">{k}</dt>
                <dd className="mt-1.5 font-serif text-[1.05rem] leading-snug text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 01 · QUÉ ES VESTA */}
      <section aria-labelledby="que-es" className="py-24 md:py-32">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <p className="kicker">01 — Qué es Vesta</p>
          </div>
          <div className="lg:col-span-9">
            <h2 id="que-es" className="h-section max-w-4xl">
              Una plataforma para supervisar con responsabilidad el entorno digital de niños, niñas y adolescentes.
            </h2>
            <div className="mt-14 grid gap-12 md:grid-cols-2 md:gap-16">
              <div className="reveal border-t border-wine pt-6">
                <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.12em] text-wine">El problema</h3>
                <p className="mt-4 text-[1.02rem] leading-relaxed text-muted">
                  Los menores tienen acceso a un teléfono cada vez más pronto. Las familias necesitan saber si el dispositivo está activo, dónde
                  se encuentra, cuánto tiempo se usa y qué aplicaciones o sitios conviene limitar, sin recurrir a herramientas opacas que
                  recopilan más de lo necesario.
                </p>
              </div>
              <div className="reveal border-t border-wine pt-6">
                <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.12em] text-wine">Cómo ayuda Vesta</h3>
                <p className="mt-4 text-[1.02rem] leading-relaxed text-muted">
                  El tutor gestiona todo desde su propio teléfono. En el dispositivo del menor, Vesta Tracker solo envía la información de las
                  finalidades autorizadas y aplica las reglas configuradas. Cada función se explica antes de activarse y se puede retirar.
                </p>
              </div>
            </div>
            <blockquote className="reveal mt-16 border-l-2 border-rose pl-6 md:pl-8">
              <p className="font-serif text-2xl italic leading-snug text-wine md:text-[1.9rem]">
                «Vesta no sustituye el acompañamiento familiar, la educación digital ni la atención de emergencias.»
              </p>
              <footer className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                Guía de usuario de Vesta, versión 1.0
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* 02 · LA PLATAFORMA */}
      <section aria-labelledby="plataforma" className="on-dark relative overflow-hidden bg-wine text-ivory">
        <div className="wrap py-24 md:py-32">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="kicker">02 — La plataforma</p>
              <h2 id="plataforma" className="h-section mt-5">
                Dos aplicaciones, un mismo acuerdo familiar.
              </h2>
            </div>
            <p className="lead lg:col-span-5 lg:self-end">
              Vesta Padre decide y consulta. Vesta Tracker informa y aplica. Entre ambas solo circula lo que el tutor ha autorizado.
            </p>
          </div>

          <div className="mt-16 grid gap-16 lg:grid-cols-[1fr_auto_1fr] lg:gap-10">
            {/* Padre */}
            <div className="grid gap-8 sm:grid-cols-[minmax(0,13rem)_1fr] sm:items-start">
              <Device
                shot={{ src: "/img/padre/estado-dispositivo", alt: "Estado del dispositivo en Vesta Padre", kind: "phone", sizes: [420, 840] }}
                className="mx-auto w-[60%] max-w-[13rem] sm:w-full"
                sizesAttr="(min-width: 40rem) 208px, 60vw"
              />
              <div>
                <AppTag app="padre" className="!text-ivory/85" />
                <h3 className="mt-4 font-serif text-3xl">Vesta Padre</h3>
                <p className="mt-2 text-sm text-ivory/70">En el teléfono del padre, la madre o el tutor.</p>
                <ul className="mt-6 space-y-2.5 text-[0.92rem]">
                  {padreFunctions.map((f) => (
                    <li key={f} className="flex gap-3">
                      <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-rose-300" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Intercambio */}
            <div className="flex flex-row items-stretch justify-center gap-4 lg:flex-col lg:items-center lg:px-2" aria-label="Qué circula entre las aplicaciones">
              <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center lg:flex-none">
                <span className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-rose-300">Hacia Tracker</span>
                <span className="text-xs leading-relaxed text-ivory/75">
                  Código de vinculación
                  <br />
                  Autorizaciones
                  <br />
                  Reglas de filtrado
                </span>
              </div>
              <span aria-hidden="true" className="w-px bg-ivory/25 lg:h-24 lg:w-px" />
              <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center lg:flex-none">
                <span className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-rose-300">Hacia Padre</span>
                <span className="text-xs leading-relaxed text-ivory/75">
                  Ubicación · Estado
                  <br />
                  Informes de uso
                  <br />
                  Alertas
                </span>
              </div>
            </div>

            {/* Tracker */}
            <div>
              <Device
                shot={{ src: "/img/tracker/vinculacion", alt: "Pantalla Vincular dispositivo de Vesta Tracker", kind: "tablet", sizes: [800, 1600] }}
                sizesAttr="(min-width: 64rem) 480px, 90vw"
              />
              <div className="mt-8">
                <AppTag app="tracker" className="!text-rose-300" />
                <h3 className="mt-4 font-serif text-3xl">Vesta Tracker</h3>
                <p className="mt-2 text-sm text-ivory/70">En el teléfono o la tableta del menor.</p>
                <ul className="mt-6 grid gap-x-6 gap-y-2.5 text-[0.92rem] sm:grid-cols-2">
                  {trackerFunctions.map((f) => (
                    <li key={f} className="flex gap-3">
                      <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-rose-300" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <Link href="/plataforma/" className="arrow-link mt-16">
            Ver la plataforma en detalle <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </section>

      {/* 03 · CÓMO FUNCIONA */}
      <section aria-labelledby="como-funciona" className="py-24 md:py-32">
        <div className="wrap">
          <SectionHead
            kicker="03 — Cómo funciona"
            id="como-funciona"
            title="De la instalación a la primera consulta, en seis pasos."
            lead="Cinco pasos ocurren en Vesta Padre. Uno, la vinculación, se completa en el dispositivo del menor con el código que genera el tutor."
          />
          <div className="mt-16">
            <Steps />
          </div>
        </div>
      </section>

      {/* 04 · FUNCIONALIDADES */}
      <section aria-labelledby="funciones" className="border-t border-line bg-paper py-24 md:py-32">
        <div className="wrap grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionHead kicker="04 — Funcionalidades" id="funciones" title="Lo que Vesta hace hoy." />
              <p className="lead mt-6">Solo funciones verificadas en la versión actual de las aplicaciones, con sus límites explicados.</p>
              <Device
                shot={{ src: "/img/padre/reportes", alt: "Pantalla de reportes de actividad en Vesta Padre", kind: "phone", sizes: [420, 840] }}
                className="mt-12 hidden w-[13.5rem] lg:block"
                sizesAttr="216px"
              />
            </div>
          </div>
          <ol className="border-t border-wine lg:col-span-8">
            {features.map((f) => (
              <li key={f.id} className="border-b border-line">
                <Link href={`/funcionalidades/#${f.id}`} className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 py-6 md:grid-cols-[3.5rem_1fr_auto] md:py-7">
                  <span className="font-sans text-xs font-semibold text-rose-700">{f.index}</span>
                  <span>
                    <span className="block font-serif text-[1.45rem] leading-tight transition-colors group-hover:text-rose-700 md:text-[1.7rem]">
                      {f.title}
                    </span>
                    <span className="mt-1.5 block text-[0.92rem] text-muted">{f.short}</span>
                  </span>
                  <ArrowRight aria-hidden="true" className="size-5 text-wine transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 05 · PRIVACIDAD */}
      <section aria-labelledby="privacidad" className="py-24 md:py-32">
        <div className="wrap grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHead
              kicker="05 — Privacidad y protección"
              id="privacidad"
              title="Primero la autorización. Después, los datos."
              lead="Conceder un permiso de Android no basta: el tratamiento de los datos del menor requiere la autorización de su representante legal, finalidad por finalidad."
            />
            <dl className="mt-12 space-y-7">
              {[
                ["Consentimiento informado", "Antes de usar el panel, el tutor acepta los documentos vigentes, declara su representación legal e indica si el menor fue informado y escuchado."],
                ["Control de las autorizaciones", "Seis finalidades independientes y opcionales. Si una no está autorizada, Vesta Tracker no recopila esa información."],
                ["Transparencia", "Términos, política de privacidad y guía publicados completos, con versión y fecha. Código fuente abierto."],
                ["Plazos definidos", "El historial de ubicación y los informes de uso se conservan 90 días; las alertas, 12 meses."],
                ["Consulta y revocación", "Cada autorización se revoca desde Vesta Padre. Los titulares pueden consultar, corregir o pedir la supresión de sus datos."],
              ].map(([t, d]) => (
                <div key={t} className="grid gap-1 sm:grid-cols-[12rem_1fr] sm:gap-6">
                  <dt className="font-sans text-sm font-semibold text-wine">{t}</dt>
                  <dd className="text-[0.95rem] text-muted">{d}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4">
              <Link href="/documentacion/politica-de-privacidad/" className="arrow-link">
                Leer la política de privacidad <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
              <Link href="/documentacion/" className="arrow-link">
                Centro de documentación <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 lg:pt-24">
            <PurposeList />
          </div>
        </div>
      </section>

      {/* 06 · MISIÓN Y VISIÓN */}
      <section aria-labelledby="mision" className="relative overflow-hidden border-y border-line bg-beige-100">
        <Arc className="pointer-events-none absolute -right-24 -top-10 w-[40rem]" color="#D6B7A6" inner="#EFE4DD" />
        <div className="wrap relative py-24 md:py-32">
          <p className="kicker">06 — Misión y visión</p>
          <h2 id="mision" className="sr-only">
            Misión y visión
          </h2>
          <div className="mt-12 grid gap-14 md:grid-cols-2 md:gap-20">
            {[mission, vision].map((m) => (
              <div key={m.label} className="reveal">
                <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.16em] text-wine">{m.label}</h3>
                <p className="mt-5 font-serif text-[1.55rem] leading-[1.35] text-ink md:text-[1.85rem]">{m.text}</p>
              </div>
            ))}
          </div>
          <Link href="/mision-y-vision/" className="arrow-link mt-14">
            Nuestros valores y compromisos <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </section>

      {/* 07 · DESCARGAS */}
      <section aria-labelledby="descargas" className="py-24 md:py-32">
        <div className="wrap">
          <SectionHead
            kicker="07 — Descarga"
            id="descargas"
            title="Vesta Padre y Vesta Tracker."
            lead="Vesta se distribuye para Android como archivos APK. Revisa los requisitos antes de instalar."
          />
          <div className="mt-16 grid gap-16 lg:grid-cols-2 lg:gap-0">
            {apps.map((a, i) => (
              <div key={a.id} className={i === 1 ? "border-t border-line pt-16 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0" : "lg:pr-16"}>
                <DownloadPanel app={a} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 08 · PREGUNTAS FRECUENTES */}
      <section aria-labelledby="faq" className="border-t border-line bg-paper py-24 md:py-32">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHead kicker="08 — Preguntas frecuentes" id="faq" title="Antes de empezar." />
            <p className="mt-6 text-[0.95rem] text-muted">
              ¿No encuentras tu respuesta? Consulta el{" "}
              <Link href="/ayuda/" className="link">
                Centro de ayuda
              </Link>
              .
            </p>
          </div>
          <div className="lg:col-span-8">
            <Faq items={faq} />
          </div>
        </div>
      </section>
    </>
  );
}
