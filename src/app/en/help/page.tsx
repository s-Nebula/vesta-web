import { HelpView } from "@/views/HelpView";
import { metaFor } from "@/views/meta";

export const metadata = metaFor("en", "help");

export default function Page() {
  return <HelpView locale="en" />;
}
