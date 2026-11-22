import { notFound } from "next/navigation";
import { DocView } from "@/views/DocsView";
import { docMetaFor } from "@/views/meta";
import { getDoc, legalDocsFor } from "@/content/legal";

export const dynamicParams = false;

export function generateStaticParams() {
  return legalDocsFor("es").map((d) => ({ slug: d.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const doc = getDoc("es", slug);
  return doc ? docMetaFor("es", doc.key) : {};
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  const doc = getDoc("es", slug);
  if (!doc) notFound();
  return <DocView locale="es" doc={doc} />;
}
