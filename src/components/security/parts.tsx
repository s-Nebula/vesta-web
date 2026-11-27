import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import { site } from "@/content/site";
import { contact, formatCop, waLink, withIva, type QA, type Service } from "@/content/security";

/** Metadatos de una página en español sin versión en inglés. */
export function securityMeta(title: string, description: string, path: string, absolute = false, image = "/og-servicios.png"): Metadata {
  const url = `${site.url}${path}`;
  const full = absolute ? title : `${title} · ${site.name}`;
  return {
    title: absolute ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "es_CO",
      siteName: site.name,
      title: full,
      description,
      url,
      images: [{ url: `${site.url}${image}`, width: 1200, height: 630, alt: full }],
    },
    twitter: { card: "summary_large_image", title: full, description, images: [`${site.url}${image}`] },
  };
}

/** Encabezado de sección: rótulo en monoespaciada, título y entradilla. */
export function Head({
  label,
  title,
  lead,
  className = "",
  as = "h2",
}: {
  label?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  className?: string;
  as?: "h1" | "h2";
}) {
  const H = as;
  return (
    <div className={className}>
      {label && <p className="sx-label">{label}</p>}
      <H className={`${as === "h1" ? "sx-display" : "sx-h2"} ${label ? "mt-4" : ""}`}>{title}</H>
      {lead && <div className="sx-lead mt-5 max-w-2xl">{lead}</div>}
    </div>
  );
}

export function Price({ value, per, size = "lg" }: { value: number; per?: "mes"; size?: "lg" | "sm" }) {
  const big = size === "lg" ? "text-[2.3rem]" : "text-[1.7rem]";
  if (value === 0) return <p className={`${big} font-medium leading-none tracking-[-0.04em]`}>Gratis</p>;
  return (
    <div>
      <p className={`${big} font-medium leading-none tracking-[-0.04em] tabular-nums`}>
        {formatCop(value)}
        <span className="ml-1.5 text-[0.8rem] font-medium tracking-normal text-mist">+ IVA{per ? ` / ${per}` : ""}</span>
      </p>
      <p className="sx-mono mt-2 text-[0.72rem] text-dim">
        total {formatCop(withIva(value))}
        {per ? ` / ${per}` : ""}
      </p>
    </div>
  );
}

/** Tarjeta compacta (portada). */
export function ServiceCard({ s, index }: { s: Service; index: number }) {
  return (
    <Link href={`/servicios/#${s.id}`} className="sx-panel group flex h-full flex-col p-6 transition-colors hover:border-violet-500/60">
      <div className="flex items-start justify-between gap-4">
        <span className="sx-mono text-xs text-dim">{String(index + 1).padStart(2, "0")}</span>
        <span className="sx-chip">{s.modality}</span>
      </div>
      <h3 className="sx-h3 mt-8">{s.name}</h3>
      <p className="mt-3 flex-1 text-[0.93rem] leading-relaxed text-mist">{s.summary}</p>
      <div className="mt-7 flex items-end justify-between gap-4 border-t border-night-600 pt-5">
        <Price value={s.price} per={s.per} size="sm" />
        <ArrowUpRight aria-hidden="true" className="size-5 shrink-0 text-violet-300 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}

/** Ficha completa (página de servicios). */
export function ServiceDetail({ s }: { s: Service }) {
  const msg = `Hola, me interesa el servicio "${s.name}" de Vesta Security.`;
  return (
    <article id={s.id} className="grid scroll-mt-28 gap-8 border-t border-night-600 py-12 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <h3 className="sx-h3 !text-[1.6rem]">{s.name}</h3>
        <div className="mt-5">
          <Price value={s.price} per={s.per} />
        </div>
        <dl className="mt-7 grid grid-cols-[6.5rem_1fr] gap-x-4 gap-y-2.5 text-[0.9rem]">
          <dt className="sx-mono text-[0.72rem] uppercase tracking-wider text-dim">Duración</dt>
          <dd>{s.duration}</dd>
          <dt className="sx-mono text-[0.72rem] uppercase tracking-wider text-dim">Modalidad</dt>
          <dd>{s.modality}</dd>
          <dt className="sx-mono text-[0.72rem] uppercase tracking-wider text-dim">Alcance</dt>
          <dd>{s.scope}</dd>
        </dl>
        <a href={waLink(msg)} target="_blank" rel="noopener noreferrer" className="sx-btn sx-btn-ghost mt-7">
          {s.price === 0 ? "Agendar por WhatsApp" : "Lo quiero"} <ArrowRight aria-hidden="true" className="size-4" />
        </a>
      </div>
      <div className="lg:col-span-8">
        <p className="sx-lead">{s.summary}</p>
        <ul className="mt-7 grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {s.includes.map((i) => (
            <li key={i} className="flex gap-3 text-[0.95rem]">
              <span aria-hidden="true" className="sx-mono mt-[0.2rem] text-xs text-violet-400">
                +
              </span>
              <span>{i}</span>
            </li>
          ))}
        </ul>
        {(s.needs || s.note) && (
          <div className="mt-7 space-y-2 border-l border-violet-500/50 pl-5 text-[0.9rem] text-mist">
            {s.needs && (
              <p>
                <span className="text-haze">Lo que necesito de ti:</span> {s.needs}
              </p>
            )}
            {s.note && <p>{s.note}</p>}
          </div>
        )}
      </div>
    </article>
  );
}

export function SxFaq({ items }: { items: QA[] }) {
  return (
    <div className="border-t border-night-600">
      {items.map((item) => (
        <details key={item.q} className="group border-b border-night-600">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
            <h3 className="text-[1.15rem] font-medium leading-snug tracking-[-0.02em] md:text-[1.3rem]">{item.q}</h3>
            <Plus aria-hidden="true" className="mt-1 size-5 shrink-0 text-violet-300 transition-transform duration-300 group-open:rotate-45" />
          </summary>
          <div className="max-w-3xl pb-7 pr-10 text-[0.98rem] leading-relaxed text-mist">
            {item.a.map((p) => (
              <p key={p} className="mt-3 first:mt-0">
                {p}
              </p>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}

/** Cinta inclinada con palabras (se duplica para el desplazamiento continuo). */
export function Ribbon({ words }: { words: string[] }) {
  const row = (hidden: boolean) =>
    words.map((w, i) => (
      <span key={`${hidden}-${i}`} className="inline-flex items-center gap-[2.4rem]" aria-hidden={hidden || undefined}>
        {w}
        <span aria-hidden="true">/</span>
      </span>
    ));
  return (
    <div className="relative my-2 overflow-hidden py-8">
      <div className="sx-ribbon -mx-8">
        <p className="sx-ribbon-track">
          {row(false)}
          {row(true)}
        </p>
      </div>
    </div>
  );
}

/** Bloque de contacto al final de las páginas. */
export function ContactBand({ id = "contacto" }: { id?: string }) {
  return (
    <section id={id} className="scroll-mt-20 py-20 md:py-28">
      <div className="sx-wrap">
        <div className="sx-glass grid gap-12 p-8 md:p-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="sx-label">Contacto</p>
            <h2 className="sx-h2 mt-4">
              Empieza con un <span className="sx-em">diagnóstico</span> gratuito.
            </h2>
            <p className="sx-lead mt-6 max-w-xl">
              Escríbeme por WhatsApp y cuéntame a qué se dedica tu negocio. En 30 minutos te digo qué riesgos veo y qué harías primero, sin
              compromiso.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="sx-btn sx-btn-primary">
                Escribir por WhatsApp <ArrowRight aria-hidden="true" className="size-4" />
              </a>
              <a href={`mailto:${contact.email}?subject=${encodeURIComponent("Diagnóstico de seguridad")}`} className="sx-btn sx-btn-ghost">
                {contact.email}
              </a>
            </div>
          </div>
          <dl className="grid content-end gap-5 text-sm lg:col-span-5">
            {[
              ["WhatsApp", contact.phone],
              ["Cobertura", contact.coverage],
              ["Horario", "Lunes a viernes, 8:00 a. m. a 6:00 p. m."],
            ].map(([k, v]) => (
              <div key={k} className="border-t border-white/10 pt-4">
                <dt className="sx-label !text-[0.68rem]">{k}</dt>
                <dd className="mt-1.5 text-lg">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
