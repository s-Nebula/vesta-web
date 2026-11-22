import Link from "next/link";
import { ArrowRight, ArrowDownToLine } from "lucide-react";
import { Device } from "@/components/ui/Device";
import { AppTag } from "@/components/ui/AppTag";
import { SectionHead } from "@/components/ui/SectionHead";
import { Faq } from "@/components/ui/Faq";
import { Steps } from "@/components/sections/Steps";
import { PurposeList } from "@/components/sections/PurposeList";
import { DownloadPanel } from "@/components/sections/DownloadPanel";
import { featuresFor } from "@/content/features";
import { apps } from "@/content/downloads";
import { faqFor } from "@/content/help";
import { institutionalFor } from "@/content/institutional";
import { JsonLd } from "@/lib/seo";
import { organizationSchema, appsSchema } from "@/lib/schema";
import { docHref, href, type Locale } from "@/i18n";

const copy = {
  es: {
    eyebrow: "Para familias con hijos en Android",
    title: "Saber que tu hijo está bien, sin tener que espiar su teléfono.",
    lead: (
      <>
        Vesta son dos aplicaciones: <strong className="font-semibold text-ink">Vesta Padre</strong>, en tu teléfono, y{" "}
        <strong className="font-semibold text-ink">Vesta Tracker</strong>, en el suyo. Ubicación y zonas seguras, botón SOS, modo estudio,
        límites de tiempo y filtros web. Tú decides qué se activa y tu hijo puede ver qué se comparte.
      </>
    ),
    cta: "Descargar aplicaciones",
    more: "Cómo funciona",
    shotTracker: "Vesta Tracker en el dispositivo del menor",
    shotPadre: "Panel de control de Vesta Padre",
    shotsNote: "Vesta Padre en el teléfono del tutor y Vesta Tracker en el del menor. Capturas reales.",
    facts: [
      ["Plataforma", "Android 7.0 o superior"],
      ["Aplicaciones", "Vesta Padre y Vesta Tracker"],
      ["Autorizaciones", "6 finalidades, una a una"],
      ["Idiomas", "Español e inglés"],
      ["Documentos", "Versión 1.1 · 22 nov. 2026"],
    ],
    whatLabel: "Qué es Vesta",
    whatTitle: "Una forma de cuidar el teléfono de tu hijo que él también entiende.",
    problemTitle: "Lo que vemos en casa",
    problem:
      "Los niños tienen teléfono cada vez antes. Queremos saber si llegaron al colegio, cuánto rato pasan en cada aplicación o si alguna no es para su edad. Muchas herramientas lo resuelven recopilando todo, en silencio.",
    helpTitle: "Lo que hace Vesta",
    help:
      "Solo activa lo que autorizas, explica cada función antes de usarla y deja que tu hijo vea qué se comparte, pida permiso o más tiempo, y avise si necesita ayuda. Si quitas una autorización, esa función se apaga.",
    note: "Vesta no sustituye la conversación en familia ni los servicios de emergencia.",
    platformLabel: "La plataforma",
    platformTitle: "Una app para ti, otra para tu hijo.",
    platformLead: "Vesta Padre decide y consulta. Vesta Tracker informa y aplica las reglas, incluso sin conexión.",
    padreWhere: "En el teléfono del padre, la madre o el tutor.",
    trackerWhere: "En el teléfono o la tableta del menor.",
    padre: [
      "Ubicación, historial y zonas seguras",
      "Estado del teléfono y aviso si deja de conectar",
      "Uso de aplicaciones, informes en PDF y resumen semanal",
      "Filtros web, búsqueda segura y bloqueo de apps",
      "Modo estudio y límites de tiempo",
      "Respuesta a las peticiones del menor",
      "Autorizaciones de privacidad",
    ],
    tracker: [
      "Vinculación escaneando un código QR",
      "Botón SOS con ubicación",
      "Pedir permiso o más tiempo",
      "«Qué comparte Vesta»",
      "Reglas aplicadas sin conexión",
      "Solo envía lo autorizado",
    ],
    toTracker: "Hacia Tracker",
    toTrackerItems: ["Reglas y horarios", "Zonas seguras", "Permisos concedidos"],
    toPadre: "Hacia Padre",
    toPadreItems: ["Ubicación y estado", "Uso de aplicaciones", "Alertas y peticiones"],
    exchangeAria: "Qué circula entre las aplicaciones",
    platformLink: "Ver la plataforma en detalle",
    howLabel: "Cómo empezar",
    howTitle: "Cinco pasos y unos diez minutos.",
    howLead: "Todo se hace desde Vesta Padre menos la vinculación, que se completa en el teléfono del menor escaneando un código QR.",
    featuresLabel: "Funcionalidades",
    featuresTitle: "Qué puede hacer Vesta.",
    featuresLead: "Cada función explicada con su propósito, cómo se usa y sus límites.",
    newTag: "Nuevo",
    privacyLabel: "Privacidad",
    privacyTitle: "Nada se recopila sin una autorización expresa.",
    privacyLead:
      "Conceder un permiso de Android no basta: tratar los datos de un menor requiere la autorización de su representante legal, finalidad por finalidad.",
    privacyItems: [
      ["Consentimiento informado", "Antes de usar el panel, el tutor acepta los documentos, declara su representación legal e indica si el menor fue informado y escuchado."],
      ["Seis finalidades", "Independientes y opcionales. Si una no está autorizada, Vesta Tracker no recopila esa información."],
      ["El menor lo ve", "En Vesta Tracker, «Qué comparte Vesta» le explica qué reciben sus tutores y qué no."],
      ["Plazos definidos", "El historial de ubicación y los informes se guardan 90 días; las alertas, 12 meses."],
      ["Revocación", "Cada autorización se retira desde Vesta Padre y deja de aplicarse en menos de un minuto."],
    ],
    privacyLink: "Leer la política de privacidad",
    docsLink: "Toda la documentación",
    aboutLabel: "Quiénes somos",
    aboutLink: "Nuestros valores y compromisos",
    downloadsLabel: "Descarga",
    downloadsTitle: "Vesta Padre y Vesta Tracker.",
    downloadsLead: "Vesta se distribuye para Android como archivos APK. Revisa los requisitos antes de instalar.",
    faqLabel: "Preguntas frecuentes",
    faqTitle: "Antes de empezar.",
    faqMore: (
      <>
        ¿No encuentras tu respuesta? Consulta la{" "}
        <Link href={href("es", "help")} className="link">
          ayuda
        </Link>
        .
      </>
    ),
  },
  en: {
    eyebrow: "For families with children on Android",
    title: "Know your child is okay, without spying on their phone.",
    lead: (
      <>
        Vesta is two apps: <strong className="font-semibold text-ink">Vesta Parent</strong>, on your phone, and{" "}
        <strong className="font-semibold text-ink">Vesta Tracker</strong>, on theirs. Location and safe zones, an SOS button, study mode,
        time limits and web filters. You decide what is turned on, and your child can see what is shared.
      </>
    ),
    cta: "Download the apps",
    more: "How it works",
    shotTracker: "Vesta Tracker on the minor's device",
    shotPadre: "Vesta Parent dashboard",
    shotsNote: "Vesta Parent on the guardian's phone and Vesta Tracker on the minor's. Real screenshots (Spanish interface).",
    facts: [
      ["Platform", "Android 7.0 or later"],
      ["Apps", "Vesta Parent and Vesta Tracker"],
      ["Authorisations", "6 purposes, one by one"],
      ["Languages", "English and Spanish"],
      ["Documents", "Version 1.1 · 22 Nov 2026"],
    ],
    whatLabel: "What Vesta is",
    whatTitle: "A way to look after your child's phone that they understand too.",
    problemTitle: "What we see at home",
    problem:
      "Children get phones earlier and earlier. We want to know whether they got to school, how long they spend in each app, or whether an app isn't right for their age. Many tools solve this by quietly collecting everything.",
    helpTitle: "What Vesta does",
    help:
      "It only turns on what you authorise, explains each feature before it is used, and lets your child see what is shared, ask for permission or more time, and call for help. If you withdraw an authorisation, that feature switches off.",
    note: "Vesta does not replace family conversations or emergency services.",
    platformLabel: "The platform",
    platformTitle: "One app for you, one for your child.",
    platformLead: "Vesta Parent decides and checks. Vesta Tracker reports and applies the rules, even offline.",
    padreWhere: "On the parent's or guardian's phone.",
    trackerWhere: "On the minor's phone or tablet.",
    padre: [
      "Location, history and safe zones",
      "Phone status and a notice if it stops connecting",
      "App usage, PDF reports and a weekly summary",
      "Web filters, safe search and app blocking",
      "Study mode and time limits",
      "Answers to the minor's requests",
      "Privacy authorisations",
    ],
    tracker: [
      "Linking by scanning a QR code",
      "SOS button with location",
      "Ask for permission or more time",
      "“What Vesta shares”",
      "Rules applied offline",
      "Only sends what is authorised",
    ],
    toTracker: "To Tracker",
    toTrackerItems: ["Rules and schedules", "Safe zones", "Permissions granted"],
    toPadre: "To Parent",
    toPadreItems: ["Location and status", "App usage", "Alerts and requests"],
    exchangeAria: "What travels between the apps",
    platformLink: "See the platform in detail",
    howLabel: "Getting started",
    howTitle: "Five steps and about ten minutes.",
    howLead: "Everything is done from Vesta Parent except linking, which is completed on the minor's phone by scanning a QR code.",
    featuresLabel: "Features",
    featuresTitle: "What Vesta can do.",
    featuresLead: "Each feature explained with its purpose, how to use it and its limits.",
    newTag: "New",
    privacyLabel: "Privacy",
    privacyTitle: "Nothing is collected without express authorisation.",
    privacyLead:
      "Granting an Android permission is not enough: processing a minor's data requires authorisation from their legal representative, purpose by purpose.",
    privacyItems: [
      ["Informed consent", "Before using the dashboard, the guardian accepts the documents, declares their legal representation and states whether the minor was informed and heard."],
      ["Six purposes", "Independent and optional. If one is not authorised, Vesta Tracker does not collect that information."],
      ["The minor can see it", "In Vesta Tracker, “What Vesta shares” explains what their guardians receive and what they do not."],
      ["Set periods", "Location history and reports are kept for 90 days; alerts for 12 months."],
      ["Withdrawal", "Each authorisation is withdrawn from Vesta Parent and stops applying within a minute."],
    ],
    privacyLink: "Read the privacy policy",
    docsLink: "All documentation",
    aboutLabel: "About us",
    aboutLink: "Our values and commitments",
    downloadsLabel: "Download",
    downloadsTitle: "Vesta Parent and Vesta Tracker.",
    downloadsLead: "Vesta is distributed for Android as APK files. Check the requirements before installing.",
    faqLabel: "Frequently asked questions",
    faqTitle: "Before you start.",
    faqMore: (
      <>
        Can't find your answer? See the{" "}
        <Link href={href("en", "help")} className="link">
          help center
        </Link>
        .
      </>
    ),
  },
} as const;

