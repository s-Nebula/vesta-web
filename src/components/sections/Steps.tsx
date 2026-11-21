import { AppTag } from "@/components/ui/AppTag";

export const steps = [
  { app: "padre" as const, title: "Instala Vesta Padre", text: "Descarga la aplicación en el teléfono del adulto responsable." },
  { app: "padre" as const, title: "Crea tu cuenta", text: "Regístrate con correo y contraseña, Google o GitHub, y acepta los documentos vigentes." },
  { app: "padre" as const, title: "Registra al menor", text: "Crea su perfil y genera un código de vinculación de un solo uso." },
  { app: "tracker" as const, title: "Instala y vincula Vesta Tracker", text: "En el dispositivo del menor, introduce el código y concede los permisos de Android necesarios." },
  { app: "padre" as const, title: "Autoriza las finalidades", text: "Elige qué funciones activar. Cada una es independiente y se puede revocar." },
  { app: "padre" as const, title: "Consulta y acompaña", text: "Revisa la ubicación, el estado del equipo, los informes y las alertas desde Vesta Padre." },
];

/** Proceso en seis pasos. Escritorio: línea horizontal; móvil: lista vertical con hilo. */
export function Steps({ dark = false }: { dark?: boolean }) {
  return (
    <ol className="relative grid gap-0 md:grid-cols-3 md:gap-x-10 md:gap-y-14 xl:grid-cols-6 xl:gap-x-6">
      {steps.map((s, i) => (
        <li key={s.title} className="reveal relative flex gap-5 pb-10 md:block md:pb-0">
          {/* hilo vertical (móvil) */}
          {i < steps.length - 1 && (
            <span aria-hidden="true" className={`absolute left-[1.15rem] top-12 bottom-0 w-px md:hidden ${dark ? "bg-ivory/20" : "bg-line"}`} />
          )}
          <span
            className={`relative z-10 flex size-[2.35rem] shrink-0 items-center justify-center rounded-full border font-serif text-lg ${
              s.app === "tracker"
                ? "border-rose bg-rose text-ivory"
                : dark
                  ? "border-ivory/50 text-ivory"
                  : "border-wine text-wine"
            }`}
          >
            {i + 1}
          </span>
          <div className="md:mt-6">
            <AppTag app={s.app} className={dark ? (s.app === "tracker" ? "!text-rose-300" : "!text-ivory/80") : ""} />
            <h3 className="mt-3 font-serif text-[1.3rem] leading-snug">{s.title}</h3>
            <p className={`mt-2 text-[0.92rem] leading-relaxed ${dark ? "text-ivory/70" : "text-muted"}`}>{s.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
