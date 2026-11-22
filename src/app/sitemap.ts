import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { docHref, href, locales, type DocKey, type PageKey } from "@/i18n";

export const dynamic = "force-static";

const pages: PageKey[] = ["home", "platform", "features", "mission", "downloads", "help", "docs"];
const docs: DocKey[] = ["terms", "privacy", "guide"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-11-22");
  const entry = (paths: Record<"es" | "en", string>, priority: number) =>
    locales.map((l) => ({
      url: `${site.url}${paths[l]}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority,
      alternates: { languages: { es: `${site.url}${paths.es}`, en: `${site.url}${paths.en}` } },
    }));
  return [
    ...pages.flatMap((p) => entry({ es: href("es", p), en: href("en", p) }, p === "home" ? 1 : 0.8)),
    ...docs.flatMap((d) => entry({ es: docHref("es", d), en: docHref("en", d) }, 0.6)),
  ];
}
