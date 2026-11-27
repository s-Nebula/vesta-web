import { SecurityHeader } from "@/components/layout/SecurityHeader";
import { SecurityFooter } from "@/components/layout/SecurityFooter";

/** Páginas de servicios de seguridad y blog (solo en español). */
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div lang="es">
      <SecurityHeader />
      <main id="contenido">{children}</main>
      <SecurityFooter />
    </div>
  );
}
