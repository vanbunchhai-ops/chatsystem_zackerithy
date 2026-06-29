#!/bin/sh
set -e

cd /app

echo "Starting Vue container..."

if [ ! -d "node_modules" ] || [ ! -f "node_modules/vite/package.json" ]; then
    echo "Installing npm packages..."
    rm -rf node_modules
    npm install
fi

npm run dev -- --host 0.0.0.0