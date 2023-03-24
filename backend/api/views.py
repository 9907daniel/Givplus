from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import status
from .models import Table, Results, Country, Platforms, Percentile, CountryName
from .serializers import TableSerializer, ResultsSerializer, CountrySerializer, PlatformSerializer, PercentileSerializer, CountryNameSerializer
from django.http import JsonResponse

import csv
import json
import os
from django.db import connection

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
    # Clear existing data
    Results.objects.all().delete()
    
    # Reset id to 1 for every new update
    with connection.cursor() as cursor:
        cursor.execute("ALTER SEQUENCE api_results_id_seq RESTART WITH 1")
    
    with open('./files/Score.csv', 'r') as csvfile:
        reader = csv.DictReader(csvfile)

        for row in reader:
            mydata = Results(country=row['Country'], currency=row['Currency'],
                            currency_abbreviation=row['Currency abbreviation'], ppp_log=row['PPP'],
                            forex_score=row['Forex score'], final_score=row['Final score'],                        
                            gdp=row['GDP per capita'], gdp_ppp=row['GDP per capita PPP'],
                            
                            
                            )
            mydata.save()

    # Return the new data as a response
    queryset = Results.objects.all()
    serializer = ResultsSerializer(queryset, many=True)

    return Response(serializer.data)
    
    
@api_view(['GET'])
def get_percentile(request):
    mydata = Percentile.objects.all()
    serializer = PercentileSerializer(mydata, many=True)
    return Response(serializer.data)

    
@api_view(['POST'])
def import_percentile(request):
    # Clear existing data
    Percentile.objects.all().delete()
    
    # Reset id to 1 for every new update
    # with connection.cursor() as cursor:
    #     cursor.execute("ALTER SEQUENCE api_results_id_seq RESTART WITH 1")
    
    with open('./files/forex_score.csv', 'r') as csvfile:
        reader = csv.DictReader(csvfile)

        for row in reader:
            mydata = Percentile(percentile=row['Forex score'],)
            mydata.save()

    # Return the new data as a response
    queryset = Percentile.objects.all()
    serializer = PercentileSerializer(queryset, many=True)

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
    
    
@api_view(['GET', 'POST', 'DELETE'])
def country_list(request, country_id=None):
        
    if request.method == 'GET':
        if country_id:
            # Get a single country by id
            country = Country.objects.get(id=country_id)
            serializer = CountrySerializer(country) 
        else:
            countries = Country.objects.all()
            serializer = CountrySerializer(countries, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        csv_dir = './files/nation'
        for filename in os.listdir(csv_dir):
            if filename.endswith('.csv'):
                csv_path = os.path.join(csv_dir, filename)
                with open(csv_path, 'r') as csvfile:
                    reader = csv.DictReader(csvfile)
                    for row in reader:
                        description_dict = {}
                        for key in row.keys():
                            if key.startswith('Description'):
                                field_name = key.split('_', 1)[1]  # extract field name from key
                                description_dict[field_name] = row[key]

                        mydata = Country(
                            number=row['Number'],
                            name=row['Official Name'], 
                            continent=row['Continent'],
                            gdp=row['GDP'],
                            language=row['Language'], 
                            population=row['Population'],
                            currency=row['Currency'],
                            religion=row['National Religion'], 
                            need_help_in=row['NEED HELP in'],
                            description=description_dict, 
                            # platforms=row['Platforms'],
                            location_lat=row['Latitude'], 
                            location_lng=row['Longitude']
                        )
                        mydata.save()

        # Return the new data as a response
        queryset = Country.objects.all()
        serializer = CountrySerializer(queryset, many=True)
        return Response(serializer.data)
     
    elif request.method == 'DELETE':
        # Delete a single country by id
        if not country_id:
            return Response({'error': 'Country ID is required for DELETE requests'}, status=400)
        try:
            country = Country.objects.get(id=country_id)
            country.delete()
            return Response({'success': f'Country with ID {country_id} deleted successfully'}, status=204)
        except Country.DoesNotExist:
            return Response({'error': f'Country with ID {country_id} not found'}, status=404)

class CountryDeleteView(generics.DestroyAPIView):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer

@api_view(['GET'])
def country_detail(request, name):
    try:
        country = Country.objects.get(name__iexact=name)
    except Country.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CountrySerializer(country)
        return Response(serializer.data)
    

@api_view(['GET', 'POST'])
def project_list(request):
    if request.method == 'GET':
        countries = CountryName.objects.all()
        serializer = CountryNameSerializer(countries, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = CountryNameSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

