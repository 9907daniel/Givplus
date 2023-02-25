from rest_framework import serializers
from .models import Table


class TableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = ('id','title', 'description', 
                 'created_at', 'result', 'un_17')
                # id always automatically generated