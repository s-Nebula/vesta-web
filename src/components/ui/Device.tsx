import type { Screenshot } from "@/content/features";

type Props = {
  shot: Pick<Screenshot, "src" | "alt" | "kind" | "sizes">;
  className?: string;
  priority?: boolean;
  sizesAttr?: string;
};

/** Marco de dispositivo con una captura real. Las capturas se sirven en WebP a dos tamaños. */
export function Device({ shot, className = "", priority = false, sizesAttr }: Props) {
  const [s, l] = shot.sizes;
  const isPhone = shot.kind === "phone";
  const srcSet = `${shot.src}-${s}.webp ${s}w, ${shot.src}-${l}.webp ${l}w`;
  const dims = isPhone ? { width: s, height: Math.round((s * 2340) / 1080) } : { width: s, height: Math.round(s * 0.6573) };
  return (
    <div
      className={`${isPhone ? "rounded-[2.1rem] p-[7px]" : "rounded-[1.4rem] p-[9px]"} bg-wine-950 shadow-[0_30px_60px_-30px_rgba(44,16,27,.55),0_0_0_1px_rgba(44,16,27,.9)] ${className}`}
    >
      <img
        src={`${shot.src}-${s}.webp`}
        srcSet={srcSet}
        sizes={sizesAttr ?? (isPhone ? "(min-width: 64rem) 300px, 60vw" : "(min-width: 64rem) 640px, 90vw")}
        alt={shot.alt}
        {...dims}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className={`block h-auto w-full ${isPhone ? "rounded-[1.65rem]" : "rounded-[0.9rem]"}`}
      />
    </div>
  );
}
