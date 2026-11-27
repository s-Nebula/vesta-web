# Cómo publicar en el blog

Cada artículo es un archivo Markdown en `src/content/blog/`. Al hacer push a `main`, la GitHub Action
compila el sitio y lo publica. No hay panel ni base de datos.

## Crear un artículo

1. Crea `src/content/blog/<slug>.md`. El slug es la URL (`/blog/<slug>/`): minúsculas, números y guiones.
2. Empieza el archivo con esta cabecera:

   ```
   ---
   title: Título del artículo
   description: Una o dos frases. Se usa en la lista del blog y en Google.
   date: 2026-12-01
   tags: Comercios, WiFi
   ---
   ```

3. Escribe el texto en Markdown: `## Subtítulo`, `**negrita**`, listas, `[enlaces](/servicios/#express)`
   y bloques de código con tres comillas invertidas.
4. Revisa en local con `npm run dev` y abre `http://localhost:3000/blog/`.

## Borradores

Un archivo que empieza por `_` (por ejemplo `_ideas.md`) no se publica.

## Enlaces útiles dentro de los artículos

- Servicios: `/servicios/#diagnostico`, `#express`, `#red`, `#oficina`, `#tienda`, `#firebase`, `#pentest-web`,
  `#android`, `#codigo`, `#plan`.
- Los enlaces externos se abren en una pestaña nueva automáticamente.
