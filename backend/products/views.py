from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Category, Product, Banner, Promotion
from .serializers import CategorySerializer, ProductSerializer, BannerSerializer, ProductSizeSerializer, PromotionSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.shortcuts import get_object_or_404

class CategoryListView(APIView):
    permission_classes = [AllowAny]  
    
    def get(self, request):
        try:
            categories = Category.objects.all()
            serializer = CategorySerializer(categories, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": "Internal Server Error", "details": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ProductListView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        output = []
        for product in Product.objects.all():
            product_data = {
                'id': product.id,
                'name': product.name,
                'description': product.description,
                'price': product.base_price,
                'image_url': product.image.url if product.image else None,
                'category': product.category.name if product.category else None,
                'category_id': product.category.id if product.category else None,
                'base_ingredients': product.base_ingredients,
                'sizes': ProductSizeSerializer(product.sizes.all(), many=True).data
            }
            output.append(product_data)
        return Response(output, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        try:
            product = Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = ProductSerializer(product, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            product = Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

        product.delete()
        return Response({'message': 'Product deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

class BannerListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        banners = Banner.objects.all()
        serializer = BannerSerializer(banners, many=True)
        return Response(serializer.data)

class PromotionListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        promotions = Promotion.objects.all()
        output = []
        for promotion in promotions:
            product_data = {
                'id': promotion.id,
                'name': promotion.name,
                'short_description': promotion.short_description,
                'description': promotion.description,
                'image_url': promotion.image.url if promotion.image else None,
                'created_at': promotion.created_at
            }
            output.append(product_data)
        return Response(output, status=status.HTTP_200_OK)  

    def post(self, request):
        serializer = PromotionSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PromotionDetailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, pk):
        promotion = get_object_or_404(Promotion, id=pk)
        serializer = PromotionSerializer(promotion)
        return Response(serializer.data)