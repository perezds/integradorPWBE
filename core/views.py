import os
import pandas as pd
from django.utils import timezone
from django.http import JsonResponse, HttpResponse
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from .models import Sensor, Ambiente, Historico
from .serializers import SensorSerializer, AmbienteSerializer, HistoricoSerializer
from django.contrib.auth.models import User

from django_filters.rest_framework import DjangoFilterBackend
from .filters import SensorFilter, AmbienteFilter, HistoricoFilter

from django.views.decorators.csrf import csrf_exempt

class SensorViewSet(viewsets.ModelViewSet):
    queryset = Sensor.objects.all()
    serializer_class = SensorSerializer
    permission_classes = [IsAuthenticated]
    
    filter_backends = [DjangoFilterBackend]
    filterset_class = SensorFilter

class AmbienteViewSet(viewsets.ModelViewSet):
    queryset = Ambiente.objects.all()
    serializer_class = AmbienteSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_class = AmbienteFilter

class HistoricoViewSet(viewsets.ModelViewSet):
    queryset = Historico.objects.all()
    serializer_class = HistoricoSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_class = HistoricoFilter

@api_view(['POST'])
@permission_classes([AllowAny])
def cadastrar_usuario(request):
    dados = request.data
    username = dados.get('username', '').strip()
    email = dados.get('email', '').strip()
    senha = dados.get('password', '').strip()

    erros = {}
    if not username:
        erros['username'] = 'O nome de usuário é obrigatório.'
    if not email:
        erros['email'] = 'O e-mail é obrigatório.'
    if not senha:
        erros['password'] = 'A senha é obrigatória.'
    if erros:
        return Response({'erros': erros}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({'username': 'Nome de usuário já existe.'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(email=email).exists():
        return Response({'email': 'E-mail já está em uso.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.create_user(username=username, email=email, password=senha)
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({'erro': f'Erro ao criar usuário: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def status_geral(request):
    total_sensores = Sensor.objects.count()
    ativos = Sensor.objects.filter(status=True).count()
    inativos = total_sensores - ativos

    return Response({
        'total_sensores': total_sensores,
        'ativos': ativos,
        'inativos': inativos,
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
def exportar_ambientes_excel(request):
    ambientes = Ambiente.objects.all().values()
    df = pd.DataFrame(ambientes)
    response = HttpResponse(content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    response['Content-Disposition'] = 'attachment; filename="ambientes.xlsx"'
    df.to_excel(response, index=False)
    return response

class ExportarHistoricoView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        historicos = Historico.objects.select_related('sensor', 'ambiente').all().order_by('-timestamp')

        data_para_df = list(historicos.values(
            'timestamp',
            'sensor__tipo',
            'ambiente__sig',
            'valor'
        ))

        if not data_para_df:
            return HttpResponse(status=204)

        df = pd.DataFrame(data_para_df)

        df['timestamp'] = df['timestamp'].dt.tz_localize(None)

        df.rename(columns={
            'timestamp': 'Data e Hora',
            'sensor__tipo': 'Tipo do Sensor',
            'ambiente__sig': 'Ambiente (SIG)',
            'valor': 'Valor Registrado'
        }, inplace=True)

        response = HttpResponse(
            content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        )
        response['Content-Disposition'] = 'attachment; filename="historico_sensores.xlsx"'


        df.to_excel(response, index=False)

        return response


@api_view(['POST'])
@permission_classes([IsAuthenticated])
@csrf_exempt
def importar_historicos(request, tipo_historico):

    try:
        caminho_arquivos = {
            'temperatura': 'data/hist_temperatura.xlsx',
            'luminosidade': 'data/hist_luminosidade.xlsx',
            'umidade': 'data/hist_umidade.xlsx',
            'contador': 'data/hist_contador.xlsx',
        }

        if tipo_historico not in caminho_arquivos:
            return JsonResponse({'status': 'error', 'message': 'Tipo de histórico inválido'})

        df = pd.read_excel(caminho_arquivos[tipo_historico])

        registros_a_criar = []
        
        sensores_ids = df['sensor_id'].unique()
        ambientes_ids = df['ambiente_id'].unique()
        
        sensores = {s.id: s for s in Sensor.objects.filter(id__in=sensores_ids)}
        ambientes = {a.id: a for a in Ambiente.objects.filter(id__in=ambientes_ids)}

        for _, row in df.iterrows():
            sensor_obj = sensores.get(row['sensor_id'])
            ambiente_obj = ambientes.get(row['ambiente_id'])

            # Se um sensor ou ambiente do arquivo não for encontrado no banco, pule a linha
            if not sensor_obj or not ambiente_obj:
                continue

            registros_a_criar.append(
                Historico(
                    sensor=sensor_obj,
                    ambiente=ambiente_obj,
                    valor=str(row['valor']),
                    timestamp=row['timestamp']
                )
            )
        
       
        Historico.objects.bulk_create(registros_a_criar, ignore_conflicts=True)

        return JsonResponse({
            'status': 'success', 
            'message': f'Histórico de "{tipo_historico}" importado com sucesso.',
            'registros_importados': len(registros_a_criar)
        })
    except FileNotFoundError:
        return JsonResponse({'status': 'error', 'message': f'Arquivo {caminho_arquivos[tipo_historico]} não encontrado.'})
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)})