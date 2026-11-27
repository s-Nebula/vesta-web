import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";
import { Year } from "@/components/ui/Year";
import { company, companyText } from "@/content/site";
import { contact, securityNav, waLink } from "@/content/security";
import { apps } from "@/content/apps";

/** Pie común de todo el sitio en español. */
export function SecurityFooter() {
  const year = new Date().getFullYear();
  const col = "text-[0.92rem] text-mist hover:text-haze";
  return (
    <footer data-site-footer className="sx border-t border-night-600 bg-night-950">
      <div className="sx-wrap grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-4">
          <Wordmark size="lg" />
          <p className="mt-5 max-w-xs text-[0.92rem] leading-relaxed text-mist">
            Auditorías de seguridad y pruebas de penetración para pequeños negocios. Un proyecto de {company.author}, operado por{" "}
            {company.legalName} desde Santa Marta, Colombia.
          </p>
        </div>

        <nav aria-label="Navegación del pie" className="grid gap-10 sm:grid-cols-3 md:col-span-8">
          <div>
            <h2 className="sx-label">Sitio</h2>
            <ul className="mt-5 space-y-2.5">
              {securityNav.map((i) => (
                <li key={i.href}>
                  <Link className={col} href={i.href}>
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="sx-label">Aplicaciones</h2>
            <ul className="mt-5 space-y-2.5">
              {apps.map((a) => (
                <li key={a.id}>
                  <Link className={col} href={a.href}>
                    {a.name} <span className="text-dim">· {a.kind}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <h2 className="sx-label mt-9">Encuéntrame</h2>
            <ul className="mt-5 space-y-2.5">
              <li>
                <a className={col} href={contact.github} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </li>
              <li>
                <a className={col} href={contact.tiktok} target="_blank" rel="noopener noreferrer">
                  TikTok {contact.tiktokHandle}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="sx-label">Contacto</h2>
            <address className="mt-5 space-y-2.5 text-[0.92rem] not-italic">
              <p className="font-semibold text-haze">{company.legalName}</p>
              <p className="text-mist">NIT {company.nit}</p>
              <p className="text-mist">{company.city}</p>
              <p>
                <a className="sx-link" href={`mailto:${company.email}`}>
                  {company.email}
                </a>
              </p>
              <p>
                <a className="sx-link" href={waLink()} target="_blank" rel="noopener noreferrer">
                  WhatsApp {company.phone}
                </a>
              </p>
            </address>
          </div>
        </nav>
      </div>
      <div className="border-t border-night-600">
        <div className="sx-wrap flex flex-col gap-2 py-6 text-xs text-dim sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <Year initial={year} /> Vesta Security · {company.legalName} Todos los derechos reservados.
          </p>
          <p>{companyText.es.registry}</p>
        </div>
      </div>
    </footer>
  );
}
