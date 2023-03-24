from rest_framework import serializers
from .models import Table, Results, Platforms, Country, Percentile, CountryName, NGO, Project

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
                 'final_score','createdAt', 'gdp', 'gdp_ppp', 
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
        fields = ['id', 'number', 'name', 'continent', 'description', 'gdp', 'currency',  'language', 'population', 'religion', 'need_help_in', 'location', ]
    

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
    

### New Serializer for Projects####


class ProjectSerializer(serializers.ModelSerializer):
    # un_goal = serializers.ChoiceField(choices=Project.UN_GOALS_CHOICES)
    un_goal_display = serializers.CharField(source='get_un_goal_display', read_only=True)


    class Meta:
        model = Project
        fields = ['project_name', 'description', 'un_goal','un_goal_display']

class NGOSerializer(serializers.ModelSerializer):
    projects = ProjectSerializer(many=True)

    class Meta:
        model = NGO
        fields = ['ngo_name', 'projects']

class CountryNameSerializer(serializers.ModelSerializer):
    ngos = NGOSerializer(many=True)

    class Meta:
        model = CountryName
        fields = ['name', 'ngos']
        
    def create(self, validated_data):
        ngos_data = validated_data.pop('ngos')
        countryName = CountryName.objects.create(**validated_data)
        
        for ngo_data in ngos_data:
            projects_data = ngo_data.pop('projects')
            ngo = NGO.objects.create(country=countryName, **ngo_data)
            
            for project_data in projects_data:
                Project.objects.create(ngo=ngo, **project_data)

        return countryName
