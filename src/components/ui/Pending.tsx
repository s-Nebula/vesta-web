/**
 * Marcador de contenido pendiente.
 * - En desarrollo (`next dev`) se ve como un aviso interno, con lo que falta.
 * - En producción muestra `fallback` (texto neutro) o nada.
 */
export function Pending({ what, fallback }: { what: string; fallback?: React.ReactNode }) {
  if (process.env.NODE_ENV !== "production") {
    return (
      <span className="inline-flex items-start gap-2 border border-dashed border-warn bg-[#fbf1df] px-2.5 py-1.5 font-sans text-xs font-medium leading-snug text-warn">
        <span aria-hidden="true">●</span>
        <span>
          <strong className="font-semibold">Pendiente:</strong> {what}
        </span>
      </span>
    );
  }
  return fallback ? <>{fallback}</> : null;
}
