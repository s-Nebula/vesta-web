import { SecurityHeader } from "@/components/layout/SecurityHeader";
import { SecurityFooter } from "@/components/layout/SecurityFooter";

/** Páginas de Vesta Security: servicios, blog y aplicaciones (solo en español). */
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div lang="es" className="sx min-h-dvh">
      <SecurityHeader />
      <main id="contenido">{children}</main>
      <SecurityFooter />
    </div>
  );
}
