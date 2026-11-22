import { PlatformView } from "@/views/PlatformView";
import { metaFor } from "@/views/meta";

export const metadata = metaFor("es", "platform");

export default function Page() {
  return <PlatformView locale="es" />;
}
