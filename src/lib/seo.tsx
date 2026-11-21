import type { Metadata } from "next";
import { site } from "@/content/site";

export function pageMeta({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const url = `${site.url}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: site.locale,
      siteName: site.name,
      title: `${title} · ${site.name}`,
      description,
      url,
      images: [{ url: `${site.url}/og.png`, width: 1200, height: 630, alt: "Vesta Security — Protección familiar" }],
    },
    twitter: { card: "summary_large_image", title: `${title} · ${site.name}`, description, images: [`${site.url}/og.png`] },
  };
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
