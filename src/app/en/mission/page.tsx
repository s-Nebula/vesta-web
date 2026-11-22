import { MissionView } from "@/views/MissionView";
import { metaFor } from "@/views/meta";

export const metadata = metaFor("en", "mission");

export default function Page() {
  return <MissionView locale="en" />;
}
