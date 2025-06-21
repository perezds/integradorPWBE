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
    ExportarHistoricoView,
    exportar_excel,
    exportar_ambientes_excel,  
    status_geral,
    cadastrar_usuario,
    importar_historicos,

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
    path('exportar/ambientes/', exportar_ambientes_excel, name='exportar_ambientes'), 
    path('exportar/historico/', ExportarHistoricoView.as_view(), name='exportar_historico'),  
    #path('importar/historicos/', importar_historicos, name='importar_historicos'),
    path('importar/historicos/<str:tipo_historico>', importar_historicos, name='importar_historico'),

    path('status-geral/', status_geral, name='status_geral'),
    path('cadastro/', cadastrar_usuario, name='cadastro'),
    #path('importar/', importar_planilhas, name='importar_planilhas'),
]