import { DownloadsView } from "@/views/DownloadsView";
import { metaFor } from "@/views/meta";

export const metadata = metaFor("en", "downloads");

export default function Page() {
  return <DownloadsView locale="en" />;
}
