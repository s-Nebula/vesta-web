import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Device } from "@/components/ui/Device";
import { features, upcoming } from "@/content/features";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Funcionalidades",
  description:
    "Ubicación, estado del dispositivo, estadísticas de uso, filtrado de aplicaciones y dominios, alertas, gestión de dispositivos y autorizaciones de privacidad en Vesta.",
  path: "/funcionalidades/",
});

export default function FuncionalidadesPage() {
  return (
    <>
      <PageHero
        kicker="Funcionalidades"
        title="Cada función, con su finalidad y sus límites."
        lead="Esta página describe las funciones disponibles en la versión actual de Vesta Padre y Vesta Tracker: para qué sirven, cómo se usan, en qué aplicación se gestionan y qué autorización requieren."
      />

      <div className="wrap grid gap-12 py-16 lg:grid-cols-12 lg:py-24">
        {/* Índice */}
        <nav aria-label="Índice de funcionalidades" className="min-w-0 lg:col-span-3">
          <div className="lg:sticky lg:top-28">
            <p className="kicker">Índice</p>
            <ol className="no-scrollbar -mx-5 mt-5 flex gap-2 overflow-x-auto px-5 pb-2 lg:mx-0 lg:block lg:space-y-0 lg:overflow-visible lg:px-0">
              {features.map((f) => (
                <li key={f.id} className="shrink-0 lg:border-b lg:border-line">
                  <a
                    href={`#${f.id}`}
                    className="flex items-baseline gap-3 whitespace-nowrap rounded-full border border-line px-3.5 py-1.5 text-sm text-ink hover:border-wine lg:rounded-none lg:border-0 lg:px-0 lg:py-3 lg:hover:text-rose-700"
                  >
                    <span className="text-[0.7rem] font-semibold text-rose-700">{f.index}</span>
                    {f.title}
                  </a>
                </li>
              ))}
              {upcoming.length > 0 && (
                <li className="shrink-0">
                  <a href="#no-disponible" className="flex items-baseline gap-3 whitespace-nowrap rounded-full border border-dashed border-beige px-3.5 py-1.5 text-sm text-muted lg:rounded-none lg:border-0 lg:px-0 lg:py-3">
                    Aún no disponible
                  </a>
                </li>
              )}
            </ol>
          </div>
        </nav>

        <div className="lg:col-span-9">
          {features.map((f, i) => (
            <article
              key={f.id}
              id={f.id}
              aria-labelledby={`${f.id}-t`}
              className={`scroll-mt-28 border-t border-wine py-14 first:pt-10 md:py-20 ${i === 0 ? "" : ""}`}
            >
              <div className={`grid gap-10 ${f.screenshot ? (f.screenshot.kind === "phone" ? "md:grid-cols-[1fr_15rem]" : "") : ""} md:gap-14`}>
                <div>
                  <div className="flex items-baseline gap-4">
                    <span className="font-sans text-sm font-semibold text-rose-700">{f.index}</span>
                    <span className="tag text-ok">Disponible</span>
                  </div>
                  <h2 id={`${f.id}-t`} className="h-section mt-4">
                    {f.title}
                  </h2>
                  <p className="mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-ink">{f.description}</p>

                  <dl className="mt-10 grid gap-x-10 border-t border-line sm:grid-cols-2">
                    <div className="border-b border-line py-5 sm:col-span-2">
                      <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted">Para qué sirve</dt>
                      <dd className="mt-2 text-[0.96rem]">{f.purpose}</dd>
                    </div>
                    <div className="border-b border-line py-5 sm:col-span-2">
                      <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted">Cómo se utiliza</dt>
                      <dd className="mt-3">
                        <ol className="space-y-2 text-[0.96rem]">
                          {f.howTo.map((s, n) => (
                            <li key={s} className="flex gap-4">
                              <span className="mt-[0.2em] text-xs font-semibold text-rose-700">{n + 1}.</span>
                              <span>{s}</span>
                            </li>
                          ))}
                        </ol>
                      </dd>
                    </div>
                    <div className="border-b border-line py-5">
                      <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted">Dónde se administra</dt>
                      <dd className="mt-2 text-[0.96rem]">{f.managedIn}</dd>
                    </div>
                    <div className="border-b border-line py-5">
                      <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted">Autorización requerida</dt>
                      <dd className="mt-2 text-[0.96rem]">
                        {f.authorization.purpose || f.authorization.android ? (
                          <>
                            {f.authorization.purpose && (
                              <span className="block">
                                Finalidad: <strong className="font-semibold">{f.authorization.purpose}</strong>
                              </span>
                            )}
                            {f.authorization.android && (
                              <span className="mt-1 block text-muted">Android: {f.authorization.android.join(" · ")}</span>
                            )}
                          </>
                        ) : (
                          <span className="text-muted">No requiere una finalidad específica.</span>
                        )}
                      </dd>
                    </div>
                  </dl>

                  {f.limits && (
                    <p className="mt-6 flex max-w-2xl gap-3 text-sm text-muted">
                      <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-rose-700" />
                      <span>
                        <strong className="font-semibold text-ink">Límites. </strong>
                        {f.limits}
                      </span>
                    </p>
                  )}
                </div>

                {f.screenshot && (
                  <figure className={f.screenshot.kind === "phone" ? "mx-auto w-[62%] max-w-[15rem] md:w-full" : "max-w-xl"}>
                    <Device shot={f.screenshot} sizesAttr={f.screenshot.kind === "phone" ? "240px" : "(min-width: 48rem) 576px, 90vw"} />
                    <figcaption className="mt-4 text-xs leading-relaxed text-muted">{f.screenshot.caption}</figcaption>
                  </figure>
                )}
              </div>
            </article>
          ))}

          {upcoming.length > 0 && (
            <section id="no-disponible" aria-labelledby="no-disponible-t" className="scroll-mt-28 border-t border-dashed border-beige py-14">
              <span className="tag text-warn">Aún no disponible</span>
              <h2 id="no-disponible-t" className="h-sub mt-4">
                Funciones que todavía no están disponibles
              </h2>
              <ul className="mt-6 space-y-5">
                {upcoming.map((u) => (
                  <li key={u.title} className="max-w-2xl">
                    <p className="font-serif text-lg">{u.title}</p>
                    <p className="mt-1 text-sm text-muted">{u.note}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="border-t border-wine pt-10">
            <Link href="/documentacion/guia-de-usuario/" className="arrow-link">
              Instrucciones completas en la Guía de usuario <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
