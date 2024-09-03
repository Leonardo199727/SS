from django.db import models

class Carrera(models.Model):
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre

class Profesor(models.Model):
    nombre = models.CharField(max_length=100)
    carrera = models.ForeignKey(Carrera, on_delete=models.CASCADE, related_name='profesores')

    def __str__(self):
        return self.nombre

class Material(models.Model):
    nombre = models.CharField(max_length=255)
    cantidad = models.PositiveIntegerField(default=0)  # Agregar campo de cantidad

    def __str__(self):
        return f"{self.nombre} - {self.cantidad} unidades"

class Area(models.Model):
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre