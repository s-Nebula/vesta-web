import { company, site } from "@/content/site";
import { apps, latest } from "@/content/downloads";

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
    streetAddress: company.address,
    addressLocality: "Santa Marta",
    addressRegion: "Magdalena",
    addressCountry: "CO",
  },
};

export const appsSchema = apps.map((a) => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: a.name,
  operatingSystem: `Android ${a.minAndroid.replace(/[^0-9.]/g, "")}+`,
  applicationCategory: "UtilitiesApplication",
  softwareVersion: latest(a).version,
  ...(a.sizeBytes ? { fileSize: `${Math.round(a.sizeBytes / 1048576)}MB` } : {}),
  ...(a.apkUrl ? { downloadUrl: a.apkUrl } : {}),
  publisher: { "@type": "Organization", name: company.legalName },
  license: "https://www.gnu.org/licenses/gpl-3.0.html",
}));
