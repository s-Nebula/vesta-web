import Link from "next/link";
import { ArrowRight, ChevronDown, FileDown } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { LegalBody } from "@/components/legal/LegalBody";
import { Toc } from "@/components/legal/Toc";
import { PrintButton } from "@/components/legal/PrintButton";
import { Pending } from "@/components/ui/Pending";
import { guideFigures, legalDocsFor, type LegalDoc } from "@/content/legal";
import { company, site } from "@/content/site";
import { JsonLd } from "@/lib/seo";
import { docHref, ui, type Locale } from "@/i18n";

const copy = {
  es: {
    kicker: "Documentación",
    title: "Documentos legales y privacidad",
    lead: "Los documentos que regulan el uso de Vesta y el tratamiento de los datos personales, completos y con su versión. Son los mismos que se aceptan en Vesta Padre.",
    docsAria: "Documentos",
    version: "Versión",
    status: "Estado",
    current: "Vigente",
    updated: "Actualización",
    read: "Leer documento",
    summaryLabel: "Resumen de privacidad",
    summaryTitle: "Lo esencial de la Política, en una página",
    controller: "Responsable:",
    controllerText: `${company.legalName}, NIT ${company.nit}, conforme a la Ley 1581 de 2012.`,
    purposes: "Finalidades:",
    purposesText:
      "cuentas, vinculación, ubicación y zonas seguras, avisos SOS, informes de uso, modo estudio y límites, peticiones del menor, filtros y búsqueda segura, alertas, diagnóstico, seguridad y atención de solicitudes. Sin publicidad ni venta de perfiles.",
    rights: "Derechos:",
    rightsText: "conocer, actualizar, rectificar, pedir prueba de la autorización, presentar consultas y reclamos, pedir la supresión y revocar la autorización.",
    terms: "Plazos de respuesta:",
    termsText: "consultas en 10 días hábiles; reclamos en 15 días hábiles.",
    channel: "Canal:",
    summaryNote: "Este resumen no sustituye a la Política completa, que es el documento que rige.",
    retentionLabel: "Plazos de conservación",
    retention: [
      ["Historial de ubicación", "90 días"],
      ["Informes de uso", "90 días"],
      ["Peticiones del menor", "90 días"],
      ["Alertas", "12 meses"],
      ["Resúmenes semanales", "12 meses"],
      ["Copias de respaldo", "Ciclo máximo de 90 días"],
    ],
    retentionLink: "Ver la tabla completa",
    retentionAnchor: "14-politica-de-conservacion",
    noCookies: "Este sitio no usa cookies ni herramientas de analítica o publicidad de terceros.",
  },
  en: {
    kicker: "Documentation",
    title: "Legal documents and privacy",
    lead: "The documents that govern the use of Vesta and the processing of personal data, in full and with their version. They are the same ones accepted in Vesta Parent.",
    docsAria: "Documents",
    version: "Version",
    status: "Status",
    current: "In force",
    updated: "Updated",
    read: "Read document",
    summaryLabel: "Privacy summary",
    summaryTitle: "The essentials of the Policy, on one page",
    controller: "Controller:",
    controllerText: `${company.legalName}, Tax ID (NIT) ${company.nit}, under Colombian Law 1581 of 2012.`,
    purposes: "Purposes:",
    purposesText:
      "accounts, linking, location and safe zones, SOS alerts, usage reports, study mode and limits, requests from the minor, filters and safe search, alerts, diagnostics, security and handling requests. No advertising and no sale of profiles.",
    rights: "Rights:",
    rightsText: "access, update, correct, request proof of authorisation, submit enquiries and complaints, request deletion and withdraw authorisation.",
    terms: "Response times:",
    termsText: "enquiries within 10 business days; complaints within 15 business days.",
    channel: "Channel:",
    summaryNote: "This summary does not replace the full Policy, which is the governing document.",
    retentionLabel: "Retention periods",
    retention: [
      ["Location history", "90 days"],
      ["Usage reports", "90 days"],
      ["Requests from the minor", "90 days"],
      ["Alerts", "12 months"],
      ["Weekly summaries", "12 months"],
      ["Backups", "Maximum cycle of 90 days"],
    ],
    retentionLink: "See the full table",
    retentionAnchor: "14-retention-policy",
    noCookies: "This site does not use cookies or third-party analytics or advertising tools.",
  },
} as const;

