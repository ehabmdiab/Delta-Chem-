#!/usr/bin/env bash
# Builds the static GitHub Pages export into ./out.
#
# The admin CMS (/admin) and API routes (/api) need a Node server, so they are
# stripped from a throw-away copy of the project - the working tree is never
# modified. The public website is exported as plain HTML/CSS/JS.
#
# Usage: NEXT_PUBLIC_BASE_PATH=/Delta-Chem- scripts/build-pages.sh
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
WORK="$ROOT/.pages-build"

rm -rf "$WORK" "$ROOT/out"
mkdir -p "$WORK"

tar -C "$ROOT" \
  --exclude=./node_modules --exclude=./.next --exclude=./out \
  --exclude=./.pages-build --exclude=./.git --exclude='./.env*' \
  -cf - . | tar -C "$WORK" -xf -

# Keep dependencies out of the copy; link them in.
ln -s "$ROOT/node_modules" "$WORK/node_modules"

rm -rf "$WORK/src/app/admin" "$WORK/src/app/api" "$WORK/tests"

cd "$WORK"
build_cmd() {
  GITHUB_PAGES=true \
  NEXT_PUBLIC_BASE_PATH="${NEXT_PUBLIC_BASE_PATH:-}" \
  NEXT_PUBLIC_SITE_URL="${NEXT_PUBLIC_SITE_URL:-https://ehabmdiab.github.io/Delta-Chem-}" \
    npx next build
}

build_cmd || build_cmd

cp "$WORK/out/index.html" "$WORK/out/404.html" || true
mv "$WORK/out" "$ROOT/out"
touch "$ROOT/out/.nojekyll"
cd "$ROOT"
rm -rf "$WORK"
echo "Static export ready in $ROOT/out"
