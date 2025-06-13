import csv
from django.http import HttpResponse
from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth.models import User

from core.models import Sensor, Ambiente, Historico
from core.serializers import SensorSerializer, AmbienteSerializer, HistoricoSerializer
from core.filters import HistoricoFilter

# --------------------- VIEWSETS --------------------- #

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
    filterset_class = HistoricoFilter


# --------------------- API FUNCTIONS --------------------- #

@api_view(['GET'])
@permission_classes([AllowAny])
def status_geral(request):
    sensores = Sensor.objects.all()
    total = sensores.count()
    ativos = sensores.filter(status=True).count()
    inativos = total - ativos

    tipos = {}
    for tipo, _ in Sensor.TIPOS:
        tipos[tipo] = sensores.filter(tipo=tipo).count()

    return Response({
        'total_sensores': total,
        'ativos': ativos,
        'inativos': inativos,
        'tipos': tipos,
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def exportar_historico_csv(request):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="historico.csv"'

    writer = csv.writer(response)
    writer.writerow(['ID', 'Sensor', 'Ambiente', 'Valor', 'Timestamp'])

    for h in Historico.objects.all():
        writer.writerow([h.id, str(h.sensor), h.ambiente.sig, h.valor, h.timestamp])

    return response


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def exportar_sensores_csv(request):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="sensores.csv"'

    writer = csv.writer(response)
    writer.writerow(['ID', 'Tipo', 'MAC Address', 'Latitude', 'Longitude', 'Status'])

    for s in Sensor.objects.all():
        writer.writerow([
            s.id, s.tipo, s.mac_address, s.latitude, s.longitude,
            'Ativo' if s.status else 'Inativo'
        ])

    return response


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


@api_view(['POST'])
@permission_classes([AllowAny])
@authentication_classes([]) 
def cadastrar_usuario(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    if not username or not email or not password:
        return Response({'erro': 'Preencha todos os campos!'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({'erro': 'Usuário já existe!'}, status=status.HTTP_409_CONFLICT)

    if User.objects.filter(email=email).exists():
        return Response({'erro': 'E-mail já cadastrado!'}, status=status.HTTP_409_CONFLICT)

    user = User.objects.create_user(username=username, email=email, password=password)
    user.save()

    return Response(
        {
            'mensagem': 'Usuário cadastrado com sucesso!',
            'username': user.username,
            'id': user.id
        },
        status=status.HTTP_201_CREATED
    )
