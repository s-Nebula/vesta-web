import Link from "next/link";

const links = [
  ["Cómo funciona", "/aplicaciones/financial-security/#como-funciona"],
  ["Lo que hace", "/aplicaciones/financial-security/#funciones"],
  ["Cómo se usa", "/aplicaciones/financial-security/#uso"],
  ["Precio", "/aplicaciones/financial-security/#precio"],
  ["Preguntas", "/aplicaciones/financial-security/#preguntas"],
  ["Política de datos", "/aplicaciones/financial-security/politica-de-datos/"],
] as const;

/** Barra de Financial Security bajo la cabecera común (verde y dorado de la app). */
export function FinancialBar() {
  return (
    <div className="sticky top-[4.25rem] z-40 border-b border-[#09573f] bg-[#0B6E4F] text-white">
      <div className="sx-wrap flex h-12 items-center gap-6">
        <Link href="/aplicaciones/financial-security/" className="flex shrink-0 items-center gap-2 text-[0.92rem] font-semibold">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/financial_logo.svg" alt="" width={24} height={24} className="size-6 rounded-md" />
          Financial<span className="text-[#E9B949]">Security</span>
        </Link>
        <nav aria-label="Financial Security" className="no-scrollbar flex-1 overflow-x-auto">
          <ul className="flex gap-1 whitespace-nowrap">
            {links.map(([l, h]) => (
              <li key={h}>
                <Link href={h} className="rounded px-2.5 py-1.5 text-[0.84rem] text-white/80 hover:text-white">
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link
          href="/aplicaciones/financial-security/#descargar"
          className="hidden shrink-0 rounded-full bg-[#E9B949] px-3.5 py-1.5 text-[0.82rem] font-semibold text-[#16211d] hover:bg-[#f1ca6b] md:inline-flex"
        >
          Descargar
        </Link>
      </div>
    </div>
  );
}
