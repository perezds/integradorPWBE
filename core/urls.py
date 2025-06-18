from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .views import (
    SensorViewSet,
    AmbienteViewSet,
    HistoricoViewSet,
    exportar_excel,
    exportar_ambientes_csv,
    exportar_historico_csv,
    status_geral,
    cadastrar_usuario,
)

router = DefaultRouter()
router.register(r'sensores', SensorViewSet)
router.register(r'ambientes', AmbienteViewSet)
router.register(r'historico', HistoricoViewSet)

urlpatterns = [

    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

 
    path('', include(router.urls)),

  
    path('exportar/', exportar_excel, name='exportar_excel'),
    path('exportar/ambientes/', exportar_ambientes_csv, name='exportar_ambientes'),
    path('exportar/historico/', exportar_historico_csv, name='exportar_historico'),

   
    path('status-geral/', status_geral, name='status_geral'),
    path('cadastro/', cadastrar_usuario, name='cadastro'),
]
