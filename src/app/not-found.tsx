import Link from "next/link";
import { Arc } from "@/components/brand/Logo";

export default function NotFound() {
  return (
    <section className="wrap relative py-28 md:py-40">
      <p className="kicker">Error 404</p>
      <h1 className="display mt-6 max-w-3xl">Esta página no existe o ha cambiado de lugar.</h1>
      <div className="mt-10 flex flex-wrap gap-6">
        <Link href="/" className="btn btn-primary">
          Volver al inicio
        </Link>
        <Link href="/ayuda/" className="btn btn-ghost">
          Centro de ayuda
        </Link>
      </div>
      <Arc className="mt-20 w-72" />
    </section>
  );
}
