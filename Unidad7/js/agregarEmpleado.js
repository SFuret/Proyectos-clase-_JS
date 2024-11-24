function agregarEmpleado(formulario) {
    // Crear el objeto de datos con la información del formulario
    const nuevoEmpleado = { 
        nombre: formulario.nombre.value, 
        edad: formulario.edad.value, 
        cargo: formulario.cargo.value, 
        contratado: formulario.contratado.checked ? 1 : 0 // 1 si está marcado, 0 si no lo está
    };

    // Convertir el objeto a formato JSON
    const datosEmpleado = JSON.stringify(nuevoEmpleado);

    // Crear una nueva petición XMLHttpRequest
    let peticion = new XMLHttpRequest();
    
    // Configuro la petición
    peticion.open("POST", "http://test-api.jtarrega.es/api/empleados", true);

    // Definir el tipo de contenido como JSON
    peticion.setRequestHeader("Content-Type", "application/json");

    // Manejar la respuesta de la API
    peticion.onreadystatechange = function() {
        if (peticion.readyState === 4) {  // Verifica que la respuesta esté lista
            if (peticion.status === 200 || peticion.status === 201) {
                // Si la respuesta fue exitosa, mostramos un mensaje
                alert("Empleado agregado con éxito");
                formulario.reset(); // Limpiar el formulario
            } else {
                // Si hubo un error, mostramos un mensaje
                alert("Hubo un error al agregar el empleado. Intenta nuevamente.");
            }
        }
    };

    // Enviar la solicitud POST con los datos del nuevo empleado
    peticion.send(datosEmpleado);
}

// Añadir un escuchador de evento para el formulario
document.getElementById('agregarForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    agregarEmpleado(this);         
});

