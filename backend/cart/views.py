
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import status
from .models import Cart, CartItem
from products.models import Product, ProductSize
from .serializers import CartSerializer, CartItemSerializer
from products.serializers import ProductSerializer, ProductSizeSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.shortcuts import get_object_or_404


class CartViewSet(ViewSet):
    permission_classes = [AllowAny]
    def get_cart(self, request):
        if request.user.is_authenticated:
            cart, created = Cart.objects.get_or_create(user=request.user)
            return cart
        else:
            if 'cart' not in request.session:
                request.session['cart'] = {}
            return request.session['cart']


    def save_cart(self, request, cart):
        if not request.user.is_authenticated:
            request.session['cart'] = cart
            request.session.modified = True 

    def list(self, request):
        cart = self.get_cart(request)
        if request.user.is_authenticated:
            serializer = CartSerializer(cart)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            cart_items = []
            for item_id, item in cart.items():
                product_id = item.get('product_id')
                size_id = item.get('size_id')
                quantity = item.get('quantity')

                if not product_id or not size_id:
                    continue

                product = get_object_or_404(Product, id=product_id)
                size = get_object_or_404(ProductSize, id=size_id)
                cart_items.append({
                    'id': item_id,  
                    'product': ProductSerializer(product).data,
                    'size': ProductSizeSerializer(size).data,
                    'quantity': quantity
                })
            return Response(cart_items, status=status.HTTP_200_OK)

    def create(self, request):
        data = request.data
        product_id = data.get('productId')
        size_id = data.get('sizeId')
        quantity = data.get('quantity')

        if not all([product_id, size_id, quantity]):
            return Response({'error': 'Пропущенны обязательные данные'}, status=status.HTTP_400_BAD_REQUEST)

        cart = self.get_cart(request)

        if request.user.is_authenticated:
            product = get_object_or_404(Product, id=product_id)
            size = get_object_or_404(ProductSize, id=size_id)
            cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product, size=size)
            
            if created:
                cart_item.quantity = quantity
            else:
                cart_item.quantity += quantity
            
            cart_item.save()
            serializer = CartSerializer(cart)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            cart_key = f"{product_id}_{size_id}"
            if cart_key in cart:
                cart[cart_key]['quantity'] += quantity
            else:
                cart[cart_key] = {
                    'product_id': product_id,
                    'size_id': size_id,
                    'quantity': quantity
                }
            self.save_cart(request, cart)
            return Response(cart, status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        item_id = kwargs.get('pk') 
        cart = self.get_cart(request)

        if request.user.is_authenticated:
            try:
                cart_item = CartItem.objects.filter(id=item_id, cart=cart).first()
                if cart_item:
                    cart_item.delete()
                    return Response(status=status.HTTP_204_NO_CONTENT)
                else:
                    return Response({'error': 'Товар не найден'}, status=status.HTTP_404_NOT_FOUND)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            if item_id in cart:
                del cart[item_id]
                self.save_cart(request, cart)
                return Response(status=status.HTTP_204_NO_CONTENT)
            return Response({'error': 'Товар не найден'}, status=status.HTTP_404_NOT_FOUND)
        
    def quantity_update(self, request, *args, **kwargs):
        item_id = kwargs.get('pk')  
        new_quantity = request.data.get('quantity')

        if not new_quantity:
            return Response({'error': 'Количество обязательно'}, status=status.HTTP_400_BAD_REQUEST)

        cart = self.get_cart(request)

        if request.user.is_authenticated:
            try:
                cart_item = CartItem.objects.filter(id=item_id, cart=cart).first()
                if cart_item:
                    cart_item.quantity = new_quantity
                    cart_item.save()
                    return Response(status=status.HTTP_200_OK)
                else:
                    return Response({'error': 'Cart item not found'}, status=status.HTTP_404_NOT_FOUND)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            if item_id in cart:
                cart[item_id]['quantity'] = new_quantity
                self.save_cart(request, cart)
                return Response(status=status.HTTP_200_OK)
            return Response({'error': 'Товар не найден'}, status=status.HTTP_404_NOT_FOUND)