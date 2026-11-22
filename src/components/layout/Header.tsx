"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ArrowDownToLine } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { mainNav, siteText } from "@/content/site";
import { href, translatePath, ui, type Locale } from "@/i18n";

function isActive(pathname: string, target: string, home: string) {
  if (target === home) return pathname === home || pathname === home.replace(/\/$/, "");
  return pathname.startsWith(target.replace(/\/$/, ""));
}

export function Header({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const pathname = usePathname() ?? href(locale, "home");
  const [open, setOpen] = useState(false);
  const nav = mainNav(locale);
  const home = href(locale, "home");
  const other: Locale = locale === "es" ? "en" : "es";
  const switchHref = translatePath(pathname, other);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const languageLink = (className: string) => (
    <Link href={switchHref} hrefLang={other} lang={other} className={className} aria-label={`${t.language}: ${t.otherLanguage}`}>
      {t.otherLanguageShort}
    </Link>
  );

  return (
    <header data-site-header className="sticky top-0 z-50 border-b border-line bg-ivory">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:bg-wine focus:px-4 focus:py-2 focus:text-ivory"
      >
        {t.skip}
      </a>
      <div className="wrap flex h-[4.5rem] items-center justify-between gap-6">
        <Link href={home} aria-label={t.homeAria} className="shrink-0">
          <Logo className="h-11 w-auto" descriptor={siteText[locale].descriptor} />
        </Link>

        <nav aria-label={t.mainNav} className="hidden xl:block">
          <ul className="flex items-center gap-7">
            {nav.map((item) => {
              const active = isActive(pathname, item.href, home);
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
          {languageLink("hidden text-sm font-semibold text-muted hover:text-wine sm:inline")}
          <Link href={href(locale, "downloads")} className="btn btn-primary hidden !min-h-[2.6rem] !py-2 sm:inline-flex">
            <ArrowDownToLine aria-hidden="true" className="size-4" />
            {t.download}
          </Link>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center text-wine xl:hidden"
            aria-expanded={open}
            aria-controls="menu-movil"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X aria-hidden="true" className="size-6" /> : <Menu aria-hidden="true" className="size-6" />}
            <span className="sr-only">{open ? t.closeMenu : t.openMenu}</span>
          </button>
        </div>
      </div>

      <div id="menu-movil" hidden={!open} className="fixed inset-x-0 bottom-0 top-[4.5rem] overflow-y-auto border-t border-line bg-ivory xl:hidden">
        <nav aria-label={t.mobileNav} className="wrap flex min-h-full flex-col py-6">
          <ul className="flex-1">
            {nav.map((item) => {
              const active = isActive(pathname, item.href, home);
              return (
                <li key={item.href} className="border-b border-line">
                  <Link href={item.href} aria-current={active ? "page" : undefined} className="block py-4">
                    <span className={`font-serif text-[1.6rem] leading-tight ${active ? "text-wine" : "text-ink"}`}>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link href={href(locale, "downloads")} className="btn btn-primary mt-8 w-full justify-center">
            <ArrowDownToLine aria-hidden="true" className="size-4" />
            {t.download}
          </Link>
          <p className="mt-6 flex items-center justify-center gap-4 text-sm text-muted">
            <span>{t.android}</span>
            <span aria-hidden="true">·</span>
            {languageLink("font-semibold text-wine")}
          </p>
        </nav>
      </div>
    </header>
  );
}
