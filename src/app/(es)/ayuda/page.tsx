import { HelpView } from "@/views/HelpView";
import { metaFor } from "@/views/meta";

export const metadata = metaFor("es", "help");

export default function Page() {
  return <HelpView locale="es" />;
}
