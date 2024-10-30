
//agregar la nueva editorial  introducida por el usuario como opción al select
   function addEditorial() {
   let nuevaEditorial = document.getElementById("editorialNueva").value; // Texto que va a tener la nueva editorial

   /* Busco el select al que le voy a añadir el option */
   let selectUsar = document.getElementById('editorial');

   /* Crear nuevo nodo <option> */
   let nuevaOpcion = document.createElement('option');
   nuevaOpcion.value = nuevaEditorial.toLowerCase(); // Asigno el valor a la opción
   nuevaOpcion.textContent = nuevaEditorial; // Texto que se mostrará en el select

   /* Agrego el nodo <option> al elemento <select> */
   selectUsar.appendChild(nuevaOpcion);
   }



//PONER UBICACIONES

let ubicaciones=[
    "Librería París-Valencia, Carrer de Pelai, 7, 46007 Valencia, España",
    "Librería Ramon Llull, Carrer de Corona, 5, 46003 Valencia, España",
    "Librería Bartleby, Carrer de Cadis, 50, 46006 Valencia, España",
    "Librería Patagonia, Carrer de l'Arquebisbe Mayoral, 1, 46002 Valencia, España"
];

let ubicacionAgregada=0; /*llevo el control de la ubicación del array que ubicaciones que voy colocando*/
function cargarUbicacion()
{  
   let contenedor = document.getElementById('ubicaciones'); // Contenedor correcto en el DOM
   let nuevaUbicacion = document.createElement('label');
   // Verifica si aún quedan ubicaciones por agregar
   if (ubicacionAgregada < ubicaciones.length) {       
       nuevaUbicacion.textContent = ubicaciones[ubicacionAgregada];  // Agrega el contenido al label
       nuevaUbicacion.className = 'ubicacionExtra';  

       // Incrementa el índice para la próxima vez
       ubicacionAgregada++;

       // Agrega el nuevo label al contenedor en el DOM
       contenedor.appendChild(nuevaUbicacion);
       contenedor.innerHTML+=`<br class='nuevoBR'>`
   } 
   else{
     contenedor.innerHTML+=`
     <label id="final">No hay más ubicaciones disponibles</label>`
   }
}

// QUITAR UBICACIONES
function quitarUbicaciones() {   
   let contenedor = document.getElementById('ubicaciones'); // Selecciona el div contenedor
   let mensajeFinal = document.getElementById('final'); // Mensaje "No hay más ubicaciones disponibles"
   let ubicacionesExtras = document.querySelectorAll('.ubicacionExtra'); // Selecciona todos los elementos con clase "ubicacionExtra"
   let arrayBR=document.querySelectorAll('.nuevoBR');
   
   // Si el mensaje "No hay más ubicaciones disponibles" está en el DOM, lo eliminamos
   if (mensajeFinal) {
       contenedor.removeChild(mensajeFinal);
   }

   // Verifica si hay ubicaciones adicionales para eliminar
   if (ubicacionesExtras.length > 0) {
       let ultimaUbicacion = ubicacionesExtras[ubicacionesExtras.length - 1]; // Último elemento de ubicacionesExtras
       let ultimoBR=arrayBR[arrayBR.length-1];
       contenedor.removeChild(ultimoBR); //elimino el br
       contenedor.removeChild(ultimaUbicacion); // Elimina el último elemento      
       ubicacionAgregada--; // Decrementa el índice para que se pueda volver a agregar esa ubicación
   }
}

