from rest_framework import serializers
from .models import Table, Results, Platforms, Country, Percentile

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

class PercentileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Percentile
        fields = '__all__'
        
    def create(self, validated_data):
        # use the objects manager to create a new Percentile instance
        percentile = Percentile.objects.create(**validated_data)
        return percentile
        


class PlatformSerializer(serializers.ModelSerializer):
    class Meta:
        model = Platforms
        fields = '__all__'
 
    
class CountrySerializer(serializers.ModelSerializer):
    # platforms = PlatformSerializer(many=True, read_only=True)
    location = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()

    class Meta:
        model = Country
        # fields = '__all__'
        fields = ['id', 'name', 'continent', 'description', 'gdp', 'currency',  'language', 'population', 'religion', 'need_help_in', 'location', ]
    

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['gdp'] = instance.gdp
        ret['population'] = instance.population
        ret['language'] = instance.language
        ret['religion'] = instance.religion
        ret['need_help_in'] = instance.need_help_in
        ret['currency'] = instance.currency
        return ret

    
    def get_location(self, obj):
        return {
            'lat': obj.location_lat,
            'lng': obj.location_lng,
        }
        
        
    def get_description(self, obj):
        return obj.description
