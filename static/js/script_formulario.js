// Función para mostrar u ocultar el campo "Otra carrera"
function toggleOtroCampo() {
    var carreraSelect = document.getElementById('carrera');
    var otroCampo = document.getElementById('otro-campo');
    if (carreraSelect.value === 'Otra') {
        otroCampo.classList.remove('hidden');
    } else {
        otroCampo.classList.add('hidden');
    }
}

// Función para actualizar las opciones de profesores según la carrera seleccionada
function updateOptions() {
    var carreraSelect = document.getElementById('carrera');
    var profesorCampo = document.getElementById('profesor-campo');
    var profesorSelect = document.getElementById('profesor');
    
    // Obtener el ID de la carrera seleccionada
    var carreraId = carreraSelect.value;
    
    // Limpiar opciones anteriores
    profesorSelect.innerHTML = '<option value="">Selecciona un profesor</option>';

    if (carreraId) {
        // Hacer una solicitud AJAX para obtener los profesores para la carrera seleccionada
        fetch(`/get_profesores/${carreraId}/`)
            .then(response => response.json())
            .then(data => {
                profesorCampo.classList.remove('hidden');
                data.profesores.forEach(function(profesor) {
                    var option = document.createElement('option');
                    option.value = profesor.id;
                    option.textContent = profesor.nombre;
                    profesorSelect.appendChild(option);
                });
            });
    } else {
        profesorCampo.classList.add('hidden');
    }
}

// Función para mostrar u ocultar el campo de búsqueda de materiales según la carrera seleccionada
function toggleMaterialBusqueda() {
    var carreraSelect = document.getElementById('carrera');
    var materialBusquedaCampo = document.getElementById('material-busqueda-campo');

    if (['1', '2', '3'].includes(carreraSelect.value)) {  // IDs de carreras "Industrial", "Mecatrónica", "Mecánica"
        materialBusquedaCampo.classList.remove('hidden');
    } else {
        materialBusquedaCampo.classList.add('hidden');
    }
}

// Función para mostrar u ocultar el campo de área según la carrera seleccionada
function toggleAreaCampo() {
    var carreraSelect = document.getElementById('carrera');
    var areaCampo = document.getElementById('area-campo');

    if (['1', '2', '3'].includes(carreraSelect.value)) {  // IDs de carreras "Industrial", "Mecatrónica", "Mecánica"
        areaCampo.classList.remove('hidden');
    } else {
        areaCampo.classList.add('hidden');
    }
}

// Función para clonar el campo de búsqueda de materiales
function cloneMaterialBusqueda() {
    var original = document.getElementById('material-busqueda-campo');
    var clone = original.cloneNode(true);
    clone.id = '';  // Eliminar el ID para evitar duplicados
    original.parentNode.insertBefore(clone, original.nextSibling);

    // Añadir evento de búsqueda al nuevo campo clonado
    var input = clone.querySelector('input');
    input.addEventListener('input', function() {
        var query = this.value;
        var resultadosDiv = clone.querySelector('#resultados-material');

        if (query.length > 2) {  // Realizar la búsqueda si el usuario ha escrito al menos 3 caracteres
            fetch(`/buscar_materiales/?q=${query}`)
                .then(response => response.json())
                .then(data => {
                    resultadosDiv.innerHTML = '';
                    data.resultados.forEach(function(material) {
                        var div = document.createElement('div');
                        var checkbox = document.createElement('input');
                        checkbox.type = 'checkbox';
                        checkbox.id = `material-${material.id}`;
                        checkbox.name = 'materiales';
                        checkbox.value = material.id;

                        var label = document.createElement('label');
                        label.htmlFor = `material-${material.id}`;
                        label.textContent = `${material.nombre} - ${material.cantidad} unidades`;

                        div.appendChild(checkbox);
                        div.appendChild(label);
                        resultadosDiv.appendChild(div);
                    });
                });
        } else {
            resultadosDiv.innerHTML = '';
        }
    });
}

// Evento para mostrar u ocultar el campo de búsqueda de materiales
document.getElementById('carrera').addEventListener('change', toggleMaterialBusqueda);

// Evento para manejar la búsqueda de materiales
document.getElementById('material-busqueda').addEventListener('input', function() {
    var query = this.value;
    var resultadosDiv = document.getElementById('resultados-material');

    if (query.length > 2) {  // Realizar la búsqueda si el usuario ha escrito al menos 3 caracteres
        fetch(`/buscar_materiales/?q=${query}`)
            .then(response => response.json())
            .then(data => {
                resultadosDiv.innerHTML = '';
                data.resultados.forEach(function(material) {
                    var div = document.createElement('div');
                    var checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.id = `material-${material.id}`;
                    checkbox.name = 'materiales';
                    checkbox.value = material.id;

                    var label = document.createElement('label');
                    label.htmlFor = `material-${material.id}`;
                    label.textContent = `${material.nombre} - ${material.cantidad} unidades`;

                    div.appendChild(checkbox);
                    div.appendChild(label);
                    resultadosDiv.appendChild(div);
                });
            });
    } else {
        resultadosDiv.innerHTML = '';
    }
});

// Evento para clonar el campo de búsqueda de materiales cuando se selecciona un material
document.getElementById('resultados-material').addEventListener('change', function(event) {
    if (event.target.name === 'materiales') {
        cloneMaterialBusqueda();
    }
});

// Evento para mostrar u ocultar el campo de área
document.getElementById('carrera').addEventListener('change', toggleAreaCampo);
