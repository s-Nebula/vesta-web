import { HomeView } from "@/views/HomeView";
import { metaFor } from "@/views/meta";

export const metadata = metaFor("es", "home");

export default function Page() {
  return <HomeView locale="es" />;
}
