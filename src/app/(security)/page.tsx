import Link from "next/link";
import { ArrowRight, MessageCircle, ShieldCheck } from "lucide-react";
import { SectionHead } from "@/components/ui/SectionHead";
import { Faq } from "@/components/ui/Faq";
import { ContactBand, ServiceCard, securityMeta } from "@/components/security/parts";
import { JsonLd } from "@/lib/seo";
import { allPosts, formatDate } from "@/lib/blog";
import { site, company } from "@/content/site";
import { certifications, faq, projects, segments, services, steps, waLink, formatCop } from "@/content/security";

export const metadata = securityMeta(
  "Vesta Security · Ciberseguridad para pequeños negocios en Santa Marta y Colombia",
  "Auditorías de seguridad y pruebas de penetración para comercios, tiendas en línea, consultorios y startups. Precios fijos desde $390.000 + IVA. Diagnóstico gratuito.",
  "/",
  true,
);

const schema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  legalName: company.legalName,
  url: site.url,
  logo: `${site.url}/brand/vesta_logo.svg`,
  email: company.email,
  telephone: company.phone,
  priceRange: "$$",
  areaServed: { "@type": "Country", name: "Colombia" },
  address: { "@type": "PostalAddress", addressLocality: "Santa Marta", addressRegion: "Magdalena", addressCountry: "CO" },
  makesOffer: services
    .filter((s) => s.price > 0)
    .map((s) => ({
      "@type": "Offer",
      name: s.name,
      price: s.price,
      priceCurrency: "COP",
      url: `${site.url}/servicios/#${s.id}`,
    })),
};

