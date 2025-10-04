from rest_framework import serializers
from products.models import Category, Product, Banner, ProductSize, Promotion

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class ProductSizeSerializer(serializers.ModelSerializer):
    class Meta: 
        model = ProductSize
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source='category',  
        write_only=True
    )
    image_url = serializers.ImageField(source='image', read_only=True)
    category = CategorySerializer(read_only=True)
    sizes = ProductSizeSerializer(many=True, read_only=True)  

    class Meta:
        model = Product
        fields = '__all__'
        extra_fields = ['category_id']
        
        
        
class PromotionSerializer(serializers.ModelSerializer):
    image_url = serializers.ImageField(source='image', read_only=True)

    class Meta:
        model = Promotion
        fields = ['id', 'name', 'short_description', 'description', 'image', 'image_url', 'created_at']

    def get_image_url(self, obj):
        if obj.image:
            return obj.image.url
        return None 

class BannerSerializer(serializers.ModelSerializer):
    promotion = PromotionSerializer(read_only=True)
    promotion_id = serializers.IntegerField(source='promotion.id', read_only=True)

    class Meta:
        model = Banner
        fields = ['id', 'title', 'image', 'created_at', 'promotion', 'promotion_id']
