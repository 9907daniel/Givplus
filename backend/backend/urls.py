from django.contrib import admin
from django.urls import path, include
from api import views

urlpatterns = [
    path('api/admin/', admin.site.urls),
    path('api/user/', include('account.urls')),
    path('api/', include('api.urls')),
]
