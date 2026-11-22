import { FeaturesView } from "@/views/FeaturesView";
import { metaFor } from "@/views/meta";

export const metadata = metaFor("en", "features");

export default function Page() {
  return <FeaturesView locale="en" />;
}
