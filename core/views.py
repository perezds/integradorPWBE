import os
import pandas as pd
from django.utils import timezone
from django.http import JsonResponse, HttpResponse
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Sensor, Ambiente, Historico
from .serializers import SensorSerializer, AmbienteSerializer, HistoricoSerializer
from django.contrib.auth.models import User

from django_filters.rest_framework import DjangoFilterBackend
from .filters import SensorFilter, AmbienteFilter, HistoricoFilter

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

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def exportar_historico_excel(request):
    historico = Historico.objects.all().values()
    df = pd.DataFrame(historico)
    response = HttpResponse(content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    response['Content-Disposition'] = 'attachment; filename="historico.xlsx"'
    df.to_excel(response, index=False)
    return response

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def importar_planilhas(request):
    planilhas = {
        'contador.xlsx': ('Contador de Pessoas', 'Un'),
        'luminosidade.xlsx': ('Luminosidade', 'Lux'),
        'temperatura.xlsx': ('Temperatura', '°C'),
        'umidade.xlsx': ('Umidade', '%'),
    }

    BASE_PATH = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    inseridos = 0

    for nome_arquivo, (tipo_sensor, unidade) in planilhas.items():
        caminho = os.path.join(BASE_PATH, nome_arquivo)
        try:
            df = pd.read_excel(caminho)
        except Exception as e:
            print(f"Erro ao abrir {nome_arquivo}: {e}")
            continue

        for index, row in df.iterrows():
            try:
                Sensor.objects.create(
                    tipo=tipo_sensor,
                    mac_address=str(row['mac_address']),
                    unidade_med=unidade,
                    latitude=float(row['latitude']),
                    longitude=float(row['longitude']),
                    status=str(row['status']).strip().lower() == 'ativo',
                )
                inseridos += 1
            except Exception as e:
                print(f"Erro na linha {index + 2} do {nome_arquivo}: {e}")

    excel_path = os.path.join(BASE_PATH, 'ambientes.xlsx')
    if not os.path.exists(excel_path):
        return JsonResponse({"erro": f"Arquivo não encontrado: {excel_path}"})

    try:
        df = pd.read_excel(excel_path)
    except Exception as e:
        return JsonResponse({"erro": f"Erro ao abrir ambientes.xlsx: {e}"})

    contador = 0
    for index, row in df.iterrows():
        try:
            Ambiente.objects.create(
                sig=str(row['sig']),
                descricao=str(row['descricao']),
                ni=str(row['ni']),
                responsavel=str(row['responsavel'])
            )
            contador += 1
        except Exception as e:
            print(f"Erro na linha {index + 1} do ambientes.xlsx: {e}")

    def importar_historico_por_sensor(nome_arquivo, tipo_sensor):
        caminho = os.path.join(BASE_PATH, nome_arquivo)
        inseridos = 0

        if os.path.exists(caminho):
            try:
                df = pd.read_excel(caminho)
            except Exception as e:
                print(f"Erro ao abrir {nome_arquivo}: {e}")
                return 0

            for index, row in df.iterrows():
                try:
                    sensor = Sensor.objects.filter(tipo=tipo_sensor).first()
                    if not sensor:
                        print(f"Linha {index + 2}: Sensor do tipo '{tipo_sensor}' não encontrado.")
                        continue

                    ambiente = Ambiente.objects.get(pk=int(row['ambiente']))

                    timestamp = pd.to_datetime(row['timestamp'], dayfirst=True, errors='coerce')
                    if pd.isna(timestamp):
                        timestamp = timezone.now()

                    Historico.objects.create(
                        sensor=sensor,
                        ambiente=ambiente,
                        valor=float(row['valor']),
                        timestamp=timestamp
                    )
                    inseridos += 1

                except Exception as e:
                    print(f"Erro na linha {index + 2} do {nome_arquivo}: {e}")

        else:
            print(f"Arquivo {nome_arquivo} não encontrado.")

        return inseridos

    total_historico = 0
    total_historico += importar_historico_por_sensor('luminosidade.xlsx', 'Luminosidade')
    total_historico += importar_historico_por_sensor('temperatura.xlsx', 'Temperatura')
    total_historico += importar_historico_por_sensor('umidade.xlsx', 'Umidade')
    total_historico += importar_historico_por_sensor('historicos.xlsx', 'Contador de Pessoas')

    return JsonResponse({
        "sucesso": f"{inseridos} sensores, {contador} ambientes e {total_historico} registros históricos foram inseridos."
    })

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def importar_historicos_endpoint(request):
    BASE_PATH = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    def importar_historico_por_sensor(nome_arquivo, tipo_sensor):
        caminho = os.path.join(BASE_PATH, nome_arquivo)
        inseridos = 0

        if os.path.exists(caminho):
            try:
                df = pd.read_excel(caminho)
            except Exception as e:
                return 0, f"Erro ao abrir {nome_arquivo}: {str(e)}"

            for index, row in df.iterrows():
                try:
                    sensor = Sensor.objects.filter(tipo=tipo_sensor).first()
                    if not sensor:
                        print(f"Linha {index + 2}: Sensor do tipo '{tipo_sensor}' não encontrado.")
                        continue

                    ambiente = Ambiente.objects.get(pk=int(row['ambiente']))

                    timestamp = pd.to_datetime(row['timestamp'], dayfirst=True, errors='coerce')
                    if pd.isna(timestamp):
                        timestamp = timezone.now()

                    Historico.objects.create(
                        sensor=sensor,
                        ambiente=ambiente,
                        valor=float(row['valor']),
                        timestamp=timestamp
                    )
                    inseridos += 1

                except Exception as e:
                    print(f"Erro na linha {index + 2} do {nome_arquivo}: {e}")
            return inseridos, None
        else:
            return 0, f"Arquivo {nome_arquivo} não encontrado."

    mensagens = []
    total_historico = 0

    arquivos = [
        ('luminosidade.xlsx', 'Luminosidade'),
        ('temperatura.xlsx', 'Temperatura'),
        ('umidade.xlsx', 'Umidade'),
        ('historicos.xlsx', 'Contador de Pessoas'),
    ]

    for arquivo, tipo in arquivos:
        inseridos, erro = importar_historico_por_sensor(arquivo, tipo)
        total_historico += inseridos
        if erro:
            mensagens.append(erro)
        else:
            mensagens.append(f"{inseridos} registros importados de {arquivo}")

    return JsonResponse({
        "sucesso": f"Total de {total_historico} registros históricos importados.",
        "mensagens": mensagens
    })
