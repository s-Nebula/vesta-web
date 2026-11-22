"use client";
import { Printer } from "lucide-react";

export function PrintButton({ label }: { label: string }) {
  return (
    <button type="button" onClick={() => window.print()} className="btn btn-ghost !min-h-[2.5rem] !py-1.5 text-sm">
      <Printer aria-hidden="true" className="size-4" />
      {label}
    </button>
  );
}
