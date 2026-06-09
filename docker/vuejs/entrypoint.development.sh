#!/bin/sh
set -e

cd /app

echo "Starting Vue container..."

if [ ! -d "node_modules" ]; then
    echo "Installing npm packages..."
    npm install
fi

npm run dev -- --host 0.0.0.0