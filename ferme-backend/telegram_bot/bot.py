import logging
from telegram import Update
from telegram.ext import Application, ContextTypes
from .config import BOT_TOKEN, ORDERS_CHAT_ID, ORDER_TEMPLATE

# Настройка логирования
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

async def send_order_notification(order_data: dict) -> None:
    """
    Отправляет уведомление о новом заказе в Telegram
    """
    try:
        # Форматируем список товаров
        items_text = "\n".join([
            f"• {item['name']}\n  {item['quantity']} шт. × {item['price']}₸ = {item['item_total']}₸"
            for item in order_data['items']
        ])

        # Формируем сообщение по шаблону
        message = ORDER_TEMPLATE.format(
            name=order_data['name'],
            phone=order_data['phone'],
            address=order_data['address'],
            items=items_text,
            total=order_data['total'],
            comment=order_data.get('comment', 'Нет')
        )

        # Инициализируем бота и отправляем сообщение
        application = Application.builder().token(BOT_TOKEN).build()
        async with application:
            await application.bot.send_message(
                chat_id=ORDERS_CHAT_ID,
                text=message,
                parse_mode='Markdown'
            )
        
        logger.info(f"Order notification sent successfully for order from {order_data['name']}")
    
    except Exception as e:
        logger.error(f"Failed to send order notification: {str(e)}")
        raise