export function DocsView({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const docs = legalDocsFor(locale);
  return (
    <>
      <PageHero kicker={t.kicker} title={t.title} lead={t.lead} />

      <section aria-label={t.docsAria} className="py-16 md:py-24">
        <div className="wrap">
          <ul className="border-t border-wine">
            {docs.map((d) => (
              <li key={d.slug} className="border-b border-line">
                <Link href={docHref(locale, d.key)} className="group grid gap-6 py-10 md:grid-cols-12 md:py-12">
                  <div className="md:col-span-8">
                    <h2 className="font-serif text-[1.9rem] leading-tight transition-colors group-hover:text-rose-700 md:text-[2.3rem]">{d.title}</h2>
                    <p className="mt-4 text-[0.97rem] text-muted">{d.summary}</p>
                  </div>
                  <dl className="grid grid-cols-2 content-start gap-x-6 gap-y-3 text-sm md:col-span-3 md:col-start-10">
                    <div>
                      <dt className="text-muted">{t.version}</dt>
                      <dd className="mt-0.5 font-medium">{d.version}</dd>
                    </div>
                    <div>
                      <dt className="text-muted">{t.status}</dt>
                      <dd className="mt-0.5 font-medium text-ok">{t.current}</dd>
                    </div>
                    <div className="col-span-2">
                      <dt className="text-muted">{t.updated}</dt>
                      <dd className="mt-0.5 font-medium">{d.updatedDate}</dd>
                    </div>
                  </dl>
                  <span className="arrow-link md:col-span-8">
                    {t.read} <ArrowRight aria-hidden="true" className="size-4" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="resumen" className="border-t border-line bg-paper py-20 md:py-28">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="kicker">{t.summaryLabel}</p>
            <h2 id="resumen" className="h-sub mt-4">
              {t.summaryTitle}
            </h2>
            <div className="mt-6 space-y-4 text-[0.97rem] text-muted">
              {[
                [t.controller, t.controllerText],
                [t.purposes, t.purposesText],
                [t.rights, t.rightsText],
                [t.terms, t.termsText],
              ].map(([k, v]) => (
                <p key={k}>
                  <strong className="font-semibold text-ink">{k}</strong> {v}
                </p>
              ))}
              <p>
                <strong className="font-semibold text-ink">{t.channel}</strong>{" "}
                <a href={`mailto:${company.email}`} className="link">
                  {company.email}
                </a>
              </p>
            </div>
            <p className="mt-6 text-sm text-muted">{t.summaryNote}</p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <h3 className="kicker">{t.retentionLabel}</h3>
            <table className="mt-5 w-full border-collapse text-left text-sm">
              <tbody>
                {t.retention.map(([k, v]) => (
                  <tr key={k} className="border-b border-line first:border-t first:border-t-wine">
                    <th scope="row" className="py-3.5 pr-6 font-serif text-base font-medium">
                      {k}
                    </th>
                    <td className="py-3.5 text-muted">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Link href={docHref(locale, "privacy", t.retentionAnchor)} className="arrow-link mt-6">
              {t.retentionLink} <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            <p className="mt-10 text-sm text-muted">{t.noCookies}</p>
          </div>
        </div>
      </section>
    </>
  );
}

const docCopy = {
  es: {
    crumbs: "Ruta de navegación",
    docs: "Documentación",
    official: "Documento oficial",
    version: "Versión",
    published: "Publicación",
    effective: "Entrada en vigor",
    updated: "Última actualización",
    controller: "Responsable",
    pdf: "Descargar PDF oficial",
    toc: "Índice de contenidos",
    tocShort: "Índice",
    shotsNote: "Las capturas se muestran como apoyo visual y no forman parte del documento oficial.",
    others: "Otros documentos",
    courtesy: null,
    original: null,
  },
  en: {
    crumbs: "Breadcrumb",
    docs: "Documentation",
    official: "Courtesy translation",
    version: "Version",
    published: "Published",
    effective: "Effective date",
    updated: "Last updated",
    controller: "Controller",
    pdf: "Download official PDF",
    toc: "Table of contents",
    tocShort: "Contents",
    shotsNote: "Screenshots are shown as a visual aid and are not part of the official document.",
    others: "Other documents",
    courtesy: "This is a courtesy translation. The Spanish version is the official text and prevails in case of any discrepancy.",
    original: "Read the official Spanish version",
  },
} as const;

export function DocView({ locale, doc }: { locale: Locale; doc: LegalDoc }) {
  const t = docCopy[locale];
  const toc = doc.source.blocks.filter((b) => b.type === "h2").map((b) => ({ id: (b as { id: string }).id, text: (b as { text: string }).text }));
  const others = legalDocsFor(locale).filter((d) => d.slug !== doc.slug);

  const meta: [string, string][] = [
    [t.version, doc.version],
    [doc.key === "guide" ? t.published : t.effective, doc.effectiveDate],
    [t.updated, doc.updatedDate],
    [t.controller, company.legalName],
  ];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: doc.title,
          url: `${site.url}${docHref(locale, doc.key)}`,
          inLanguage: locale,
          version: doc.version,
          datePublished: "2026-11-22",
          dateModified: "2026-11-22",
          publisher: { "@type": "Organization", name: company.legalName },
        }}
      />
      <header className="border-b border-line">
        <div className="wrap pb-12 pt-10 md:pb-16 md:pt-14">
          <nav aria-label={t.crumbs} className="no-print text-sm text-muted">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href={docHref(locale, doc.key).replace(/[^/]+\/$/, "")} className="hover:text-wine">
                  {t.docs}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-ink">
                {doc.shortTitle}
              </li>
            </ol>
          </nav>
          <p className="kicker mt-10">{t.official}</p>
          <h1 className="mt-4 max-w-4xl font-serif text-[2.4rem] leading-[1.05] tracking-[-0.025em] md:text-[3.6rem]">{doc.title}</h1>
          {doc.source.subtitle && <p className="lead mt-6 max-w-3xl">{doc.source.subtitle}</p>}
          {t.courtesy && (
            <p className="mt-6 max-w-3xl border-l-2 border-rose pl-4 text-[0.97rem] text-ink">
              {t.courtesy}{" "}
              <Link className="link" href={docHref("es", doc.key)} hrefLang="es" lang="es">
                {t.original}
              </Link>
              .
            </p>
          )}

          <dl className="mt-10 grid grid-cols-2 border-t border-wine text-sm md:grid-cols-4">
            {meta.map(([k, v], i) => (
              <div key={k} className={`border-b border-line py-4 pr-4 ${i % 2 === 1 ? "pl-4 md:pl-0" : ""} md:border-b-0`}>
                <dt className="text-muted">{k}</dt>
                <dd className="mt-1 font-medium">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="no-print mt-8 flex flex-wrap items-center gap-3">
            <PrintButton label={ui[locale].print} />
            {doc.pdfUrl ? (
              <a href={doc.pdfUrl} className="btn btn-primary !min-h-[2.5rem] !py-1.5 text-sm" download>
                <FileDown aria-hidden="true" className="size-4" />
                {t.pdf}
              </a>
            ) : (
              <Pending what={`official PDF of “${doc.shortTitle}” (pdfUrl in src/content/legal.ts)`} />
            )}
          </div>
        </div>
      </header>

      <div className="wrap grid gap-10 py-12 md:py-16 lg:grid-cols-12">
        <aside className="no-print lg:col-span-3">
          <details className="group border-y border-line lg:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-sm font-semibold [&::-webkit-details-marker]:hidden">
              {t.toc}
              <ChevronDown aria-hidden="true" className="size-4 transition-transform group-open:rotate-180" />
            </summary>
            <div className="pb-4">
              <ol className="space-y-1 text-sm">
                {toc.map((x) => (
                  <li key={x.id}>
                    <a href={`#${x.id}`} className="block py-1.5 text-muted hover:text-wine">
                      {x.text}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </details>
          <nav aria-label={t.toc} className="sticky top-24 hidden max-h-[calc(100dvh-7rem)] overflow-y-auto pb-6 lg:block">
            <p className="kicker mb-4">{t.tocShort}</p>
            <Toc items={toc} />
          </nav>
        </aside>

        <article className="min-w-0 lg:col-span-8 lg:col-start-5">
          <LegalBody blocks={doc.source.blocks} figures={doc.key === "guide" ? guideFigures[locale] : undefined} />
          {doc.source.closing.length > 0 && (
            <footer className="mt-16 border-t border-line pt-6 text-xs text-muted">
              {doc.source.closing.map((c) => (
                <p key={c} className="mt-1">
                  {c}
                </p>
              ))}
            </footer>
          )}
          {doc.key === "guide" && <p className="no-print mt-6 text-xs text-muted">{t.shotsNote}</p>}
        </article>
      </div>

      <nav aria-label={t.others} className="no-print border-t border-line bg-paper">
        <div className="wrap grid gap-0 md:grid-cols-2">
          {others.map((d, i) => (
            <Link
              key={d.slug}
              href={docHref(locale, d.key)}
              className={`group block py-10 ${i === 1 ? "border-t border-line md:border-l md:border-t-0 md:pl-10" : "md:pr-10"}`}
            >
              <p className="font-serif text-2xl transition-colors group-hover:text-rose-700">{d.title} →</p>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
