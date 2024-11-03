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
                    tablaHTML += `<td></td>`;
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

//celdas a mostrar su contenido
function celdasAMostrar(cantCeldasMostrar) {
    let celdasTabla = document.querySelectorAll("td");// Obtengo todas las celdas  
    let celdasMostradas = [];
    for (let i = 0; i < celdasTabla.length && cantCeldasMostrar > 0; i++) {
        if (!celdasTabla[i].classList.contains('descubierta')) {//si no tiene la clase descubierta
            celdasTabla[i].classList.add("descubierta");//le pongo la clase descubierta
            celdasTabla[i].style.backgroundColor = celdaConMina(celdasTabla[i]) ? "red" : "green";//comprueblo si tiene mina y si tiene le pongo fondo rojo, en caso contrario fondo verde
            celdasMostradas.push(celdasTabla[i]);
            cantCeldasMostrar--;
            if (celdaConMina(celdasTabla[i])) inactivar = true;
        }
    }
    return celdasMostradas;//devuelvo el array de todas las celdas que se van a mostrar su contenido
}


/*pongo el evento click a todas las celdas de la tabla */
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


/*quito evento click a todas las celdas de la tabla, se va a ejecutar cuando se descubra una mina*/
function desactivarClickCeldas() {
    let celdasTabla = document.querySelectorAll("td");
    celdasTabla.forEach(celda => {
        celda.style.pointerEvents = "none";  //quita el evento
    });
}

//buscar cantidad minas celdas adyacentes

