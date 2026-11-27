import { SecurityHeader } from "@/components/layout/SecurityHeader";
import { SecurityFooter } from "@/components/layout/SecurityFooter";
import { Nebula } from "@/components/brand/Nebula";

/** Páginas de Vesta Security: servicios, blog y aplicaciones (solo en español). */
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div lang="es" className="sx relative min-h-dvh">
      <Nebula />
      <SecurityHeader />
      <main id="contenido" className="relative z-10">
        {children}
      </main>
      <div className="relative z-10">
        <SecurityFooter />
      </div>
    </div>
  );
}
