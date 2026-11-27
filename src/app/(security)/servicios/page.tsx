import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ContactBand, Head, Price, ServiceDetail, SxFaq, securityMeta } from "@/components/security/parts";
import { enterprise, extras, faq, formatCop, legal, payment, plan, segments, services, sinIva, waLink } from "@/content/security";

export const metadata = securityMeta(
  "Servicios y precios",
  "Diagnóstico gratuito, Chequeo Digital Express, Red Segura para Comercios, Oficina Protegida, Tienda en Línea Segura, Firebase y pentest de apps. Precios cerrados en COP, con IVA incluido en el total.",
  "/servicios/",
);

const groups: { label: string; title: string; lead: string; ids: string[] }[] = [
  { label: "01", title: "Para empezar", lead: "Si no sabes por dónde empezar, empieza aquí. Sirven para cualquier negocio.", ids: ["diagnostico", "express"] },
  {
    label: "02",
    title: "Para pequeños negocios",
    lead: "Comercios con local, oficinas que manejan datos de clientes y tiendas que venden por internet.",
    ids: ["red", "oficina", "tienda"],
  },
  {
    label: "03",
    title: "Para startups y equipos de tecnología",
    lead: "Pruebas de penetración con metodología OWASP para apps web, APIs, apps Android y Firebase.",
    ids: ["firebase", "pentest-web", "android", "codigo"],
  },
];

