import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHead } from "@/components/ui/SectionHead";
import { Symbol } from "@/components/brand/Logo";
import { institutionalFor } from "@/content/institutional";
import { company } from "@/content/site";
import { docHref, type Locale } from "@/i18n";

const copy = {
  es: {
    kicker: "Quiénes somos",
    title: "Cuidar sin convertir el cuidado en vigilancia.",
    lead: "Por qué existe Vesta, hacia dónde va y qué principios guían cada decisión de producto.",
    originLabel: "Origen",
    originTitle: `Un proyecto de ${company.author}, operado por ${company.legalName}`,
    missionAria: "Misión y visión",
    valuesLabel: "Valores",
    valuesTitle: "Principios que se notan en la aplicación.",
    privacyLabel: "Privacidad",
    privacyTitle: "Lo que hacemos y lo que no hacemos con los datos",
    privacyLink: "Política de privacidad",
    useLabel: "Uso responsable",
    useTitle: "Para qué es Vesta, y para qué no",
    useLink: "Usos prohibidos en los Términos",
  },
  en: {
    kicker: "About us",
    title: "Looking after them without turning care into surveillance.",
    lead: "Why Vesta exists, where it is heading and the principles behind every product decision.",
    originLabel: "Origin",
    originTitle: `A project by ${company.author}, operated by ${company.legalName}`,
    missionAria: "Mission and vision",
    valuesLabel: "Values",
    valuesTitle: "Principles you can see in the app.",
    privacyLabel: "Privacy",
    privacyTitle: "What we do and don't do with data",
    privacyLink: "Privacy policy",
    useLabel: "Responsible use",
    useTitle: "What Vesta is for, and what it is not",
    useLink: "Prohibited uses in the Terms",
  },
} as const;

export function MissionView({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const inst = institutionalFor(locale);
  return (
    <>
      <PageHero kicker={t.kicker} title={t.title} lead={t.lead} />

      <section aria-labelledby="origen" className="py-20 md:py-28">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="kicker">{t.originLabel}</p>
            <h2 id="origen" className="h-sub mt-4">
              {t.originTitle}
            </h2>
            <Symbol className="mt-10 hidden w-32 lg:block" />
          </div>
          <div className="space-y-6 font-serif text-[1.25rem] leading-[1.6] md:text-[1.4rem] lg:col-span-7 lg:col-start-6">
            {inst.origin.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section aria-label={t.missionAria} className="on-dark bg-wine text-ivory">
        <div className="wrap grid gap-0 md:grid-cols-2">
          {[inst.mission, inst.vision].map((m, i) => (
            <div key={m.label} className={`py-20 md:py-28 ${i === 1 ? "border-t border-ivory/15 md:border-l md:border-t-0 md:pl-16" : "md:pr-16"}`}>
              <h2 className="kicker">{m.label}</h2>
              <p className="mt-6 font-serif text-[1.6rem] leading-[1.35] md:text-[2rem]">{m.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="valores" className="py-20 md:py-28">
        <div className="wrap">
          <SectionHead kicker={t.valuesLabel} id="valores" title={t.valuesTitle} />
          <ul className="mt-16 grid gap-x-16 border-t border-wine md:grid-cols-2">
            {inst.values.map((v) => (
              <li key={v.title} className="border-b border-line py-8">
                <h3 className="font-serif text-2xl">{v.title}</h3>
                <p className="mt-3 text-[0.97rem] leading-relaxed text-muted">{v.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="compromisos" className="border-t border-line bg-paper py-20 md:py-28">
        <div className="wrap grid gap-16 lg:grid-cols-2">
          <div>
            <p className="kicker">{t.privacyLabel}</p>
            <h2 id="compromisos" className="h-sub mt-4">
              {t.privacyTitle}
            </h2>
            <ul className="mt-8 space-y-4">
              {inst.privacyCommitments.map((c) => (
                <li key={c} className="flex gap-4 text-[0.98rem]">
                  <span aria-hidden="true" className="mt-[0.75em] h-px w-4 shrink-0 bg-rose" />
                  {c}
                </li>
              ))}
            </ul>
            <Link href={docHref(locale, "privacy")} className="arrow-link mt-8">
              {t.privacyLink} <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
          <div>
            <p className="kicker">{t.useLabel}</p>
            <h2 className="h-sub mt-4">{t.useTitle}</h2>
            <ul className="mt-8 space-y-4">
              {inst.responsibleUse.map((c) => (
                <li key={c} className="flex gap-4 text-[0.98rem]">
                  <span aria-hidden="true" className="mt-[0.75em] h-px w-4 shrink-0 bg-rose" />
                  {c}
                </li>
              ))}
            </ul>
            <Link href={docHref(locale, "terms", locale === "es" ? "9-uso-prohibido" : "9-prohibited-use")} className="arrow-link mt-8">
              {t.useLink} <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