export default function Page() {
  const featured = services.filter((s) => s.featured);
  const posts = allPosts().slice(0, 3);
  const from = Math.min(...services.filter((s) => s.price > 0).map((s) => s.price));

  return (
    <>
      <JsonLd data={schema} />

      {/* Portada */}
      <section className="grain border-b border-line">
        <div className="wrap grid gap-12 pb-16 pt-14 md:pb-24 md:pt-20 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="kicker">Ciberseguridad para pequeños negocios · Santa Marta y toda Colombia</p>
            <h1 className="display mt-5">Encuentro las fallas de tu negocio antes que un delincuente.</h1>
            <p className="lead mt-7 max-w-2xl">
              Reviso tu WiFi, tu página web, tu tienda en línea, tu correo o tu app como lo haría un atacante, con autorización y sin
              detener tu operación. Te entrego qué encontré, qué tan grave es y cómo corregirlo, en palabras que se entienden.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <MessageCircle aria-hidden="true" className="size-4" />
                Diagnóstico gratis por WhatsApp
              </a>
              <Link href="/servicios/" className="btn btn-ghost">
                Ver servicios y precios
              </Link>
            </div>
          </div>
          <aside className="lg:col-span-4 lg:self-end">
            <dl className="border border-line bg-paper text-sm">
              {[
                ["Desde", `${formatCop(from)} + IVA, precio cerrado`],
                ["Certificaciones", certifications.map((c) => c.name).join(" · ")],
                ["Presencial", "Santa Marta, Magdalena"],
                ["Remoto", "Toda Colombia"],
                ["Informe", "En español claro, con prioridades"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 border-b border-line px-5 py-3.5 last:border-b-0">
                  <dt className="text-muted">{k}</dt>
                  <dd className="text-right font-semibold text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </section>

      {/* Para quién */}
      <section className="border-b border-line">
        <div className="wrap py-20 md:py-28">
          <SectionHead
            kicker="Para quién"
            title="¿A cuál de estos negocios se parece el tuyo?"
            lead="Cada tipo de negocio tiene un riesgo típico. Empieza por el que más se parece al tuyo."
          />
          <ol className="mt-14 grid gap-px border border-line bg-line md:grid-cols-2">
            {segments.map((seg, i) => {
              const pick = services.find((s) => s.id === seg.pick)!;
              return (
                <li key={seg.id} className="flex flex-col bg-ivory p-8">
                  <p className="font-serif text-lg text-rose-700">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="h-sub mt-2">{seg.name}</h3>
                  <p className="mt-1 text-sm text-muted">{seg.who}</p>
                  <p className="mt-5 flex-1 text-[0.97rem]">{seg.risk}</p>
                  <Link href={`/servicios/#${pick.id}`} className="arrow-link mt-6 text-sm">
                    Recomendado: {pick.name} <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Paquetes destacados */}
      <section className="border-b border-line bg-paper">
        <div className="wrap py-20 md:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead kicker="Servicios" title="Precios cerrados, sin sorpresas." lead="Paquetes con alcance y entregables definidos desde el principio. Estos son los más pedidos por pequeños negocios." />
            <Link href="/servicios/" className="arrow-link">
              Todos los servicios <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {featured.map((s) => (
              <ServiceCard key={s.id} s={s} />
            ))}
          </div>
        </div>
      </section>

      {/* Cómo trabajo */}
      <section className="border-b border-line">
        <div className="wrap grid gap-12 py-20 md:py-28 lg:grid-cols-12">
          <SectionHead
            className="lg:col-span-4"
            kicker="Cómo trabajo"
            title="Del primer mensaje al informe, en 1 a 3 semanas."
            lead="Siempre con autorización por escrito. Si encuentro algo crítico durante las pruebas, te aviso ese mismo día."
          />
          <ol className="lg:col-span-8">
            {steps.map((st, i) => (
              <li key={st.title} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-line py-6 first:border-t-0 first:pt-0">
                <span className="font-serif text-2xl text-rose-700">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-lg font-semibold font-sans">{st.title}</h3>
                  <p className="mt-1 text-muted">{st.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Quién soy */}
      <section className="on-dark bg-wine-900 text-ivory">
        <div className="wrap grid gap-12 py-20 md:py-28 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="kicker">Quién está detrás</p>
            <h2 className="h-section mt-4">Hola, soy Nebula.</h2>
            <div className="lead mt-6 space-y-4">
              <p>
                Soy especialista en seguridad ofensiva, ingeniero de software y profesional en comercio internacional. Mi formación como
                desarrollador me permite ir más allá de los escáneres automáticos: leo el código, entiendo cómo se construyó tu sistema y
                encuentro los fallos de lógica que las herramientas no ven.
              </p>
              <p>
                Vesta Security empieza atendiendo a pequeños negocios porque son los que más ataques reciben y los que menos acceso tienen a
                una auditoría seria. Cuando me escribes, hablas directamente conmigo.
              </p>
            </div>
          </div>
          <div className="space-y-10 lg:col-span-6">
            <div>
              <h3 className="kicker">Certificaciones</h3>
              <ul className="mt-4">
                {certifications.map((c) => (
                  <li key={c.name} className="flex gap-4 border-t border-ivory/20 py-4">
                    <ShieldCheck aria-hidden="true" className="mt-1 size-5 shrink-0 text-rose-300" />
                    <div>
                      <p className="font-semibold">
                        {c.name} <span className="font-normal text-ivory/70">· {c.full} · {c.issuer}</span>
                      </p>
                      <p className="text-sm text-ivory/75">{c.focus}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="kicker">Construyo lo que audito</h3>
              <ul className="mt-4">
                {projects.map((p) => (
                  <li key={p.name} className="border-t border-ivory/20 py-4">
                    {p.href.startsWith("http") ? (
                      <a href={p.href} target="_blank" rel="noopener noreferrer" className="font-semibold underline decoration-rose-300 underline-offset-4">
                        {p.name}
                      </a>
                    ) : (
                      <Link href={p.href} className="font-semibold underline decoration-rose-300 underline-offset-4">
                        {p.name}
                      </Link>
                    )}
                    <p className="text-sm text-ivory/75">{p.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Blog */}
      {posts.length > 0 && (
        <section className="border-b border-line">
          <div className="wrap py-20 md:py-28">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHead kicker="Blog" title="Seguridad explicada para negocios." />
              <Link href="/blog/" className="arrow-link">
                Todos los artículos <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
            <ul className="mt-12 grid gap-8 md:grid-cols-3">
              {posts.map((p) => (
                <li key={p.slug} className="border-t-2 border-wine pt-5">
                  <p className="text-xs font-semibold text-muted">
                    {formatDate(p.date)} · {p.minutes} min
                  </p>
                  <h3 className="mt-2 font-serif text-xl leading-snug">
                    <Link href={`/blog/${p.slug}/`} className="hover:text-rose-700">
                      {p.title}
                    </Link>
                  </h3>
                  <p className="mt-3 text-sm text-muted">{p.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Preguntas */}
      <section className="border-b border-line bg-paper">
        <div className="wrap grid gap-12 py-20 md:py-28 lg:grid-cols-12">
          <SectionHead className="lg:col-span-4" kicker="Preguntas frecuentes" title="Antes de escribirme." />
          <div className="lg:col-span-8">
            <Faq items={faq.slice(0, 5)} />
          </div>
        </div>
      </section>

      {/* Vesta app */}
      <section className="border-b border-line">
        <div className="wrap flex flex-col gap-4 py-10 md:flex-row md:items-center md:justify-between">
          <p className="text-[0.97rem]">
            <strong className="font-semibold">¿Buscas Vesta, la app de control parental?</strong>{" "}
            <span className="text-muted">Está en su propia sección, con descargas, ayuda y documentación.</span>
          </p>
          <Link href="/control-parental/" className="arrow-link shrink-0">
            Ir a Vesta control parental <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </section>

      <ContactBand />
    </>
  );
}
