# Ferme - Система заказа еды

Fullstack приложение для заказа еды с админ-панелью и интеграцией с Telegram.

## Технологии

### Frontend
- React
- TypeScript
- Tailwind CSS
- Vite

### Backend
- Django
- Django REST Framework
- PostgreSQL
- Python Telegram Bot

## Функционал

- 🛒 Корзина покупок
- 📱 Адаптивный дизайн
- 🔍 Фильтрация по категориям
- 📦 Оформление заказа
- 🤖 Уведомления в Telegram
- 👨‍💼 Админ-панель для управления меню

## Установка и запуск

### Backend

```bash
cd ferme-backend
python -m venv venv
source venv/bin/activate  # для Linux/Mac
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend

```bash
cd ferme-frontend
npm install
npm run dev
```

## Структура проекта

```
ferme/
├── ferme-backend/     # Django backend
│   ├── config/        # Настройки проекта
│   ├── menu/          # Приложение меню
│   └── telegram_bot/  # Telegram бот
└── ferme-frontend/    # React frontend
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   └── context/
    └── public/
```

## Автор

[Yersultan](https://github.com/yeracode11)
