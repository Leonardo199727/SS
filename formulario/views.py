from django.http import JsonResponse
from django.shortcuts import render
from .models import Carrera, Profesor

def formularios_view(request):
    carreras = Carrera.objects.all()
    profesores = Profesor.objects.all()
    return render(request, 'formulario.html', {
        'carreras': carreras,
        'profesores': profesores
    })

def get_profesores(request, carrera_id):
    profesores = Profesor.objects.filter(carrera_id=carrera_id)
    data = {
        'profesores': list(profesores.values('id', 'nombre'))
    }
    return JsonResponse(data)