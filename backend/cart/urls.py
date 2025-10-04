from django.urls import path
from cart.views import CartViewSet
    
cart_viewset = CartViewSet.as_view({
    'get': 'list',          
    'post': 'create',      
})

cart_item_viewset = CartViewSet.as_view({
    'delete': 'destroy',   
    'patch': 'quantity_update',
})    
    
urlpatterns = [
        path('', cart_viewset, name='cart'),
        path('<str:pk>/', cart_item_viewset, name='cart-item'),
]