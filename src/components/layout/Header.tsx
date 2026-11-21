"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ArrowDownToLine } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { mainNav, downloadNav } from "@/content/site";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href.replace(/\/$/, ""));
}

export function Header() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      data-site-header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open ? "border-line bg-ivory" : "border-transparent bg-ivory"
      }`}
    >
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:bg-wine focus:px-4 focus:py-2 focus:text-ivory"
      >
        Saltar al contenido
      </a>
      <div className="wrap flex h-[4.5rem] items-center justify-between gap-6">
        <Link href="/" aria-label="Vesta Security, inicio" className="shrink-0">
          <Logo className="h-11 w-auto" />
        </Link>

        <nav aria-label="Principal" className="hidden xl:block">
          <ul className="flex items-center gap-7">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative py-2 text-[0.84rem] font-medium tracking-[0.01em] transition-colors hover:text-wine ${
                      active ? "text-wine" : "text-muted"
                    } after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-rose after:transition-transform after:duration-300 ${
                      active ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link href={downloadNav.href} className="btn btn-primary hidden !min-h-[2.6rem] !py-2 sm:inline-flex">
            <ArrowDownToLine aria-hidden="true" className="size-4" />
            {downloadNav.label}
          </Link>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center text-wine xl:hidden"
            aria-expanded={open}
            aria-controls="menu-movil"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X aria-hidden="true" className="size-6" /> : <Menu aria-hidden="true" className="size-6" />}
            <span className="sr-only">{open ? "Cerrar menú" : "Abrir menú"}</span>
          </button>
        </div>
      </div>

      <div
        id="menu-movil"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[4.5rem] overflow-y-auto border-t border-line bg-ivory xl:hidden"
      >
        <nav aria-label="Menú móvil" className="wrap flex min-h-full flex-col py-6">
          <ol className="flex-1">
            {mainNav.map((item, i) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href} className="border-b border-line">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className="flex items-baseline gap-5 py-4"
                  >
                    <span className="w-6 font-sans text-xs font-semibold text-rose-700">{String(i + 1).padStart(2, "0")}</span>
                    <span className={`font-serif text-[1.7rem] leading-tight ${active ? "text-wine" : "text-ink"}`}>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ol>
          <Link href={downloadNav.href} className="btn btn-primary mt-8 w-full justify-center">
            <ArrowDownToLine aria-hidden="true" className="size-4" />
            {downloadNav.label}
          </Link>
          <p className="mt-6 text-center text-xs text-muted">Disponible para Android</p>
        </nav>
      </div>
    </header>
  );
}
