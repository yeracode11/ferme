#!/usr/bin/env python
"""
Скрипт для применения миграций на Railway
"""
import os
import sys
import django
from django.core.management import execute_from_command_line

if __name__ == "__main__":
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
    django.setup()
    
    print("Применяем миграции...")
    try:
        execute_from_command_line(['manage.py', 'migrate', '--noinput'])
        print("✅ Миграции успешно применены!")
    except Exception as e:
        print(f"❌ Ошибка при применении миграций: {e}")
        sys.exit(1)
