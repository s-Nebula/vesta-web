"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

/** Dónde se recuerda la elección. Lo lee también TEMA_SCRIPT, antes de pintar la página. */
const CLAVE = "vs-tema";
const COLOR_BARRA = { claro: "#FFFFFF", oscuro: "#0E1014" };

/**
 * Se ejecuta en el <head> antes de pintar (ver app/layout.tsx), para que quien eligió
 * el modo oscuro no vea un destello claro al abrir cada página. La CSP le calcula la
 * huella al compilar (scripts/csp.mjs).
 */
export const TEMA_SCRIPT = `try{if(localStorage.getItem("${CLAVE}")==="oscuro")document.documentElement.dataset.tema="oscuro"}catch(e){}`;

function pintarBarra(oscuro: boolean) {
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", oscuro ? COLOR_BARRA.oscuro : COLOR_BARRA.claro);
}

/**
 * Botón de modo oscuro de la cabecera. El sitio es claro para todos; el oscuro solo
 * se activa si el visitante lo pide aquí, y se recuerda en este navegador.
 */
export function TemaBoton({ className = "" }: { className?: string }) {
  const [oscuro, setOscuro] = useState(false);

  useEffect(() => {
    const actual = document.documentElement.dataset.tema === "oscuro";
    setOscuro(actual);
    pintarBarra(actual);
  }, []);

  function cambiar() {
    const nuevo = !oscuro;
    const raiz = document.documentElement;
    if (nuevo) raiz.dataset.tema = "oscuro";
    else delete raiz.dataset.tema;
    try {
      if (nuevo) localStorage.setItem(CLAVE, "oscuro");
      else localStorage.removeItem(CLAVE);
    } catch {
      // Navegación privada o almacenamiento bloqueado: el cambio dura hasta cerrar la página.
    }
    pintarBarra(nuevo);
    setOscuro(nuevo);
  }

  const Icono = oscuro ? Sun : Moon;
  return (
    <button
      type="button"
      onClick={cambiar}
      aria-pressed={oscuro}
      title={oscuro ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      className={`inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-night-600 text-mist transition-colors hover:border-violet-400 hover:text-haze ${className}`}
    >
      <Icono aria-hidden="true" className="size-[1.15rem]" />
      <span className="sr-only">Modo oscuro</span>
    </button>
  );
}
