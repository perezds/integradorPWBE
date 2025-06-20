from rest_framework import serializers
from .models import *

class SensorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sensor
        fields = '__all__'

class AmbienteSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Ambiente
        fields = '__all__'

class HistoricoSerializer(serializers.ModelSerializer):
    sensor = SensorSerializer(read_only=True)
    ambiente = AmbienteSerializer(read_only=True)

    class Meta:
        model = Historico
        fields = ['id', 'timestamp', 'sensor', 'ambiente', 'valor']
