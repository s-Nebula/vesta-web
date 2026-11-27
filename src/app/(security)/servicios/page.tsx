import Link from "next/link";
import { Check, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHead } from "@/components/ui/SectionHead";
import { Faq } from "@/components/ui/Faq";
import { ContactBand, Price, ServiceDetail, securityMeta } from "@/components/security/parts";
import { enterprise, extras, faq, formatCop, legal, payment, plan, segments, services, waLink, withIva } from "@/content/security";

export const metadata = securityMeta(
  "Servicios y precios",
  "Diagnóstico gratuito, Chequeo Digital Express, Red Segura para Comercios, Oficina Protegida, Tienda en Línea Segura, Firebase y pentest de apps. Precios cerrados en COP + IVA.",
  "/servicios/",
);

const groups: { title: string; lead: string; ids: string[] }[] = [
  {
    title: "Para empezar",
    lead: "Si no sabes por dónde empezar, empieza aquí. Sirven para cualquier negocio.",
    ids: ["diagnostico", "express"],
  },
  {
    title: "Para pequeños negocios",
    lead: "Comercios con local, oficinas que manejan datos de clientes y tiendas que venden por internet.",
    ids: ["red", "oficina", "tienda"],
  },
  {
    title: "Para startups y equipos de tecnología",
    lead: "Pruebas de penetración con metodología OWASP para apps web, APIs, apps Android y Firebase.",
    ids: ["firebase", "pentest-web", "android", "codigo"],
  },
];