export default function Page() {
  const byId = (id: string) => services.find((s) => s.id === id)!;
  const minExtra = Math.min(...extras.map((e) => e.price));

  return (
    <>
      <section className="border-b border-night-600">
        <div className="sx-wrap grid gap-10 pb-16 pt-16 md:pt-20 lg:grid-cols-12">
          <Head
            as="h1"
            className="lg:col-span-8"
            label="Servicios y precios"
            title={
              <>
                Precio cerrado <span className="sx-em">antes de empezar.</span>
              </>
            }
            lead="Precios en pesos colombianos antes de IVA (19 %); debajo verás el total con IVA incluido (los adicionales muestran directamente el total). Incluyen el informe, una reunión para explicarte los resultados y, en las pruebas de penetración, una nueva prueba cuando corrijas."
          />
          <nav aria-label="Ir a un servicio" className="sx-panel self-end p-5 text-[0.9rem] lg:col-span-4">
            <p className="sx-label">Ir a</p>
            <ul className="mt-3 grid gap-1.5">
              {services.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-mist hover:text-haze">
                    {s.name}
                  </a>
                </li>
              ))}
              <li>
                <a href="#plan" className="text-mist hover:text-haze">
                  {plan.name}
                </a>
              </li>
              <li>
                <a href="#adicionales" className="text-mist hover:text-haze">
                  Adicionales
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </section>

      {/* Resumen */}
      <section className="py-16 md:py-20">
        <div className="sx-wrap">
          <Head label="Resumen" title="Todos los servicios de un vistazo." />
          <div className="sx-panel mt-10 overflow-x-auto">
            <table className="w-full min-w-[44rem] border-collapse text-left text-[0.92rem]">
              <thead>
                <tr className="sx-mono border-b border-night-600 text-[0.78rem] uppercase tracking-wider text-dim">
                  <th scope="col" className="px-5 py-4 font-medium">Servicio</th>
                  <th scope="col" className="py-4 pr-4 font-medium">Para</th>
                  <th scope="col" className="py-4 pr-4 font-medium">Duración</th>
                  <th scope="col" className="py-4 pr-4 text-right font-medium">Precio + IVA</th>
                  <th scope="col" className="py-4 pr-5 text-right font-medium">Total</th>
                </tr>
              </thead>
              <tbody>
                {services.map((s) => (
                  <tr key={s.id} className="border-b border-night-600 last:border-0">
                    <th scope="row" className="px-5 py-3.5 font-medium">
                      <a href={`#${s.id}`} className="hover:text-violet-200">
                        {s.name}
                      </a>
                    </th>
                    <td className="py-3.5 pr-4 text-mist">{s.segment === "todos" ? "Cualquier negocio" : segments.find((g) => g.id === s.segment)!.name}</td>
                    <td className="py-3.5 pr-4 text-mist">{s.duration}</td>
                    <td className="py-3.5 pr-4 text-right font-medium tabular-nums">{s.price ? formatCop(sinIva(s.price)) : "Gratis"}</td>
                    <td className="py-3.5 pr-5 text-right tabular-nums text-dim">{s.price ? formatCop(s.price) : "—"}</td>
                  </tr>
                ))}
                <tr>
                  <th scope="row" className="px-5 py-3.5 font-medium">
                    <a href="#plan" className="hover:text-violet-200">
                      {plan.name}
                    </a>
                  </th>
                  <td className="py-3.5 pr-4 text-mist">Clientes</td>
                  <td className="py-3.5 pr-4 text-mist">Mensual</td>
                  <td className="py-3.5 pr-4 text-right font-medium tabular-nums">{formatCop(sinIva(plan.price))} / mes</td>
                  <td className="py-3.5 pr-5 text-right tabular-nums text-dim">{formatCop(plan.price)}</td>
                </tr>
                <tr className="border-t border-night-600">
                  <th scope="row" className="px-5 py-3.5 font-medium">
                    <a href="#adicionales" className="hover:text-violet-200">
                      Adicionales
                    </a>
                  </th>
                  <td className="py-3.5 pr-4 text-mist">Charla, nueva prueba, atestación</td>
                  <td className="py-3.5 pr-4 text-mist">Según el adicional</td>
                  <td className="py-3.5 pr-4 text-right font-medium tabular-nums">Desde {formatCop(sinIva(minExtra))}</td>
                  <td className="py-3.5 pr-5 text-right tabular-nums text-dim">Desde {formatCop(minExtra)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-[0.85rem] text-dim">Si tu caso es más grande que el alcance de un paquete, te envío una propuesta con precio cerrado antes de empezar.</p>
        </div>
      </section>

      {groups.map((g) => (
        <section key={g.title} className="border-t border-night-600 py-16 md:py-20">
          <div className="sx-wrap">
            <Head label={g.label} title={g.title} lead={g.lead} />
            <div className="mt-10">
              {g.ids.map((id) => (
                <ServiceDetail key={id} s={byId(id)} />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Plan mensual */}
      <section id="plan" className="scroll-mt-20 py-16 md:py-20">
        <div className="sx-wrap">
          <div className="sx-glass grid gap-10 p-8 md:p-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="sx-label">Acompañamiento mensual</p>
              <h2 className="sx-h2 mt-4">{plan.name}</h2>
              <div className="mt-6">
                <Price value={plan.price} per="mes" />
              </div>
              <a href={waLink(`Hola, me interesa el ${plan.name} de Vesta Security.`)} target="_blank" rel="noopener noreferrer" className="sx-btn sx-btn-ghost mt-7">
                Preguntar por el plan <ArrowRight aria-hidden="true" className="size-4" />
              </a>
            </div>
            <div className="lg:col-span-8">
              <p className="sx-lead">{plan.summary}</p>
              <ul className="mt-7 space-y-3">
                {plan.includes.map((i) => (
                  <li key={i} className="flex gap-3">
                    <span aria-hidden="true" className="sx-mono mt-[0.2rem] text-xs text-violet-300">
                      +
                    </span>
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-7 border-l border-violet-400/50 pl-5 text-[0.9rem] text-mist">{plan.terms}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Adicionales y empresas */}
      <section id="adicionales" className="scroll-mt-20 border-t border-night-600 py-16 md:py-20">
        <div className="sx-wrap grid gap-14 lg:grid-cols-2">
          <div>
            <Head title="Adicionales" lead="Se pueden contratar solos o junto con cualquier servicio." />
            <ul className="mt-8">
              {extras.map((e) => (
                <li key={e.name} className="flex justify-between gap-6 border-t border-night-600 py-5">
                  <div>
                    <p className="font-medium">{e.name}</p>
                    <p className="mt-1 text-[0.9rem] text-mist">{e.detail}</p>
                  </div>
                  <p className="shrink-0 text-right font-medium tabular-nums">
                    {formatCop(e.price)}
                    <span className="block text-xs font-normal text-dim">total</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Head
              title={
                <>
                  Cuando tu empresa <span className="sx-em">crezca</span>
                </>
              }
              lead="Servicios para empresas medianas, con propuesta a la medida."
            />
            <ul className="mt-8">
              {enterprise.map((e) => (
                <li key={e.name} className="flex justify-between gap-6 border-t border-night-600 py-5">
                  <div>
                    <p className="font-medium">{e.name}</p>
                    <p className="mt-1 text-[0.9rem] text-mist">{e.detail}</p>
                  </div>
                  <span className="sx-chip h-fit shrink-0">Cotización</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Pago y reglas */}
      <section className="border-t border-night-600 bg-night-950/60 py-16 md:py-20">
        <div className="sx-wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Head title="Forma de pago" />
            <ul className="mt-8 space-y-3">
              {payment.map((p) => (
                <li key={p} className="flex gap-3 text-mist">
                  <span aria-hidden="true" className="sx-mono mt-[0.2rem] text-xs text-violet-300">
                    +
                  </span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-7">
            <Head
              title={
                <>
                  Reglas que <span className="sx-em">nunca cambian</span>
                </>
              }
            />
            <dl className="mt-8">
              {legal.map(([k, v]) => (
                <div key={k} className="border-t border-night-600 py-5">
                  <dt className="font-medium">{k}</dt>
                  <dd className="mt-1 text-[0.95rem] leading-relaxed text-mist">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="border-t border-night-600 py-16 md:py-20">
        <div className="sx-wrap grid gap-12 lg:grid-cols-12">
          <Head className="lg:col-span-4" label="Preguntas frecuentes" title="Dudas comunes." />
          <div className="lg:col-span-8">
            <SxFaq items={faq} />
            <p className="mt-8 text-[0.9rem] text-mist">
              ¿Quieres leer más antes de decidir? Revisa el{" "}
              <Link href="/blog/" className="sx-link">
                blog
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <ContactBand />
    </>
  );
}
