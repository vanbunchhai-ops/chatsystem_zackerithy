#!/usr/bin/env bash
set -e

cd /var/www/html

echo "Starting Laravel container..."

if [ ! -f ".env" ]; then
    echo ".env file not found inside laravel-app."
    echo "Please create laravel-app/.env"
    exit 1
fi

if [ ! -d "vendor" ]; then
    echo "Installing Composer packages..."
    composer install --no-interaction --prefer-dist
fi

php artisan config:clear
php artisan cache:clear

echo "Running migrations..."
php artisan migrate --force

echo "Starting Laravel server..."
php artisan serve --host=0.0.0.0 --port=8000