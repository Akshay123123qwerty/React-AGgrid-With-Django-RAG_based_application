
from .views import GridView, GridDelete,login_user,register_user,search
from django.urls import path,include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('row/',GridView.as_view(),name='grid-list-create'),
    path('row/<int:pk>/',GridDelete.as_view(),name='row-delete'),
    path('register/',register_user,name = 'register'),
    path('login/',login_user,name='login'),
    path('search/', search, name='semantic-search'),
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]