import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { ContactBand, securityMeta } from "@/components/security/parts";
import { allPosts, formatDate } from "@/lib/blog";

export const metadata = securityMeta(
  "Blog",
  "Artículos sobre ciberseguridad para pequeños negocios: WiFi, correo, tiendas en línea, Firebase y protección de datos, explicados sin tecnicismos.",
  "/blog/",
);

export default function Page() {
  const posts = allPosts();
  return (
    <>
      <PageHero
        kicker="Blog"
        title="Seguridad explicada para negocios."
        lead={<p>Lo que veo en las auditorías, convertido en pasos que puedes aplicar tú mismo. Sin miedo y sin tecnicismos innecesarios.</p>}
      />
      <section className="border-b border-line">
        <div className="wrap py-14 md:py-20">
          {posts.length === 0 ? (
            <p className="text-muted">Pronto habrá artículos aquí.</p>
          ) : (
            <ul>
              {posts.map((p) => (
                <li key={p.slug} className="grid gap-4 border-t border-line py-9 first:border-t-0 first:pt-0 md:grid-cols-12">
                  <div className="text-sm text-muted md:col-span-3">
                    <time dateTime={p.date}>{formatDate(p.date)}</time>
                    <p>{p.minutes} min de lectura</p>
                    {p.tags.length > 0 && (
                      <p className="mt-3 flex flex-wrap gap-2">
                        {p.tags.map((t) => (
                          <span key={t} className="tag text-rose-700">
                            {t}
                          </span>
                        ))}
                      </p>
                    )}
                  </div>
                  <div className="md:col-span-9">
                    <h2 className="h-sub">
                      <Link href={`/blog/${p.slug}/`} className="hover:text-rose-700">
                        {p.title}
                      </Link>
                    </h2>
                    <p className="mt-3 max-w-3xl text-muted">{p.description}</p>
                    <Link href={`/blog/${p.slug}/`} className="arrow-link mt-4 text-sm">
                      Leer artículo →
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
      <ContactBand />
    </>
  );
}
