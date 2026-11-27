"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Wordmark } from "@/components/brand/Wordmark";
import { securityNav, waLink } from "@/content/security";
import { apps } from "@/content/apps";

const appPaths = ["/aplicaciones", "/control-parental", "/plataforma", "/funcionalidades", "/mision-y-vision", "/ayuda", "/documentacion", "/descargas", "/eliminar-cuenta"];

function isActive(pathname: string, target: string) {
  if (target.includes("#")) return false;
  if (target === "/") return pathname === "/";
  if (target === "/aplicaciones/") return appPaths.some((p) => pathname.startsWith(p));
  return pathname.startsWith(target.replace(/\/$/, ""));
}

/** Cabecera común de todo el sitio en español: la de Vesta Security. */
export function SecurityHeader() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const [appsOpen, setAppsOpen] = useState(false);
  const appsRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    setOpen(false);
    setAppsOpen(false);
  }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setAppsOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (appsRef.current && !appsRef.current.contains(e.target as Node)) setAppsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [open]);

  const linkClass = (active: boolean) =>
    `rounded-full px-3.5 py-2 text-[0.92rem] font-medium transition-colors ${active ? "bg-night-700 text-haze" : "text-mist hover:text-haze"}`;

  return (
    <header data-site-header className="sx sticky top-0 z-50 border-b border-night-600 bg-night-900">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-violet-300 focus:px-4 focus:py-2 focus:text-night-950"
      >
        Saltar al contenido
      </a>
      <div className="sx-wrap flex h-[4.25rem] items-center justify-between gap-6">
        <Link href="/" aria-label="Vesta Security, inicio" className="shrink-0">
          <Wordmark />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1 rounded-full border border-night-600 bg-night-800/60 p-1">
            {securityNav.map((item) =>
              item.href === "/aplicaciones/" ? (
                <li key={item.href} ref={appsRef} className="relative">
                  <button
                    type="button"
                    aria-expanded={appsOpen}
                    aria-controls="menu-aplicaciones"
                    onClick={() => setAppsOpen((v) => !v)}
                    className={`${linkClass(isActive(pathname, item.href))} inline-flex items-center gap-1`}
                  >
                    {item.label}
                    <ChevronDown aria-hidden="true" className={`size-4 transition-transform ${appsOpen ? "rotate-180" : ""}`} />
                  </button>
                  <div
                    id="menu-aplicaciones"
                    hidden={!appsOpen}
                    className="absolute left-1/2 top-[calc(100%+0.8rem)] w-[24rem] -translate-x-1/2 rounded-2xl border border-night-600 bg-night-800 p-2 shadow-2xl shadow-black/50"
                  >
                    <ul>
                      {apps.map((a) => (
                        <li key={a.id}>
                          <Link href={a.href} className="flex gap-3.5 rounded-xl p-3 hover:bg-night-700">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={a.logo} alt="" width={36} height={36} className="size-9 shrink-0 rounded-lg" />
                            <span>
                              <span className="block font-semibold text-haze">
                                {a.name} <span className="font-normal text-mist">· {a.kind}</span>
                              </span>
                              <span className="mt-0.5 block text-[0.82rem] leading-snug text-mist">{a.security}</span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link href="/aplicaciones/" className="sx-arrow mt-1 block rounded-xl px-3 py-2.5 text-sm hover:bg-night-700">
                      Ver todas las aplicaciones →
                    </Link>
                  </div>
                </li>
              ) : (
                <li key={item.href}>
                  <Link href={item.href} aria-current={isActive(pathname, item.href) ? "page" : undefined} className={linkClass(isActive(pathname, item.href))}>
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="sx-btn sx-btn-primary hidden !min-h-[2.5rem] !py-2 !text-[0.88rem] sm:inline-flex">
            Diagnóstico gratis
          </a>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full text-haze lg:hidden"
            aria-expanded={open}
            aria-controls="menu-movil"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X aria-hidden="true" className="size-6" /> : <Menu aria-hidden="true" className="size-6" />}
            <span className="sr-only">{open ? "Cerrar menú" : "Abrir menú"}</span>
          </button>
        </div>
      </div>

      <div id="menu-movil" hidden={!open} className="fixed inset-x-0 bottom-0 top-[4.25rem] overflow-y-auto border-t border-night-600 bg-night-900 lg:hidden">
        <nav aria-label="Menú móvil" className="sx-wrap flex min-h-full flex-col py-6">
          <ul className="flex-1">
            {securityNav.map((item) => (
              <li key={item.href} className="border-b border-night-600">
                <Link href={item.href} className="block py-4 text-[1.6rem] font-medium tracking-tight text-haze" onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
                {item.href === "/aplicaciones/" && (
                  <ul className="-mt-1 pb-4">
                    {apps.map((a) => (
                      <li key={a.id}>
                        <Link href={a.href} className="flex items-center gap-3 py-2 text-mist" onClick={() => setOpen(false)}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={a.logo} alt="" width={24} height={24} className="size-6 rounded-md" />
                          {a.name} · {a.kind}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="sx-btn sx-btn-primary mt-8 w-full">
            Diagnóstico gratis por WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}
