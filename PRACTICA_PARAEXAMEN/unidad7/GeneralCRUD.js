
//FUNCIONES CRUD

//Recoger datos
function listarDatos()
{
let peticion= new XMLHttpRequest();
peticion.onreadystatechange=function()
{
    if(peticion.readyState===4 && peticion.status===200)
    {
        datosenJSON=JSON.parse(peticion.responseText);
        let empleados=datosenJSON; //array empleados;
        /*hago lo que quiera con los datos*/
    }
    
}
peticion.open("GET", "url");
peticion.send();


//agregar un empleado nuevo

function agregarEmpleado()
{
    let nuevo={
        edad: 10,
        nombre: "Pepe"
    }

    let nuevoJson= JSON.stringify(nuevo);

    let peticion= new XMLHttpRequest();
    peticion.onreadystatechange=function(){
        if(peticion.readyState===4 && peticion.status===201){
            /*todo ok, se pudo crear*/
        }
    }
    
    peticion.getResponseHeader("Content-type", "application/json");

    peticion.open("POST", "url", true);
    peticion.send(nuevoJson);
   
}



}



//funcion listar Datos
function listarDatos()
{
    let peticion= new XMLHttpRequest();
    peticion.onreadystatechange=function(){
        if(peticion.readyState===4 && peticion.status===200)
        {
            let enJson= JSON.parse(peticion.responseText);
            arrayPersonas=enJson;
            /*Hago lo que quiera con el array */
        }
    }

   peticion.open("GET", "la url de la API");
   peticion.send(); 
}

//crear Nuevo empleado

function crearEmpleado()
{
    let objeto={
        nombre:"Pepe",
        edad:10
    }
    //convierto a Json
    let nuevoJson= JSON.stringify(objeto);
    
    let peticion=new XMLHttpRequest();

    peticion.getResponseHeader("Content-type", "application/json");
    peticion.onreadystatechange=function(){
        if(peticion.readyState===4 && peticion.status===201)
        {
            /*todo ok */
        }
    }
    peticion.open("POST","la url",true);
    peticion.send(nuevoJson);
}

