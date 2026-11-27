import Link from "next/link";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { securityMeta } from "@/components/security/parts";
import { JsonLd } from "@/lib/seo";
import { allPosts, formatDate, getPost } from "@/lib/blog";
import { site, company } from "@/content/site";
import { waLink } from "@/content/security";

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
          publisher: { "@type": "Organization", name: site.name, logo: `${site.url}/brand/vesta_logo.svg` },
        }}
      />
      <article>
        <header className="border-b border-line">
          <div className="wrap max-w-[52rem] pb-12 pt-12 md:pb-16 md:pt-16">
            <Link href="/blog/" className="arrow-link text-sm">
              <ArrowLeft aria-hidden="true" className="size-4" /> Blog
            </Link>
            <h1 className="mt-6 font-serif text-[clamp(2rem,1.4rem+2.6vw,3.3rem)] leading-[1.08] tracking-[-0.025em]">{p.title}</h1>
            <p className="lead mt-6">{p.description}</p>
            <p className="mt-6 text-sm text-muted">
              Por {company.author} · <time dateTime={p.date}>{formatDate(p.date)}</time> · {p.minutes} min de lectura
            </p>
          </div>
        </header>
        <div className="wrap max-w-[52rem] py-12 md:py-16">
          <div className="prose-legal prose-blog" dangerouslySetInnerHTML={{ __html: p.html }} />

          <aside className="mt-16 border border-line bg-paper p-7">
            <p className="font-serif text-xl">¿Quieres saber cómo está tu negocio?</p>
            <p className="mt-2 text-muted">El diagnóstico es gratuito: 30 minutos y una revisión de lo que se ve desde internet.</p>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-5">
              <MessageCircle aria-hidden="true" className="size-4" />
              Agendar por WhatsApp
            </a>
          </aside>

          {others.length > 0 && (
            <nav aria-label="Otros artículos" className="mt-16">
              <p className="kicker">Sigue leyendo</p>
              <ul className="mt-4 grid gap-6 sm:grid-cols-2">
                {others.map((o) => (
                  <li key={o.slug} className="border-t-2 border-wine pt-4">
                    <Link href={`/blog/${o.slug}/`} className="font-serif text-lg leading-snug hover:text-rose-700">
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
