import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Year } from "@/components/ui/Year";
import { company, companyText } from "@/content/site";
import { contact, securityNav, waLink } from "@/content/security";

export function SecurityFooter() {
  const year = new Date().getFullYear();
  return (
    <footer data-site-footer className="border-t border-line bg-paper">
      <div className="wrap grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-4">
          <Logo className="h-14 w-auto" descriptor="Ciberseguridad" />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted">
            Auditorías de seguridad y pruebas de penetración para pequeños negocios. Un proyecto de {company.author}, operado por{" "}
            {company.legalName} desde Santa Marta, Colombia.
          </p>
        </div>

        <nav aria-label="Navegación del pie" className="grid gap-10 sm:grid-cols-3 md:col-span-8">
          <div>
            <h2 className="kicker">Sitio</h2>
            <ul className="mt-5 space-y-2.5 text-sm">
              {securityNav.map((i) => (
                <li key={i.href}>
                  <Link className="text-ink hover:text-rose-700" href={i.href}>
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="kicker">Encuéntrame</h2>
            <ul className="mt-5 space-y-2.5 text-sm">
              <li>
                <a className="text-ink hover:text-rose-700" href={contact.github} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </li>
              <li>
                <a className="text-ink hover:text-rose-700" href={contact.tiktok} target="_blank" rel="noopener noreferrer">
                  TikTok {contact.tiktokHandle}
                </a>
              </li>
            </ul>
            <h2 className="kicker mt-9">Vesta, control parental</h2>
            <ul className="mt-5 space-y-2.5 text-sm">
              <li>
                <Link className="text-ink hover:text-rose-700" href="/descargas/">
                  Descargar las apps
                </Link>
              </li>
              <li>
                <Link className="text-ink hover:text-rose-700" href="/documentacion/">
                  Documentación legal
                </Link>
              </li>
              <li>
                <Link className="text-ink hover:text-rose-700" href="/eliminar-cuenta/">
                  Eliminar cuenta
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="kicker">Contacto</h2>
            <address className="mt-5 space-y-2.5 text-sm not-italic">
              <p className="font-semibold text-ink">{company.legalName}</p>
              <p className="text-muted">NIT {company.nit}</p>
              <p className="text-muted">{company.city}</p>
              <p>
                <a className="link" href={`mailto:${company.email}`}>
                  {company.email}
                </a>
              </p>
              <p>
                <a className="link" href={waLink()} target="_blank" rel="noopener noreferrer">
                  WhatsApp {company.phone}
                </a>
              </p>
            </address>
          </div>
        </nav>
      </div>
      <div className="border-t border-line">
        <div className="wrap flex flex-col gap-2 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <Year initial={year} /> Vesta Security · {company.legalName} Todos los derechos reservados.
          </p>
          <p>{companyText.es.registry}</p>
        </div>
      </div>
    </footer>
  );
}
