from django.urls import path
from .views import TableView
from . import views

urlpatterns = [
    # return main function in views.py
    path('', TableView.as_view()),
    
    # scores api
    path('scores/', views.get_all_csv, name='get_all_csv'),
    path('scores/upload/', views.import_csv, name='import_csv'),
    path('scores/<str:file_index>/', views.get_csv, name='get_csv'),

    
    # projects api
    path('projects/', views.project_list, name='project_list'),
    
    # percentile api
    path('percentile/', views.get_percentile, name='get_percentile'),
    path('percentile/upload/', views.import_percentile, name='import_percentile'),
    
    # platforms api
    path('platforms/', views.platforms_list, name='platforms_list'),
    
    # countries api
    path('countries/', views.country_list, name='country_list'),
    path('countries/<str:name>/', views.country_detail, name='country_list'),
    path('countries/delete/<int:pk>/', views.CountryDeleteView.as_view(), name='country_delete'),


    # Graph API
    path('graphs/', views.graph_view, name='graph-list-create'),


]
