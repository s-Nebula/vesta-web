export function AppTag({ app, className = "" }: { app: "padre" | "tracker" | "ambas"; className?: string }) {
  const label = app === "padre" ? "Vesta Padre" : app === "tracker" ? "Vesta Tracker" : "Ambas apps";
  const tone = app === "padre" ? "text-wine" : app === "tracker" ? "text-rose-700" : "text-muted";
  return <span className={`tag ${tone} ${className}`}>{label}</span>;
}
