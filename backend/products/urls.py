
from django.urls import path, include
from products.views import BannerListView, PromotionListView, PromotionDetailView, ProductListView, CategoryListView

urlpatterns = [
    path('products/', ProductListView.as_view(), name='product-list'),  
    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('banners/', BannerListView.as_view(), name='banner-list'), 
    path('promotions/', PromotionListView.as_view(), name='promotion-list'),
    path('promotions/<int:pk>/', PromotionDetailView.as_view(), name='promotion-detail'),
]