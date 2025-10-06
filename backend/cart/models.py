from django.db import models
from products.models import Product, ProductSize
from django.contrib.auth import get_user_model

User = get_user_model()

class Cart(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='cart', null=True, blank=True, verbose_name="Клиент")
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Cart {self.id} - User: {self.user}"

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, verbose_name="Товар")
    size = models.ForeignKey(ProductSize, on_delete=models.CASCADE, verbose_name="Размер")
    quantity = models.PositiveIntegerField(default=1, verbose_name="Количество")

    def __str__(self):
        return f"CartItem {self.id} - Product: {self.product.name}, Size: {self.size.size}"