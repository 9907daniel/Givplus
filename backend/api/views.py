from django.shortcuts import render
from rest_framework import generics
from .models import Table
from .serializers import TableSerializer

# Create your views here.

class TableView(generics.CreateAPIView):
    # Prebuilt view that returns all tables
    queryset = Table.objects.all()
    serializer_class = TableSerializer