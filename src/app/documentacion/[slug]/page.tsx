import Link from "next/link";
import { notFound } from "next/navigation";
import { FileDown, ChevronDown } from "lucide-react";
import { legalDocs, getDoc, type LegalDoc } from "@/content/legal";
import { LegalBody } from "@/components/legal/LegalBody";
import { Toc } from "@/components/legal/Toc";
import { PrintButton } from "@/components/legal/PrintButton";
import { Pending } from "@/components/ui/Pending";
import { pageMeta, JsonLd } from "@/lib/seo";
import { site } from "@/content/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return legalDocs.map((d) => ({ slug: d.slug }));
}

type Params = { params: Promise<{ slug: LegalDoc["slug"] }> };

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const doc = getDoc(slug);
  return pageMeta({ title: doc.shortTitle, description: doc.summary, path: `/documentacion/${doc.slug}/` });
}

export default async function LegalDocPage({ params }: Params) {
  const { slug } = await params;
  const doc = legalDocs.find((d) => d.slug === slug);
  if (!doc) notFound();

  const toc = doc.source.blocks.filter((b) => b.type === "h2").map((b) => ({ id: (b as { id: string }).id, text: (b as { text: string }).text }));
  const others = legalDocs.filter((d) => d.slug !== doc.slug);

  const meta: [string, string][] = [
    ["Versión", doc.version],
    [doc.slug === "guia-de-usuario" ? "Publicación" : "Entrada en vigor", doc.effectiveDate],
    ["Última actualización", doc.updatedDate],
    ["Responsable", "FORBIDDEN S.A.S."],
  ];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: doc.title,
          url: `${site.url}/documentacion/${doc.slug}/`,
          inLanguage: "es",
          version: doc.version,
          datePublished: "2026-11-20",
          dateModified: "2026-11-20",
          publisher: { "@type": "Organization", name: "FORBIDDEN S.A.S." },
        }}
      />
      <header className="border-b border-line">
        <div className="wrap pb-12 pt-10 md:pb-16 md:pt-14">
          <nav aria-label="Ruta de navegación" className="no-print text-xs text-muted">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/documentacion/" className="hover:text-wine">
                  Documentación
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-ink">
                {doc.shortTitle}
              </li>
            </ol>
          </nav>
          <p className="kicker mt-10">{doc.kicker} · Documento oficial</p>
          <h1 className="mt-5 max-w-4xl font-serif text-[2.4rem] leading-[1.05] tracking-[-0.025em] md:text-[3.6rem]">{doc.title}</h1>
          {doc.source.subtitle && <p className="lead mt-6 max-w-3xl">{doc.source.subtitle}</p>}

          <dl className="mt-10 grid grid-cols-2 border-t border-wine text-sm md:grid-cols-4">
            {meta.map(([k, v], i) => (
              <div key={k} className={`border-b border-line py-4 pr-4 ${i % 2 === 1 ? "pl-4 md:pl-0" : ""} md:border-b-0`}>
                <dt className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-muted">{k}</dt>
                <dd className="mt-1 font-medium">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="no-print mt-8 flex flex-wrap items-center gap-3">
            <PrintButton />
            {doc.pdfUrl ? (
              <a href={doc.pdfUrl} className="btn btn-primary !min-h-[2.5rem] !py-1.5 text-sm" download>
                <FileDown aria-hidden="true" className="size-4" />
                Descargar PDF oficial
              </a>
            ) : (
              <Pending what={`PDF oficial de «${doc.shortTitle}» (pdfUrl en src/content/legal.ts). Sin PDF no se muestra el botón.`} />
            )}
          </div>
        </div>
      </header>

      {doc.status === "pendiente" ? (
        <div className="wrap py-20">
          <p className="max-w-2xl text-muted">
            Este documento se publicará aquí cuando su versión oficial esté aprobada.
          </p>
          <Pending what={`texto oficial aprobado de «${doc.title}». Ejecuta npm run legal con el .docx en legal-source/.`} />
        </div>
      ) : (
        <div className="wrap grid gap-10 py-12 md:py-16 lg:grid-cols-12">
          <aside className="no-print lg:col-span-3">
            {/* Móvil: índice plegable */}
            <details className="group border-y border-line lg:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-sm font-semibold [&::-webkit-details-marker]:hidden">
                Índice de contenidos
                <ChevronDown aria-hidden="true" className="size-4 transition-transform group-open:rotate-180" />
              </summary>
              <div className="pb-4">
                <ol className="space-y-1 text-sm">
                  {toc.map((t) => (
                    <li key={t.id}>
                      <a href={`#${t.id}`} className="block py-1.5 text-muted hover:text-wine">
                        {t.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </details>
            {/* Escritorio: índice fijo */}
            <nav aria-label="Índice de contenidos" className="sticky top-24 hidden max-h-[calc(100dvh-7rem)] overflow-y-auto pb-6 lg:block">
              <p className="kicker mb-4">Índice</p>
              <Toc items={toc} />
            </nav>
          </aside>

          <article className="min-w-0 lg:col-span-8 lg:col-start-5">
            <LegalBody blocks={doc.source.blocks} withFigures={doc.slug === "guia-de-usuario"} />
            {doc.source.closing.length > 0 && (
              <footer className="mt-16 border-t border-line pt-6 text-xs text-muted">
                {doc.source.closing.map((c) => (
                  <p key={c} className="mt-1">
                    {c}
                  </p>
                ))}
              </footer>
            )}
            {doc.slug === "guia-de-usuario" && (
              <p className="no-print mt-6 text-xs text-muted">
                Las capturas de pantalla se incluyen en esta página como apoyo visual y no forman parte del documento oficial.
              </p>
            )}
          </article>
        </div>
      )}

      <nav aria-label="Otros documentos" className="no-print border-t border-line bg-paper">
        <div className="wrap grid gap-0 md:grid-cols-2">
          {others.map((d, i) => (
            <Link
              key={d.slug}
              href={`/documentacion/${d.slug}/`}
              className={`group block py-10 ${i === 1 ? "border-t border-line md:border-l md:border-t-0 md:pl-10" : "md:pr-10"}`}
            >
              <p className="kicker">{d.kicker}</p>
              <p className="mt-3 font-serif text-2xl transition-colors group-hover:text-rose-700">{d.title} →</p>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
