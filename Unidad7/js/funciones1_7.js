


/*********CONEXIÓN A UNA API (es un proceso asíncrono)********** */

function listarEmpleados()
{
let peticion= new XMLHttpRequest(); /*Instancio la petición*/
 
/*Lo que quiero hacer con la respuesta que me traiga la petición*/
peticion.onreadystatechange=function(){
    if(peticion.readyState===4 && peticion.status===200)
    {
        /*recojo respuesta en un formato JSON (clave-valor)*/
        let datosJson= JSON.parse(peticion.responseText);
        empleados=datosJson;

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
                    <td id="Mod_Borr">
                        <button class="boton">Modificar</button>
                        <button class="boton">Borrar</button>
                    </td>
               </tr>     
           `;
            
        }
        tabla+=` </table> `;

        document.getElementById('contenedorTabla').innerHTML=tabla;
        document.getElementById('insertar').style.display= 'inline-block';
    }
}

/*Establezco conexión*/
peticion.open("GET", "http://test-api.jtarrega.es/api/empleados");

//envío la petición
peticion.send();

}
/*Pongo un escuchador de eventos para el botón Listar Empleados*/

document.getElementById('listar').addEventListener('click', function(){
listarEmpleados();
})

/**********************FIN CONEXIÓN**************************** */