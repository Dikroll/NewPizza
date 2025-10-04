from rest_framework import serializers
from .models import Order, OrderItem
from products.models import Product, ProductSize

class ProductSizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductSize
        fields = ['id', 'size', 'price']

class ProductSerializer(serializers.ModelSerializer):
    sizes = ProductSizeSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'base_price', 'image', 'base_ingredients',  'sizes']

class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    size = ProductSizeSerializer(read_only=True)

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'size', 'quantity']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    
    class Meta:
        model = Order
        fields = ['id', 'user', 'created_at', 'name', 'phone', 'address', 'apartment', 'entrance', 'floor', 'comment', 'email', 'payment_method', 'status', 'items', 'summary']