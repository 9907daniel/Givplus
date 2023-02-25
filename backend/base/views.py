from django.shortcuts import render
from rest_framework import generics
from .models import Table
from .serializers import TableSerializer

# Create your views here.

class TableView(generics.CreateAPIView):
    # Prebuilt view that returns all tables
    queryset = Table.objects.all()
    serializer_class = TableSerializer
    





# def home(request):
#     return render(request, 'index.html')
# def Nations(request):
#     return render(request, 'nations.html')
# def Donate(request):
#     return render(request, 'donate.html')
# def Contact(request):
#     return render(request, 'contact.html')




