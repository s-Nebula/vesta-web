#!/usr/bin/env bash
# Despliegue del sitio de Vesta Security en el servidor (Nginx).
#
# Descarga SOLO la rama `deploy` (sitio compilado), la extrae en una carpeta de
# versión y cambia de forma atómica el enlace `current`, que es el que sirve Nginx.
# No necesita Node.js, no usa credenciales (el repositorio es público) y no toca
# Nginx, Cloudflare Tunnel, el backend ni OpenMediaVault.
#
# Estructura (BASE por defecto /var/www/vesta-web):
#   BASE/repo.git          copia local solo de la rama deploy (sin código fuente)
#   BASE/releases/<id>/    una carpeta por versión publicada
#   BASE/current ->        enlace a la versión activa  (root de Nginx)
#   BASE/deploy.log        historial de despliegues
#
# Uso:
#   vesta-deploy.sh deploy            publica la última versión de la rama deploy
#   vesta-deploy.sh deploy <commit>   publica una versión concreta de la rama deploy
#   vesta-deploy.sh rollback          vuelve a la versión anterior y la fija
#   vesta-deploy.sh unpin             quita la fijación: el siguiente `deploy` vuelve a la última
#   vesta-deploy.sh list              versiones disponibles en el servidor
#   vesta-deploy.sh status            versión activa
#
# Tras `rollback` o `deploy <commit>`, la versión queda FIJADA: un `deploy` sin
# argumentos (por ejemplo, el temporizador) no la sustituye hasta ejecutar `unpin`.
set -euo pipefail

BASE="${VESTA_BASE:-/var/www/vesta-web}"
REPO_URL="${VESTA_REPO_URL:-https://github.com/s-Nebula/vesta-web.git}"
BRANCH="${VESTA_BRANCH:-deploy}"
KEEP="${VESTA_KEEP_RELEASES:-10}"

REPO="$BASE/repo.git"
RELEASES="$BASE/releases"
CURRENT="$BASE/current"
LOG="$BASE/deploy.log"
PIN="$BASE/PINNED"

die() { echo "ERROR: $*" >&2; exit 1; }
log() { echo "$(date -u +%Y-%m-%dT%H:%M:%SZ) $*" | tee -a "$LOG"; }

mkdir -p "$RELEASES"
exec 9>"$BASE/.lock"
flock -n 9 || die "otro despliegue está en curso"

active() { [ -L "$CURRENT" ] && basename "$(readlink "$CURRENT")" || true; }

fetch() {
  if [ ! -d "$REPO" ]; then
    git init -q --bare "$REPO"
    git -C "$REPO" remote add origin "$REPO_URL"
  fi
  git -C "$REPO" fetch -q --prune origin "+refs/heads/$BRANCH:refs/remotes/origin/$BRANCH"
}

switch_to() {
  local id="$1"
  [ -s "$RELEASES/$id/index.html" ] || die "la versión $id no contiene index.html"
  ln -sfn "releases/$id" "$BASE/.current.tmp"
  mv -Tf "$BASE/.current.tmp" "$CURRENT"   # cambio atómico
}

prune() {
  local keep_active; keep_active="$(active)"
  ls -1t "$RELEASES" | tail -n +"$((KEEP + 1))" | while read -r old; do
    [ "$old" = "$keep_active" ] || rm -rf "${RELEASES:?}/$old"
  done
}

cmd_deploy() {
  if [ -z "${1:-}" ] && [ -f "$PIN" ]; then
    echo "Versión fijada en $(cat "$PIN"). Ejecuta 'unpin' para volver a publicar la última."; return 0
  fi
  fetch
  local ref="${1:-origin/$BRANCH}" sha id
  sha="$(git -C "$REPO" rev-parse --verify -q "$ref^{commit}")" || die "no existe la versión $ref"
  git -C "$REPO" merge-base --is-ancestor "$sha" "origin/$BRANCH" || die "$sha no pertenece a la rama $BRANCH"
  case "$(active)" in *"-${sha:0:7}") echo "La versión ${sha:0:7} ya está activa."; [ -z "${1:-}" ] || active > "$PIN"; return 0 ;; esac
  id="$(date -u +%Y%m%d%H%M%S)-${sha:0:7}"
  if existing="$(ls -1 "$RELEASES" | grep -- "-${sha:0:7}$" | head -n1)" && [ -n "$existing" ]; then
    id="$existing"
  else
    mkdir "$RELEASES/.$id.partial"
    git -C "$REPO" archive "$sha" | tar -x -C "$RELEASES/.$id.partial"
    [ -s "$RELEASES/.$id.partial/index.html" ] || { rm -rf "$RELEASES/.$id.partial"; die "la versión $sha no contiene index.html"; }
    [ ! -e "$RELEASES/.$id.partial/package.json" ] || { rm -rf "$RELEASES/.$id.partial"; die "la versión contiene código fuente"; }
    chmod -R a+rX "$RELEASES/.$id.partial"
    mv "$RELEASES/.$id.partial" "$RELEASES/$id"
  fi
  local prev; prev="$(active)"
  switch_to "$id"
  log "deploy $id (antes: ${prev:-ninguna})"
  if [ -n "${1:-}" ]; then echo "$id" > "$PIN"; else rm -f "$PIN"; fi
  prune
}

cmd_rollback() {
  local cur prev
  cur="$(active)"; [ -n "$cur" ] || die "no hay versión activa"
  prev="$(grep ' deploy ' "$LOG" 2>/dev/null | awk '{print $3}' | grep -vx "$cur" | tail -n1 || true)"
  [ -n "$prev" ] && [ -d "$RELEASES/$prev" ] || die "no hay una versión anterior disponible"
  switch_to "$prev"
  echo "$prev" > "$PIN"
  log "rollback $prev (antes: $cur)"
}

case "${1:-}" in
  deploy)   shift; cmd_deploy "${1:-}" ;;
  rollback) cmd_rollback ;;
  unpin)    rm -f "$PIN"; echo "Fijación eliminada." ;;
  list)     ls -1t "$RELEASES" | sed "s/^$(active)\$/& (activa)/" ;;
  status)   echo "activa: $(active)"; [ -f "$CURRENT/BUILD_INFO.txt" ] && cat "$CURRENT/BUILD_INFO.txt" ;;
  *)        sed -n '2,25p' "$0"; exit 1 ;;
esac
