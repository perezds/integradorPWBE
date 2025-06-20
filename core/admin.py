from django.contrib import admin
from .models import Sensor, Ambiente, Historico

@admin.register(Sensor)
class SensorAdmin(admin.ModelAdmin):
    list_display = ('id', 'tipo', 'mac_address', 'status', 'latitude', 'longitude')
    list_filter = ('tipo', 'status')
    search_fields = ('mac_address', 'tipo')

@admin.register(Ambiente)
class AmbienteAdmin(admin.ModelAdmin):
    list_display = ('id', 'sig', 'descricao', 'responsavel')
    search_fields = ('sig', 'descricao', 'responsavel')

@admin.register(Historico)
class HistoricoAdmin(admin.ModelAdmin):
    list_display = ('id', 'sensor', 'ambiente', 'valor', 'timestamp')
    list_filter = ('sensor__tipo',)
    search_fields = ('sensor__tipo', 'ambiente__descricao')
