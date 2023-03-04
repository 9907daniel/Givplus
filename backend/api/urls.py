from django.urls import path
from .views import TableView
from . import views

urlpatterns = [
    # return main function in views.py
    path('', TableView.as_view()),
    
    # scores api
    path('scores/', views.get_csv, name='get_csv'),
    path('scores/upload/', views.import_csv, name='import_csv'),
    
    # platforms api
    path('platforms/', views.platforms_list, name='get_csv'),
    
    # countries api
    path('countries/', views.country_list, name='get_csv'),

]
