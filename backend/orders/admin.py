from django.contrib import admin
from .models import Order, OrderItem
# Register your models here.



class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 1

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'phone', 'status', 'payment_method', 'created_at')
    list_filter = ('status', 'payment_method')
    search_fields = ('name', 'phone', 'email')
    inlines = [OrderItemInline]
