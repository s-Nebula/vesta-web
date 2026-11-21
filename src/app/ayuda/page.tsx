import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHead } from "@/components/ui/SectionHead";
import { Faq } from "@/components/ui/Faq";
import { faq, helpTopics } from "@/content/help";
import { company } from "@/content/site";
import { pageMeta, JsonLd } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Centro de ayuda",
  description:
    "Ayuda para instalar Vesta, iniciar sesión, vincular dispositivos, resolver problemas de conexión, permisos y ubicación, y gestionar la privacidad. Preguntas frecuentes y contacto.",
  path: "/ayuda/",
});

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a.join(" ") } })),
};

export default function AyudaPage() {
  return (
    <>
      <JsonLd data={faqSchema} />
      <PageHero
        kicker="Centro de ayuda"
        title="Resuelve lo más habitual en pocos pasos."
        lead="Instrucciones breves para los problemas más frecuentes. Para el detalle completo, consulta la Guía de usuario oficial."
      >
        <nav aria-label="Temas de ayuda">
          <ul className="flex flex-wrap gap-2">
            {helpTopics.map((t) => (
              <li key={t.id}>
                <a href={`#${t.id}`} className="inline-flex rounded-full border border-line px-4 py-2 text-sm hover:border-wine">
                  {t.title}
                </a>
              </li>
            ))}
            <li>
              <a href="#preguntas" className="inline-flex rounded-full border border-line px-4 py-2 text-sm hover:border-wine">
                Preguntas frecuentes
              </a>
            </li>
            <li>
              <a href="#contacto" className="inline-flex rounded-full border border-wine bg-wine px-4 py-2 text-sm text-ivory">
                Contacto
              </a>
            </li>
          </ul>
        </nav>
      </PageHero>

      <section aria-label="Temas de ayuda" className="py-16 md:py-24">
        <div className="wrap">
          {helpTopics.map((t, i) => (
            <article key={t.id} id={t.id} aria-labelledby={`${t.id}-t`} className="grid scroll-mt-28 gap-6 border-t border-line py-12 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <span className="text-xs font-semibold text-rose-700">{String(i + 1).padStart(2, "0")}</span>
                <h2 id={`${t.id}-t`} className="mt-2 font-serif text-[1.9rem] leading-tight">
                  {t.title}
                </h2>
              </div>
              <div className="lg:col-span-7 lg:col-start-6">
                <p className="text-[1.02rem]">{t.intro}</p>
                <ol className="mt-6 space-y-3">
                  {t.steps.map((s, n) => (
                    <li key={s} className="grid grid-cols-[2rem_1fr] text-[0.96rem] text-muted">
                      <span className="font-serif text-lg leading-6 text-wine">{n + 1}</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ol>
                {t.note && <p className="mt-6 border-l-2 border-rose pl-4 text-sm text-ink">{t.note}</p>}
              </div>
            </article>
          ))}
          <p className="border-t border-line pt-10 text-[0.95rem] text-muted">
            ¿Necesitas más detalle? La sección{" "}
            <Link className="link" href="/documentacion/guia-de-usuario/#10-solucion-de-problemas">
              Solución de problemas de la Guía de usuario
            </Link>{" "}
            cubre también alertas que no se actualizan, aplicaciones o dominios que no se bloquean y servicios que se detienen.
          </p>
        </div>
      </section>

      <section id="preguntas" aria-labelledby="preguntas-t" className="scroll-mt-24 border-t border-line bg-paper py-20 md:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHead kicker="Preguntas frecuentes" id="preguntas-t" title="Preguntas frecuentes" />
          </div>
          <div className="lg:col-span-8">
            <Faq items={faq} />
          </div>
        </div>
      </section>

      <section id="contacto" aria-labelledby="contacto-t" className="on-dark scroll-mt-24 bg-wine py-20 text-ivory md:py-28">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHead
              kicker="Contacto y soporte"
              id="contacto-t"
              title="Escríbenos."
              lead="Canal oficial para soporte, consultas, reclamos y solicitudes sobre datos personales, según los documentos de Vesta."
            />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <ul className="divide-y divide-ivory/15 border-y border-ivory/15">
              <li className="flex items-start gap-5 py-6">
                <Mail aria-hidden="true" className="mt-1 size-5 text-rose-300" />
                <div>
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ivory/60">Correo</p>
                  <a href={`mailto:${company.email}`} className="mt-1 block font-serif text-2xl underline decoration-rose-300/60 underline-offset-4 hover:decoration-ivory">
                    {company.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-5 py-6">
                <Phone aria-hidden="true" className="mt-1 size-5 text-rose-300" />
                <div>
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ivory/60">Teléfono</p>
                  <a href={company.phoneHref} className="mt-1 block font-serif text-2xl underline decoration-rose-300/60 underline-offset-4 hover:decoration-ivory">
                    {company.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-5 py-6">
                <MapPin aria-hidden="true" className="mt-1 size-5 text-rose-300" />
                <div>
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ivory/60">Dirección</p>
                  <p className="mt-1 font-serif text-xl">
                    {company.legalName}
                    <br />
                    {company.address}, {company.city}
                  </p>
                </div>
              </li>
            </ul>
            <p className="mt-6 text-sm text-ivory/70">
              El soporte de Vesta nunca te pedirá contraseñas ni códigos secretos. Para solicitudes sobre datos de menores, la petición debe
              presentarla una persona legalmente facultada.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
