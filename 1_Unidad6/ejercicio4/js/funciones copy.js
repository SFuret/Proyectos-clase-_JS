/* Array asociativo con las posibles dificultades */
const dificultad = [
    { grado: "SENCILLO", minimo: 10, maximo: 20, minas: 25 },
    { grado: "MEDIO", minimo: 20, maximo: 40, minas: 60 },
    { grado: "AVANZADO", minimo: 40, maximo: 80, minas: 100 },
    { grado: "EXPERTO", minimo: 80, maximo: 100, minas: 140 },
];

let filas=0;  //contendrá la cantidad de filas que tendrá la tabla a crear
let columnas=0; //contendrá la cantidad de columnas que tendrá la tabla a crear
let inactivar=false; //si encuentra alguna mina se pondrá en true


/**** BUSCAR LAS POSICIONES DONDE SE COLOCARÁN LAS MINAS *****/

function buscarPosicionesParaMinas(cantMinas, totalCeldas) {
    const posicionMinas = [];
    let posicion;
    while (posicionMinas.length < cantMinas) {
         // Genero número aleatorio en el rango de celdas existentes
        posicion = Math.floor(Math.random() * totalCeldas);
        // Verifico si la posición ya está en el array para evitar duplicados
        if (!posicionMinas.includes(posicion)) {
            posicionMinas.push(posicion);// Agrego posición única al array
        }
    }
    return posicionMinas;// Devuelvo las posiciones donde estarán las minas
}

/**** COLOCAR LAS MINAS *****/
function colocarMinas(cantMinas, totalCeldas) {
    let arrayTD = document.querySelectorAll("td");// Obtengo las posiciones donde deben colocarse las minas
    let posicionesMinas = buscarPosicionesParaMinas(cantMinas, totalCeldas);
    posicionesMinas.forEach(pos => {
        arrayTD[pos]?.classList.add("minaActiva");// Añado la clase "minaActiva" a los td indicados
        /*Nota: El operador ? verifica si arrayTD[pos] existe antes de intentar ejecutar 
        classList.add("minaActiva").Si arrayTD[pos] es undefined o null
        (por ejemplo, si pos está fuera del rango de la colección), la expresión se detendrá en este 
        punto y no producirá un error.*/
    });
}

/**** CREAR TABLA *****/

// Verifico que el botón "seleccionar" existe antes de añadir el evento
const botonSeleccionar = document.getElementById("seleccionar");
if (botonSeleccionar) {
    botonSeleccionar.addEventListener("click", function () {
        // Obtengo el valor seleccionado por el usuario cada vez que se hace clic
        let valorSelect = document.getElementById("dificultad")?.value;
        if (!valorSelect) return;

        // Busco en el array el objeto que coincide con la dificultad introducida y lo guardo en `dificul`
        let dificul = dificultad.find((dif) => dif.grado === valorSelect.toUpperCase());
        // Verifico si el grado de dificultad existe y no es undefined
        if (dificul) {
            // Calculo la cantidad de filas y columnas aleatorias dentro del rango de la dificultad seleccionada
            filas = Math.floor(Math.random() * (dificul.maximo - dificul.minimo + 1)) + dificul.minimo;
            columnas = Math.floor(Math.random() * (dificul.maximo - dificul.minimo + 1)) + dificul.minimo;
            // Construyo la tabla HTML
            let tablaHTML = `<table border="1" id="tabla1">`;
            for (let i = 0; i < filas; i++) {
                tablaHTML += `<tr>`;
                for (let j = 0; j < columnas; j++) {
                    tablaHTML += `<td id="${i}-${j}"></td>`; //le pongo como id a la celda x-y donde x es la fila y y la celda dentro de esa fila
                }
                tablaHTML += `</tr>`;
            }
            tablaHTML += `</table>`;

             // Inserto la tabla en el elemento con id "tablero"
            document.getElementById("tablero").innerHTML = tablaHTML;

            // Colocar minas después de generar la tabla
            const totalCeldas = filas * columnas;
            colocarMinas(dificul.minas, totalCeldas);
            ponerEventoClickCeldas();
        } else {
            // Si el grado de dificultad no es válido, mostramos un mensaje de error
            document.getElementById("tablero").innerHTML = `<p>Grado de dificultad no válido.</p>`;
        }
    });
} else {
    console.error("Botón 'seleccionar' no encontrado.");
}


/*********MOSTRAR EL CONTENIDO DE LAS CELDAS QUE SE VAN DESCUBRIENDO**********/



//busco la cantidad de celdas que mostrarán su contenido
function calcularCantidadCeldasDescubrir(filas, columnas) {
    return Math.min(filas, columnas); //obtengo el valor más pequeño para que no vaya a superar la cantidad
   // que no se supere el total de filas o columnas que se han definido para la tabla
}

//busco la celda que tiene mina
function celdaConMina(celda) {
    return celda.classList.contains("minaActiva");
}

