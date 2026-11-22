import { DeleteAccountView } from "@/views/DeleteAccountView";
import { metaFor } from "@/views/meta";

export const metadata = metaFor("en", "deleteAccount");

export default function Page() {
  return <DeleteAccountView locale="en" />;
}
