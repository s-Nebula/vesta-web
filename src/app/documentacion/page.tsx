import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { legalDocs } from "@/content/legal";
import { company } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Centro de documentación legal y privacidad",
  description:
    "Términos y condiciones, Política de tratamiento de datos personales y privacidad, y Guía de usuario de Vesta Security. Textos completos, versión 1.0.",
  path: "/documentacion/",
});

const retention = [
  ["Historial de ubicación", "90 días"],
  ["Informes de uso", "90 días"],
  ["Estado del dispositivo", "90 días desde la última actualización"],
  ["Alertas", "12 meses"],
  ["Registros de seguridad", "12 meses, salvo necesidad justificada"],
  ["Copias de respaldo", "Ciclo máximo de 90 días"],
];

export default function DocumentacionPage() {
  return (
    <>
      <PageHero
        kicker="Documentación"
        title="Centro de documentación legal y privacidad"
        lead="Los documentos que regulan el uso de Vesta y el tratamiento de los datos personales, publicados completos, con su versión y sus fechas. Son los mismos que se aceptan dentro de Vesta Padre."
      />

      <section aria-label="Documentos" className="py-16 md:py-24">
        <div className="wrap">
          <ol className="border-t border-wine">
            {legalDocs.map((d) => (
              <li key={d.slug} className="border-b border-line">
                <Link href={`/documentacion/${d.slug}/`} className="group grid gap-6 py-10 md:grid-cols-12 md:py-12">
                  <div className="md:col-span-2">
                    <p className="kicker">{d.kicker}</p>
                  </div>
                  <div className="md:col-span-6">
                    <h2 className="font-serif text-[1.9rem] leading-tight transition-colors group-hover:text-rose-700 md:text-[2.3rem]">{d.title}</h2>
                    <p className="mt-4 text-[0.96rem] text-muted">{d.summary}</p>
                  </div>
                  <dl className="grid grid-cols-2 content-start gap-x-6 gap-y-3 text-sm md:col-span-3 md:col-start-10">
                    <div>
                      <dt className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-muted">Versión</dt>
                      <dd className="mt-0.5 font-medium">{d.version}</dd>
                    </div>
                    <div>
                      <dt className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-muted">Estado</dt>
                      <dd className="mt-0.5 font-medium text-ok">{d.status === "oficial" ? "Vigente" : "Pendiente"}</dd>
                    </div>
                    <div className="col-span-2">
                      <dt className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-muted">Actualización</dt>
                      <dd className="mt-0.5 font-medium">{d.updatedDate}</dd>
                    </div>
                  </dl>
                  <span className="arrow-link md:col-span-10 md:col-start-3">
                    Leer documento <ArrowRight aria-hidden="true" className="size-4" />
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="resumen" className="border-t border-line bg-paper py-20 md:py-28">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="kicker">Resumen de privacidad</p>
            <h2 id="resumen" className="h-sub mt-5">
              Lo esencial de la Política, en una página
            </h2>
            <div className="mt-6 space-y-4 text-[0.96rem] text-muted">
              <p>
                <strong className="font-semibold text-ink">Responsable:</strong> {company.legalName}, NIT {company.nit}, conforme a la Ley 1581 de
                2012.
              </p>
              <p>
                <strong className="font-semibold text-ink">Finalidades:</strong> cuentas, vinculación, ubicación autorizada, informes de uso,
                reglas de bloqueo, filtrado DNS, alertas, diagnóstico, seguridad y atención de solicitudes. Sin publicidad comportamental ni venta
                de perfiles.
              </p>
              <p>
                <strong className="font-semibold text-ink">Derechos:</strong> conocer, actualizar, rectificar, solicitar prueba de la
                autorización, presentar consultas y reclamos, pedir la supresión y revocar la autorización.
              </p>
              <p>
                <strong className="font-semibold text-ink">Plazos de respuesta:</strong> consultas en 10 días hábiles; reclamos en 15 días hábiles.
              </p>
              <p>
                <strong className="font-semibold text-ink">Canal:</strong>{" "}
                <a href={`mailto:${company.email}`} className="link">
                  {company.email}
                </a>
              </p>
            </div>
            <p className="mt-6 text-xs text-muted">Este resumen no sustituye a la Política completa, que es el documento que rige.</p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <h3 className="kicker">Plazos de conservación</h3>
            <table className="mt-5 w-full border-collapse text-left text-sm">
              <tbody>
                {retention.map(([k, v]) => (
                  <tr key={k} className="border-b border-line first:border-t first:border-t-wine">
                    <th scope="row" className="py-3.5 pr-6 font-serif text-base font-medium">
                      {k}
                    </th>
                    <td className="py-3.5 text-muted">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Link href="/documentacion/politica-de-privacidad/#14-politica-de-conservacion" className="arrow-link mt-6">
              Ver la tabla completa <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            <p className="mt-10 text-sm text-muted">
              Este sitio web no utiliza cookies ni herramientas de analítica o publicidad de terceros.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
