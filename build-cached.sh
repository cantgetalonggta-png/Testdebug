#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

echo "=== Testdebug cached build ==="
if pgrep -f "npm (install|ci)" >/dev/null 2>&1; then
  echo "Another npm install/ci is already running. Aborting."
  exit 1
fi

NEED_INSTALL=0
if [ ! -x node_modules/.bin/next ] || [ ! -d node_modules/next ] || [ ! -d node_modules/react ]; then
  NEED_INSTALL=1
fi

if [ "$NEED_INSTALL" -eq 1 ]; then
  echo "Dependencies incomplete — running one bounded install..."
  if [ -f package-lock.json ]; then
    npm ci --no-audit --no-fund --prefer-offline || npm install --no-audit --no-fund
  else
    npm install --no-audit --no-fund
  fi
else
  echo "Dependencies present — skipping install."
fi

if [ -x node_modules/.bin/next ]; then
  echo "Running lint / typecheck / build if available..."
  npm run lint --if-present || true
  npm run typecheck --if-present || true
  npm run build
  echo "BUILD OK"
else
  echo "ERROR: next binary still missing after install"
  exit 1
fi
