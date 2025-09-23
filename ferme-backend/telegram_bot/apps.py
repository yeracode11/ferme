from django.apps import AppConfig

class TelegramBotConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'telegram_bot'

    def ready(self):
        import telegram_bot.order_handler  # Импортируем обработчик сигналов