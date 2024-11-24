

//MODIFICAR EMPLEADO (en la página modificarEmpleados.html)

function obtenerId()
{
    //recibir id que he enviado de la pagina anterior
let recibido= document.location.search;
let consulta=new URLSearchParams(recibido);
let idempleado= consulta.get('id');  //contiene el id del empleado
return idempleado;
}

document.addEventListener('DOMContentLoaded',function(){  //se ejecuta cuando el DOM ya está completamente cargado
document.getElementById('aceptarModificar').addEventListener('click', function()
{

//recojo datos del formulario    
let nombreNuevo = document.getElementById('nombre').value;
let edadNueva= parseInt(document.getElementById('edad').value);
let cargoNuevo=document.getElementById('cargo').value;
let contratadoNuevo=0;
if (document.getElementById('contratado').checked) {
    contratadoNuevo = 1;
}

//creo el objeto JSON que voy a enviar
let empleadoModificado={
    nombre: nombreNuevo,
    edad: edadNueva,
    cargo: cargoNuevo,
    contratado: contratadoNuevo
}
//obtengo el id del empleado que quiero actualizar
let idempleado=obtenerId();
//url a la que haré la petición
const url=`http://test-api.jtarrega.es/api/empleados/${idempleado}`; 
let redirigir=false;

// Realizar la petición POST
fetch(url, {
    method: "PUT", // Método HTTP
    headers: {
        "Content-Type": "application/json", // Especifica que los datos son JSON
    },
    body: JSON.stringify(empleadoModificado) // Convertir el objeto en una cadena JSON
})
    .then(response => {
        // Valida directamente los códigos 200 y 201
        if (response.status === 200 || response.status === 201) {
            window.location.href = "./ejercicio1_7.html";
        } else {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }
    })
    .catch(error => {
        console.error("Hubo un error al enviar los datos:", error);
    });

});


});
