


/*********CONEXIÓN A UNA API (es un proceso asíncrono)********** */

function borrarEmpleado(id)
{
    let peticion = new XMLHttpRequest(); // Instancio la petición
    let idBorrar= id;
    // Configuro la petición DELETE
    peticion.open("DELETE", `http://test-api.jtarrega.es/api/empleados/${idBorrar}`, true);
    
    peticion.onreadystatechange = function () {
        if (peticion.readyState === 4) {
            if (peticion.status === 200 || peticion.status === 201 || peticion.status === 204) {
                // Si la respuesta es exitosa, eliminamos la fila correspondiente
                alert("Empleado eliminado con éxito");
                
                // Eliminar la fila de la tabla correspondiente al id del empleado
                location.reload();
            } else {
                alert("Hubo un error al eliminar al empleado. Intenta nuevamente.");
            }
        }
    };

    // Enviar la solicitud DELETE
    peticion.send();
}


//LISTAR EMPLEADOS

function listarEmpleados()
{
let peticion= new XMLHttpRequest(); /*Instancio la petición*/
 
/*Lo que quiero hacer con la respuesta que me traiga la petición*/
peticion.onreadystatechange=function(){
    if(peticion.readyState===4 && peticion.status===200)
    {
        /*recojo respuesta en un formato JSON (clave-valor)*/
        datosJson= JSON.parse(peticion.responseText);
        let empleados=datosJson;

        let tabla= `<table>
                <h2>Lista de empleados</h2>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Edad</th>
                    <th>Cargo</th>
                    <th>Contratado</th>
                    <th>Acciones</th>
                </tr>`;
        

        /*recorro mi JSON(como un array asociativo) de datos */
        for (let i = 0; i < empleados.length; i++) {
           tabla+=`
                <tr>
                    <td>${empleados[i].id}</td>
                    <td>${empleados[i].nombre}</td>
                    <td>${empleados[i].edad}</td>
                    <td>${empleados[i].cargo}</td>
                    <td>${empleados[i].contratado}</td>
                    <td>
                        <button class="boton modificar" id="mod${empleados[i].id}">Modificar</button>
                        <button class="boton borrar" id="borrar${empleados[i].id}">Borrar</button>
                    </td>
               </tr>     
           `;
            
        }
        tabla+=` </table> `;

        document.getElementById('contenedorTabla').innerHTML=tabla;
        document.getElementById('insertar').style.display= 'inline-block';

// MODIFICAR EMPLEADO
 // Seleccionar botones de clase "modificar" y agregar eventos
 //lo pongo dentro porque como se crean dinámicamente si lo pongo fuera no los ve
 let arrayBotones = document.querySelectorAll("button.modificar");
 arrayBotones.forEach(boton => {
     boton.addEventListener('click', function () {
         // Obtener el ID del empleado desde el botón
         const empleadoId = this.id.replace("mod", "");
        // console.log("Modificar empleado con ID:", empleadoId);
         window.location.href = `modificarEmpleado.html?id=${empleadoId}`; //paso el id=valor a la otra página
     });
 });

 // BORRAR EMPLEADO
 // Seleccionar botones de clase "modificar" y agregar eventos
 //lo pongo dentro porque como se crean dinámicamente si lo pongo fuera no los ve
 let arrayBotonesBorrar = document.querySelectorAll("button.borrar");
 arrayBotonesBorrar.forEach(boton => {
     boton.addEventListener('click', function () {
         // Obtener el ID del empleado desde el botón
         const empleadoBorrar = this.id.replace("borrar", "");
         borrarEmpleado(empleadoBorrar);
     });
 });
}
};

/*Establezco conexión*/
peticion.open("GET", "http://test-api.jtarrega.es/api/empleados");

//envío la petición
peticion.send();

}
/*Pongo un escuchador de eventos para el botón Listar Empleados*/


document.addEventListener('DOMContentLoaded', function () {  //pongo esta función para que solo se ejecute cuando el DOM esté completamente cargado
document.getElementById('listar').addEventListener('click', function(){
listarEmpleados();
});

//agregado nuevo
document.getElementById('insertar').addEventListener('click', function(){
    document.location.href=`agregarEmpleado.html`;
})
});

/**********************FIN CONEXIÓN**************************** */



