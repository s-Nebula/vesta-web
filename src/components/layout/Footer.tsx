import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { company, mainNav, site } from "@/content/site";
import { apps } from "@/content/downloads";
import { legalDocs } from "@/content/legal";
import { Year } from "@/components/ui/Year";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer data-site-footer className="border-t border-line bg-paper">
      <div className="wrap grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-4">
          <Logo className="h-14 w-auto" />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted">
            Plataforma de protección digital familiar para Android. Un proyecto de {company.author}, operado por{" "}
            {company.legalName} desde {company.city.split(",")[0]}, Colombia.
          </p>
          <p className="mt-4 text-xs text-muted">
            Código abierto bajo licencia {site.license}:{" "}
            <a className="link" href={site.sourceCode.padre} rel="noopener" target="_blank">
              Vesta Padre
            </a>{" "}
            ·{" "}
            <a className="link" href={site.sourceCode.tracker} rel="noopener" target="_blank">
              Vesta Tracker
            </a>
          </p>
        </div>

        <nav aria-label="Navegación del pie" className="grid gap-10 sm:grid-cols-3 md:col-span-8">
          <div>
            <h2 className="kicker">Sitio</h2>
            <ul className="mt-5 space-y-2.5 text-sm">
              {mainNav.map((i) => (
                <li key={i.href}>
                  <Link className="text-ink hover:text-rose-700" href={i.href}>
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="kicker">Aplicaciones</h2>
            <ul className="mt-5 space-y-2.5 text-sm">
              {apps.map((a) => (
                <li key={a.id}>
                  <Link className="text-ink hover:text-rose-700" href={`/descargas/#${a.id}`}>
                    {a.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link className="text-ink hover:text-rose-700" href="/ayuda/#instalacion">
                  Instalar desde APK
                </Link>
              </li>
            </ul>
            <h2 className="kicker mt-9">Documentación</h2>
            <ul className="mt-5 space-y-2.5 text-sm">
              {legalDocs.map((d) => (
                <li key={d.slug}>
                  <Link className="text-ink hover:text-rose-700" href={`/documentacion/${d.slug}/`}>
                    {d.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="kicker">Contacto</h2>
            <address className="mt-5 space-y-2.5 text-sm not-italic">
              <p className="font-semibold text-ink">{company.legalName}</p>
              <p className="text-muted">NIT {company.nit}</p>
              <p className="text-muted">
                {company.address}
                <br />
                {company.city}
              </p>
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
            <Link href="/ayuda/" className="arrow-link mt-6 text-sm">
              Centro de ayuda →
            </Link>
          </div>
        </nav>
      </div>
      <div className="border-t border-line">
        <div className="wrap flex flex-col gap-2 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <Year initial={year} /> Vesta Security · {company.legalName} Todos los derechos reservados, sin perjuicio de las licencias de
            código abierto aplicables.
          </p>
          <p>Disponible para Android</p>
        </div>
      </div>
    </footer>
  );
}
