from rest_framework import serializers
from .models import Table, Results

class TableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = ('id','title', 'description', 
                 'created_at', 'result', 'un_17')
                # id always automatically generated
                
class ResultsSerializer(serializers.ModelSerializer):
    # result = ResultsSerializer()
    
    class Meta:
        model = Results
        fields = ('id','country', 'currency', 
                 'currency_abbreviation', 'ppp_log', 'forex_score',
                 'final_score','createdAt', 
                 )