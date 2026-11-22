import { HomeView } from "@/views/HomeView";
import { metaFor } from "@/views/meta";

export const metadata = metaFor("en", "home");

export default function Page() {
  return <HomeView locale="en" />;
}
