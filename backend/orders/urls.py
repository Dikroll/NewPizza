from django.urls import path
from orders.views import OrderView, OrderDetailView

urlpatterns = [
    path('', OrderView.as_view(), name='orders-list-create'), 
    path('<int:order_id>/', OrderDetailView.as_view(), name='order-detail'),  
]