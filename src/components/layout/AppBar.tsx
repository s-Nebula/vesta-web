"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowDownToLine } from "lucide-react";
import { mainNav } from "@/content/site";
import { href, translatePath } from "@/i18n";

/**
 * Barra de la app Vesta (control parental) bajo la cabecera común.
 * Conserva la identidad de la app: borgoña y marfil.
 */
export function VestaAppBar() {
  const pathname = usePathname() ?? href("es", "home");
  const nav = mainNav("es");
  const home = href("es", "home");
  const active = (t: string) => (t === home ? pathname === home || pathname === home.replace(/\/$/, "") : pathname.startsWith(t.replace(/\/$/, "")));

  return (
    <div className="sticky top-[4.25rem] z-40 border-b border-wine-700 bg-wine text-ivory">
      <div className="wrap flex h-12 items-center gap-6">
        <Link href={home} className="flex shrink-0 items-center gap-2 text-[0.9rem] font-semibold">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/vesta_simbolo.svg" alt="" width={24} height={24} className="size-6 rounded bg-ivory p-0.5" />
          Vesta <span className="hidden font-normal text-rose-300 sm:inline">· Control parental</span>
        </Link>
        <nav aria-label="Vesta control parental" className="no-scrollbar -mx-2 flex-1 overflow-x-auto">
          <ul className="flex items-center gap-1 whitespace-nowrap">
            {nav
              .filter((i) => i.page !== "home")
              .map((i) => (
                <li key={i.href}>
                  <Link
                    href={i.href}
                    aria-current={active(i.href) ? "page" : undefined}
                    className={`rounded px-2.5 py-1.5 text-[0.84rem] ${active(i.href) ? "bg-wine-700 text-ivory" : "text-ivory/75 hover:text-ivory"}`}
                  >
                    {i.label}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
        <Link href={translatePath(pathname, "en")} hrefLang="en" lang="en" className="hidden text-[0.8rem] font-semibold text-ivory/80 hover:text-ivory sm:inline">
          EN
        </Link>
        <Link href={href("es", "downloads")} className="hidden shrink-0 items-center gap-1.5 rounded bg-ivory px-3 py-1.5 text-[0.82rem] font-semibold text-wine hover:bg-beige-100 md:inline-flex">
          <ArrowDownToLine aria-hidden="true" className="size-3.5" />
          Descargar
        </Link>
      </div>
    </div>
  );
}
