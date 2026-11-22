import Link from "next/link";
import { ArrowDownToLine, ShieldCheck } from "lucide-react";
import { Symbol } from "@/components/brand/Logo";
import { Pending } from "@/components/ui/Pending";
import { type AppDownload, formatBytes, formatDate, latest } from "@/content/downloads";
import { href, type Locale } from "@/i18n";

const text = {
  es: {
    version: "Versión",
    compat: "Compatibilidad",
    size: "Tamaño",
    updated: "Actualización",
    pkg: "Paquete",
    download: "Descargar",
    soon: "Descarga disponible próximamente",
    requirements: "Requisitos e instalación →",
    sha: "Huella SHA-256 del APK oficial:",
    icon: "Icono de",
  },
  en: {
    version: "Version",
    compat: "Compatibility",
    size: "Size",
    updated: "Updated",
    pkg: "Package",
    download: "Download",
    soon: "Download available soon",
    requirements: "Requirements and installation →",
    sha: "SHA-256 fingerprint of the official APK:",
    icon: "Icon of",
  },
} as const;

/** Download card. All data comes from src/content/downloads.ts. */
export function DownloadPanel({ app, locale, detailed = false }: { app: AppDownload; locale: Locale; detailed?: boolean }) {
  const t = text[locale];
  const info = app.text[locale];
  const rel = latest(app);
  const size = formatBytes(app.sizeBytes, locale);
  const date = formatDate(rel.date, locale);
  const link = app.playStoreUrl ?? app.apkUrl;

  const rows: [string, React.ReactNode][] = [
    [t.version, rel.version],
    [t.compat, `${info.minAndroid} (API ${app.minSdk})`],
    [t.size, size ?? <Pending what="APK size" fallback="—" />],
    [t.updated, date ?? <Pending what={`release date of ${info.name} ${rel.version}`} fallback="—" />],
  ];
  if (detailed) {
    rows.push([t.pkg, <code key="p" className="break-all text-[0.8rem]">{app.packageId}</code>]);
  }

  return (
    <article id={app.id} className="scroll-mt-28">
      <div className="flex items-start gap-5">
        <span className="flex size-16 shrink-0 items-center justify-center rounded-[1.1rem] bg-ivory ring-1 ring-line">
          <Symbol className="size-12" title={`${t.icon} ${info.name}`} />
        </span>
        <div>
          <p className="kicker">{info.role}</p>
          <h3 className="mt-1 font-serif text-[2rem] leading-tight">{info.name}</h3>
        </div>
      </div>
      <p className="mt-5 max-w-xl text-[0.97rem] text-muted">{info.summary}</p>
      <p className="mt-2 text-sm font-medium text-ink">{info.installOn}</p>

      <dl className="mt-7 grid grid-cols-2 border-t border-line text-sm">
        {rows.map(([k, v]) => (
          <div key={k} className="border-b border-line py-3 pr-4">
            <dt className="text-sm text-muted">{k}</dt>
            <dd className="mt-1 font-medium text-ink">{v}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-7 flex flex-wrap items-center gap-4">
        {link ? (
          <a href={link} className="btn btn-primary" rel="noopener" {...(app.apkUrl && !app.playStoreUrl ? { download: true } : {})}>
            <ArrowDownToLine aria-hidden="true" className="size-4" />
            {t.download} {info.name}
            {size && <span className="font-normal opacity-75">· APK {size}</span>}
          </a>
        ) : (
          <>
            <span className="btn cursor-not-allowed border border-dashed border-beige text-muted" aria-disabled="true">
              <ArrowDownToLine aria-hidden="true" className="size-4" />
              {t.soon}
            </span>
            <Pending what={`official APK link for ${info.name} (apkUrl in src/content/downloads.ts)`} />
          </>
        )}
        {!detailed && (
          <Link href={href(locale, "downloads", app.id)} className="arrow-link">
            {t.requirements}
          </Link>
        )}
      </div>

      {detailed && app.sha256 && (
        <p className="mt-6 flex items-start gap-2 text-xs text-muted">
          <ShieldCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-ok" />
          <span>
            {t.sha} <code className="break-all font-mono text-[0.72rem] text-ink">{app.sha256}</code>
          </span>
        </p>
      )}
    </article>
  );
}
