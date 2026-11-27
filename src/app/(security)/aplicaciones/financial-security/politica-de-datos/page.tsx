import fs from "node:fs";
import path from "node:path";
import { securityMeta } from "@/components/security/parts";
import { FinancialBar } from "@/components/apps/FinancialBar";

export const metadata = securityMeta(
  "Política de tratamiento de datos · Financial Security",
  "Cómo trata FORBIDDEN S.A.S. los datos personales en Financial Security: responsable, finalidades, derechos, seguridad y conservación (Ley 1581 de 2012).",
  "/aplicaciones/financial-security/politica-de-datos/",
  false,
  "/og-financial.png",
);

/** Texto oficial de la política (copiado de la antigua web de Financial). */
const body = fs.readFileSync(path.join(process.cwd(), "src/content/financial/politica-datos.html"), "utf8");

export default function Page() {
  return (
    <>
      <FinancialBar />
      <div className="sx-wrap max-w-[52rem] py-14 md:py-20">
        <p className="sx-label">Financial Security</p>
        <h1 className="mt-4 text-[clamp(2rem,1.4rem+2.4vw,3.2rem)] font-medium leading-[1.05] tracking-[-0.04em]">Política de tratamiento de datos personales</h1>
        <div className="sx-prose mt-6" dangerouslySetInnerHTML={{ __html: body }} />
      </div>
    </>
  );
}
