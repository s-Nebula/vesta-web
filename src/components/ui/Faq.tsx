import Link from "next/link";
import { Plus } from "lucide-react";
import type { QA } from "@/content/help";

export function Faq({ items }: { items: QA[] }) {
  return (
    <div className="border-t border-line">
      {items.map((item) => (
        <details key={item.q} className="group border-b border-line">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
            <h3 className="font-serif text-xl leading-snug md:text-[1.4rem]">{item.q}</h3>
            <Plus aria-hidden="true" className="mt-1 size-5 shrink-0 text-rose-700 transition-transform duration-300 group-open:rotate-45" />
          </summary>
          <div className="max-w-3xl pb-7 pr-10 text-[0.98rem] text-muted">
            {item.a.map((p) => (
              <p key={p} className="mt-3 first:mt-0">
                {p}
              </p>
            ))}
            {item.links && (
              <p className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                {item.links.map((l) => (
                  <Link key={l.href} href={l.href} className="link text-sm font-semibold">
                    {l.label}
                  </Link>
                ))}
              </p>
            )}
          </div>
        </details>
      ))}
    </div>
  );
}
