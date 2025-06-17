from core.models import Sensor, Ambiente, Historico
from django.utils.timezone import make_aware
from datetime import datetime
from django.core.management.base import BaseCommand
import csv

class Command(BaseCommand):
    help = '📥 Importa dados de sensores a partir de um arquivo CSV'

    def add_arguments(self, parser):
        parser.add_argument('arquivo', type=str, help='📄 Caminho do arquivo CSV')
        parser.add_argument('tipo_sensor', type=str, help='📊 Tipo de sensor (temperatura, umidade, luminosidade, contador)')

    def handle(self, *args, **kwargs):
        caminho = kwargs['arquivo']
        tipo_sensor = kwargs['tipo_sensor']
        
        tipos_validos = dict(Sensor.TIPOS).keys()
        if tipo_sensor not in tipos_validos:
            self.stderr.write(self.style.ERROR(f"❌ Tipo de sensor inválido: '{tipo_sensor}'. Tipos válidos: {', '.join(tipos_validos)}"))
            return

        try:
            with open(caminho, newline='', encoding='utf-8') as csvfile:
                leitor = csv.DictReader(csvfile)

              
                colunas_esperadas = {'mac', 'valor', 'timestamp', 'ambiente'}
                if not colunas_esperadas.issubset(set(leitor.fieldnames)):
                    self.stderr.write(self.style.ERROR("⚠️ CSV inválido! Esperado: mac, valor, timestamp, ambiente"))
                    return

                importados = 0

                for linha in leitor:
                    mac = linha['mac']
                    valor = float(linha['valor'])
                    timestamp = make_aware(datetime.strptime(linha['timestamp'], "%Y-%m-%d %H:%M:%S"))
                    ambiente_sig = linha['ambiente']

                    # Criação do sensor (se não existir)
                    sensor, _ = Sensor.objects.get_or_create(
                        mac_address=mac,
                        defaults={
                            'tipo': tipo_sensor,
                            'latitude': -23.0,
                            'longitude': -46.0,
                            'status': True
                        }
                    )

                   
                    ambiente, _ = Ambiente.objects.get_or_create(
                        sig=ambiente_sig,
                        defaults={
                            'descricao': 'Auto gerado',
                            'ni': 123,
                            'responsavel': 'Sistema'
                        }
                    )

                  
                    Historico.objects.create(
                        sensor=sensor,
                        ambiente=ambiente,
                        valor=valor,
                        timestamp=timestamp
                    )

                    importados += 1
                    self.stdout.write(self.style.SUCCESS(f"✔ Dado importado: Sensor {mac}, Valor {valor}, Ambiente {ambiente_sig}"))

                self.stdout.write(self.style.SUCCESS(f"\n✅ Importação concluída com sucesso! Total: {importados} registros."))

        except FileNotFoundError:
            self.stderr.write(self.style.ERROR(f"❌ Arquivo não encontrado: {caminho}"))

        except Exception as e:
            self.stderr.write(self.style.ERROR(f"❌ Erro inesperado: {e}"))
