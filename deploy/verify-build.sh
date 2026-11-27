#!/usr/bin/env bash
# Comprueba que la carpeta compilada contiene el sitio y nada del código fuente.
# Uso: deploy/verify-build.sh out
set -euo pipefail
DIR="${1:-out}"
fail() { echo "ERROR: $*" >&2; exit 1; }

[ -d "$DIR" ] || fail "no existe $DIR"

for page in index.html 404.html robots.txt sitemap.xml \
  servicios/index.html blog/index.html control-parental/index.html \
  plataforma/index.html funcionalidades/index.html mision-y-vision/index.html \
  descargas/index.html ayuda/index.html documentacion/index.html \
  documentacion/terminos-y-condiciones/index.html \
  documentacion/politica-de-privacidad/index.html \
  documentacion/guia-de-usuario/index.html; do
  [ -s "$DIR/$page" ] || fail "falta $page"
done

for forbidden in package.json package-lock.json tsconfig.json next.config.ts src .env .git node_modules legal-source; do
  [ ! -e "$DIR/$forbidden" ] || fail "el sitio compilado contiene $forbidden"
done

if grep -rIl --exclude-dir=_next -E '(BEGIN [A-Z ]*PRIVATE KEY|ghp_[A-Za-z0-9]{20,}|AKIA[0-9A-Z]{16})' "$DIR" >/dev/null; then
  fail "posible credencial en el sitio compilado"
fi

echo "OK: $(find "$DIR" -type f | wc -l) archivos, $(du -sh "$DIR" | cut -f1)"
