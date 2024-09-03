from django.http import JsonResponse
from django.shortcuts import render
from .models import Carrera, Profesor, Material,Area

def formularios_view(request):
    carreras = Carrera.objects.all()
    areas = Area.objects.all()
    return render(request, 'formulario.html', {
        'carreras': carreras,
        'areas': areas,
    })

def get_profesores(request, carrera_id):
    profesores = Profesor.objects.filter(carrera_id=carrera_id)
    data = {
        'profesores': list(profesores.values('id', 'nombre'))
    }
    return JsonResponse(data)

def buscar_materiales(request):
    query = request.GET.get('q', '')
    if query:
        resultados = Material.objects.filter(nombre__icontains=query)
    else:
        resultados = Material.objects.none()
    resultados_json = list(resultados.values('id', 'nombre', 'cantidad'))
    return JsonResponse({'resultados': resultados_json})
