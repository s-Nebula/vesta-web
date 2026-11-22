import type { Metadata } from "next";
import { site, siteText } from "@/content/site";
import type { Locale } from "@/i18n";

/**
 * Page metadata. `paths` holds the URL of the page in each language so
 * search engines can link the translations (hreflang).
 */
export function pageMeta({
  locale,
  title,
  description,
  paths,
}: {
  locale: Locale;
  title: string;
  description: string;
  paths: Record<Locale, string>;
}): Metadata {
  const url = `${site.url}${paths[locale]}`;
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { es: `${site.url}${paths.es}`, en: `${site.url}${paths.en}`, "x-default": `${site.url}${paths.es}` },
    },
    openGraph: {
      type: "website",
      locale: siteText[locale].ogLocale,
      siteName: site.name,
      title: `${title} · ${site.name}`,
      description,
      url,
      images: [{ url: `${site.url}/og.png`, width: 1200, height: 630, alt: `Vesta Security, ${siteText[locale].descriptor.toLowerCase()}` }],
    },
    twitter: { card: "summary_large_image", title: `${title} · ${site.name}`, description, images: [`${site.url}/og.png`] },
  };
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
