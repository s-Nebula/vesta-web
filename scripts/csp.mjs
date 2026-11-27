// Content-Security-Policy por página (se ejecuta después de `next build`).
//
// Next.js deja en cada página varios <script> en línea cuyo contenido cambia en
// cada compilación. Este script calcula la huella SHA-256 de cada uno y agrega
// al inicio del <head> una política que solo permite esos scripts y los de este
// mismo dominio. Un script inyectado (XSS) no tiene huella y el navegador no lo
// ejecuta.
//
// El resto de la política (estilos, imágenes, marcos, formularios…) la envía
// Cloudflare como cabecera; el navegador aplica ambas a la vez. La cabecera
// permite 'unsafe-inline' en scripts justamente para que esta etiqueta sea la
// que decida. Ver docs/DESPLIEGUE.md.
//
// Uso: node scripts/csp.mjs [carpeta]   (por defecto «out»)

import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const OUT = process.argv[2] ?? "out";
const SCRIPT = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
// Scripts de datos: el navegador no los ejecuta y la CSP no los evalúa.
const NO_EJECUTABLE = /\btype\s*=\s*["']?(application\/(ld\+)?json|text\/template)\b/i;
const MARCA = 'http-equiv="Content-Security-Policy"';
// Scripts externos permitidos. Cloudflare inyecta el de Web Analytics (estadísticas de visitas).
const EXTERNOS = ["https://static.cloudflareinsights.com"];

export function huellas(doc) {
  const set = new Set();
  for (const [, atributos, cuerpo] of doc.matchAll(SCRIPT)) {
    if (/\bsrc\s*=/i.test(atributos) || NO_EJECUTABLE.test(atributos) || cuerpo.length === 0) continue;
    set.add(`'sha256-${createHash("sha256").update(cuerpo, "utf8").digest("base64")}'`);
  }
  return [...set];
}

export function conPolitica(doc, archivo = "") {
  if (doc.includes(MARCA)) throw new Error(`${archivo}: ya tiene una CSP en <meta>`);
  const head = /<head\b[^>]*>/i.exec(doc);
  if (!head) throw new Error(`${archivo}: no tiene <head>`);
  const politica = ["script-src 'self'", ...EXTERNOS, ...huellas(doc)].join(" ");
  const fin = head.index + head[0].length;
  return doc.slice(0, fin) + `<meta ${MARCA} content="${politica}"/>` + doc.slice(fin);
}

async function* paginas(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* paginas(p);
    else if (e.name.endsWith(".html")) yield p;
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  let n = 0;
  let total = 0;
  for await (const archivo of paginas(OUT)) {
    const doc = await readFile(archivo, "utf8");
    total += huellas(doc).length;
    await writeFile(archivo, conPolitica(doc, archivo));
    n++;
  }
  if (n === 0) throw new Error(`No hay páginas HTML en ${OUT}`);
  console.log(`CSP: ${n} páginas, ${total} scripts en línea con huella.`);
}
