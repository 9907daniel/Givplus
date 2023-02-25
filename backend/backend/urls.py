
from django.contrib import admin
from django.urls import path, include
from base import views

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Base URLS
    path('', views.home, name='home'),
    path('Nations/', views.Nations, name='Nations'),
    path('Donate/', views.Donate, name='Donate'),
    path('Contact/', views.Contact, name='Contact'),
    
    # All auth 
    path('accounts/', include('allauth.urls')),
]
