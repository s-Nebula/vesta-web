import { MissionView } from "@/views/MissionView";
import { metaFor } from "@/views/meta";

export const metadata = metaFor("es", "mission");

export default function Page() {
  return <MissionView locale="es" />;
}