// Mostrar la cantidad de minas activas en las celdas adyacentes de cada una de las celdas descubiertas
function cantMinasCeldasAdyacentes(celdaDesc) { 
    let arrayTodasCeldas = document.querySelectorAll("td"); 
    let idCelda = celdaDesc.id; // Obtengo el id de la celda
    let partesId = idCelda.split("-"); // Obtengo las coordenadas de la celda
    let fila = parseInt(partesId[0], 10); // Convertir a número la fila
    let columna = parseInt(partesId[1], 10); // Convertir a número la columna

    // IDs de las celdas adyacentes
    let idArriba = `${fila - 1}-${columna}`;
    let idAbajo = `${fila + 1}-${columna}`;
    let idIzquierda = `${fila}-${columna - 1}`;
    let idDerecha = `${fila}-${columna + 1}`;

    // Obtengo las celdas adyacentes si existen en el documento
    let arriba = document.getElementById(idArriba);
    let abajo = document.getElementById(idAbajo);
    let izquierda = document.getElementById(idIzquierda);
    let derecha = document.getElementById(idDerecha);

    // Contar minas en celdas adyacentes
    let cantMinasAdyacentes = 0;
    if (arriba && arriba.classList.contains('minaActiva')) {
        cantMinasAdyacentes++;
    }
    if (abajo && abajo.classList.contains('minaActiva')) {
        cantMinasAdyacentes++;
    }
    if (izquierda && izquierda.classList.contains('minaActiva')) {
        cantMinasAdyacentes++;
    }
    if (derecha && derecha.classList.contains('minaActiva')) {
        cantMinasAdyacentes++;
    }

    return cantMinasAdyacentes; // Devuelvo la cantidad de minas adyacentes a la celda
}

//celdas a mostrar su contenido
function celdasAMostrar(cantCeldasMostrar) {
    let celdasTabla = document.querySelectorAll("td");// Obtengo todas las celdas  
    let celdasMostradas = [];
    let minasAdyacentes=0;
    for (let i = 0; i < celdasTabla.length && cantCeldasMostrar > 0; i++) {
        if (!celdasTabla[i].classList.contains('descubierta')) {//si no tiene la clase descubierta
            celdasTabla[i].classList.add("descubierta");//le pongo la clase descubierta
            celdasTabla[i].style.backgroundColor = celdaConMina(celdasTabla[i]) ? "red" : "green";//comprueblo si tiene mina y si tiene le pongo fondo rojo, en caso contrario fondo verde
            
            /*COLOCAR NÚMERO DE MINAS ADYACENTES*/
            minasAdyacentes=cantMinasCeldasAdyacentes(celdasTabla[i]);
            if(minasAdyacentes!==0){
                celdasTabla[i].innerHTML=minasAdyacentes; //muestro la cantidad de minas en celdas adyacentes
            }            
            /**FIN***/

            celdasMostradas.push(celdasTabla[i]);
            cantCeldasMostrar--;
            if (celdaConMina(celdasTabla[i])) inactivar = true;
        }
    }
    return celdasMostradas;//devuelvo el array de todas las celdas que se van a mostrar su contenido
}

/* Comprobar si hay celdas que aún no estén descubiertas */
function comprobarTodasDescubiertas() {
    let celdas = document.querySelectorAll("td"); // Obtengo todas las celdas
    let todasDescubiertas = true; // Estado inicial

    for (let celda of celdas) {
        if (!celda.classList.contains('descubierta')) { // Si alguna celda no está descubierta
            todasDescubiertas = false; //no están todas descubiertas
            break; // Salir del bucle al encontrar una celda no descubierta
        }
    }

    return todasDescubiertas; //retorna false si hay alguna celda que no está descubierta aún
}

/*
function comprobarTodasDescubiertas() {
    let celdas = document.querySelectorAll("td");
    return Array.from(celdas).every(celda => celda.classList.contains('descubierta'));
}
*/

/* Obtener celdas no descubiertas */
function celdasSinDescubrir() {
    let celdasGenerales = document.querySelectorAll("td");
    return Array.from(celdasGenerales).filter(celda => !celda.classList.contains('descubierta'));
}



/*pongo el evento click a todas las celdas que no estén descubiertas aún de la tabla */
/* Agregar evento click a las celdas no descubiertas */
function ponerEventoClickCeldas() {
    let celdasTabla = celdasSinDescubrir();

    celdasTabla.forEach(celda => {
        celda.addEventListener('click', function() {
            if (inactivar) return;

            let cantidadCeldas = calcularCantidadCeldasDescubrir(filas, columnas);
            let arrayCeldasMostrar = celdasAMostrar(cantidadCeldas);

            if (inactivar) {
                desactivarClickCeldas();
            } else if (comprobarTodasDescubiertas()) {
                console.log("¡Todas las celdas han sido descubiertas!");
                desactivarClickCeldas();
            }
        }, { once: true }); // El evento click se ejecuta solo una vez por celda
    });
}


/*quito evento click a todas las celdas de la tabla, se va a ejecutar cuando se descubra una mina*/
function desactivarClickCeldas() {
    let celdasTabla = document.querySelectorAll("td");
    celdasTabla.forEach(celda => {
        celda.style.pointerEvents = "none";  //quita el evento
    });
}

/* Llamar a ponerEventoClickCeldas solo una vez */
ponerEventoClickCeldas();

//hacer todo mientras todas las celdas no tengan "descucierta"

/*******TRABAJANDO*******/

/*pongo el evento click a todas las celdas de la tabla */
/*do{
function ponerEventoClickCeldas() {
    let celdasTabla = document.querySelectorAll("td");
    celdasTabla.forEach(celda => {
        celda.addEventListener('click', function() {
            if (inactivar) return;

            let cantidadCeldas = calcularCantidadCeldasDescubrir(filas, columnas);
            let arrayCeldasMostrar = celdasAMostrar(cantidadCeldas);

            if (inactivar) {
                desactivarClickCeldas();
            }
        });
    });
}
}while(!comprobarTodasDescubiertas()); //mientras que hay alguna celda que no esté aún descubierta
/*********FIN*********/
