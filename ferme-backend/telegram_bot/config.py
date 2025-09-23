import os
from dotenv import load_dotenv

# Загружаем переменные окружения из файла .env
load_dotenv()

# Получаем значения из переменных окружения
BOT_TOKEN = os.getenv('BOT_TOKEN')
ORDERS_CHAT_ID = os.getenv('ORDERS_CHAT_ID')

# Шаблон сообщения для нового заказа
ORDER_TEMPLATE = """
🛍 *Новый заказ!*

*Информация о клиенте:*
👤 Имя: {name}
📱 Телефон: {phone}
📍 Адрес: {address}

*Состав заказа:*
{items}

💰 *Итого к оплате: {total}₸*

📝 *Комментарий:* {comment}
"""
