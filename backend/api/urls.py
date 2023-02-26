
from django.urls import path
from .views import TableView

urlpatterns = [
    path('', TableView.as_view()),
    # return main function in views.py
]
