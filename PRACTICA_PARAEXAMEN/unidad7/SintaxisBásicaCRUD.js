
//listar empleados
function listarEmpleados()
{
    let peticion = new XMLHttpRequest();
    peticion.onreadystatechange=function(){
        if(peticion.readyState===4 && peticion.status===200)
        {
            datosJson= JSON.parse(peticion.responseText);
            var arrayJson=datosJson;
            /*Hago lo que quiera con los datos que reciba*/
        }
    }
    peticion.open("GET","http://test-api.jtarrega.es/api/empleados");
    peticion.send();
}

//Obtener un empleado
function obtenerUnEmpleado()
{
    let idempleado=0;
    let peticion=new XMLHttpRequest();
    peticion.onreadystatechange=function()
    {
        if(peticion.readyState===4 && peticion.status===200)
        {
            jsonDatos= JSON.parse(peticion.responseText);
            let empleado=jsonDatos;

            /*hacer lo que quiera con los datos */
        }
    }
    peticion.open("GET", `http://test-api.jtarrega.es/api/empleados/${idempleado}`);
    peticion.send();
}

//agregar un empleado nuevo

function agregarEmpleado()
{
    //me creo el empleado
    let nuevo={
        nombre: formulario.nombre.value,
   }
  
   //lo llevo a JSON
   let enJson= JSON.stringify(nuevo);

   //creo la peticion
   let peticion= new XMLHttpRequest();   

   //recibo la respuesta de lo que se ejecute al hacer la peticion
   peticion.onreadystatechange=function(){
    if(peticion.readyState===4 && peticion===201)
    {
        /*todo correcto*/
    }
    else{
        /*lanzo un alert*/  
     }
   }

   //abro la peticion
   peticion.open("POST", "http://test-api.jtarrega.es/api/empleados", true);

   //defino que el contenido es JSON
   peticion.setRequestHeader("Content-Type", "application/json");

   //envio la peticion con el empleado nuevo
peticion.send(enJson);


}


//Borrar un elemento

function borrarElemento()
{
    let idelemento;
    
    let peticion= new XMLHttpRequest();
    peticion.onreadystatechange=function(){
        if(peticion.readyState===4 && peticion.status===200)
            {
                /*Todo correcto, se ha borrado el elemento*/
            } 
    }
    peticion.open("DELETE", `http://test-api.jtarrega.es/api/empleados/${idempleado}`);
    peticion.send();
}


//escuchador para que se ejecute todo solo cuando este la página totalmente cargada
document.addEventListener('DOMContentLoaded', function () {  //pongo esta función para que solo se ejecute cuando el DOM esté completamente cargado
  
/*Aquí va todo*/

    });