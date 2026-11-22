import { ui, type Locale } from "@/i18n";

export function AppTag({ app, locale, className = "" }: { app: "padre" | "tracker" | "ambas"; locale: Locale; className?: string }) {
  const t = ui[locale];
  const label = app === "padre" ? t.padre : app === "tracker" ? t.tracker : t.both;
  const tone = app === "padre" ? "text-wine" : app === "tracker" ? "text-rose-700" : "text-muted";
  return <span className={`tag ${tone} ${className}`}>{label}</span>;
}
