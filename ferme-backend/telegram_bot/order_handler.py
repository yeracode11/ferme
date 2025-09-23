import logging
from django.db.models.signals import post_save, m2m_changed
from django.dispatch import receiver
from django.conf import settings
from asgiref.sync import async_to_sync
from .bot import send_order_notification
from menu.models import Order, OrderItem
import json

logger = logging.getLogger(__name__)

@receiver(post_save, sender=Order)
def handle_new_order(sender, instance, created, **kwargs):
    """
    Обработчик сигнала создания нового заказа
    """
    if not created:  # Обрабатываем только новые заказы
        return

    logger.info(f"Создан новый заказ #{instance.id}")
    # Отмечаем заказ как необработанный
    instance._notification_pending = True

@receiver(post_save, sender=OrderItem)
def handle_order_item_save(sender, instance, created, **kwargs):
    """
    Обработчик сигнала сохранения позиции заказа
    """
    order = instance.order
    logger.info(f"Сохранена позиция заказа #{order.id}: {instance.menu_item.name} x {instance.quantity}")

    # Проверяем, все ли позиции заказа обработаны
    try:
        # Получаем все позиции заказа
        order_items = order.items.select_related('menu_item').all()
        
        if not order_items.exists():
            logger.info(f"Заказ #{order.id} пока не имеет позиций")
            return

        logger.info(f"Найдено {order_items.count()} позиций для заказа #{order.id}")

        # Формируем данные заказа
        items_data = []
        total = 0

        for item in order_items:
            item_total = float(item.price_at_time) * item.quantity
            total += item_total
            items_data.append({
                'name': item.menu_item.name,
                'quantity': item.quantity,
                'price': str(item.price_at_time),
                'item_total': str(item_total)
            })
            logger.info(f"Добавлена позиция: {item.menu_item.name} x {item.quantity} = {item_total}₸")

        order_data = {
            'name': order.name,
            'phone': order.phone,
            'address': order.address,
            'items': items_data,
            'total': str(total),
            'comment': order.comment if order.comment else ''
        }

        logger.info(f"Подготовлены данные заказа: {json.dumps(order_data, ensure_ascii=False)}")

        # Отправляем уведомление в Telegram
        async_to_sync(send_order_notification)(order_data)
        logger.info(f"Уведомление о заказе #{order.id} отправлено в Telegram")

        # Отмечаем заказ как обработанный
        order._notification_sent = True

    except Exception as e:
        logger.error(f"Ошибка при обработке заказа #{order.id}: {str(e)}")
        raise