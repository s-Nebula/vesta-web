/**
 * Blog: cada artículo es un archivo Markdown en src/content/blog/<slug>.md
 * con una cabecera así:
 *
 *   ---
 *   title: Título del artículo
 *   description: Una o dos frases para la lista y los buscadores.
 *   date: 2026-11-26
 *   tags: Comercios, WiFi
 *   ---
 *
 * Se lee al compilar (el sitio es estático); no hay panel ni base de datos.
 * Los archivos cuyo nombre empieza por "_" (borradores) no se publican.
 * Ver docs/BLOG.md.
 */
import fs from "node:fs";
import path from "node:path";
import { Marked } from "marked";

const DIR = path.join(process.cwd(), "src/content/blog");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  minutes: number;
};

export type Post = PostMeta & { html: string };

function parse(file: string): { data: Record<string, string>; body: string } {
  const raw = fs.readFileSync(path.join(DIR, file), "utf8").replace(/\r\n/g, "\n");
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) throw new Error(`El artículo ${file} no tiene cabecera (---)`);
  const data: Record<string, string> = {};
  for (const line of m[1].split("\n")) {
    const i = line.indexOf(":");
    if (i > 0) data[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  for (const key of ["title", "description", "date"]) {
    if (!data[key]) throw new Error(`Al artículo ${file} le falta "${key}" en la cabecera`);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date)) throw new Error(`Fecha inválida en ${file}: usa AAAA-MM-DD`);
  return { data, body: m[2] };
}

function meta(file: string): PostMeta & { body: string } {
  const { data, body } = parse(file);
  const words = body.split(/\s+/).filter(Boolean).length;
  return {
    slug: file.replace(/\.md$/, ""),
    title: data.title,
    description: data.description,
    date: data.date,
    tags: (data.tags ?? "").split(",").map((t) => t.trim()).filter(Boolean),
    minutes: Math.max(1, Math.round(words / 200)),
    body,
  };
}

function files() {
  const list = fs.readdirSync(DIR).filter((f) => f.endsWith(".md") && !f.startsWith("_"));
  for (const f of list) {
    if (!/^[a-z0-9-]+\.md$/.test(f)) throw new Error(`Nombre de archivo inválido: ${f} (usa minúsculas, números y guiones)`);
  }
  return list;
}

export function allPosts(): PostMeta[] {
  return files()
    .map((f) => {
      const { body: _body, ...m } = meta(f);
      return m;
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

/** Enlaces externos en pestaña nueva, sin pasar el referer. */
const marked = new Marked({
  gfm: true,
  renderer: {
    link({ href, title, tokens }) {
      const text = this.parser.parseInline(tokens);
      const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
      if (/^\s*javascript:/i.test(href)) return text;
      const t = title ? ` title="${esc(title)}"` : "";
      return /^https?:\/\//.test(href)
        ? `<a href="${esc(href)}"${t} target="_blank" rel="noopener noreferrer">${text}</a>`
        : `<a href="${esc(href)}"${t}>${text}</a>`;
    },
  },
});

export function getPost(slug: string): Post {
  const { body, ...m } = meta(`${slug}.md`);
  return { ...m, html: marked.parse(body, { async: false }) };
}

export function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}
