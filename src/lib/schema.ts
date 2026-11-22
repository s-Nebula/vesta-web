import { company, site } from "@/content/site";
import { apps, latest } from "@/content/downloads";
import type { Locale } from "@/i18n";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  legalName: company.legalName,
  url: site.url,
  logo: `${site.url}/brand/vesta_logo.svg`,
  email: company.email,
  telephone: company.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Santa Marta",
    addressRegion: "Magdalena",
    addressCountry: "CO",
  },
};

export const appsSchema = (locale: Locale) =>
  apps.map((a) => ({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: a.text[locale].name,
    operatingSystem: "Android 7.0+",
    applicationCategory: "UtilitiesApplication",
    softwareVersion: latest(a).version,
    ...(a.sizeBytes ? { fileSize: `${Math.round(a.sizeBytes / 1048576)}MB` } : {}),
    ...(a.apkUrl ? { downloadUrl: a.apkUrl } : {}),
    publisher: { "@type": "Organization", name: company.legalName },
  }));
