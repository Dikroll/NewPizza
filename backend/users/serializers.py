from rest_framework import serializers
from users.models import DimokUser
import re

class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)
    phone = serializers.CharField(write_only=True)
    first_name = serializers.CharField()

    class Meta:
        model = DimokUser
        fields = ['first_name', 'email', 'password', 'confirm_password', 'phone', 'birthday', 'gender', 'address']

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match.")
        
        phone = data.get('phone')
        if not re.match(r'^\+7\d{10}$', phone):
            raise serializers.ValidationError("Phone number must start with +7 and contain 10 digits.")
        
        return data

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        
        user = DimokUser(
            first_name=validated_data['first_name'],
            email=validated_data['email'],
            phone=validated_data['phone'],
            birthday=validated_data.get('birthday'),
            gender=validated_data.get('gender'),
            address=validated_data.get('address')
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = DimokUser
        fields = ['first_name', 'email', 'phone', 'birthday', 'gender', 'address', 'bonus']