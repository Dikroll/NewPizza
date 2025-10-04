from django.urls import path
from .views import CustomTokenObtainPairView, CustomTokenRefreshView, LogoutView, RegisterView, IsLoggedInView, UserProfileView



urlpatterns = [
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('logout/', LogoutView.as_view()),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view()),
    path('authenticated/', IsLoggedInView.as_view()),
    path('profile/', UserProfileView.as_view()),
    
]