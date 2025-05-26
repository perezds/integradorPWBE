from django.db import models

class Sensor(models.Model):
    TIPOS = [
        ('temperatura', 'Temperatura'),
        ('umidade', 'Umidade'),
        ('luminosidade', 'Luminosidade'),
        ('contador', 'Contador de Pessoas'),
    ]

    tipo = models.CharField(max_length=20, choices=TIPOS)
    mac_address = models.CharField(max_length=50, unique=True)
    latitude = models.FloatField()
    longitude = models.FloatField()
    status = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.tipo} - {self.mac_address}"


class Ambiente(models.Model):
    sig = models.CharField(max_length=10)
    descricao = models.TextField()
    ni = models.IntegerField()
    responsavel = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.sig} - {self.descricao}"


class Historico(models.Model):
    sensor = models.ForeignKey(Sensor, on_delete=models.CASCADE)
    ambiente = models.ForeignKey(Ambiente, on_delete=models.CASCADE)
    valor = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.sensor} - {self.timestamp}"
