import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { docHref, href, locales, type DocKey, type PageKey } from "@/i18n";
import { allPosts } from "@/lib/blog";

export const dynamic = "force-static";

const pages: PageKey[] = ["home", "platform", "features", "mission", "downloads", "help", "docs", "deleteAccount"];
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
  const security = [
    { url: `${site.url}/`, lastModified: new Date("2026-11-26"), changeFrequency: "monthly" as const, priority: 1 },
    { url: `${site.url}/servicios/`, lastModified: new Date("2026-11-26"), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${site.url}/blog/`, lastModified: new Date("2026-11-26"), changeFrequency: "weekly" as const, priority: 0.8 },
    ...allPosts().map((p) => ({ url: `${site.url}/blog/${p.slug}/`, lastModified: new Date(p.date), changeFrequency: "yearly" as const, priority: 0.7 })),
  ];
  return [
    ...security,
    ...pages.flatMap((p) => entry({ es: href("es", p), en: href("en", p) }, 0.8)),
    ...docs.flatMap((d) => entry({ es: docHref("es", d), en: docHref("en", d) }, 0.6)),
  ];
}
