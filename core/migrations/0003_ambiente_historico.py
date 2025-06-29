# Generated by Django 5.2 on 2025-05-26 17:35

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_sensor_status_alter_sensor_longitude'),
    ]

    operations = [
        migrations.CreateModel(
            name='Ambiente',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sig', models.CharField(max_length=10)),
                ('descricao', models.TextField()),
                ('ni', models.IntegerField()),
                ('responsavel', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Historico',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('valor', models.FloatField()),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('ambiente', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.ambiente')),
                ('sensor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.sensor')),
            ],
        ),
    ]
