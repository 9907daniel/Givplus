from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import status
from .models import Table, Results, Country, Platforms
from .serializers import TableSerializer, ResultsSerializer, CountrySerializer, PlatformSerializer
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
    
    
@api_view(['GET', 'POST'])
def platforms_list(request):
    if request.method == 'GET':
        platforms = Platforms.objects.all()
        serializer = PlatformSerializer(platforms, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = PlatformSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
def country_list(request):
    if request.method == 'GET':
        countries = Country.objects.all()
        serializer = CountrySerializer(countries, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = CountrySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)