import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Device } from "@/components/ui/Device";
import { featuresFor } from "@/content/features";
import { docHref, type Locale } from "@/i18n";

const copy = {
  es: {
    kicker: "Funcionalidades",
    title: "Cada función, con su propósito y sus límites.",
    lead: "Lo que hacen Vesta Padre y Vesta Tracker en la versión 1.1: para qué sirve cada función, cómo se usa, dónde se gestiona y qué autorización necesita.",
    index: "Índice",
    indexAria: "Índice de funcionalidades",
    newTag: "Nuevo en 1.1",
    purpose: "Para qué sirve",
    how: "Cómo se usa",
    where: "Dónde se gestiona",
    auth: "Autorización",
    purposeLabel: "Finalidad",
    noPurpose: "No requiere una finalidad concreta.",
    limits: "Límites.",
    guide: "Instrucciones completas en la guía de usuario",
    pendingShot: "Captura de la nueva interfaz pendiente.",
  },
  en: {
    kicker: "Features",
    title: "Every feature, with its purpose and its limits.",
    lead: "What Vesta Parent and Vesta Tracker do in version 1.1: what each feature is for, how to use it, where it is managed and what authorisation it needs.",
    index: "Contents",
    indexAria: "Feature index",
    newTag: "New in 1.1",
    purpose: "What it is for",
    how: "How to use it",
    where: "Where it is managed",
    auth: "Authorisation",
    purposeLabel: "Purpose",
    noPurpose: "No specific purpose required.",
    limits: "Limits.",
    guide: "Full instructions in the user guide",
    pendingShot: "Screenshot of the new interface pending.",
  },
} as const;

export function FeaturesView({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const features = featuresFor(locale);

  return (
    <>
      <PageHero kicker={t.kicker} title={t.title} lead={t.lead} />

      <div className="wrap grid gap-12 py-16 lg:grid-cols-12 lg:py-24">
        <nav aria-label={t.indexAria} className="min-w-0 lg:col-span-3">
          <div className="lg:sticky lg:top-28">
            <p className="kicker">{t.index}</p>
            <ol className="no-scrollbar -mx-5 mt-5 flex gap-2 overflow-x-auto px-5 pb-2 lg:mx-0 lg:block lg:overflow-visible lg:px-0">
              {features.map((f) => (
                <li key={f.id} className="shrink-0 lg:border-b lg:border-line">
                  <a
                    href={`#${f.id}`}
                    className="flex items-baseline gap-2 whitespace-nowrap rounded-full border border-line px-3.5 py-1.5 text-sm text-ink hover:border-wine lg:rounded-none lg:border-0 lg:px-0 lg:py-3 lg:hover:text-rose-700"
                  >
                    {f.title}
                    {f.isNew && <span aria-hidden="true" className="size-1.5 rounded-full bg-rose" />}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        <div className="lg:col-span-9">
          {features.map((f) => (
            <article key={f.id} id={f.id} aria-labelledby={`${f.id}-t`} className="scroll-mt-28 border-t border-wine py-14 first:pt-10 md:py-20">
              <div className={`grid gap-10 md:gap-14 ${f.screenshot?.kind === "phone" ? "md:grid-cols-[1fr_15rem]" : ""}`}>
                <div>
                  {f.isNew && <span className="tag text-rose-700">{t.newTag}</span>}
                  <h2 id={`${f.id}-t`} className={`h-section ${f.isNew ? "mt-3" : ""}`}>
                    {f.title}
                  </h2>
                  <p className="mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-ink">{f.description}</p>

                  <dl className="mt-10 grid gap-x-10 border-t border-line sm:grid-cols-2">
                    <div className="border-b border-line py-5 sm:col-span-2">
                      <dt className="text-sm font-semibold text-muted">{t.purpose}</dt>
                      <dd className="mt-2 text-[0.97rem]">{f.purpose}</dd>
                    </div>
                    <div className="border-b border-line py-5 sm:col-span-2">
                      <dt className="text-sm font-semibold text-muted">{t.how}</dt>
                      <dd className="mt-3">
                        <ol className="space-y-2 text-[0.97rem]">
                          {f.howTo.map((s, n) => (
                            <li key={s} className="flex gap-4">
                              <span className="mt-[0.15em] text-sm font-semibold text-rose-700">{n + 1}.</span>
                              <span>{s}</span>
                            </li>
                          ))}
                        </ol>
                      </dd>
                    </div>
                    <div className="border-b border-line py-5">
                      <dt className="text-sm font-semibold text-muted">{t.where}</dt>
                      <dd className="mt-2 text-[0.97rem]">{f.managedIn}</dd>
                    </div>
                    <div className="border-b border-line py-5">
                      <dt className="text-sm font-semibold text-muted">{t.auth}</dt>
                      <dd className="mt-2 text-[0.97rem]">
                        {f.authorization.purpose || f.authorization.android ? (
                          <>
                            {f.authorization.purpose && (
                              <span className="block">
                                {t.purposeLabel}: <strong className="font-semibold">{f.authorization.purpose}</strong>
                              </span>
                            )}
                            {f.authorization.android && <span className="mt-1 block text-muted">Android: {f.authorization.android.join(" · ")}</span>}
                          </>
                        ) : (
                          <span className="text-muted">{t.noPurpose}</span>
                        )}
                      </dd>
                    </div>
                  </dl>

                  {f.limits && (
                    <p className="mt-6 flex max-w-2xl gap-3 text-sm text-muted">
                      <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-rose-700" />
                      <span>
                        <strong className="font-semibold text-ink">{t.limits} </strong>
                        {f.limits}
                      </span>
                    </p>
                  )}
                </div>

                {f.screenshot && (
                  <figure className={f.screenshot.kind === "phone" ? "mx-auto w-[62%] max-w-[15rem] md:w-full" : "max-w-xl"}>
                    <Device shot={f.screenshot} sizesAttr={f.screenshot.kind === "phone" ? "240px" : "(min-width: 48rem) 576px, 90vw"} />
                    <figcaption className="mt-4 text-xs leading-relaxed text-muted">{f.screenshot.caption}</figcaption>
                  </figure>
                )}
              </div>
            </article>
          ))}

          <div className="border-t border-wine pt-10">
            <Link href={docHref(locale, "guide")} className="arrow-link">
              {t.guide} <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
