import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";

/** Página 404 en los dos idiomas (la exportación estática no conoce el idioma del visitante). */
export default function NotFound() {
  return (
    <main className="sx min-h-dvh">
      <div className="sx-wrap py-16 md:py-28">
        <Link href="/" aria-label="Vesta Security">
          <Wordmark size="lg" />
        </Link>
        <p className="sx-mono mt-16 text-[0.8rem] text-dim">HTTP 404</p>
        <div className="mt-6 grid gap-16 md:grid-cols-2">
          <section lang="es">
            <h1 className="sx-h2">
              Esta página no existe <span className="sx-em">o cambió de lugar.</span>
            </h1>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/" className="sx-btn sx-btn-primary">
                Volver al inicio
              </Link>
              <Link href="/aplicaciones/" className="sx-btn sx-btn-ghost">
                Aplicaciones
              </Link>
            </div>
          </section>
          <section lang="en">
            <h2 className="sx-h2">
              This page does not exist <span className="sx-em">or has moved.</span>
            </h2>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/en/" className="sx-btn sx-btn-ghost">
                Vesta in English
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
