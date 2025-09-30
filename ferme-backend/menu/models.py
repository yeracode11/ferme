from django.db import models

class MenuItem(models.Model):
    CATEGORY_CHOICES = [
        ('first', 'Первые блюда'),
        ('second', 'Вторые блюда'),
        ('garnish', 'Гарнир'),
    ]

    name = models.CharField("Название", max_length=255)
    description = models.TextField("Описание", blank=True, default="")
    category = models.CharField("Категория", max_length=50, choices=CATEGORY_CHOICES, default='second')
    price = models.DecimalField("Цена", max_digits=10, decimal_places=2)
    image = models.ImageField("Изображение", upload_to="", null=True, blank=True)
    available = models.BooleanField("Доступно", default=True)
    created_at = models.DateTimeField("Дата создания", auto_now_add=True)
    updated_at = models.DateTimeField("Дата обновления", auto_now=True)

    class Meta:
        verbose_name = "Пункт меню"
        verbose_name_plural = "Пункты меню"
        ordering = ["-created_at"]

    def __str__(self):
        return self.name

class Order(models.Model):
    STATUS_CHOICES = [
        ('new', 'Новый'),
        ('processing', 'В обработке'),
        ('completed', 'Выполнен'),
        ('cancelled', 'Отменен'),
    ]

    name = models.CharField("Имя клиента", max_length=255)
    phone = models.CharField("Телефон", max_length=20)
    address = models.TextField("Адрес доставки")
    comment = models.TextField("Комментарий к заказу", blank=True)
    status = models.CharField("Статус", max_length=20, choices=STATUS_CHOICES, default='new')
    created_at = models.DateTimeField("Дата создания", auto_now_add=True)
    updated_at = models.DateTimeField("Дата обновления", auto_now=True)

    class Meta:
        verbose_name = "Заказ"
        verbose_name_plural = "Заказы"
        ordering = ["-created_at"]

    def __str__(self):
        return f"Заказ #{self.id} от {self.name}"

    @property
    def total(self):
        return sum(item.quantity * item.menu_item.price for item in self.items.all())

class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    menu_item = models.ForeignKey(MenuItem, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField("Количество")
    price_at_time = models.DecimalField("Цена на момент заказа", max_digits=10, decimal_places=2)

    class Meta:
        verbose_name = "Позиция заказа"
        verbose_name_plural = "Позиции заказа"

    def __str__(self):
        return f"{self.menu_item.name} x {self.quantity}"

    def save(self, *args, **kwargs):
        if not self.price_at_time:
            self.price_at_time = self.menu_item.price
        super().save(*args, **kwargs)