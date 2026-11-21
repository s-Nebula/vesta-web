import Link from "next/link";
import { ArrowDownToLine, ShieldCheck } from "lucide-react";
import { Symbol } from "@/components/brand/Logo";
import { Pending } from "@/components/ui/Pending";
import { type AppDownload, formatBytes, formatDate, latest } from "@/content/downloads";

/** Ficha de descarga. Todos los datos provienen de src/content/downloads.ts. */
export function DownloadPanel({ app, detailed = false }: { app: AppDownload; detailed?: boolean }) {
  const rel = latest(app);
  const size = formatBytes(app.sizeBytes);
  const date = formatDate(rel.date);
  const href = app.playStoreUrl ?? app.apkUrl;

  const rows: [string, React.ReactNode][] = [
    ["Versión", rel.version],
    ["Compatibilidad", `${app.minAndroid} (API ${app.minSdk})`],
    ["Tamaño", size ?? <Pending what="tamaño del archivo" fallback="—" />],
    ["Actualización", date ?? <Pending what={`fecha de publicación de ${app.name} ${rel.version}`} fallback="—" />],
  ];
  if (detailed) {
    rows.push(["Paquete", <code key="p" className="break-all text-[0.8rem]">{app.packageId}</code>]);
  }

  return (
    <article id={app.id} className="scroll-mt-28">
      <div className="flex items-start gap-5">
        {/* Ambas apps usan el mismo icono: símbolo Vesta sobre fondo marfil (pubspec.yaml). */}
        <span className="flex size-16 shrink-0 items-center justify-center rounded-[1.1rem] bg-ivory ring-1 ring-line">
          <Symbol className="size-12" title={`Icono de ${app.name}`} />
        </span>
        <div>
          <p className="kicker">{app.role}</p>
          <h3 className="mt-1 font-serif text-[2rem] leading-tight">{app.name}</h3>
        </div>
      </div>
      <p className="mt-5 max-w-xl text-[0.97rem] text-muted">{app.summary}</p>
      <p className="mt-2 text-sm font-medium text-ink">{app.installOn}</p>

      <dl className="mt-7 grid grid-cols-2 border-t border-line text-sm">
        {rows.map(([k, v]) => (
          <div key={k} className="border-b border-line py-3 pr-4">
            <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted">{k}</dt>
            <dd className="mt-1 font-medium text-ink">{v}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-7 flex flex-wrap items-center gap-4">
        {href ? (
          <a href={href} className="btn btn-primary" rel="noopener" {...(app.apkUrl && !app.playStoreUrl ? { download: true } : {})}>
            <ArrowDownToLine aria-hidden="true" className="size-4" />
            Descargar {app.name}
            {size && <span className="font-normal opacity-75">· APK {size}</span>}
          </a>
        ) : (
          <>
            <span className="btn cursor-not-allowed border border-dashed border-beige text-muted" aria-disabled="true">
              <ArrowDownToLine aria-hidden="true" className="size-4" />
              Descarga disponible próximamente
            </span>
            <Pending what={`enlace oficial del APK de ${app.name} (apkUrl en src/content/downloads.ts)`} />
          </>
        )}
        {!detailed && (
          <Link href={`/descargas/#${app.id}`} className="arrow-link">
            Requisitos e instalación →
          </Link>
        )}
      </div>

      {detailed && app.sha256 && (
        <p className="mt-6 flex items-start gap-2 text-xs text-muted">
          <ShieldCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-ok" />
          <span>
            Huella SHA-256 del APK oficial:{" "}
            <code className="break-all font-mono text-[0.72rem] text-ink">{app.sha256}</code>
          </span>
        </p>
      )}
    </article>
  );
}
