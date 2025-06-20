import django_filters
from django.db.models.functions import ExtractHour
from .models import Sensor, Ambiente, Historico

class SensorFilter(django_filters.FilterSet):
    id = django_filters.NumberFilter(field_name='id')
    tipo = django_filters.CharFilter(field_name='tipo', lookup_expr='icontains')
    status = django_filters.BooleanFilter(field_name='status')

    class Meta:
        model = Sensor
        fields = ['id', 'tipo', 'status']


class AmbienteFilter(django_filters.FilterSet):
    sig = django_filters.CharFilter(field_name='sig', lookup_expr='icontains')
    descricao = django_filters.CharFilter(field_name='descricao', lookup_expr='icontains')

    class Meta:
        model = Ambiente
        fields = ['sig', 'descricao']


class HistoricoFilter(django_filters.FilterSet):
    id = django_filters.NumberFilter(field_name='id')
    sensor = django_filters.NumberFilter(field_name='sensor__id')
    data = django_filters.DateFilter(field_name='timestamp', lookup_expr='date')
    hora = django_filters.NumberFilter(method='filtrar_por_hora')

    class Meta:
        model = Historico
        fields = ['id', 'sensor', 'data', 'hora']

    def filtrar_por_hora(self, queryset, name, value):
        return queryset.annotate(hora=ExtractHour('timestamp')).filter(hora=value)
