import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { securityMeta } from "@/components/security/parts";
import { JsonLd } from "@/lib/seo";
import { allPosts, formatDate, getPost } from "@/lib/blog";
import { site, company } from "@/content/site";
import { waLink } from "@/content/security";
import { apps } from "@/content/apps";

export const dynamicParams = false;

export function generateStaticParams() {
  return allPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPost(slug);
  const meta = securityMeta(p.title, p.description, `/blog/${slug}/`);
  return { ...meta, openGraph: { ...meta.openGraph, type: "article", publishedTime: p.date } };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPost(slug);
  const others = allPosts().filter((o) => o.slug !== slug).slice(0, 2);
  const app = p.app ? apps.find((a) => a.id === p.app) : undefined;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: p.title,
          description: p.description,
          datePublished: p.date,
          inLanguage: "es-CO",
          url: `${site.url}/blog/${slug}/`,
          author: { "@type": "Person", name: company.author },
          publisher: { "@type": "Organization", name: site.name },
        }}
      />
      <article>
        <header className="border-b border-night-600">
          <div className="sx-wrap max-w-[50rem] pb-12 pt-12 md:pb-16 md:pt-16">
            <Link href={app ? app.href : "/blog/"} className="sx-arrow text-sm">
              <ArrowLeft aria-hidden="true" className="size-4" /> {app ? app.name : "Blog"}
            </Link>
            <h1 className="mt-7 text-[clamp(2rem,1.3rem+2.8vw,3.4rem)] font-medium leading-[1.04] tracking-[-0.04em]">{p.title}</h1>
            <p className="sx-lead mt-6">{p.description}</p>
            <p className="sx-mono mt-7 text-[0.75rem] text-dim">
              por {company.author} · <time dateTime={p.date}>{formatDate(p.date)}</time> · {p.minutes} min de lectura
            </p>
          </div>
        </header>
        <div className="sx-wrap max-w-[50rem] py-12 md:py-16">
          <div className="sx-prose" dangerouslySetInnerHTML={{ __html: p.html }} />

          {app ? (
            <aside className="sx-panel mt-16 flex flex-wrap items-center gap-5 p-7">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={app.logo} alt="" width={48} height={48} className="size-12 rounded-xl" />
              <div className="flex-1">
                <p className="text-lg font-medium">{app.name}</p>
                <p className="text-[0.9rem] text-mist">{app.summary}</p>
              </div>
              <Link href={app.href} className="sx-btn sx-btn-ghost">
                Ver la app <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </aside>
          ) : (
            <aside className="sx-glass mt-16 p-8">
              <p className="text-[1.35rem] font-medium tracking-[-0.02em]">
                ¿Quieres saber cómo está <span className="sx-em">tu negocio?</span>
              </p>
              <p className="mt-2 text-mist">El diagnóstico es gratuito: 30 minutos y una revisión de lo que se ve desde internet.</p>
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="sx-btn sx-btn-primary mt-6">
                Agendar por WhatsApp <ArrowRight aria-hidden="true" className="size-4" />
              </a>
            </aside>
          )}

          {others.length > 0 && (
            <nav aria-label="Otros artículos" className="mt-16">
              <p className="sx-label">Sigue leyendo</p>
              <ul className="mt-5 grid gap-6 sm:grid-cols-2">
                {others.map((o) => (
                  <li key={o.slug} className="border-t border-night-500 pt-4">
                    <Link href={`/blog/${o.slug}/`} className="text-[1.1rem] font-medium leading-snug tracking-[-0.02em] hover:text-violet-200">
                      {o.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </article>
    </>
  );
}
