import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ContactBand, Head, securityMeta } from "@/components/security/parts";
import { allPosts, formatDate } from "@/lib/blog";

export const metadata = securityMeta(
  "Blog",
  "Artículos sobre ciberseguridad para pequeños negocios: WiFi, correo, tiendas en línea, Firebase, protección de datos y las aplicaciones de Vesta Security.",
  "/blog/",
);

export default function Page() {
  const posts = allPosts();
  return (
    <>
      <section className="border-b border-night-600">
        <div className="sx-wrap pb-14 pt-16 md:pt-20">
          <Head
            as="h1"
            label="Blog"
            title={
              <>
                Seguridad explicada <span className="sx-em">sin tecnicismos.</span>
              </>
            }
            lead="Lo que veo en las auditorías, convertido en pasos que puedes aplicar tú mismo. También, novedades de las aplicaciones."
          />
        </div>
      </section>
      <section className="py-14 md:py-20">
        <div className="sx-wrap">
          {posts.length === 0 ? (
            <p className="text-mist">Pronto habrá artículos aquí.</p>
          ) : (
            <ul>
              {posts.map((p) => (
                <li key={p.slug} className="grid gap-4 border-t border-night-600 py-10 md:grid-cols-12">
                  <div className="md:col-span-3">
                    <p className="sx-mono text-[0.82rem] text-dim">
                      <time dateTime={p.date}>{formatDate(p.date)}</time> · {p.minutes} min
                    </p>
                    {p.tags.length > 0 && (
                      <p className="mt-3 flex flex-wrap gap-2">
                        {p.tags.map((t) => (
                          <span key={t} className="sx-chip">
                            {t}
                          </span>
                        ))}
                      </p>
                    )}
                  </div>
                  <div className="md:col-span-9">
                    <h2 className="text-[1.6rem] font-medium leading-tight tracking-[-0.03em] md:text-[1.9rem]">
                      <Link href={`/blog/${p.slug}/`} className="hover:text-violet-200">
                        {p.title}
                      </Link>
                    </h2>
                    <p className="mt-3 max-w-3xl leading-relaxed text-mist">{p.description}</p>
                    <Link href={`/blog/${p.slug}/`} className="sx-arrow mt-5">
                      Leer artículo <ArrowRight aria-hidden="true" className="size-4" />
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
