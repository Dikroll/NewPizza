from rest_framework import serializers
from cart.models import Cart, CartItem
from products.serializers import ProductSerializer, ProductSizeSerializer
from products.models import Product, ProductSize

class CartItemSerializer(serializers.ModelSerializer):
    size = ProductSizeSerializer(read_only=True)
    size_id = serializers.PrimaryKeyRelatedField(queryset=ProductSize.objects.all(), write_only=True)
    product = ProductSerializer()
    class Meta:
        model = CartItem
        fields = ['id', 'product', 'size', 'quantity', 'size_id']
        
class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ['id', 'user', 'created_at', 'items']