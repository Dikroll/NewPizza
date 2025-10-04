
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth import authenticate

from .serializers import UserRegisterSerializer, UserSerializer

class RegisterView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)

            res = Response({'message': 'User successfully registered'})
            res.set_cookie('access_token', access_token, httponly=True, secure=True, samesite='None', path='/')
            res.set_cookie('refresh_token', refresh_token, httponly=True, secure=True, samesite='None', path='/')
            return res
        
        return Response({"error": "Registration failed", "details": serializer.errors}, status=400)

class CustomTokenObtainPairView(TokenObtainPairView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        phone = request.data.get('phone')
        password = request.data.get('password')
        
        user = authenticate(request, username=phone, password=password)
        
        if user is not None:
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)

            res = Response({
                'refresh': refresh_token,
                'access': access_token,
            })
            res.set_cookie('access_token', access_token, httponly=True, secure=True, samesite='None', path='/')
            res.set_cookie('refresh_token', refresh_token, httponly=True, secure=True, samesite='None', path='/')
            return res
        else:
            raise AuthenticationFailed('Incorrect phone number or password')

class CustomTokenRefreshView(TokenRefreshView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.COOKIES.get('refresh_token')
            if not refresh_token:
                return Response({'refreshed': False, 'error': 'Refresh token not found in cookies'}, status=400)

            request.data['refresh'] = refresh_token
            response = super().post(request, *args, **kwargs)
            access_token = response.data.get('access')

            res = Response({'refreshed': True})
            res.set_cookie('access_token', access_token, httponly=True, secure=True, samesite='None', path='/')
            return res
        except Exception as e:
            print(e)
            return Response({'refreshed': False, 'error': str(e)}, status=400)

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.COOKIES.get('refresh_token')
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist() 
            res = Response({'message': 'Logged out successfully'})
            res.delete_cookie('access_token', path='/', samesite='None')
            res.delete_cookie('refresh_token', path='/', samesite='None')
            return res
        
        except Exception as e:
            print(f"Error during logout: {e}")
            return Response({'error': str(e)}, status=400)

class IsLoggedInView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def put(self, request):
        user = request.user
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)