
// Array de imágenes
let imagenes = [
    "img/img2.jpg",
    "img/img3.jpg",
    "img/img4.jpg",
    "img/img5.jpg"
];

let imagenMostrar = 0; // Variable para rastrear la imagen actual


function cargarSiguiente() {
    // Asegurarse de que haya imágenes en el array
    if (imagenes.length > 0) {
        // Obtener el contenedor y establecer la imagen de fondo
        let divContenedorImagen = document.getElementById('imagen');
        divContenedorImagen.style.backgroundImage = `url('${imagenes[imagenMostrar]}')`; // Añadir la URL de la imagen

        // Incrementar el índice y ciclar al inicio si es necesario
        imagenMostrar ++;
        if(imagenMostrar===imagenes.length) //si ha llegado al final del array
        {
            imagenMostrar=0; //lo llevo a la primera posición  
        }
        
    }
}


function cargarAnterior() {
    let divContenedorImagen = document.getElementById('imagen'); // Contenedor de la imagen de fondo

    if (imagenes.length > 0) { 
        // Disminuir el índice
        imagenMostrar = imagenMostrar - 1;

        //ciclar al final si es necesario
        if (imagenMostrar < 0) //si ha llegado a la primera posición del array
        {
            imagenMostrar = imagenMostrar + imagenes.length; //lo llevo a la última posición
        }
        //Aplico el módulo para garantizar que el índice siempre esté dentro del rango
        imagenMostrar = imagenMostrar % imagenes.length;


        // Obtener la URL de la imagen actual y aplicarla
        let imagen = imagenes[imagenMostrar];
        divContenedorImagen.style.backgroundImage = `url('${imagen}')`;
    }
}

/*TEMPORIZADOR*/

// Temporizador que cambia la imagen cada 3 segundos que son 3000 ms
let temporizador = setInterval(cargarSiguiente, 3000); // llama a la funcion cargarSiguiente() pasado los 3 minutos


//Pauso el temporizador cuando el usuario navega manualmente
document.getElementById('derecha').addEventListener('click', () => {
    clearInterval(temporizador); /*limpiar el intervalo en los eventos de clic */
    cargarSiguiente();
});

document.getElementById('izquierda').addEventListener('click', () => {
    clearInterval(temporizador);
    cargarAnterior();
});