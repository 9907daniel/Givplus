from django.urls import path
from .views import TableView
from . import views

urlpatterns = [
    path('', TableView.as_view()),
    # return main function in views.py
    path('scores/', views.get_csv, name='get_csv'),
    path('scores/upload/', views.import_csv, name='import_csv'),

]
