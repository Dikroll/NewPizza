from .base import *

DEBUG = False

ALLOWED_HOSTS = ['dimokpizza-ivanovo.ru', '31.129.57.12', 'backend']
CSRF_TRUSTED_ORIGINS = ['https://dimokpizza-ivanovo.ru']
CORS_ALLOWED_ORIGINS = ['https://dimokpizza-ivanovo.ru']

CORS_ALLOW_CREDENTIALS = True
CSRF_COOKIE_SECURE = True
SESSION_COOKIE_SECURE = True
SESSION_COOKIE_AGE = 60 * 60 * 24 * 7
SESSION_COOKIE_HTTPONLY = True
SESSION_SAVE_EVERY_REQUEST = True

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('POSTGRES_DB'),
        'USER': os.getenv('POSTGRES_USER'),
        'PASSWORD': os.getenv('POSTGRES_PASSWORD'),
        'HOST': 'db',
        'PORT': '5432',
        'AUTOCOMMIT': True,
    }
}
