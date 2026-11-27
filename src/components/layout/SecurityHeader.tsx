"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { securityNav, waLink } from "@/content/security";


function isActive(pathname: string, target: string) {
  if (target.includes("#")) return false;
  if (target === "/") return pathname === "/";
  return pathname.startsWith(target.replace(/\/$/, ""));
}

/** Cabecera de las páginas de servicios de seguridad (solo en español). */
export function SecurityHeader() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header data-site-header className="sticky top-0 z-50 border-b border-line bg-ivory">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:bg-wine focus:px-4 focus:py-2 focus:text-ivory"
      >
        Saltar al contenido
      </a>
      <div className="wrap flex h-[4.5rem] items-center justify-between gap-6">
        <Link href="/" aria-label="Vesta Security, inicio" className="shrink-0">
          <Logo className="h-11 w-auto" descriptor="Ciberseguridad" />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {securityNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`py-2 text-[0.9rem] font-medium transition-colors hover:text-wine ${
                      active ? "text-wine underline decoration-rose decoration-2 underline-offset-[0.6rem]" : "text-muted"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn-primary hidden !min-h-[2.6rem] !py-2 sm:inline-flex">
            <MessageCircle aria-hidden="true" className="size-4" />
            Diagnóstico gratis
          </a>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center text-wine lg:hidden"
            aria-expanded={open}
            aria-controls="menu-movil"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X aria-hidden="true" className="size-6" /> : <Menu aria-hidden="true" className="size-6" />}
            <span className="sr-only">{open ? "Cerrar menú" : "Abrir menú"}</span>
          </button>
        </div>
      </div>

      <div id="menu-movil" hidden={!open} className="fixed inset-x-0 bottom-0 top-[4.5rem] overflow-y-auto border-t border-line bg-ivory lg:hidden">
        <nav aria-label="Menú móvil" className="wrap flex min-h-full flex-col py-6">
          <ul className="flex-1">
            {securityNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href} className="border-b border-line">
                  <Link href={item.href} aria-current={active ? "page" : undefined} className="block py-4" onClick={() => setOpen(false)}>
                    <span className={`font-serif text-[1.6rem] leading-tight ${active ? "text-wine" : "text-ink"}`}>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-8 w-full justify-center">
            <MessageCircle aria-hidden="true" className="size-4" />
            Diagnóstico gratis por WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}
