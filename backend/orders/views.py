from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Order, OrderItem
from .serializers import OrderSerializer
from cart.models import CartItem, Cart
from backend.utils import send_email


class OrderView(APIView):
    def get(self, request, *args, **kwargs):
        order_id = kwargs.get('order_id')
        if order_id:
            try:
                order = Order.objects.get(id=order_id, user=request.user)  
                serializer = OrderSerializer(order)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Order.DoesNotExist:
                return Response({'error': 'Заказ не найден'}, status=status.HTTP_404_NOT_FOUND)
        else:
            orders = Order.objects.filter(user=request.user).order_by('-created_at') 
            serializer = OrderSerializer(orders, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        user = request.user
        cart = Cart.objects.get(user=user)
        cart_items = CartItem.objects.filter(cart=cart)

        order_data = request.data

        order = Order.objects.create(
            user=user,
            name=order_data.get('name'),
            phone=order_data.get('phone'),
            address=order_data.get('address'),
            apartment=order_data.get('apartment'),
            entrance=order_data.get('entrance'),
            floor=order_data.get('floor'),
            comment=order_data.get('comment'),
            email=order_data.get('email'),
            payment_method=order_data.get('paymentMethod'),
            status='pending',
            summary=0, 
        )


        for cart_item in cart_items:
            OrderItem.objects.create(
                order=order,
                product=cart_item.product,
                size=cart_item.size,
                quantity=cart_item.quantity,
            )


        total_price = sum(item.size.price * item.quantity for item in order.items.all())


        order.summary = total_price
        order.save()

        cart_items.delete()

        # email_context = {'order': order, 'user': user, 'items': list(order.items.all()),}
        # send_email(
        #     subject="Подтверждение заказа",
        #     recipient_list=[order.email],
        #     template_name="emails/order_info.html",
        #     context=email_context,

        # )

        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
class OrderDetailView(APIView):
    def get(self, request, order_id, *args, **kwargs):
        try:
            order = Order.objects.get(id=order_id)
            serializer = OrderSerializer(order)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Order.DoesNotExist:
            return Response({'error': 'Заказ не найден'}, status=status.HTTP_404_NOT_FOUND)
