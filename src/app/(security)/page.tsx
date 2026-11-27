import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ContactBand, Head, Ribbon, ServiceCard, SxFaq, securityMeta } from "@/components/security/parts";
import { JsonLd } from "@/lib/seo";
import { allPosts, formatDate } from "@/lib/blog";
import { site, company } from "@/content/site";
import { apps } from "@/content/apps";
import { certifications, faq, formatCop, segments, services, steps, waLink } from "@/content/security";

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
  email: company.email,
  telephone: company.phone,
  priceRange: "$$",
  areaServed: { "@type": "Country", name: "Colombia" },
  address: { "@type": "PostalAddress", addressLocality: "Santa Marta", addressRegion: "Magdalena", addressCountry: "CO" },
  makesOffer: services
    .filter((s) => s.price > 0)
    .map((s) => ({ "@type": "Offer", name: s.name, price: s.price, priceCurrency: "COP", url: `${site.url}/servicios/#${s.id}` })),
};

const ribbon = [
  "Red Segura para Comercios",
  "OWASP Top 10",
  "Tienda en Línea Segura",
  "SPF · DKIM · DMARC",
  "Reglas de Firebase",
  "Ley 1581 de 2012",
  "Pentest Android",
  "Oficina Protegida",
  "Revisión de código",
];

/** Un hallazgo de ejemplo, con el formato real de los informes. */
function FindingCard() {
  return (
    <figure className="sx-panel relative overflow-hidden p-0 shadow-2xl shadow-black/40">
      <div className="flex items-center justify-between border-b border-night-600 px-5 py-3">
        <span className="sx-mono text-[0.72rem] text-dim">informe · hallazgo VS-07</span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#3a1d22] px-2.5 py-1 text-[0.72rem] font-semibold text-[#f3a7a7]">
          <span className="size-1.5 rounded-full bg-[#f07a7a]" /> Alta · CVSS 8.1
        </span>
      </div>
      <div className="space-y-4 px-5 py-5">
        <p className="text-[1.08rem] font-medium leading-snug tracking-[-0.01em]">El cupón de bienvenida se puede aplicar varias veces en el mismo pedido.</p>
        <dl className="grid grid-cols-[5.5rem_1fr] gap-x-4 gap-y-2.5 text-[0.86rem]">
          <dt className="sx-mono text-[0.7rem] uppercase tracking-wider text-dim">Impacto</dt>
          <dd className="text-mist">Un pedido de $96.000 se pagó en $12.000.</dd>
          <dt className="sx-mono text-[0.7rem] uppercase tracking-wider text-dim">Evidencia</dt>
          <dd className="sx-mono text-[0.78rem] text-violet-200">POST /checkout · coupon=BIENVENIDA ×8</dd>
          <dt className="sx-mono text-[0.7rem] uppercase tracking-wider text-dim">Corrección</dt>
          <dd className="text-mist">Validar el cupón en el servidor y marcarlo como usado al confirmar el pago.</dd>
        </dl>
      </div>
      <figcaption className="border-t border-night-600 px-5 py-3 text-[0.75rem] text-dim">Así se ve un hallazgo en tus informes. Ejemplo ilustrativo.</figcaption>
    </figure>
  );
}

