import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { legalDocs } from "@/content/legal";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", "/plataforma/", "/funcionalidades/", "/mision-y-vision/", "/descargas/", "/ayuda/", "/documentacion/"];
  const lastModified = new Date("2026-11-21");
  return [
    ...routes.map((r) => ({ url: `${site.url}${r}`, lastModified, changeFrequency: "monthly" as const, priority: r === "/" ? 1 : 0.8 })),
    ...legalDocs.map((d) => ({ url: `${site.url}/documentacion/${d.slug}/`, lastModified, changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
