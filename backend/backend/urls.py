
from django.contrib import admin
from django.urls import path, include
from base import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('base.urls')),
    # Send to base.urls.py
    # Send rest of endpoints behind / to base.urls

]
