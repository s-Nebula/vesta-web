import Link from "next/link";
import { ArrowRight, ArrowLeftRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHead } from "@/components/ui/SectionHead";
import { Device } from "@/components/ui/Device";
import { AppTag } from "@/components/ui/AppTag";
import { Steps } from "@/components/sections/Steps";
import { signInMethods } from "@/content/features";
import { docHref, href, type Locale } from "@/i18n";

const copy = {
  es: {
    title: "Dos aplicaciones que trabajan juntas.",
    lead: "Vesta Padre es la aplicación del adulto responsable y Vesta Tracker se instala en el teléfono del menor. Se vinculan con un código QR y se coordinan a través de los servidores de Vesta.",
    relation: "Cómo se relacionan",
    padreBox: "Crea perfiles y códigos, define reglas, autoriza finalidades, consulta la información y responde peticiones.",
    serverTag: "Servidores de Vesta",
    serverTitle: "Plataforma Vesta",
    serverBox:
      "Autentica cuentas y teléfonos, vincula, guarda perfiles, reglas, alertas e informes, comprueba las autorizaciones y envía las notificaciones.",
    trackerBox: "Recibe reglas y autorizaciones; envía ubicación, estado, informes, alertas y peticiones de las finalidades autorizadas.",
    padreLabel: "Para el tutor",
    padreLead: "Desde aquí, el padre, la madre o el representante legal gestiona la protección digital del menor.",
    signIn: "Acceso con",
    padre: [
      ["Perfiles y vinculación", "Crea y edita perfiles, muestra el QR de vinculación y desvincula teléfonos."],
      ["Ubicación y zonas", "Última posición, hora real de la señal y zonas seguras con aviso de llegada y salida."],
      ["Estado del teléfono", "Batería, conexión, modelo y versión de Android. Alerta si deja de comunicarse."],
      ["Uso de aplicaciones", "Tiempo de pantalla, uso por app, aperturas, PDF y resumen semanal."],
      ["Filtros y búsqueda segura", "Apps y sitios bloqueados o permitidos, búsqueda segura y recomendaciones por edad."],
      ["Modo estudio y límites", "Horarios de estudio y tiempo máximo diario por aplicación."],
      ["Peticiones y alertas", "Notificaciones aunque la app esté cerrada; aprobar o rechazar peticiones con un toque."],
      ["Privacidad", "Consentimiento, finalidades autorizadas y revocación."],
    ],
    shots: [
      ["panel-dispositivos", "Panel"],
      ["vinculacion-qr", "Vinculación por QR"],
      ["ubicacion", "Mapa"],
      ["zonas-seguras", "Zonas seguras"],
      ["modo-estudio", "Modo estudio"],
      ["limites", "Límites de tiempo"],
      ["reportes", "Reportes"],
      ["alertas", "Alertas"],
    ],
    trackerLabel: "Para el teléfono del menor",
    trackerLead: "Envía solo la información autorizada, aplica las reglas y da voz al menor.",
    tracker: [
      ["Vinculación con QR", "Escanea el código de Vesta Padre o acepta el código escrito."],
      ["Ubicación autorizada", "GPS en segundo plano, solo si la finalidad está autorizada. Sin conexión, guarda y envía después."],
      ["Reglas en el teléfono", "Bloqueo de apps, modo estudio y límites (accesibilidad); filtro web y búsqueda segura (VPN local)."],
      ["Botón SOS", "Aviso de emergencia a los tutores con la ubicación del momento."],
      ["Pedir permiso", "Solicita más tiempo o desbloquear una app y ve la respuesta."],
      ["Qué comparte Vesta", "Explica al menor qué se comparte y qué no, y qué está activo."],
    ],
    shotLink: "Vinculación",
    shotActive: "Protección activa",
    howLabel: "Cómo empezar",
    howTitle: "Cinco pasos, dos teléfonos.",
    permLabel: "Requisitos y permisos",
    permTitle: "Qué pide Android y para qué.",
    permLead:
      "Dos teléfonos con Android 7.0 o superior e internet. Cada permiso del sistema se pide para una función concreta y no sustituye la autorización de la finalidad.",
    permHead: ["Permiso de Android", "Aplicación", "Para qué se usa", "Finalidad"],
    perms: [
      ["Ubicación precisa y en segundo plano", "Vesta Tracker", "Obtener la posición y comprobar las zonas seguras aunque la app no esté en pantalla.", "Ubicación e historial"],
      ["Acceso a datos de uso", "Vesta Tracker", "Calcular el tiempo de pantalla y aplicar los límites diarios.", "Estadísticas de uso · Control de aplicaciones"],
      ["Servicio de accesibilidad", "Vesta Tracker", "Bloquear apps, aplicar el modo estudio y los límites, y detectar sitios en el navegador compatible.", "Control de aplicaciones · Filtrado web"],
      ["Conexión VPN local", "Vesta Tracker", "Filtrar sitios, forzar la búsqueda segura y bloquear DNS cifrado. No oculta la IP.", "Filtrado de sitios web"],
      ["Cámara (opcional)", "Vesta Tracker", "Leer el código QR de vinculación. No guarda imágenes.", "—"],
      ["Notificaciones", "Ambas", "Recibir alertas y peticiones, y avisar de que la protección está activa.", "Alertas y eventos"],
    ],
    limitsLabel: "Límites",
    limitsTitle: "Lo que Vesta no puede garantizar.",
    limitsLead: "Lo decimos claro, como en los Términos y condiciones.",
    limitsLink: "Términos, sección 8",
    limits: [
      "Ubicación en tiempo real permanente o precisión absoluta.",
      "Que todas las alertas lleguen al instante.",
      "Bloquear todos los sitios o aplicaciones: algunos navegadores o proveedores de DNS cifrado desconocidos pueden saltarse el filtro.",
      "Funcionar en todos los teléfonos, navegadores o versiones de Android.",
      "Impedir la desinstalación o la manipulación del sistema operativo.",
      "Sustituir a los servicios de emergencia: el botón SOS avisa a la familia, no al 123.",
    ],
    ready: "¿Empezamos?",
    download: "Descargar aplicaciones",
    guide: "Leer la guía de usuario",
  },
  en: {
    title: "Two apps that work together.",
    lead: "Vesta Parent is the responsible adult's app, and Vesta Tracker is installed on the minor's phone. They are linked with a QR code and coordinate through Vesta's servers.",
    relation: "How they relate",
    padreBox: "Creates profiles and codes, sets rules, authorises purposes, views information and answers requests.",
    serverTag: "Vesta servers",
    serverTitle: "Vesta platform",
    serverBox:
      "Authenticates accounts and phones, links them, stores profiles, rules, alerts and reports, checks authorisations and sends notifications.",
    trackerBox: "Receives rules and authorisations; sends location, status, reports, alerts and requests for the authorised purposes.",
    padreLabel: "For the guardian",
    padreLead: "From here, the parent or legal representative manages the minor's digital protection.",
    signIn: "Sign in with",
    padre: [
      ["Profiles and linking", "Create and edit profiles, show the linking QR code and unlink phones."],
      ["Location and zones", "Last position, the real time of the signal, and safe zones with arrival and departure notices."],
      ["Phone status", "Battery, connection, model and Android version. An alert if it stops reporting."],
      ["App usage", "Screen time, usage per app, opens, PDF and a weekly summary."],
      ["Filters and safe search", "Blocked or allowed apps and sites, safe search and age recommendations."],
      ["Study mode and limits", "Study schedules and a daily maximum per app."],
      ["Requests and alerts", "Notifications even when the app is closed; approve or reject requests with one tap."],
      ["Privacy", "Consent, authorised purposes and withdrawal."],
    ],
    shots: [
      ["panel-dispositivos", "Dashboard"],
      ["vinculacion-qr", "QR linking"],
      ["ubicacion", "Map"],
      ["zonas-seguras", "Safe zones"],
      ["modo-estudio", "Study mode"],
      ["limites", "Time limits"],
      ["reportes", "Reports"],
      ["alertas", "Alerts"],
    ],
    trackerLabel: "For the minor's phone",
    trackerLead: "Sends only authorised information, applies the rules and gives the minor a voice.",
    tracker: [
      ["Linking with QR", "Scans the code from Vesta Parent or accepts the typed code."],
      ["Authorised location", "Background GPS, only if the purpose is authorised. When offline, it stores and sends later."],
      ["Rules on the phone", "App blocking, study mode and limits (accessibility); web filter and safe search (local VPN)."],
      ["SOS button", "An emergency alert to the guardians with the current location."],
      ["Ask for permission", "Request more time or to unlock an app, and see the answer."],
      ["What Vesta shares", "Tells the minor what is and is not shared, and what is active."],
    ],
    shotLink: "Linking",
    shotActive: "Protection active",
    howLabel: "Getting started",
    howTitle: "Five steps, two phones.",
    permLabel: "Requirements and permissions",
    permTitle: "What Android asks for, and why.",
    permLead:
      "Two phones with Android 7.0 or later and an Internet connection. Each system permission is requested for a specific feature and does not replace the purpose's authorisation.",
    permHead: ["Android permission", "App", "What it is used for", "Purpose"],
    perms: [
      ["Precise and background location", "Vesta Tracker", "Get the position and check safe zones even when the app is not on screen.", "Location and history"],
      ["Usage access", "Vesta Tracker", "Calculate screen time and apply daily limits.", "Usage statistics · App control"],
      ["Accessibility service", "Vesta Tracker", "Block apps, apply study mode and limits, and detect sites in the compatible browser.", "App control · Website filtering"],
      ["Local VPN connection", "Vesta Tracker", "Filter sites, force safe search and block encrypted DNS. It does not hide your IP.", "Website filtering"],
      ["Camera (optional)", "Vesta Tracker", "Read the linking QR code. No images are stored.", "—"],
      ["Notifications", "Both", "Receive alerts and requests, and show that protection is active.", "Alerts and events"],
    ],
    limitsLabel: "Limits",
    limitsTitle: "What Vesta cannot guarantee.",
    limitsLead: "We say it plainly, as the Terms and Conditions do.",
    limitsLink: "Terms, section 8",
    limits: [
      "Permanent real-time location or absolute accuracy.",
      "That every alert arrives instantly.",
      "Blocking every site or app: some browsers or unknown encrypted DNS providers can bypass the filter.",
      "Working on every phone, browser or Android version.",
      "Preventing uninstallation or tampering with the operating system.",
      "Replacing emergency services: the SOS button alerts the family, not emergency services.",
    ],
    ready: "Shall we start?",
    download: "Download the apps",
    guide: "Read the user guide",
  },
} as const;

