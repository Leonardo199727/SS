# Generated by Django 5.1 on 2024-09-03 04:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('formulario', '0002_material'),
    ]

    operations = [
        migrations.AlterField(
            model_name='material',
            name='nombre',
            field=models.CharField(max_length=255),
        ),
    ]
