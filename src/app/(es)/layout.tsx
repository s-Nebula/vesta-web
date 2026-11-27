import { SecurityHeader } from "@/components/layout/SecurityHeader";
import { SecurityFooter } from "@/components/layout/SecurityFooter";
import { VestaAppBar } from "@/components/layout/AppBar";

/**
 * Páginas en español de la app Vesta (control parental): marco común de
 * Vesta Security y, debajo, la barra y los colores propios de la app.
 * Las páginas en inglés (/en/) conservan su propia cabecera.
 */
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div lang="es">
      <SecurityHeader />
      <VestaAppBar />
      <main id="contenido" className="bg-ivory text-ink">
        {children}
      </main>
      <SecurityFooter />
    </div>
  );
}