export function HomeView({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const inst = institutionalFor(locale);
  const features = featuresFor(locale);

  return (
    <>
      <JsonLd data={organizationSchema} />
      {appsSchema(locale).map((s) => (
        <JsonLd key={s.name} data={s} />
      ))}

      <section>
        <div className="wrap grid items-center gap-14 pb-16 pt-12 md:pt-16 lg:grid-cols-12 lg:gap-10 lg:pb-24 lg:pt-20">
          <div className="lg:col-span-6">
            <p className="kicker">{t.eyebrow}</p>
            <h1 className="display mt-5 !text-[clamp(2.4rem,1.3rem+3.6vw,4.1rem)]">{t.title}</h1>
            <p className="lead mt-8 max-w-xl">{t.lead}</p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
              <Link href={href(locale, "downloads")} className="btn btn-primary">
                <ArrowDownToLine aria-hidden="true" className="size-4" />
                {t.cta}
              </Link>
              <a href="#como-empezar" className="arrow-link">
                {t.more} <ArrowRight aria-hidden="true" className="size-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative mx-auto aspect-[1.1] w-full max-w-[34rem]">
              <Device
                priority
                className="absolute right-0 top-0 w-[74%]"
                shot={{ src: "/img/tracker/rastreo-activo", alt: t.shotTracker, kind: "tablet", sizes: [800, 1600] }}
                sizesAttr="(min-width: 64rem) 420px, 75vw"
              />
              <Device
                priority
                className="absolute bottom-0 left-0 w-[34%]"
                shot={{ src: "/img/padre/panel-dispositivos", alt: t.shotPadre, kind: "phone", sizes: [420, 840] }}
                sizesAttr="(min-width: 64rem) 190px, 33vw"
              />
            </div>
            <p className="mt-5 text-center text-sm text-muted">{t.shotsNote}</p>
          </div>
        </div>

        <div className="wrap">
          <dl className="grid grid-cols-2 border-y border-line md:grid-cols-5">
            {t.facts.map(([k, v], i) => (
              <div
                key={k}
                className={`py-5 pr-4 ${i > 0 ? "md:border-l md:border-line md:pl-5" : ""} ${i % 2 === 1 ? "border-l border-line pl-4 md:pl-5" : ""} ${i >= 2 ? "border-t border-line md:border-t-0" : ""}`}
              >
                <dt className="text-sm text-muted">{k}</dt>
                <dd className="mt-1 font-serif text-[1.05rem] leading-snug text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="que-es" className="py-24 md:py-32">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <p className="kicker">{t.whatLabel}</p>
          </div>
          <div className="lg:col-span-9">
            <h2 id="que-es" className="h-section max-w-4xl">
              {t.whatTitle}
            </h2>
            <div className="mt-14 grid gap-12 md:grid-cols-2 md:gap-16">
              <div className="border-t border-wine pt-6">
                <h3 className="font-serif text-xl text-wine">{t.problemTitle}</h3>
                <p className="mt-4 text-[1.02rem] leading-relaxed text-muted">{t.problem}</p>
              </div>
              <div className="border-t border-wine pt-6">
                <h3 className="font-serif text-xl text-wine">{t.helpTitle}</h3>
                <p className="mt-4 text-[1.02rem] leading-relaxed text-muted">{t.help}</p>
              </div>
            </div>
            <p className="mt-12 text-[0.95rem] text-muted">{t.note}</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="plataforma" className="on-dark bg-wine text-ivory">
        <div className="wrap py-24 md:py-32">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="kicker">{t.platformLabel}</p>
              <h2 id="plataforma" className="h-section mt-4">
                {t.platformTitle}
              </h2>
            </div>
            <p className="lead lg:col-span-5 lg:self-end">{t.platformLead}</p>
          </div>

          <div className="mt-16 grid gap-16 lg:grid-cols-[1fr_auto_1fr] lg:gap-10">
            <div className="grid gap-8 sm:grid-cols-[minmax(0,13rem)_1fr] sm:items-start">
              <Device
                shot={{ src: "/img/padre/estado-dispositivo", alt: t.shotPadre, kind: "phone", sizes: [420, 840] }}
                className="mx-auto w-[60%] max-w-[13rem] sm:w-full"
                sizesAttr="(min-width: 40rem) 208px, 60vw"
              />
              <div>
                <AppTag app="padre" locale={locale} className="!text-ivory/85" />
                <p className="mt-2 text-sm text-ivory/70">{t.padreWhere}</p>
                <ul className="mt-6 space-y-2.5 text-[0.95rem]">
                  {t.padre.map((f) => (
                    <li key={f} className="flex gap-3">
                      <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-rose-300" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-row items-stretch justify-center gap-4 lg:flex-col lg:items-center lg:px-2" aria-label={t.exchangeAria}>
              {[
                [t.toTracker, t.toTrackerItems],
                [t.toPadre, t.toPadreItems],
              ].map(([label, items], i) => (
                <div key={i} className="flex flex-1 flex-col items-center justify-center gap-3 text-center lg:flex-none">
                  <span className="text-sm font-semibold text-rose-300">{label as string}</span>
                  <span className="text-sm leading-relaxed text-ivory/75">
                    {(items as readonly string[]).map((x) => (
                      <span key={x} className="block">
                        {x}
                      </span>
                    ))}
                  </span>
                </div>
              ))}
            </div>

            <div>
              <Device
                shot={{ src: "/img/tracker/vinculacion", alt: t.shotTracker, kind: "tablet", sizes: [800, 1600] }}
                sizesAttr="(min-width: 64rem) 480px, 90vw"
              />
              <div className="mt-8">
                <AppTag app="tracker" locale={locale} className="!text-rose-300" />
                <p className="mt-2 text-sm text-ivory/70">{t.trackerWhere}</p>
                <ul className="mt-6 grid gap-x-6 gap-y-2.5 text-[0.95rem] sm:grid-cols-2">
                  {t.tracker.map((f) => (
                    <li key={f} className="flex gap-3">
                      <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-rose-300" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <Link href={href(locale, "platform")} className="arrow-link mt-16">
            {t.platformLink} <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </section>

      <section id="como-empezar" aria-labelledby="como-empezar-t" className="scroll-mt-24 py-24 md:py-32">
        <div className="wrap">
          <SectionHead kicker={t.howLabel} id="como-empezar-t" title={t.howTitle} lead={t.howLead} />
          <div className="mt-16">
            <Steps locale={locale} />
          </div>
        </div>
      </section>

      <section aria-labelledby="funciones" className="border-t border-line bg-paper py-24 md:py-32">
        <div className="wrap grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionHead kicker={t.featuresLabel} id="funciones" title={t.featuresTitle} />
              <p className="lead mt-6">{t.featuresLead}</p>
            </div>
          </div>
          <ul className="border-t border-wine lg:col-span-8">
            {features.map((f) => (
              <li key={f.id} className="border-b border-line">
                <Link href={href(locale, "features", f.id)} className="group grid grid-cols-[1fr_auto] items-baseline gap-x-4 py-6 md:py-7">
                  <span>
                    <span className="flex items-baseline gap-3 font-serif text-[1.45rem] leading-tight transition-colors group-hover:text-rose-700 md:text-[1.65rem]">
                      {f.title}
                      {f.isNew && <span className="tag text-rose-700 font-sans">{t.newTag}</span>}
                    </span>
                    <span className="mt-1.5 block text-[0.95rem] text-muted">{f.short}</span>
                  </span>
                  <ArrowRight aria-hidden="true" className="size-5 text-wine transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="privacidad" className="py-24 md:py-32">
        <div className="wrap grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHead kicker={t.privacyLabel} id="privacidad" title={t.privacyTitle} lead={t.privacyLead} />
            <dl className="mt-12 space-y-7">
              {t.privacyItems.map(([k, d]) => (
                <div key={k} className="grid gap-1 sm:grid-cols-[12rem_1fr] sm:gap-6">
                  <dt className="font-sans text-sm font-semibold text-wine">{k}</dt>
                  <dd className="text-[0.95rem] text-muted">{d}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4">
              <Link href={docHref(locale, "privacy")} className="arrow-link">
                {t.privacyLink} <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
              <Link href={href(locale, "docs")} className="arrow-link">
                {t.docsLink} <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 lg:pt-24">
            <PurposeList locale={locale} />
          </div>
        </div>
      </section>

      <section aria-labelledby="mision" className="border-y border-line bg-beige-100">
        <div className="wrap py-24 md:py-32">
          <p className="kicker">{t.aboutLabel}</p>
          <h2 id="mision" className="sr-only">
            {t.aboutLabel}
          </h2>
          <div className="mt-10 grid gap-14 md:grid-cols-2 md:gap-20">
            {[inst.mission, inst.vision].map((m) => (
              <div key={m.label}>
                <h3 className="font-sans text-sm font-semibold text-wine">{m.label}</h3>
                <p className="mt-4 font-serif text-[1.5rem] leading-[1.35] text-ink md:text-[1.75rem]">{m.text}</p>
              </div>
            ))}
          </div>
          <Link href={href(locale, "mission")} className="arrow-link mt-14">
            {t.aboutLink} <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </section>

      <section aria-labelledby="descargas" className="py-24 md:py-32">
        <div className="wrap">
          <SectionHead kicker={t.downloadsLabel} id="descargas" title={t.downloadsTitle} lead={t.downloadsLead} />
          <div className="mt-16 grid gap-16 lg:grid-cols-2 lg:gap-0">
            {apps.map((a, i) => (
              <div key={a.id} className={i === 1 ? "border-t border-line pt-16 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0" : "lg:pr-16"}>
                <DownloadPanel app={a} locale={locale} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="faq" className="border-t border-line bg-paper py-24 md:py-32">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHead kicker={t.faqLabel} id="faq" title={t.faqTitle} />
            <p className="mt-6 text-[0.95rem] text-muted">{t.faqMore}</p>
          </div>
          <div className="lg:col-span-8">
            <Faq items={faqFor(locale)} />
          </div>
        </div>
      </section>
    </>
  );
}

export const homeMeta = {
  es: { title: "Protección digital familiar para Android" },
  en: { title: "Family digital protection for Android" },
} as const;
