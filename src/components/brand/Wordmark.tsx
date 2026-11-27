/**
 * Logotipo de Vesta Security: solo texto, en Space Grotesk.
 * «VESTA» en peso fuerte y «Security» más ligero, en lavanda.
 */
export function Wordmark({ className = "", size = "md" }: { className?: string; size?: "sm" | "md" | "lg" }) {
  const s = { sm: "text-[1.05rem]", md: "text-[1.35rem]", lg: "text-[2rem]" }[size];
  return (
    <span className={`inline-flex items-baseline gap-[0.32em] font-[family-name:var(--font-grotesk)] leading-none ${s} ${className}`}>
      <span className="font-bold tracking-[-0.035em] text-haze">VESTA</span>
      <span className="font-normal tracking-[-0.02em] text-violet-300">Security</span>
    </span>
  );
}
