from .views import (
    SensorViewSet, AmbienteViewSet, HistoricoViewSet,
    exportar_sensores_csv, exportar_ambientes_csv, exportar_historico_csv
)
from rest_framework.routers import DefaultRouter
from django.urls import path, include

router = DefaultRouter()
router.register(r'sensores', SensorViewSet)
router.register(r'ambientes', AmbienteViewSet)
router.register(r'historico', HistoricoViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('exportar/sensores/', exportar_sensores_csv, name='exportar_sensores'),
    path('exportar/ambientes/', exportar_ambientes_csv, name='exportar_ambientes'),
    path('exportar/historico/', exportar_historico_csv, name='exportar_historico'),
]
