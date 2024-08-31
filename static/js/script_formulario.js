function toggleOtroCampo() {
    var carreraSelect = document.getElementById('carrera');
    var otroCampo = document.getElementById('otro-campo');
    if (carreraSelect.value === 'Otra') {
        otroCampo.classList.remove('hidden');
    } else {
        otroCampo.classList.add('hidden');
    }
}

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
