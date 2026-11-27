/**
 * Fondo de nebulosa (por Nebula, el autor): nubes de gas violeta, azul y
 * magenta más un campo de estrellas. Es fijo y no recibe clics.
 *
 * Las nubes son una imagen ya renderizada (public/img/nebula.webp, generada
 * desde scripts/nebula/render.html). Antes eran tres filtros feTurbulence con
 * desenfoque y mezcla "screen" calculados en vivo y animados, lo que hacía
 * lenta la navegación en celulares. Ahora solo se anima `transform` (lo hace
 * la GPU), y únicamente en pantallas grandes; en celular queda quieta.
 */
export function Nebula() {
  return (
    <div aria-hidden="true" className="nebula pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="nebula-gas absolute inset-[-15%]" />
      <div className="nebula-stars absolute inset-0" />
      <div className="nebula-stars nebula-stars-2 absolute inset-0" />
    </div>
  );
}
