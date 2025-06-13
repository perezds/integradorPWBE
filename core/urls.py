from .views import (
    SensorViewSet, AmbienteViewSet, HistoricoViewSet,
    exportar_sensores_csv, exportar_ambientes_csv, exportar_historico_csv,status_geral
)
from rest_framework.routers import DefaultRouter
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import cadastrar_usuario


router = DefaultRouter()
router.register(r'sensores', SensorViewSet)
router.register(r'ambientes', AmbienteViewSet)
router.register(r'historico', HistoricoViewSet)

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('', include(router.urls)),
    path('exportar/sensores/', exportar_sensores_csv, name='exportar_sensores'),
    path('exportar/ambientes/', exportar_ambientes_csv, name='exportar_ambientes'),
    path('exportar/historico/', exportar_historico_csv, name='exportar_historico'),
    path('status-geral/', status_geral, name='status-geral'),
    path('cadastro/', cadastrar_usuario, name='cadastro')
]
