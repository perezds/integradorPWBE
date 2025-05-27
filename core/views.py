import csv 
from django.http import HttpResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated 
from django_filters.rest_framework import DjangoFilterBackend

from .models import Sensor, Ambiente, Historico
from .serializers import SensorSerializer, AmbienteSerializer, HistoricoSerializer


# 🔧 CRUD com filtros + proteção JWT

class SensorViewSet(viewsets.ModelViewSet):
    queryset = Sensor.objects.all()
    serializer_class = SensorSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['tipo', 'status', 'id']


class AmbienteViewSet(viewsets.ModelViewSet):
    queryset = Ambiente.objects.all()
    serializer_class = AmbienteSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['sig']


class HistoricoViewSet(viewsets.ModelViewSet):
    queryset = Historico.objects.all()
    serializer_class = HistoricoSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['sensor', 'timestamp']


# 📤 Exportar histórico em CSV

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def exportar_historico_csv(request):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="historico.csv"'

    writer = csv.writer(response)
    writer.writerow(['ID', 'Sensor', 'Ambiente', 'Valor', 'Timestamp'])

    for h in Historico.objects.all():
        writer.writerow([h.id, h.sensor, h.ambiente.sig, h.valor, h.timestamp])

    return response


# 📤 Exportar sensores em CSV

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def exportar_sensores_csv(request):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="sensores.csv"'

    writer = csv.writer(response)
    writer.writerow(['ID', 'Tipo', 'MAC Address', 'Latitude', 'Longitude', 'Status'])

    for s in Sensor.objects.all():
        writer.writerow([
            s.id,
            s.tipo,
            s.mac_address,
            s.latitude,
            s.longitude,
            'Ativo' if s.status else 'Inativo'
        ])

    return response


# 📤 Exportar ambientes em CSV

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def exportar_ambientes_csv(request):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="ambientes.csv"'

    writer = csv.writer(response)
    writer.writerow(['ID', 'SIG', 'Descrição', 'NI', 'Responsável'])

    for a in Ambiente.objects.all():
        writer.writerow([a.id, a.sig, a.descricao, a.ni, a.responsavel])

    return response
