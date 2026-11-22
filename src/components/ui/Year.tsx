"use client";
import { useEffect, useState } from "react";

/** Current year: fixed at build time and updated in the browser. */
export function Year({ initial }: { initial: number }) {
  const [year, setYear] = useState(initial);
  useEffect(() => setYear(new Date().getFullYear()), []);
  return <>{year}</>;
}
