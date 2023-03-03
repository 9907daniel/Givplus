from django.shortcuts import render
# from rest_framework.views import APIview
from rest_framework.decorators import api_view, permission_classes
# from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework import generics
from .models import Table, Results
from .serializers import TableSerializer, ResultsSerializer
from django.http import JsonResponse
import csv
import json

# Create your views here.

class TableView(generics.CreateAPIView):
    # Prebuilt view that returns all tables
    queryset = Table.objects.all()
    serializer_class = TableSerializer
    
@api_view(['GET'])
def get_csv(request):
    mydata = Results.objects.all()
    serializer = ResultsSerializer(mydata, many=True)
    return Response(serializer.data)

    
@api_view(['POST'])
def import_csv(request):
    with open('./files/Score.csv', 'r') as csvfile:
        reader = csv.DictReader(csvfile)

        for row in reader:
            mydata = Results(country=row['Country'], currency=row['Currency'],
                            currency_abbreviation=row['Currency_abbreviation'], ppp_log=row['PPP_log'],
                            forex_score=row['Forex_score'], final_score=row['Final_score'])
            mydata.save()

    queryset = Results.objects.all()
    serializer = ResultsSerializer(queryset, many=True)

    return Response(serializer.data)
    
    
