import { AppTag } from "@/components/ui/AppTag";
import type { Locale } from "@/i18n";

type Step = { app: "padre" | "tracker"; title: string; text: string };

const steps: Record<Locale, Step[]> = {
  es: [
    { app: "padre", title: "Instala Vesta Padre", text: "En tu teléfono. Crea una cuenta con correo, Google o GitHub y acepta los documentos." },
    { app: "padre", title: "Crea el perfil del menor", text: "Nombre, edad y un color. Vesta Padre te muestra un código QR para vincular." },
    { app: "tracker", title: "Vincula su teléfono", text: "Instala Vesta Tracker en el teléfono del menor, escanea el QR y concede los permisos." },
    { app: "padre", title: "Elige qué activar", text: "Autoriza solo las funciones que vayas a usar. Cada una se puede retirar cuando quieras." },
    { app: "padre", title: "Ajusta las reglas", text: "Filtros, modo estudio, límites diarios y zonas seguras, a la medida de su edad." },
  ],
  en: [
    { app: "padre", title: "Install Vesta Parent", text: "On your phone. Create an account with email, Google or GitHub and accept the documents." },
    { app: "padre", title: "Create the minor's profile", text: "Name, age and a colour. Vesta Parent shows you a QR code for linking." },
    { app: "tracker", title: "Link their phone", text: "Install Vesta Tracker on the minor's phone, scan the QR code and grant the permissions." },
    { app: "padre", title: "Choose what to turn on", text: "Authorise only the features you will use. You can withdraw any of them at any time." },
    { app: "padre", title: "Set the rules", text: "Filters, study mode, daily limits and safe zones, suited to their age." },
  ],
};

/** Setup steps. Desktop: a row; mobile: a vertical list. */
export function Steps({ locale, dark = false }: { locale: Locale; dark?: boolean }) {
  const list = steps[locale];
  return (
    <ol className="grid gap-10 md:grid-cols-3 md:gap-x-10 md:gap-y-14 xl:grid-cols-5 xl:gap-x-8">
      {list.map((s, i) => (
        <li key={s.title} className="flex gap-5 md:block">
          <span className={`font-serif text-4xl leading-none ${dark ? "text-rose-300" : "text-rose-700"}`}>{i + 1}</span>
          <div className="md:mt-4">
            <h3 className="font-serif text-[1.3rem] leading-snug">{s.title}</h3>
            <p className={`mt-2 text-[0.95rem] leading-relaxed ${dark ? "text-ivory/75" : "text-muted"}`}>{s.text}</p>
            <AppTag app={s.app} locale={locale} className={`mt-3 ${dark ? (s.app === "tracker" ? "!text-rose-300" : "!text-ivory/80") : ""}`} />
          </div>
        </li>
      ))}
    </ol>
  );
}
