
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
    "Librería Soriano, Carrer de Xàtiva, 15, 46002 Valencia, España",
    "Librería París-Valencia, Carrer de Pelai, 7, 46007 Valencia, España",
    "Librería Ramon Llull, Carrer de Corona, 5, 46003 Valencia, España",
    "Librería Bartleby, Carrer de Cadis, 50, 46006 Valencia, España",
    "Librería Patagonia, Carrer de l'Arquebisbe Mayoral, 1, 46002 Valencia, España"
];

function cargarUbicacion()
{
   let cargar=document.getElementById()
}