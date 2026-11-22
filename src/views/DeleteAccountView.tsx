import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { company } from "@/content/site";
import { docHref, type Locale } from "@/i18n";

const copy = {
  es: {
    kicker: "Eliminar cuenta",
    title: "Eliminar tu cuenta de Vesta y sus datos.",
    lead: `Vesta Padre y Vesta Tracker son apps de Vesta Security, operadas por ${company.legalName}. Puedes eliminar tu cuenta desde la app en un minuto o pedirlo por correo sin tenerla instalada.`,
    appTitle: "Desde la app (inmediato)",
    appSteps: [
      "Abre Vesta Padre y entra en Ajustes.",
      "En la sección Cuenta, pulsa «Eliminar cuenta».",
      "Lee qué se elimina, confirma tu contraseña o vuelve a iniciar sesión con Google o GitHub.",
      "Marca la casilla de confirmación y pulsa «Eliminar cuenta definitivamente».",
    ],
    appNote: "La eliminación se hace en ese momento y la app vuelve a la pantalla de inicio de sesión.",
    mailTitle: "Sin la app (por correo)",
    mailLead: "Escribe a",
    mailSteps: [
      "Envía el correo desde la dirección con la que creaste la cuenta, para que podamos comprobar que es tuya.",
      "Pon como asunto «Eliminar mi cuenta de Vesta» e indica el correo de la cuenta.",
      "Te confirmaremos la eliminación en un plazo máximo de 15 días hábiles.",
    ],
    mailNote: "Nunca te pediremos tu contraseña ni códigos secretos.",
    deletedTitle: "Qué se elimina",
    deleted: [
      "Tu cuenta, tu correo, tu nombre de usuario y tus preferencias de notificación.",
      "Los perfiles de los que eres el único tutor, con su ubicación e historial, alertas, informes de uso, reglas, zonas seguras, modo estudio, límites y peticiones.",
      "La vinculación de los teléfonos con esos perfiles: Vesta Tracker deja de enviar datos y puedes desinstalarla.",
      "Tus consentimientos y autorizaciones de privacidad.",
    ],
    keptTitle: "Qué se conserva",
    kept: [
      "Los perfiles que compartes con otro tutor siguen existiendo para él; solo se quita tu acceso.",
      "Un registro anónimo de que la eliminación se hizo (fecha y número de perfiles), sin tu correo, tu nombre ni ningún identificador tuyo.",
      "Las copias de seguridad se eliminan o se anonimizan según su ciclo, como indica la política de privacidad.",
    ],
    trackerTitle: "¿Y Vesta Tracker?",
    tracker:
      "Vesta Tracker no tiene cuenta propia: depende del perfil creado en Vesta Padre. Al eliminar la cuenta del tutor, o al desvincular el teléfono desde Vesta Padre, deja de enviar datos.",
    policy: "Más detalle en la",
    policyLink: "Política de privacidad",
  },
  en: {
    kicker: "Delete account",
    title: "Delete your Vesta account and its data.",
    lead: `Vesta Parent and Vesta Tracker are Vesta Security apps, operated by ${company.legalName}. You can delete your account from the app in a minute, or ask for it by e-mail without having the app installed.`,
    appTitle: "From the app (immediate)",
    appSteps: [
      "Open Vesta Parent and go to Settings.",
      "In the Account section, tap “Delete account”.",
      "Read what is deleted, then confirm your password or sign in again with Google or GitHub.",
      "Tick the confirmation box and tap “Delete account permanently”.",
    ],
    appNote: "The deletion happens straight away and the app returns to the sign-in screen.",
    mailTitle: "Without the app (by e-mail)",
    mailLead: "Write to",
    mailSteps: [
      "Send the e-mail from the address you created the account with, so we can check it is yours.",
      "Use the subject “Delete my Vesta account” and include the account's e-mail address.",
      "We will confirm the deletion within 15 business days at most.",
    ],
    mailNote: "We will never ask for your password or secret codes.",
    deletedTitle: "What is deleted",
    deleted: [
      "Your account, e-mail address, username and notification preferences.",
      "Profiles where you are the only guardian, with their location and history, alerts, usage reports, rules, safe zones, study mode, limits and requests.",
      "The link between those profiles and their phones: Vesta Tracker stops sending data and can be uninstalled.",
      "Your privacy consents and authorisations.",
    ],
    keptTitle: "What is kept",
    kept: [
      "Profiles you share with another guardian remain for them; only your access is removed.",
      "An anonymous record that the deletion took place (date and number of profiles), without your e-mail, name or any identifier of yours.",
      "Backups are deleted or anonymised on their cycle, as the privacy policy describes.",
    ],
    trackerTitle: "What about Vesta Tracker?",
    tracker:
      "Vesta Tracker has no account of its own: it depends on the profile created in Vesta Parent. When the guardian's account is deleted, or the phone is unlinked from Vesta Parent, it stops sending data.",
    policy: "More detail in the",
    policyLink: "Privacy Policy",
  },
} as const;

function Steps({ items }: { items: readonly string[] }) {
  return (
    <ol className="mt-6 space-y-3">
      {items.map((s, n) => (
        <li key={s} className="grid grid-cols-[2rem_1fr] text-[0.97rem] text-muted">
          <span className="font-serif text-lg leading-6 text-wine">{n + 1}</span>
          <span>{s}</span>
        </li>
      ))}
    </ol>
  );
}

function Bullets({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-6 list-disc space-y-3 pl-5 text-[0.97rem] text-muted marker:text-wine">
      {items.map((s) => (
        <li key={s}>{s}</li>
      ))}
    </ul>
  );
}

export function DeleteAccountView({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const subject = locale === "es" ? "Eliminar mi cuenta de Vesta" : "Delete my Vesta account";

  const block = (id: string, title: string, children: React.ReactNode) => (
    <article id={id} aria-labelledby={`${id}-t`} className="grid gap-6 border-t border-line py-12 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <h2 id={`${id}-t`} className="font-serif text-[1.9rem] leading-tight">
          {title}
        </h2>
      </div>
      <div className="lg:col-span-7 lg:col-start-6">{children}</div>
    </article>
  );

  return (
    <>
      <PageHero kicker={t.kicker} title={t.title} lead={t.lead} />
      <section className="py-16 md:py-24">
        <div className="wrap">
          {block(
            "app",
            t.appTitle,
            <>
              <Steps items={t.appSteps} />
              <p className="mt-6 border-l-2 border-rose pl-4 text-sm text-ink">{t.appNote}</p>
            </>
          )}
          {block(
            "correo",
            t.mailTitle,
            <>
              <p className="text-[1.02rem]">
                {t.mailLead}{" "}
                <a className="link" href={`mailto:${company.email}?subject=${encodeURIComponent(subject)}`}>
                  {company.email}
                </a>
              </p>
              <Steps items={t.mailSteps} />
              <p className="mt-6 border-l-2 border-rose pl-4 text-sm text-ink">{t.mailNote}</p>
            </>
          )}
          {block("eliminado", t.deletedTitle, <Bullets items={t.deleted} />)}
          {block("conservado", t.keptTitle, <Bullets items={t.kept} />)}
          {block("tracker", t.trackerTitle, <p className="text-[0.97rem] text-muted">{t.tracker}</p>)}
          <p className="border-t border-line pt-10 text-[0.97rem] text-muted">
            {t.policy}{" "}
            <Link className="link" href={docHref(locale, "privacy")}>
              {t.policyLink}
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
