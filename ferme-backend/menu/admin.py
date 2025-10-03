from django.contrib import admin
from .models import MenuItem, Order, OrderItem

@admin.register(MenuItem)
class MenuItemAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'price', 'available']
    list_filter = ['category', 'available']
    search_fields = ['name', 'description']

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'phone', 'floor', 'room', 'created_at', 'status']
    list_filter = ['status', 'created_at']
    search_fields = ['name', 'phone', 'address', 'floor', 'room']

@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ['order', 'menu_item', 'quantity', 'price_at_time']
    list_filter = ['order__status']
    search_fields = ['order__name', 'menu_item__name']