export function PlatformView({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <>
      <PageHero kicker={t.relation} title={t.title} lead={t.lead} />

      <section aria-label={t.relation} className="py-20 md:py-28">
        <div className="wrap">
          <div className="grid items-stretch gap-0 border border-line md:grid-cols-[1fr_auto_1fr_auto_1fr]">
            <div className="p-7 md:p-9">
              <AppTag app="padre" locale={locale} />
              <p className="mt-4 text-sm text-muted">{t.padreBox}</p>
            </div>
            <div className="flex items-center justify-center border-y border-line py-4 text-rose-700 md:border-x md:border-y-0 md:px-5">
              <ArrowLeftRight aria-hidden="true" className="size-5 rotate-90 md:rotate-0" />
            </div>
            <div className="bg-wine p-7 text-ivory md:p-9">
              <span className="tag text-rose-300">{t.serverTag}</span>
              <p className="mt-4 font-serif text-2xl">{t.serverTitle}</p>
              <p className="mt-3 text-sm text-ivory/75">{t.serverBox}</p>
            </div>
            <div className="flex items-center justify-center border-y border-line py-4 text-rose-700 md:border-x md:border-y-0 md:px-5">
              <ArrowLeftRight aria-hidden="true" className="size-5 rotate-90 md:rotate-0" />
            </div>
            <div className="p-7 md:p-9">
              <AppTag app="tracker" locale={locale} />
              <p className="mt-4 text-sm text-muted">{t.trackerBox}</p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="vesta-padre" className="border-t border-line bg-paper py-20 md:py-28">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHead kicker={t.padreLabel} id="vesta-padre" title={locale === "es" ? "Vesta Padre" : "Vesta Parent"} lead={t.padreLead} />
            <p className="mt-6 text-sm text-muted">
              {t.signIn}: {signInMethods[locale].join(", ")}.
            </p>
          </div>
          <dl className="border-t border-wine lg:col-span-7">
            {t.padre.map(([k, d]) => (
              <div key={k} className="grid gap-1 border-b border-line py-5 sm:grid-cols-[14rem_1fr] sm:gap-8">
                <dt className="font-serif text-lg leading-snug">{k}</dt>
                <dd className="text-[0.95rem] text-muted">{d}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="wrap mt-16">
          <ul className="no-scrollbar -mx-5 flex snap-x gap-6 overflow-x-auto px-5 pb-4 md:mx-0 md:grid md:grid-cols-4 md:gap-8 md:overflow-visible md:px-0">
            {t.shots.map(([n, c]) => (
              <li key={n} className="w-[58vw] shrink-0 snap-start sm:w-[40vw] md:w-auto">
                <figure>
                  <Device shot={{ src: `/img/padre/${n}`, alt: c, kind: "phone", sizes: [420, 840] }} sizesAttr="(min-width: 48rem) 25vw, 58vw" />
                  <figcaption className="mt-4 text-sm text-muted">{c}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="vesta-tracker" className="py-20 md:py-28">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHead kicker={t.trackerLabel} id="vesta-tracker" title="Vesta Tracker" lead={t.trackerLead} />
          </div>
          <dl className="border-t border-wine lg:col-span-7">
            {t.tracker.map(([k, d]) => (
              <div key={k} className="grid gap-1 border-b border-line py-5 sm:grid-cols-[14rem_1fr] sm:gap-8">
                <dt className="font-serif text-lg leading-snug">{k}</dt>
                <dd className="text-[0.95rem] text-muted">{d}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="wrap mt-16 grid gap-8 md:grid-cols-2">
          <figure>
            <Device shot={{ src: "/img/tracker/vinculacion", alt: t.shotLink, kind: "tablet", sizes: [800, 1600] }} sizesAttr="(min-width: 48rem) 45vw, 90vw" />
            <figcaption className="mt-4 text-sm text-muted">{t.shotLink}</figcaption>
          </figure>
          <figure>
            <Device shot={{ src: "/img/tracker/rastreo-activo", alt: t.shotActive, kind: "tablet", sizes: [800, 1600] }} sizesAttr="(min-width: 48rem) 45vw, 90vw" />
            <figcaption className="mt-4 text-sm text-muted">{t.shotActive}</figcaption>
          </figure>
        </div>
      </section>

      <section aria-labelledby="como-empezar" className="on-dark bg-wine py-20 text-ivory md:py-28">
        <div className="wrap">
          <SectionHead kicker={t.howLabel} id="como-empezar" title={t.howTitle} />
          <div className="mt-16">
            <Steps locale={locale} dark />
          </div>
        </div>
      </section>

      <section aria-labelledby="permisos" className="py-20 md:py-28">
        <div className="wrap">
          <SectionHead kicker={t.permLabel} id="permisos" title={t.permTitle} lead={t.permLead} />
          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-wine text-sm text-muted">
                  {t.permHead.map((h) => (
                    <th key={h} scope="col" className="py-3 pr-6 font-semibold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {t.perms.map(([p, a, u, f]) => (
                  <tr key={p} className="border-b border-line align-top">
                    <th scope="row" className="py-4 pr-6 font-serif text-base font-medium">
                      {p}
                    </th>
                    <td className="whitespace-nowrap py-4 pr-6">{a}</td>
                    <td className="py-4 pr-6 text-muted">{u}</td>
                    <td className="py-4">{f}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section aria-labelledby="limites" className="border-t border-line bg-paper py-20 md:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHead kicker={t.limitsLabel} id="limites" title={t.limitsTitle} />
            <p className="lead mt-6">{t.limitsLead}</p>
            <Link href={docHref(locale, "terms", locale === "es" ? "8-limitaciones-del-servicio" : "8-service-limitations")} className="arrow-link mt-8">
              {t.limitsLink} <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
          <ul className="border-t border-wine lg:col-span-7">
            {t.limits.map((l) => (
              <li key={l} className="flex gap-5 border-b border-line py-5 text-[0.98rem]">
                <span aria-hidden="true" className="mt-[0.75em] h-px w-4 shrink-0 bg-rose" />
                {l}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20">
        <div className="wrap flex flex-col items-start justify-between gap-8 border-t border-wine pt-10 md:flex-row md:items-center">
          <p className="font-serif text-3xl leading-tight md:text-4xl">{t.ready}</p>
          <div className="flex flex-wrap gap-6">
            <Link href={href(locale, "downloads")} className="btn btn-primary">
              {t.download}
            </Link>
            <Link href={docHref(locale, "guide")} className="btn btn-ghost">
              {t.guide}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
