#!/usr/bin/env python
import os
import django
from django.conf import settings

# Настройка Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.db import connection
from menu.models import Order

try:
    # Проверяем подключение к базе
    with connection.cursor() as cursor:
        cursor.execute("SELECT 1")
        print("✅ База данных подключена")
    
    # Проверяем поля в таблице Order
    cursor = connection.cursor()
    cursor.execute("SELECT column_name FROM information_schema.columns WHERE table_name = 'menu_order'")
    columns = [row[0] for row in cursor.fetchall()]
    
    print(f"📋 Поля в таблице Order: {columns}")
    
    if 'floor' in columns and 'room' in columns:
        print("✅ Поля floor и room существуют")
    else:
        print("❌ Поля floor и room отсутствуют")
        
    # Проверяем количество заказов
    order_count = Order.objects.count()
    print(f"📊 Количество заказов: {order_count}")
    
except Exception as e:
    print(f"❌ Ошибка: {e}")
