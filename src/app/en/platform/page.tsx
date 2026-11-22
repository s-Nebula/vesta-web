import { PlatformView } from "@/views/PlatformView";
import { metaFor } from "@/views/meta";

export const metadata = metaFor("en", "platform");

export default function Page() {
  return <PlatformView locale="en" />;
}
