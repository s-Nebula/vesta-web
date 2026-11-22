/**
 * Official Vesta logo (vesta_logo.svg) and symbol (vesta_simbolo.svg).
 * Paths, proportions and colours copied unchanged from the original files
 * in /public/brand. Inlined so the name uses the Montserrat typeface the
 * site loads (inside an <img> the SVG cannot reach it).
 */

type Props = { className?: string; title?: string };

function SymbolPaths() {
  return (
    <>
      <path fill="#421827" d="M256 34C143 34 58 119 58 229c0 139 150 240 198 279 48-39 198-140 198-279C454 119 369 34 256 34Z" />
      <path fill="#F4EDEA" d="M256 78c-88 0-153 65-153 151 0 91 86 166 153 222 67-56 153-131 153-222 0-86-65-151-153-151Z" />
      <circle fill="#421827" cx="211" cy="207" r="42" />
      <path fill="#421827" d="M133 344c3-58 36-91 78-91s75 33 78 91c-25 22-51 43-78 66-27-23-53-44-78-66Z" />
      <circle fill="#C15B68" cx="309" cy="255" r="31" />
      <path fill="#C15B68" d="M252 359c3-43 27-68 57-68s54 25 57 68c-18 17-37 32-57 48-20-16-39-31-57-48Z" />
      <path d="M91 326c58 73 214 78 323-12" fill="none" stroke="#C15B68" strokeWidth="25" strokeLinecap="round" />
      <path d="M105 345c74 54 204 55 291-10" fill="none" stroke="#F4EDEA" strokeWidth="8" strokeLinecap="round" />
    </>
  );
}

const WORD_FONT = "'Montserrat Variable', Montserrat, Arial, sans-serif";

export function Logo({ className, descriptor = "Protección familiar" }: Props & { descriptor?: string }) {
  return (
    <svg viewBox="0 0 1000 360" role="img" aria-label={`Vesta, ${descriptor.toLowerCase()}`} className={className}>
      <g transform="translate(28 18) scale(.62)">
        <SymbolPaths />
      </g>
      <text x="390" y="174" fill="#421827" fontFamily={WORD_FONT} fontWeight={700} letterSpacing="5px" fontSize="112">
        VESTA
      </text>
      <path d="M395 205H905" stroke="#D6B7A6" strokeWidth="3" />
      <text x="400" y="258" fill="#C15B68" fontFamily={WORD_FONT} fontSize="31" fontWeight={600} letterSpacing="8">
        {descriptor.toUpperCase()}
      </text>
    </svg>
  );
}

export function Symbol({ className, title = "Vesta" }: Props) {
  return (
    <svg viewBox="0 0 512 512" role="img" aria-label={title} className={className}>
      <SymbolPaths />
    </svg>
  );
}

/**
 * Protective arc: the lower stroke of the symbol, isolated as a graphic element.
 * Same path and proportion; only the scale changes.
 */
export function Arc({ className, color = "#C15B68", inner = "#F4EDEA" }: { className?: string; color?: string; inner?: string | null }) {
  return (
    <svg viewBox="70 290 365 105" className={className} aria-hidden="true" focusable="false">
      <path d="M91 326c58 73 214 78 323-12" fill="none" stroke={color} strokeWidth="25" strokeLinecap="round" />
      {inner && <path d="M105 345c74 54 204 55 291-10" fill="none" stroke={inner} strokeWidth="8" strokeLinecap="round" />}
    </svg>
  );
}
