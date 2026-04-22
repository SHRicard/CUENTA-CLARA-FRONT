#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

MODE="${1:-start}"

if ! command -v npm >/dev/null 2>&1; then
  echo "Error: npm no esta instalado o no esta en PATH."
  exit 1
fi

if [[ ! -f "package.json" ]]; then
  echo "Error: no se encontro package.json en $ROOT_DIR"
  exit 1
fi

if [[ ! -d "node_modules" ]]; then
  echo "Instalando dependencias..."
  npm install
fi

case "$MODE" in
  start|android|ios|web)
    echo "Ejecutando: npm run $MODE"
    npm run "$MODE"
    ;;
  *)
    echo "Uso: ./run.sh [start|android|ios|web]"
    exit 1
    ;;
esac
