import Link from "next/link";
import { Logo } from "@/components/brand/Logo";

/** 404 page, in both languages (static export cannot know the visitor's language). */
export default function NotFound() {
  return (
    <main className="wrap py-20 md:py-32">
      <Link href="/" aria-label="Vesta Security">
        <Logo className="h-12 w-auto" />
      </Link>
      <div className="mt-16 grid gap-16 md:grid-cols-2">
        <section lang="es">
          <p className="kicker">Error 404</p>
          <h1 className="h-section mt-4">Esta página no existe o ha cambiado de lugar.</h1>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/" className="btn btn-primary">
              Volver al inicio
            </Link>
            <Link href="/ayuda/" className="btn btn-ghost">
              Ayuda
            </Link>
          </div>
        </section>
        <section lang="en">
          <p className="kicker">Error 404</p>
          <h2 className="h-section mt-4">This page does not exist or has moved.</h2>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/en/" className="btn btn-primary">
              Back to home
            </Link>
            <Link href="/en/help/" className="btn btn-ghost">
              Help
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
