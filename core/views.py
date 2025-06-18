from django.http import HttpResponse
from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
import pandas as pd

from .models import Sensor, Ambiente, Historico
from .serializers import SensorSerializer, AmbienteSerializer, HistoricoSerializer


class SensorViewSet(viewsets.ModelViewSet):
    queryset = Sensor.objects.all()
    serializer_class = SensorSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, SearchFilter]
    search_fields = ['tipo', 'mac_address', 'status']


class AmbienteViewSet(viewsets.ModelViewSet):
    queryset = Ambiente.objects.all()
    serializer_class = AmbienteSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, SearchFilter]
    search_fields = ['sig', 'descricao', 'responsavel']


class HistoricoViewSet(viewsets.ModelViewSet):
    queryset = Historico.objects.all()
    serializer_class = HistoricoSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, SearchFilter]
    search_fields = ['sensor__mac_address', 'ambiente__sig', 'valor', 'timestamp']


@api_view(['POST'])
@permission_classes([AllowAny])
def cadastrar_usuario(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    if not username or not email or not password:
        return Response({'erro': 'Preencha todos os campos.'}, status=400)

    if User.objects.filter(username=username).exists():
        return Response({'erro': 'Nome de usuário já existe.'}, status=400)

    user = User.objects.create_user(username=username, email=email, password=password)
    refresh = RefreshToken.for_user(user)

    return Response({
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def exportar_excel(request):
    sensores = Sensor.objects.all().values()
    df = pd.DataFrame(sensores)

    response = HttpResponse(content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    response['Content-Disposition'] = 'attachment; filename="sensores.xlsx"'
    df.to_excel(response, index=False)
    return response


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def exportar_ambientes_csv(request):
    ambientes = Ambiente.objects.all().values()
    df = pd.DataFrame(ambientes)

    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="ambientes.csv"'
    df.to_csv(response, index=False)
    return response


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def exportar_historico_csv(request):
    historico = Historico.objects.all().values()
    df = pd.DataFrame(historico)

    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="historico.csv"'
    df.to_csv(response, index=False)
    return response


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def status_geral(request):
    total = Sensor.objects.count()
    ativos = Sensor.objects.filter(status=True).count()
    inativos = Sensor.objects.filter(status=False).count()
    return Response({
        'total': total,
        'ativos': ativos,
        'inativos': inativos
    })
