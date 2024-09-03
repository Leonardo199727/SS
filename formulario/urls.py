from django.urls import path
from .views import formularios_view, get_profesores, buscar_materiales

urlpatterns = [
    path('', formularios_view, name='formularios'),
    path('get_profesores/<int:carrera_id>/', get_profesores, name='get_profesores'),
    path('buscar_materiales/', buscar_materiales, name='buscar_materiales'),
]
