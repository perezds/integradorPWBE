from django.db import models

class Sensor(models.Model):
    tipo = models.CharField(max_length=255)  
    mac_address = models.CharField(max_length=255)
    latitude = models.FloatField()
    longitude = models.FloatField()
    status = models.BooleanField()

class Ambiente(models.Model):
    sig = models.CharField(max_length=50) 
    descricao = models.CharField(max_length=255)
    ni = models.CharField(max_length=255)
    responsavel = models.CharField(max_length=255)

class Historico(models.Model):
    sensor = models.ForeignKey(Sensor, on_delete=models.CASCADE)
    ambiente = models.ForeignKey(Ambiente, on_delete=models.CASCADE)
    valor = models.FloatField(default=0.0)
    timestamp = models.DateTimeField(auto_now_add=True)
