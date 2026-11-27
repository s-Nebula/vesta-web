import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, MessageCircle, Mail } from "lucide-react";
import { site } from "@/content/site";
import { contact, formatCop, waLink, withIva, type Service } from "@/content/security";

/** Metadatos de una página en español sin versión en inglés. */
export function securityMeta(title: string, description: string, path: string, absolute = false): Metadata {
  const url = `${site.url}${path}`;
  return {
    title: absolute ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "es_CO",
      siteName: site.name,
      title: absolute ? title : `${title} · ${site.name}`,
      description,
      url,
      images: [{ url: `${site.url}/og.png`, width: 1200, height: 630, alt: "Vesta Security" }],
    },
    twitter: { card: "summary_large_image", title, description, images: [`${site.url}/og.png`] },
  };
}

export function Price({ value, per, size = "lg" }: { value: number; per?: "mes"; size?: "lg" | "sm" }) {
  if (value === 0) {
    return <p className={`font-serif ${size === "lg" ? "text-[2.1rem]" : "text-2xl"} leading-none text-wine`}>Gratis</p>;
  }
  return (
    <div>
      <p className={`font-serif ${size === "lg" ? "text-[2.1rem]" : "text-2xl"} leading-none text-wine`}>
        {formatCop(value)}
        <span className="ml-1.5 font-sans text-sm font-semibold text-muted">
          + IVA{per ? ` / ${per}` : ""}
        </span>
      </p>
      <p className="mt-2 text-xs text-muted">
        Total con IVA: {formatCop(withIva(value))}
        {per ? ` al ${per}` : ""}
      </p>
    </div>
  );
}

/** Tarjeta compacta para la portada. */
export function ServiceCard({ s }: { s: Service }) {
  return (
    <article className="flex h-full flex-col border border-line bg-paper p-7">
      <p className="kicker">{s.modality}</p>
      <h3 className="h-sub mt-3">{s.name}</h3>
      <p className="mt-3 flex-1 text-[0.95rem] text-muted">{s.summary}</p>
      <div className="mt-6 border-t border-line pt-5">
        <Price value={s.price} per={s.per} size="sm" />
        <p className="mt-3 text-xs font-semibold text-ink">{s.duration}</p>
      </div>
      <Link href={`/servicios/#${s.id}`} className="arrow-link mt-5 text-sm">
        Qué incluye <ArrowRight aria-hidden="true" className="size-4" />
      </Link>
    </article>
  );
}

/** Ficha completa para la página de servicios. */
export function ServiceDetail({ s }: { s: Service }) {
  const msg = `Hola, me interesa el servicio "${s.name}" de Vesta Security.`;
  return (
    <article id={s.id} className="grid scroll-mt-28 gap-8 border-t border-line py-12 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <h3 className="h-sub">{s.name}</h3>
        <div className="mt-5">
          <Price value={s.price} per={s.per} />
        </div>
        <dl className="mt-6 space-y-3 text-sm">
          <div>
            <dt className="font-semibold text-ink">Duración</dt>
            <dd className="text-muted">{s.duration}</dd>
          </div>
          <div>
            <dt className="font-semibold text-ink">Modalidad</dt>
            <dd className="text-muted">{s.modality}</dd>
          </div>
          <div>
            <dt className="font-semibold text-ink">Alcance</dt>
            <dd className="text-muted">{s.scope}</dd>
          </div>
        </dl>
        <a href={waLink(msg)} target="_blank" rel="noopener noreferrer" className="btn btn-ghost mt-7">
          <MessageCircle aria-hidden="true" className="size-4" />
          {s.price === 0 ? "Agendar por WhatsApp" : "Lo quiero"}
        </a>
      </div>
      <div className="lg:col-span-8">
        <p className="lead">{s.summary}</p>
        <ul className="mt-7 grid gap-3 sm:grid-cols-2">
          {s.includes.map((i) => (
            <li key={i} className="flex gap-3 text-[0.95rem]">
              <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-rose-700" />
              <span>{i}</span>
            </li>
          ))}
        </ul>
        {(s.needs || s.note) && (
          <div className="mt-7 space-y-2 border-l-2 border-beige pl-5 text-sm text-muted">
            {s.needs && (
              <p>
                <strong className="font-semibold text-ink">Lo que necesito de ti:</strong> {s.needs}
              </p>
            )}
            {s.note && <p>{s.note}</p>}
          </div>
        )}
      </div>
    </article>
  );
}

/** Bloque oscuro de contacto al final de las páginas. */
export function ContactBand({ id = "contacto" }: { id?: string }) {
  return (
    <section id={id} className="on-dark scroll-mt-20 bg-wine text-ivory">
      <div className="wrap grid gap-10 py-20 md:py-24 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="kicker">Contacto</p>
          <h2 className="h-section mt-4">Empieza con un diagnóstico gratuito.</h2>
          <p className="lead mt-6 max-w-xl">
            Escríbeme por WhatsApp y cuéntame a qué se dedica tu negocio. En 30 minutos te digo qué riesgos veo y qué harías primero, sin
            compromiso.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <MessageCircle aria-hidden="true" className="size-4" />
              Escribir por WhatsApp
            </a>
            <a href={`mailto:${contact.email}?subject=${encodeURIComponent("Diagnóstico de seguridad")}`} className="btn btn-ghost">
              <Mail aria-hidden="true" className="size-4" />
              {contact.email}
            </a>
          </div>
        </div>
        <dl className="grid content-end gap-6 text-sm lg:col-span-5">
          <div className="border-t border-ivory/25 pt-4">
            <dt className="text-rose-300">WhatsApp</dt>
            <dd className="mt-1 text-lg">{contact.phone}</dd>
          </div>
          <div className="border-t border-ivory/25 pt-4">
            <dt className="text-rose-300">Cobertura</dt>
            <dd className="mt-1 text-lg">{contact.coverage}</dd>
          </div>
          <div className="border-t border-ivory/25 pt-4">
            <dt className="text-rose-300">Horario</dt>
            <dd className="mt-1 text-lg">Lunes a viernes, 8:00 a. m. a 6:00 p. m.</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
