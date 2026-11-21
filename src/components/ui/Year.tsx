"use client";
import { useEffect, useState } from "react";

/** Año actual: se fija en la compilación y se actualiza en el navegador. */
export function Year({ initial }: { initial: number }) {
  const [year, setYear] = useState(initial);
  useEffect(() => setYear(new Date().getFullYear()), []);
  return <>{year}</>;
}
