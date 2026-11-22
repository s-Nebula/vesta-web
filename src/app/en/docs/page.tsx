import { DocsView } from "@/views/DocsView";
import { metaFor } from "@/views/meta";

export const metadata = metaFor("en", "docs");

export default function Page() {
  return <DocsView locale="en" />;
}
