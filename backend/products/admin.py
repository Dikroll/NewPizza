from django.contrib import admin
from .models import Category, Product, Banner, ProductSize, Promotion
from django.utils.html import format_html
from django import forms
from rest_framework_simplejwt.token_blacklist import models
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    search_fields = ('name',)

class BannerInline(admin.TabularInline): 
    model = Banner
    extra = 1 

@admin.register(Promotion)
class PromotionAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at')
    inlines = [BannerInline]  

    
class ProductSizeInline(admin.TabularInline):
    model = ProductSize
    extra = 1 

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'base_price', 'category', 'display_image')
    list_filter = ('category',)
    search_fields = ('name', 'description')
    readonly_fields = ('display_image',)


    inlines = [ProductSizeInline]
    available_sizes_display = forms.CharField(
        widget=forms.Textarea,
        help_text="Введите данные в формате 'размер:цена' на каждой новой строке."
    )

    fieldsets = (
        (None, {
            'fields': ('name', 'description', 'base_price', 'image', 'display_image', 'category', )
        }),
        ('Дополнительные параметры', {
            'fields': ('base_ingredients',),
            'classes': ('collapse',) 
        }),
    )

    def display_image(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="150" height="150" style="object-fit: cover;" />', obj.image.url)
        return "Нет изображения"
    display_image.short_description = "Предпросмотр изображения"


admin.site.site_header = 'Дымок Пицца'
admin.site.site_title = 'Дымок Пицца'
admin.site.index_title = 'Панель управления'
admin.site.unregister(models.BlacklistedToken)
admin.site.unregister(models.OutstandingToken)