import { Shell } from "@/components/layout/Shell";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Shell locale="en">{children}</Shell>;
}