export default function Page() {
  const featured = services.filter((s) => s.featured);
  const posts = allPosts().slice(0, 3);
  const from = Math.min(...services.filter((s) => s.price > 0).map((s) => s.price));

  return (
    <>
      <JsonLd data={schema} />

      {/* Portada */}
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="sx-grid-bg pointer-events-none absolute inset-0" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 size-[42rem] rounded-full bg-violet-600/10 blur-3xl" />
        <div className="sx-wrap relative grid gap-14 pb-16 pt-16 md:pt-24 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <p className="sx-chip">
              <span className="size-1.5 rounded-full bg-violet-400" /> Santa Marta · Remoto en toda Colombia
            </p>
            <h1 className="sx-display mt-7">
              Encuentro las fallas de tu negocio <span className="sx-em">antes que un delincuente.</span>
            </h1>
            <p className="sx-lead mt-7 max-w-xl">
              Reviso tu WiFi, tu página web, tu tienda en línea, tu correo o tu app como lo haría un atacante, con autorización y sin detener tu
              operación. Te entrego qué encontré, qué tan grave es y cómo corregirlo, en palabras que se entienden.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="sx-btn sx-btn-primary">
                Diagnóstico gratis por WhatsApp <ArrowRight aria-hidden="true" className="size-4" />
              </a>
              <Link href="/servicios/" className="sx-btn sx-btn-ghost">
                Servicios y precios
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5 lg:pt-6">
            <FindingCard />
          </div>
        </div>

        {/* Datos reales, no métricas de relleno */}
        <div className="sx-wrap relative pb-10">
          <dl className="grid grid-cols-2 border-t border-night-600 md:grid-cols-4">
            {[
              [formatCop(from), "+ IVA, el servicio más económico, con precio cerrado"],
              ["OSWE · PNPT · eJPT", "certificaciones internacionales en pruebas de penetración"],
              ["60 días", "para la nueva prueba incluida, cuando corrijas"],
              ["0", "pruebas sin autorización firmada (Ley 1273 de 2009)"],
            ].map(([k, v], i) => (
              <div key={k} className={`py-7 pr-6 ${i > 0 ? "md:border-l md:border-night-600 md:pl-6" : ""} ${i % 2 ? "border-l border-night-600 pl-6 md:pl-6" : ""}`}>
                <dt className="text-[1.45rem] font-medium tracking-[-0.04em] md:text-[1.75rem]">{k}</dt>
                <dd className="mt-2 text-[0.86rem] leading-snug text-mist">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Ribbon words={ribbon} />

      {/* Para quién */}
      <section className="py-20 md:py-28">
        <div className="sx-wrap">
          <Head
            label="Para quién"
            title={
              <>
                ¿A cuál se parece <span className="sx-em">tu negocio?</span>
              </>
            }
            lead="Cada tipo de negocio tiene un riesgo típico. Empieza por el que más se parece al tuyo."
          />
          <ol className="mt-14 grid gap-4 md:grid-cols-2">
            {segments.map((seg, i) => {
              const pick = services.find((s) => s.id === seg.pick)!;
              return (
                <li key={seg.id} className="sx-panel flex flex-col p-7 md:p-8">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="sx-h3">{seg.name}</h3>
                    <span className="sx-mono text-xs text-dim">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <p className="mt-1.5 text-[0.88rem] text-dim">{seg.who}</p>
                  <p className="mt-5 flex-1 leading-relaxed text-mist">{seg.risk}</p>
                  <Link href={`/servicios/#${pick.id}`} className="sx-arrow mt-6">
                    {pick.name} <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Servicios destacados */}
      <section className="border-y border-night-600 bg-night-950/60 py-20 md:py-28">
        <div className="sx-wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Head
              label="Servicios"
              title={
                <>
                  Precio cerrado, <span className="sx-em">sin sorpresas.</span>
                </>
              }
              lead="Alcance y entregables definidos desde el principio. Estos son los que más piden los pequeños negocios."
            />
            <Link href="/servicios/" className="sx-arrow">
              Los 9 servicios <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
          <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {featured.map((s, i) => (
              <ServiceCard key={s.id} s={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Cómo trabajo */}
      <section className="py-20 md:py-28">
        <div className="sx-wrap grid gap-14 lg:grid-cols-12">
          <Head
            className="lg:col-span-5"
            label="Cómo trabajo"
            title={
              <>
                Del primer mensaje al informe, <span className="sx-em">en 1 a 3 semanas.</span>
              </>
            }
            lead="Siempre con autorización por escrito. Si encuentro algo crítico durante las pruebas, te aviso ese mismo día."
          />
          <ol className="lg:col-span-7">
            {steps.map((st, i) => (
              <li key={st.title} className="grid grid-cols-[3.2rem_1fr] gap-4 border-t border-night-600 py-6 last:border-b">
                <span className="sx-mono pt-1 text-sm text-violet-300">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-[1.15rem] font-semibold tracking-[-0.015em]">{st.title}</h3>
                  <p className="mt-1 text-mist">{st.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Quién soy */}
      <section className="pb-20 md:pb-28">
        <div className="sx-wrap">
          <div className="sx-glass grid gap-12 p-8 md:p-14 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <p className="sx-label">Quién está detrás</p>
              <h2 className="sx-h2 mt-4">
                Hola, soy <span className="sx-em">Nebula.</span>
              </h2>
              <div className="sx-lead mt-6 space-y-4">
                <p>
                  Soy especialista en seguridad ofensiva, ingeniero de software y profesional en comercio internacional. Como desarrollador, leo
                  el código y entiendo cómo se construyó tu sistema: así encuentro los fallos de lógica que los escáneres automáticos no ven.
                </p>
                <p>
                  Empiezo con pequeños negocios porque son los que más ataques reciben y los que menos acceso tienen a una auditoría seria. Cuando
                  escribes, hablas directamente conmigo.
                </p>
              </div>
            </div>
            <div className="lg:col-span-6">
              <h3 className="sx-label">Certificaciones</h3>
              <ul className="mt-4">
                {certifications.map((c) => (
                  <li key={c.name} className="grid grid-cols-[5.5rem_1fr] gap-4 border-t border-white/10 py-4">
                    <span className="text-[1.25rem] font-semibold tracking-[-0.02em]">{c.name}</span>
                    <div>
                      <p className="text-[0.95rem]">
                        {c.full} <span className="text-mist">· {c.issuer}</span>
                      </p>
                      <p className="text-[0.86rem] text-mist">{c.focus}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <a href="https://github.com/s-Nebula" target="_blank" rel="noopener noreferrer" className="sx-arrow mt-4">
                Mi código en GitHub <ArrowUpRight aria-hidden="true" className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Aplicaciones */}
      <section className="border-y border-night-600 bg-night-950/60 py-20 md:py-28">
        <div className="sx-wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Head
              label="Aplicaciones"
              title={
                <>
                  Construyo lo que <span className="sx-em">audito.</span>
                </>
              }
              lead="Tres aplicaciones propias, en uso real, diseñadas con la seguridad que reviso en las de mis clientes."
            />
            <Link href="/aplicaciones/" className="sx-arrow">
              Ver aplicaciones <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
          <ul className="mt-14 grid gap-4 lg:grid-cols-3">
            {apps.map((a) => (
              <li key={a.id}>
                <Link href={a.href} className="sx-panel group flex h-full flex-col p-7 transition-colors hover:border-night-500">
                  <div className="flex items-center gap-3.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={a.logo} alt="" width={44} height={44} className="size-11 rounded-xl" />
                    <div>
                      <p className="text-[1.15rem] font-semibold tracking-[-0.02em]">{a.name}</p>
                      <p className="text-[0.82rem]" style={{ color: a.accent }}>
                        {a.kind}
                      </p>
                    </div>
                  </div>
                  <p className="mt-6 leading-relaxed text-mist">{a.summary}</p>
                  <p className="mt-5 flex-1 border-l-2 pl-4 text-[0.9rem] leading-relaxed" style={{ borderColor: a.accent }}>
                    {a.security}
                  </p>
                  <p className="sx-mono mt-6 flex items-center justify-between text-[0.75rem] text-dim">
                    {a.platform}
                    <ArrowUpRight aria-hidden="true" className="size-4 text-mist transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Blog */}
      {posts.length > 0 && (
        <section className="py-20 md:py-28">
          <div className="sx-wrap">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <Head
                label="Blog"
                title={
                  <>
                    Seguridad explicada <span className="sx-em">sin tecnicismos.</span>
                  </>
                }
              />
              <Link href="/blog/" className="sx-arrow">
                Todos los artículos <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
            <ul className="mt-12 grid gap-10 md:grid-cols-3">
              {posts.map((p) => (
                <li key={p.slug} className="border-t border-night-500 pt-5">
                  <p className="sx-mono text-[0.72rem] text-dim">
                    {formatDate(p.date)} · {p.minutes} min
                  </p>
                  <h3 className="mt-3 text-[1.2rem] font-medium leading-snug tracking-[-0.02em]">
                    <Link href={`/blog/${p.slug}/`} className="hover:text-violet-200">
                      {p.title}
                    </Link>
                  </h3>
                  <p className="mt-3 text-[0.92rem] leading-relaxed text-mist">{p.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Preguntas */}
      <section className="border-t border-night-600 py-20 md:py-28">
        <div className="sx-wrap grid gap-12 lg:grid-cols-12">
          <Head
            className="lg:col-span-4"
            label="Preguntas frecuentes"
            title={
              <>
                Antes de <span className="sx-em">escribirme.</span>
              </>
            }
          />
          <div className="lg:col-span-8">
            <SxFaq items={faq.slice(0, 5)} />
          </div>
        </div>
      </section>

      <ContactBand />
    </>
  );
}
