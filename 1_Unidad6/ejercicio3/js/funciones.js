

//creo una tabla de 30x30
function crearTabla(){
let tabla=`<table id='tabla1'>`; /*Nota: puedo ponerle estilo aquí directamente si quiero*/
for (let i = 0; i < 30; i++) {
   tabla+=`<tr>`;
   for (let j = 0; j < 30; j++) {
     tabla+=`<td> </td>`;
   }
    tabla+=`</tr>`;
}

tabla += `</table>` 
return tabla }

//inserto la tabla en el DOM
document.getElementById('zonaDibujo').innerHTML=crearTabla();

/*poner estilo a la tabla*/
//let cssTabla= document.getElementsByTagName('table')[0];
let cssTabla=document.getElementById('tabla1');
cssTabla.border="1px solid black"; //le pongo un borde


/*FUNCIONALIDADES PARA PINTAR */


let colorActivo = 'black'; // Color por defecto

// Función para seleccionar el color activo desde la paleta de colores
function seleccionarColor() {
    const arrayDivs = document.querySelectorAll('#paletaColores .seleccionado'); // Selecciona todos los divs de la paleta de colores

    arrayDivs.forEach(div => {
        div.addEventListener('click', function(event) {
            colorActivo = getComputedStyle(event.target).backgroundColor; // Pongo en mi variable color activo el color 
            //la paleta seleccionado
        });
    });
}

/*Nota: event.target: 
event.target es una propiedad en JavaScript que devuelve una referencia al elemento específico en el que
 se originó el evento. En otras palabras, si haces clic en un elemento, event.target se refiere a ese 
 elemento exacto que recibió el clic 
 Ej: event.target.style.backgroundColor  si el estilo lo hedinifo dentro del html
 si lo definido en un archivo css puedo acceder con const colorFondo = getComputedStyle(event.target).backgroundColor;*/

// Función para pintar en la tabla
function pintarEnTabla() {
    const arrayCeldas = document.querySelectorAll('#tabla1 td'); // Selecciona todas las celdas de la tabla
    let isPainting = false; // Variable para saber si se está pintando

    arrayCeldas.forEach(celda => {
        // Al hacer clic en una celda (evento mousedown), comenzamos a pintar. 
        celda.addEventListener('mousedown', function(event) {
            isPainting = true;
            event.target.style.backgroundColor = colorActivo; // Pinta la celda seleccionada
        });
         
        //.


        // Al mover el ratón sobre una celda mientras el botón del ratón está presionado (evento mousemove), pinta si estamos en modo "pintar"
        celda.addEventListener('mousemove', function(event) {
            if (isPainting) {
                event.target.style.backgroundColor = colorActivo; // Pinta la celda mientras pasas el ratón
            }
        });

        // Al soltar el clic, dejamos de pintar (evento mouseup)
        celda.addEventListener('mouseup', function() {
            isPainting = false;
        });
    });

    // Al salir de la tabla, dejamos de pintar
    document.addEventListener('mouseup', function() {
        isPainting = false;
    });
}

// Llama a las funciones
seleccionarColor();
pintarEnTabla();