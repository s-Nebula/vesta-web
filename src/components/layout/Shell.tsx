import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import type { Locale } from "@/i18n";

/** Header + content + footer for one language. English pages are marked lang="en". */
export function Shell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return (
    <div lang={locale}>
      <Header locale={locale} />
      <main id="contenido">{children}</main>
      <Footer locale={locale} />
    </div>
  );
}
