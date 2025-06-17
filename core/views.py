import os
import zipfile
from django.http import HttpResponse
from django.conf import settings
from django.core.files.storage import default_storage
from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth.models import User

import pandas as pd  # <---- aqui está o pandas
from openpyxl import Workbook
from openpyxl.styles import Font, Alignment

from core.models import Sensor, Ambiente, Historico
from core.serializers import SensorSerializer, AmbienteSerializer, HistoricoSerializer
from core.filters import HistoricoFilter


# --------- EXPORTAR HISTÓRICO USANDO PANDAS -----------

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def exportar_historico_xlsx(request):
    historicos = Historico.objects.all().values('id', 'sensor__tipo', 'ambiente__sig', 'valor', 'timestamp')

    # Cria DataFrame direto, pandas manja do join via __ (duplo underline)
    df = pd.DataFrame(historicos)
    df.rename(columns={
        'id': 'ID',
        'sensor__tipo': 'Sensor',
        'ambiente__sig': 'Ambiente',
        'valor': 'Valor',
        'timestamp': 'Timestamp'
    }, inplace=True)

    response = HttpResponse(
        content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )
    response['Content-Disposition'] = 'attachment; filename="historico.xlsx"'

    with pd.ExcelWriter(response, engine='openpyxl') as writer:
        df.to_excel(writer, index=False, sheet_name='Histórico')

    return response


# --------- EXPORTAR SENSORES USANDO PANDAS -----------

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def exportar_sensores_xlsx(request):
    sensores = Sensor.objects.all().values('id', 'tipo', 'mac_address', 'latitude', 'longitude', 'status')

    df = pd.DataFrame(sensores)
    df['status'] = df['status'].apply(lambda x: 'Ativo' if x else 'Inativo')
    df.rename(columns={
        'id': 'ID',
        'tipo': 'Tipo',
        'mac_address': 'MAC Address',
        'latitude': 'Latitude',
        'longitude': 'Longitude',
        'status': 'Status'
    }, inplace=True)

    response = HttpResponse(
        content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )
    response['Content-Disposition'] = 'attachment; filename="sensores.xlsx"'

    with pd.ExcelWriter(response, engine='openpyxl') as writer:
        df.to_excel(writer, index=False, sheet_name='Sensores')

    return response


# --------- EXPORTAR AMBIENTES USANDO PANDAS -----------

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def exportar_ambientes_xlsx(request):
    ambientes = Ambiente.objects.all().values('id', 'sig', 'descricao', 'ni', 'responsavel')

    df = pd.DataFrame(ambientes)
    df.rename(columns={
        'id': 'ID',
        'sig': 'SIG',
        'descricao': 'Descrição',
        'ni': 'NI',
        'responsavel': 'Responsável'
    }, inplace=True)

    response = HttpResponse(
        content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )
    response['Content-Disposition'] = 'attachment; filename="ambientes.xlsx"'

    with pd.ExcelWriter(response, engine='openpyxl') as writer:
        df.to_excel(writer, index=False, sheet_name='Ambientes')

    return response


# --------- IMPORTAR DADOS DE ZIP COM PLANILHAS XLSX USANDO PANDAS -----------

@api_view(['POST'])
@permission_classes([IsAdminUser])
def importar_dados_zip(request):
    zip_file = request.FILES.get('dados_integrador.zip')

    if not zip_file:
        return Response({'erro': 'Nenhum arquivo enviado!'}, status=400)

    path = default_storage.save('temp/dados_integrador.zip', zip_file)
    full_path = os.path.join(settings.MEDIA_ROOT, path)

    try:
        with zipfile.ZipFile(full_path, 'r') as zip_ref:
            zip_ref.extractall(os.path.join(settings.MEDIA_ROOT, 'temp/extraido'))

        pasta_extraida = os.path.join(settings.MEDIA_ROOT, 'temp/extraido')

        erros_gerais = []

        for nome_arquivo in os.listdir(pasta_extraida):
            if nome_arquivo.endswith('.xlsx'):
                caminho_xlsx = os.path.join(pasta_extraida, nome_arquivo)

                # Abre o Excel com pandas, sem stress com encoding ou csv
                df = pd.read_excel(caminho_xlsx)

                # SENSOR
                if 'sensor' in nome_arquivo.lower():
                    for _, row in df.iterrows():
                        try:
                            tipo = str(row['Tipo']).strip()
                            mac = str(row['MAC Address']).strip()
                            lat = float(row['Latitude'])
                            lon = float(row['Longitude'])
                            status = str(row['Status']).strip().lower() == 'ativo'

                            if not Sensor.objects.filter(mac_address=mac).exists():
                                Sensor.objects.create(
                                    tipo=tipo,
                                    mac_address=mac,
                                    latitude=lat,
                                    longitude=lon,
                                    status=status
                                )
                        except Exception as e:
                            erros_gerais.append(f"[Sensor] Erro na linha {_ + 2} do arquivo {nome_arquivo}: {e}")

                # AMBIENTE
                elif 'ambiente' in nome_arquivo.lower():
                    for _, row in df.iterrows():
                        try:
                            Ambiente.objects.create(
                                sig=row['SIG'],
                                descricao=row['Descrição'],
                                ni=row['NI'],
                                responsavel=row['Responsável']
                            )
                        except Exception as e:
                            erros_gerais.append(f"[Ambiente] Erro na linha {_ + 2} do arquivo {nome_arquivo}: {e}")

                # HISTORICO
                elif 'historico' in nome_arquivo.lower():
                    for _, row in df.iterrows():
                        try:
                            Historico.objects.create(
                                sensor_id=row['Sensor'],
                                ambiente_id=row['Ambiente'],
                                valor=row['Valor'],
                                timestamp=row['Timestamp']
                            )
                        except Exception as e:
                            erros_gerais.append(f"[Historico] Erro na linha {_ + 2} do arquivo {nome_arquivo}: {e}")

        if erros_gerais:
            return Response({'mensagem': 'Importado com alguns erros ⚠️', 'erros': erros_gerais}, status=207)

        return Response({'mensagem': 'Importação concluída com sucesso! 🎉'})

    except Exception as e:
        return Response({'erro': str(e)}, status=500)
