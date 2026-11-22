import { DownloadsView } from "@/views/DownloadsView";
import { metaFor } from "@/views/meta";

export const metadata = metaFor("es", "downloads");

export default function Page() {
  return <DownloadsView locale="es" />;
}
