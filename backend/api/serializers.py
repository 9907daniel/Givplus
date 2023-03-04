from rest_framework import serializers
from .models import Table, Results, Platforms, Country

class TableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = ('id','title', 'description', 
                 'created_at', 'result', 'un_17')
                # id always automatically generated
                
class ResultsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Results
        fields = ('id','country', 'currency', 
                 'currency_abbreviation', 'ppp_log', 'forex_score',
                 'final_score','createdAt', 
                 )
class PlatformSerializer(serializers.ModelSerializer):
    class Meta:
        model = Platforms
        fields = '__all__'
 
    
class CountrySerializer(serializers.ModelSerializer):
    platforms = PlatformSerializer(many=True, read_only=True)
   
    class Meta:
        model = Country
        fields = '__all__'