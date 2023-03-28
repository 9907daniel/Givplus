from rest_framework import serializers
from .models import Table, Results, Platforms, Country, Percentile, Project, Graph

class TableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = ('id','title', 'description', 
                 'created_at', 'result', 'un_17')
                # id always automatically generated
                
                
class ResultsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Results
        fields = ('id', 'country_id', 'file_index','country', 'currency', 
                 'currency_abbreviation', 'ppp_log', 'forex_score',
                 'final_score','createdAt', 'gdp', 'gdp_ppp', 'coffee', 'today_rate', 'rank'
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
        fields = ['id', 'number', 'name', 'continent', 'description', 'gdp', 'currency',  'language', 'population', 'religion', 'need_help_in', 'location','national_emergency' ]
    
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
    

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id','country', 'ngo_name', 'project_name', 'un_goal', 'description']


class GraphSerializer(serializers.ModelSerializer):
    class Meta:
        model = Graph
        fields = ('graph', 'country', 'file_index')