export default function Page() {
  const byId = (id: string) => services.find((s) => s.id === id)!;
  const paid = services.filter((s) => s.price > 0);

  return (
    <>
      <PageHero
        kicker="Servicios y precios"
        title="Precio cerrado antes de empezar."
        lead={
          <p>
            Todos los precios están en pesos colombianos, antes de IVA (19 %), y debajo verás el total. Incluyen el informe, una reunión para
            explicarte los resultados y, en las pruebas de penetración, una nueva prueba cuando corrijas.
          </p>
        }
        aside={
          <nav aria-label="Ir a un servicio" className="border border-line bg-paper p-5 text-sm">
            <p className="kicker">Ir a</p>
            <ul className="mt-3 space-y-1.5">
              {services.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="link">
                    {s.name}
                  </a>
                </li>
              ))}
              <li>
                <a href="#plan" className="link">
                  {plan.name}
                </a>
              </li>
            </ul>
          </nav>
        }
      />

      {/* Resumen */}
      <section className="border-b border-line">
        <div className="wrap py-16 md:py-20">
          <SectionHead kicker="Resumen" title="Todos los servicios de un vistazo." />
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-wine text-xs uppercase tracking-[0.12em] text-muted">
                  <th scope="col" className="py-3 pr-4 font-semibold">Servicio</th>
                  <th scope="col" className="py-3 pr-4 font-semibold">Para</th>
                  <th scope="col" className="py-3 pr-4 font-semibold">Duración</th>
                  <th scope="col" className="py-3 pr-4 text-right font-semibold">Precio + IVA</th>
                  <th scope="col" className="py-3 text-right font-semibold">Total</th>
                </tr>
              </thead>
              <tbody>
                {services.map((s) => (
                  <tr key={s.id} className="border-b border-line">
                    <th scope="row" className="py-3.5 pr-4 font-semibold">
                      <a href={`#${s.id}`} className="hover:text-rose-700">
                        {s.name}
                      </a>
                    </th>
                    <td className="py-3.5 pr-4 text-muted">{s.segment === "todos" ? "Cualquier negocio" : segments.find((g) => g.id === s.segment)!.name}</td>
                    <td className="py-3.5 pr-4 text-muted">{s.duration}</td>
                    <td className="py-3.5 pr-4 text-right font-semibold tabular-nums">{s.price ? formatCop(s.price) : "Gratis"}</td>
                    <td className="py-3.5 text-right tabular-nums text-muted">{s.price ? formatCop(withIva(s.price)) : "—"}</td>
                  </tr>
                ))}
                <tr className="border-b border-line">
                  <th scope="row" className="py-3.5 pr-4 font-semibold">
                    <a href="#plan" className="hover:text-rose-700">
                      {plan.name}
                    </a>
                  </th>
                  <td className="py-3.5 pr-4 text-muted">Clientes</td>
                  <td className="py-3.5 pr-4 text-muted">Mensual</td>
                  <td className="py-3.5 pr-4 text-right font-semibold tabular-nums">{formatCop(plan.price)} / mes</td>
                  <td className="py-3.5 text-right tabular-nums text-muted">{formatCop(withIva(plan.price))}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-muted">
            {paid.length} servicios con precio fijo. Si tu caso es más grande que el alcance de un paquete, te envío una propuesta con precio
            cerrado antes de empezar.
          </p>
        </div>
      </section>

      {/* Detalle por grupos */}
      {groups.map((g) => (
        <section key={g.title} className="border-b border-line">
          <div className="wrap py-16 md:py-20">
            <SectionHead title={g.title} lead={g.lead} />
            <div className="mt-10">
              {g.ids.map((id) => (
                <ServiceDetail key={id} s={byId(id)} />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Plan mensual */}
      <section id="plan" className="scroll-mt-20 border-b border-line bg-paper">
        <div className="wrap grid gap-10 py-16 md:py-20 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="kicker">Acompañamiento mensual</p>
            <h2 className="h-section mt-4">{plan.name}</h2>
            <div className="mt-6">
              <Price value={plan.price} per="mes" />
            </div>
            <a href={waLink(`Hola, me interesa el ${plan.name} de Vesta Security.`)} target="_blank" rel="noopener noreferrer" className="btn btn-ghost mt-7">
              <MessageCircle aria-hidden="true" className="size-4" />
              Preguntar por el plan
            </a>
          </div>
          <div className="lg:col-span-8">
            <p className="lead">{plan.summary}</p>
            <ul className="mt-7 space-y-3">
              {plan.includes.map((i) => (
                <li key={i} className="flex gap-3">
                  <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-rose-700" />
                  <span>{i}</span>
                </li>
              ))}
            </ul>
            <p className="mt-7 border-l-2 border-beige pl-5 text-sm text-muted">{plan.terms}</p>
          </div>
        </div>
      </section>

      {/* Adicionales y empresas */}
      <section className="border-b border-line">
        <div className="wrap grid gap-14 py-16 md:py-20 lg:grid-cols-2">
          <div>
            <SectionHead title="Adicionales" lead="Se pueden contratar solos o junto con cualquier servicio." />
            <ul className="mt-8">
              {extras.map((e) => (
                <li key={e.name} className="flex justify-between gap-6 border-t border-line py-5">
                  <div>
                    <p className="font-semibold">{e.name}</p>
                    <p className="mt-1 text-sm text-muted">{e.detail}</p>
                  </div>
                  <p className="shrink-0 text-right font-semibold tabular-nums">
                    {formatCop(e.price)}
                    <span className="block text-xs font-normal text-muted">+ IVA</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHead title="Cuando tu empresa crezca" lead="Servicios para empresas medianas, con propuesta a la medida." />
            <ul className="mt-8">
              {enterprise.map((e) => (
                <li key={e.name} className="flex justify-between gap-6 border-t border-line py-5">
                  <div>
                    <p className="font-semibold">{e.name}</p>
                    <p className="mt-1 text-sm text-muted">{e.detail}</p>
                  </div>
                  <p className="shrink-0 text-sm font-semibold text-muted">Cotización</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Pago y marco legal */}
      <section className="border-b border-line bg-paper">
        <div className="wrap grid gap-14 py-16 md:py-20 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHead title="Forma de pago" />
            <ul className="mt-8 space-y-3">
              {payment.map((p) => (
                <li key={p} className="flex gap-3">
                  <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-rose-700" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-7">
            <SectionHead title="Reglas que nunca cambian" />
            <dl className="mt-8">
              {legal.map(([k, v]) => (
                <div key={k} className="border-t border-line py-5">
                  <dt className="font-semibold">{k}</dt>
                  <dd className="mt-1 text-[0.95rem] text-muted">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="wrap grid gap-12 py-16 md:py-20 lg:grid-cols-12">
          <SectionHead className="lg:col-span-4" kicker="Preguntas frecuentes" title="Dudas comunes." />
          <div className="lg:col-span-8">
            <Faq items={faq} />
            <p className="mt-8 text-sm text-muted">
              ¿Quieres leer más antes de decidir? Revisa el{" "}
              <Link href="/blog/" className="link">
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
