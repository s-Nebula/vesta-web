/**
 * Fondo de nebulosa (por Nebula, el autor). Nubes de gas hechas con ruido
 * fractal (feTurbulence) teñido de violeta, azul y magenta, más un campo de
 * estrellas. Es fijo, no recibe clics y se mueve muy despacio; si el usuario
 * pidió reducir movimiento, queda quieto (ver .nebula-* en globals.css).
 */
export function Nebula() {
  return (
    <div aria-hidden="true" className="nebula pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <svg className="nebula-gas absolute inset-[-15%] h-[130%] w-[130%]" preserveAspectRatio="none" viewBox="0 0 1000 1000">
        <defs>
          <filter id="neb-a" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.0032 0.0045" numOctaves="5" seed="11" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.43
                      0 0 0 0 0.33
                      0 0 0 0 0.86
                      0 0 0 2.6 -1.25"
            />
          </filter>
          <filter id="neb-b" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.005 0.0035" numOctaves="4" seed="27" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.86
                      0 0 0 0 0.36
                      0 0 0 0 0.66
                      0 0 0 2.4 -1.3"
            />
          </filter>
          <filter id="neb-c" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.0045" numOctaves="4" seed="5" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.3
                      0 0 0 0 0.55
                      0 0 0 0 0.95
                      0 0 0 2.2 -1.25"
            />
          </filter>
          <radialGradient id="neb-ma" cx="78%" cy="18%" r="55%">
            <stop offset="0" stopColor="#fff" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="neb-mb" cx="15%" cy="62%" r="45%">
            <stop offset="0" stopColor="#fff" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="neb-mc" cx="60%" cy="88%" r="40%">
            <stop offset="0" stopColor="#fff" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id="neb-mask-a">
            <rect width="1000" height="1000" fill="url(#neb-ma)" />
          </mask>
          <mask id="neb-mask-b">
            <rect width="1000" height="1000" fill="url(#neb-mb)" />
          </mask>
          <mask id="neb-mask-c">
            <rect width="1000" height="1000" fill="url(#neb-mc)" />
          </mask>
        </defs>
        <rect width="1000" height="1000" filter="url(#neb-a)" mask="url(#neb-mask-a)" />
        <rect width="1000" height="1000" filter="url(#neb-b)" mask="url(#neb-mask-b)" opacity="0.75" />
        <rect width="1000" height="1000" filter="url(#neb-c)" mask="url(#neb-mask-c)" opacity="0.6" />
      </svg>
      <div className="nebula-stars absolute inset-0" />
      <div className="nebula-stars nebula-stars-2 absolute inset-0" />
    </div>
  );
}
