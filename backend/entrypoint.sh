#!/bin/sh
set -e

echo "Running Database Migrations"
python manage.py makemigrations --noinput
python manage.py migrate --noinput

exec "$@"
