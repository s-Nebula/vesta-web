import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHead } from "@/components/ui/SectionHead";
import { Faq } from "@/components/ui/Faq";
import { faqFor, helpTopicsFor } from "@/content/help";
import { company } from "@/content/site";
import { JsonLd } from "@/lib/seo";
import { docHref, type Locale } from "@/i18n";

const copy = {
  es: {
    kicker: "Ayuda",
    title: "Lo más habitual, resuelto en pocos pasos.",
    lead: "Instrucciones breves para los problemas frecuentes. Para el detalle completo, consulta la guía de usuario.",
    topicsAria: "Temas de ayuda",
    faqChip: "Preguntas frecuentes",
    contactChip: "Contacto",
    more: "¿Necesitas más detalle? La sección",
    moreLink: "Solución de problemas de la guía de usuario",
    moreTail: "cubre también alertas que no llegan, modo estudio y límites, apps o sitios que no se bloquean y servicios que se detienen.",
    faqTitle: "Preguntas frecuentes",
    contactLabel: "Contacto y soporte",
    contactTitle: "Escríbenos.",
    contactLead: "Canal oficial para soporte, consultas, reclamos y solicitudes sobre datos personales.",
    email: "Correo",
    phone: "Teléfono",
    contactNote:
      "El soporte de Vesta nunca te pedirá contraseñas ni códigos secretos. Las solicitudes sobre datos de menores debe presentarlas una persona legalmente facultada.",
  },
  en: {
    kicker: "Help",
    title: "The usual questions, solved in a few steps.",
    lead: "Short instructions for common problems. For full detail, see the user guide.",
    topicsAria: "Help topics",
    faqChip: "FAQ",
    contactChip: "Contact",
    more: "Need more detail? The",
    moreLink: "Troubleshooting section of the user guide",
    moreTail: "also covers alerts that don't arrive, study mode and limits, apps or sites that aren't blocked, and services that stop.",
    faqTitle: "Frequently asked questions",
    contactLabel: "Contact and support",
    contactTitle: "Write to us.",
    contactLead: "The official channel for support, enquiries, complaints and requests about personal data.",
    email: "Email",
    phone: "Phone",
    contactNote:
      "Vesta support will never ask for passwords or secret codes. Requests about minors' data must be submitted by a person legally entitled to do so.",
  },
} as const;

export function HelpView({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const faq = faqFor(locale);
  const topics = helpTopicsFor(locale);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale,
    mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a.join(" ") } })),
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <PageHero kicker={t.kicker} title={t.title} lead={t.lead}>
        <nav aria-label={t.topicsAria}>
          <ul className="flex flex-wrap gap-2">
            {topics.map((x) => (
              <li key={x.id}>
                <a href={`#${x.id}`} className="inline-flex rounded-full border border-line px-4 py-2 text-sm hover:border-wine">
                  {x.title}
                </a>
              </li>
            ))}
            <li>
              <a href="#preguntas" className="inline-flex rounded-full border border-line px-4 py-2 text-sm hover:border-wine">
                {t.faqChip}
              </a>
            </li>
            <li>
              <a href="#contacto" className="inline-flex rounded-full border border-wine bg-wine px-4 py-2 text-sm text-ivory">
                {t.contactChip}
              </a>
            </li>
          </ul>
        </nav>
      </PageHero>

      <section aria-label={t.topicsAria} className="py-16 md:py-24">
        <div className="wrap">
          {topics.map((x) => (
            <article key={x.id} id={x.id} aria-labelledby={`${x.id}-t`} className="grid scroll-mt-28 gap-6 border-t border-line py-12 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <h2 id={`${x.id}-t`} className="font-serif text-[1.9rem] leading-tight">
                  {x.title}
                </h2>
              </div>
              <div className="lg:col-span-7 lg:col-start-6">
                <p className="text-[1.02rem]">{x.intro}</p>
                <ol className="mt-6 space-y-3">
                  {x.steps.map((s, n) => (
                    <li key={s} className="grid grid-cols-[2rem_1fr] text-[0.97rem] text-muted">
                      <span className="font-serif text-lg leading-6 text-wine">{n + 1}</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ol>
                {x.note && <p className="mt-6 border-l-2 border-rose pl-4 text-sm text-ink">{x.note}</p>}
              </div>
            </article>
          ))}
          <p className="border-t border-line pt-10 text-[0.97rem] text-muted">
            {t.more}{" "}
            <Link className="link" href={docHref(locale, "guide", locale === "es" ? "11-solucion-de-problemas" : "11-troubleshooting")}>
              {t.moreLink}
            </Link>{" "}
            {t.moreTail}
          </p>
        </div>
      </section>

      <section id="preguntas" aria-labelledby="preguntas-t" className="scroll-mt-24 border-t border-line bg-paper py-20 md:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHead id="preguntas-t" title={t.faqTitle} />
          </div>
          <div className="lg:col-span-8">
            <Faq items={faq} />
          </div>
        </div>
      </section>

      <section id="contacto" aria-labelledby="contacto-t" className="on-dark scroll-mt-24 bg-wine py-20 text-ivory md:py-28">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHead kicker={t.contactLabel} id="contacto-t" title={t.contactTitle} lead={t.contactLead} />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <ul className="divide-y divide-ivory/15 border-y border-ivory/15">
              <li className="flex items-start gap-5 py-6">
                <Mail aria-hidden="true" className="mt-1 size-5 text-rose-300" />
                <div>
                  <p className="text-sm text-ivory/60">{t.email}</p>
                  <a href={`mailto:${company.email}`} className="mt-1 block font-serif text-2xl underline decoration-rose-300/60 underline-offset-4 hover:decoration-ivory">
                    {company.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-5 py-6">
                <Phone aria-hidden="true" className="mt-1 size-5 text-rose-300" />
                <div>
                  <p className="text-sm text-ivory/60">{t.phone}</p>
                  <a href={company.phoneHref} className="mt-1 block font-serif text-2xl underline decoration-rose-300/60 underline-offset-4 hover:decoration-ivory">
                    {company.phone}
                  </a>
                </div>
              </li>
            </ul>
            <p className="mt-6 text-sm text-ivory/70">
              {company.legalName} · {company.city}
            </p>
            <p className="mt-3 text-sm text-ivory/70">{t.contactNote}</p>
          </div>
        </div>
      </section>
    </>
  );
}
