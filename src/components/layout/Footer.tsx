import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { company, mainNav, siteText } from "@/content/site";
import { apps } from "@/content/downloads";
import { legalDocsFor } from "@/content/legal";
import { Year } from "@/components/ui/Year";
import { docHref, href, translatePath, ui, type Locale } from "@/i18n";

const text = {
  es: {
    about: (city: string) => `Protección digital familiar para Android. Un proyecto de ${company.author}, operado por ${company.legalName} desde ${city}, Colombia.`,
    footerNav: "Navegación del pie",
    site: "Sitio",
    apps: "Aplicaciones",
    installApk: "Instalar desde APK",
    docs: "Documentación",
    deleteAccount: "Eliminar cuenta",
    contact: "Contacto",
    help: "Centro de ayuda →",
    rights: "Todos los derechos reservados.",
    tax: "NIT",
  },
  en: {
    about: (city: string) => `Family digital protection for Android. A project by ${company.author}, operated by ${company.legalName} from ${city}, Colombia.`,
    footerNav: "Footer navigation",
    site: "Site",
    apps: "Apps",
    installApk: "Installing from APK",
    docs: "Documentation",
    deleteAccount: "Delete account",
    contact: "Contact",
    help: "Help center →",
    rights: "All rights reserved.",
    tax: "Tax ID (NIT)",
  },
} as const;

export function Footer({ locale }: { locale: Locale }) {
  const t = text[locale];
  const year = new Date().getFullYear();
  const city = company.city.split(",")[0];
  const other: Locale = locale === "es" ? "en" : "es";

  return (
    <footer data-site-footer className="border-t border-line bg-paper">
      <div className="wrap grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-4">
          <Logo className="h-14 w-auto" descriptor={siteText[locale].descriptor} />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted">{t.about(city)}</p>
        </div>

        <nav aria-label={t.footerNav} className="grid gap-10 sm:grid-cols-3 md:col-span-8">
          <div>
            <h2 className="kicker">{t.site}</h2>
            <ul className="mt-5 space-y-2.5 text-sm">
              {mainNav(locale).map((i) => (
                <li key={i.href}>
                  <Link className="text-ink hover:text-rose-700" href={i.href}>
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="kicker">{t.apps}</h2>
            <ul className="mt-5 space-y-2.5 text-sm">
              {apps.map((a) => (
                <li key={a.id}>
                  <Link className="text-ink hover:text-rose-700" href={href(locale, "downloads", a.id)}>
                    {a.text[locale].name}
                  </Link>
                </li>
              ))}
              <li>
                <Link className="text-ink hover:text-rose-700" href={href(locale, "help", locale === "es" ? "instalacion" : "installation")}>
                  {t.installApk}
                </Link>
              </li>
            </ul>
            <h2 className="kicker mt-9">{t.docs}</h2>
            <ul className="mt-5 space-y-2.5 text-sm">
              {legalDocsFor(locale).map((d) => (
                <li key={d.slug}>
                  <Link className="text-ink hover:text-rose-700" href={docHref(locale, d.key)}>
                    {d.shortTitle}
                  </Link>
                </li>
              ))}
              <li>
                <Link className="text-ink hover:text-rose-700" href={href(locale, "deleteAccount")}>
                  {t.deleteAccount}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="kicker">{t.contact}</h2>
            <address className="mt-5 space-y-2.5 text-sm not-italic">
              <p className="font-semibold text-ink">{company.legalName}</p>
              <p className="text-muted">
                {t.tax} {company.nit}
              </p>
              <p className="text-muted">{company.city}</p>
              <p>
                <a className="link" href={`mailto:${company.email}`}>
                  {company.email}
                </a>
              </p>
              <p>
                <a className="link" href={company.phoneHref}>
                  {company.phone}
                </a>
              </p>
            </address>
            <Link href={href(locale, "help")} className="arrow-link mt-6 text-sm">
              {t.help}
            </Link>
          </div>
        </nav>
      </div>
      <div className="border-t border-line">
        <div className="wrap flex flex-col gap-2 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <Year initial={year} /> Vesta Security · {company.legalName} {t.rights}
          </p>
          <p className="flex gap-4">
            <span>{ui[locale].android}</span>
            <Link href={translatePath(href(locale, "home"), other)} hrefLang={other} lang={other} className="font-semibold hover:text-wine">
              {ui[locale].otherLanguage}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
