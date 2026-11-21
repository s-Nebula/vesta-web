import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHead } from "@/components/ui/SectionHead";
import { Symbol, Arc } from "@/components/brand/Logo";
import { mission, vision, origin, values, privacyCommitments, responsibleUse } from "@/content/institutional";
import { company } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Misión y visión",
  description:
    "Quiénes somos, la misión y la visión de Vesta Security, nuestros valores y el compromiso con la privacidad y la protección digital responsable de los menores.",
  path: "/mision-y-vision/",
});

export default function MisionPage() {
  return (
    <>
      <PageHero
        kicker="Misión y visión"
        title="Proteger sin convertir la protección en vigilancia."
        lead="Vesta Security es una plataforma de protección digital familiar para Android. Esta página explica por qué existe, hacia dónde va y qué principios guían su desarrollo."
      />

      {/* Presentación y origen */}
      <section aria-labelledby="origen" className="py-20 md:py-28">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="kicker">Origen y propósito</p>
            <h2 id="origen" className="h-sub mt-5">
              Un proyecto de {company.author}, operado por {company.legalName}
            </h2>
            <Symbol className="mt-10 hidden w-40 lg:block" />
          </div>
          <div className="space-y-6 font-serif text-[1.25rem] leading-[1.6] md:text-[1.4rem] lg:col-span-7 lg:col-start-6">
            {origin.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Misión y visión */}
      <section aria-label="Misión y visión" className="on-dark relative overflow-hidden bg-wine text-ivory">
        <Arc className="pointer-events-none absolute -bottom-10 -left-20 w-[44rem] opacity-80" color="#5B2537" inner="#421827" />
        <div className="wrap relative grid gap-0 md:grid-cols-2">
          {[mission, vision].map((m, i) => (
            <div key={m.label} className={`py-20 md:py-28 ${i === 1 ? "border-t border-ivory/15 md:border-l md:border-t-0 md:pl-16" : "md:pr-16"}`}>
              <h2 className="kicker">{m.label}</h2>
              <p className="mt-8 font-serif text-[1.7rem] leading-[1.32] md:text-[2.15rem]">{m.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Valores */}
      <section aria-labelledby="valores" className="py-20 md:py-28">
        <div className="wrap">
          <SectionHead kicker="Valores" id="valores" title="Seis principios que se traducen en decisiones de producto." />
          <ol className="mt-16 grid gap-x-16 border-t border-wine md:grid-cols-2">
            {values.map((v, i) => (
              <li key={v.title} className="grid grid-cols-[3rem_1fr] gap-2 border-b border-line py-8">
                <span className="font-serif text-2xl text-rose-700">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-serif text-2xl">{v.title}</h3>
                  <p className="mt-3 text-[0.96rem] leading-relaxed text-muted">{v.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Compromisos */}
      <section aria-labelledby="compromisos" className="border-t border-line bg-paper py-20 md:py-28">
        <div className="wrap grid gap-16 lg:grid-cols-2">
          <div>
            <p className="kicker">Compromiso con la privacidad</p>
            <h2 id="compromisos" className="h-sub mt-5">
              Lo que hacemos y lo que no hacemos con los datos
            </h2>
            <ul className="mt-8 space-y-4">
              {privacyCommitments.map((c) => (
                <li key={c} className="flex gap-4 text-[0.98rem]">
                  <span aria-hidden="true" className="mt-[0.75em] h-px w-4 shrink-0 bg-rose" />
                  {c}
                </li>
              ))}
            </ul>
            <Link href="/documentacion/politica-de-privacidad/" className="arrow-link mt-8">
              Política de privacidad <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
          <div>
            <p className="kicker">Protección digital responsable</p>
            <h2 className="h-sub mt-5">Para qué es Vesta, y para qué no</h2>
            <ul className="mt-8 space-y-4">
              {responsibleUse.map((c) => (
                <li key={c} className="flex gap-4 text-[0.98rem]">
                  <span aria-hidden="true" className="mt-[0.75em] h-px w-4 shrink-0 bg-rose" />
                  {c}
                </li>
              ))}
            </ul>
            <Link href="/documentacion/terminos-y-condiciones/#9-uso-prohibido" className="arrow-link mt-8">
              Usos prohibidos en los Términos <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
