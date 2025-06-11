import django_filters
from .models import Historico
from django.db.models.functions import ExtractHour

class HistoricoFilter(django_filters.FilterSet):
    sensor = django_filters.NumberFilter(field_name='sensor__id')
    data = django_filters.DateFilter(field_name='timestamp', lookup_expr='date')
    hora = django_filters.NumberFilter(method='filtrar_por_hora')

    class Meta:
        model = Historico
        fields = ['id', 'sensor', 'data', 'hora']

    def filtrar_por_hora(self, queryset, name, value):
        return queryset.annotate(hora=ExtractHour('timestamp')).filter(hora=value)
