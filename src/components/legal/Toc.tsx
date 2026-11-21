"use client";
import { useEffect, useState } from "react";

export type TocItem = { id: string; text: string };

/** Índice con resaltado de la sección visible. */
export function Toc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-90px 0px -65% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  return (
    <ol className="space-y-0.5 text-[0.84rem] leading-snug">
      {items.map((i) => (
        <li key={i.id}>
          <a
            href={`#${i.id}`}
            aria-current={active === i.id ? "location" : undefined}
            className={`block border-l py-1.5 pl-4 transition-colors ${
              active === i.id ? "border-rose font-semibold text-wine" : "border-line text-muted hover:border-beige hover:text-ink"
            }`}
          >
            {i.text}
          </a>
        </li>
      ))}
    </ol>
  );
}
