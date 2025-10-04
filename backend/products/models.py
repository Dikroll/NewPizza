from django.db import models


# Создайте ваши модели здесь.
class Category(models.Model):
    name = models.CharField(max_length=100, verbose_name="Название")
    description = models.TextField(blank=True, null=True, verbose_name="Описание")

    def __str__(self):
        return self.name
    class Meta:
        verbose_name="Категория"
        verbose_name_plural = "Категории"

class ProductSize(models.Model):
    product = models.ForeignKey('Product', on_delete=models.CASCADE, related_name='sizes', verbose_name="Товар")
    size = models.CharField(max_length=50, verbose_name="Размер")
    price = models.DecimalField(max_digits=6, decimal_places=0, verbose_name="Цена")
    grammas = models.PositiveIntegerField(blank=False, verbose_name="Вес")

    def __str__(self):
        return f"{self.size} - {self.price}"
    class Meta:
        verbose_name="Размеры"
        verbose_name_plural = "Размеры"

class Product(models.Model):
    name = models.CharField(max_length=100, verbose_name="Название")
    description = models.TextField(verbose_name="Описание")
    base_price = models.DecimalField(max_digits=6, decimal_places=0, verbose_name="Начальная цена")
    image = models.ImageField(upload_to='product_images/', verbose_name="Изображение")
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products', verbose_name="Категория")
    base_ingredients = models.TextField(blank=True, verbose_name="Ингридиенты")

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name="Товар"
        verbose_name_plural = "Товары"


class Promotion(models.Model):
    name = models.CharField(max_length=100, verbose_name="Название")
    image = models.ImageField(upload_to='promotions/', null=True, blank=True, verbose_name="Изображение")
    short_description= models.TextField(verbose_name="Короткое Описание")
    description = models.TextField(verbose_name="Описание")
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name="Акция"
        verbose_name_plural = "Акции"
    
class Banner(models.Model):
    title = models.CharField(max_length=100, blank=True, null=True, verbose_name="Название")
    image = models.ImageField(upload_to='banners/', verbose_name="Изображение")
    created_at = models.DateTimeField(auto_now_add=True)
    promotion = models.ForeignKey(Promotion, on_delete=models.SET_NULL, null=True, blank=True, related_name='banners', verbose_name='Акции')

    def __str__(self):
        return self.title or f'Banner {self.id}'
    class Meta:
        verbose_name="Баннер"
        verbose_name_plural = "Баннеры"