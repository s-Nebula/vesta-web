import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ContactBand, Head, securityMeta } from "@/components/security/parts";
import { apps } from "@/content/apps";

export const metadata = securityMeta(
  "Aplicaciones",
  "Vesta (control parental), Financial Security (créditos y cobranza) y Nebula PDF (traductor de PDF para libros de ciberseguridad): las aplicaciones de Vesta Security.",
  "/aplicaciones/",
);

export default function Page() {
  return (
    <>
      <section className="border-b border-night-600">
        <div className="sx-wrap pb-14 pt-16 md:pt-20">
          <Head
            as="h1"
            label="Aplicaciones"
            title={
              <>
                Construyo lo que <span className="sx-em">audito.</span>
              </>
            }
            lead="Tres aplicaciones propias, en uso real. Cada una resuelve un problema distinto y todas están diseñadas con los mismos controles que reviso en las auditorías."
          />
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="sx-wrap space-y-5">
          {apps.map((a, i) => (
            <article key={a.id} className="sx-panel grid gap-8 overflow-hidden p-7 md:p-10 lg:grid-cols-12" style={{ boxShadow: `inset 3px 0 0 ${a.accent}` }}>
              <div className="lg:col-span-5">
                <div className="flex items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={a.logo} alt="" width={64} height={64} className="size-16 rounded-2xl" />
                  <div>
                    <p className="sx-mono text-xs text-dim">{String(i + 1).padStart(2, "0")}</p>
                    <h2 className="text-[1.9rem] font-medium leading-tight tracking-[-0.035em]">{a.name}</h2>
                    <p className="text-[0.9rem]" style={{ color: a.accent }}>
                      {a.kind}
                    </p>
                  </div>
                </div>
                <p className="sx-mono mt-6 text-[0.85rem] text-dim">{a.platform}</p>
              </div>
              <div className="lg:col-span-7">
                <p className="sx-lead !text-haze">{a.summary}</p>
                <p className="mt-5 text-[0.95rem] leading-relaxed text-mist">
                  <span className="sx-label mr-2 !text-[0.76rem]">Seguridad</span>
                  {a.security}
                </p>
                <Link href={a.href} className="sx-btn sx-btn-ghost mt-7">
                  Conocer {a.name} <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <ContactBand />
    </>
  );
}
