from django.db import models
from django.contrib.auth import get_user_model
from products.models import Product, ProductSize

User = get_user_model()

class Order(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Ожидание'),
        ('preparing', 'Готовится'),
        ('delivering', 'Доставляется'),
        ('delivered', 'Доставлено'),
        ('cancelled', 'Отменен'),
    ]

    PAYMENT_CHOICES = [
        ('cash', 'Наличными'),
        ('card_online', 'Картой онлайн'),
        ('card_on_delivery', 'Картой при получении'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    created_at = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=255, verbose_name="Название")
    phone = models.CharField(max_length=20, verbose_name="Телефон")
    address = models.CharField(max_length=255, verbose_name="Адресс")
    apartment = models.CharField(max_length=50, blank=True, null=True, verbose_name="Квартира")
    entrance = models.CharField(max_length=50, blank=True, null=True, verbose_name="Подъезд")
    floor = models.CharField(max_length=50, blank=True, null=True, verbose_name="Этаж")
    comment = models.TextField(blank=True, null=True, verbose_name="Комментарий")
    email = models.EmailField(blank=True, null=True)
    payment_method = models.CharField(max_length=50, choices=PAYMENT_CHOICES, verbose_name="Оплата")
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='pending', verbose_name="Статус")
    summary = models.DecimalField(max_digits=10, decimal_places=0, default=0, verbose_name="Сумма")

    def __str__(self):
        return f"Order {self.id} - User: {self.user}"
    
    class Meta:
        verbose_name="Заказ"
        verbose_name_plural = "Заказы"
    
class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE, verbose_name="Заказ ")
    product = models.ForeignKey(Product, on_delete=models.CASCADE, verbose_name="Товар")
    size = models.ForeignKey(ProductSize, on_delete=models.CASCADE, verbose_name="Размер")
    quantity = models.PositiveIntegerField(default=1, verbose_name="Количество")

    def __str__(self):
        return f"OrderItem {self.id} - Product: {self.product.name}, Size: {self.size.size}"
    
    class Meta:
        verbose_name="Товар"
        verbose_name_plural = "Товар"