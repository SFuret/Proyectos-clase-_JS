const table = document.getElementById("list");
const infoEmpleados = document.getElementById("info");
const formulario = document.getElementById("formulario");
const btnAdd = document.getElementById("add");
const btnCancelar = document.getElementById("cancelar");
const btnCancelarDel = document.getElementById("cancelarDel");
const btnContinuar = document.getElementById("btnContinuar");
const alert = document.getElementById("alert-section");
const legend = document.querySelector("legend");

//Variables de control de eventos
var modificando = false;
var creando = false;
var restantes; //cantidad de empleados restantes

//Obtengo los datos al cargar la página y actualizo el DOM
window.onload = function () {
  getData();
  //oculta el formulario al cargar la página
  formulario.classList.add("ocultar");
};

//------------------MANEJO DE EVENTOS EN LA PÁGINA---------------------------------//
//Agrega evento al button que añade empleados
btnAdd.addEventListener("click", function () {
  btnAdd.disabled = true;
  creando = true;
  legend.innerHTML = "Inserte los datos del nuevo empleado";
  infoEmpleados.classList.add("ocultar");
  formulario.classList.remove("ocultar");
});
//Agrega eventos al button cancelar
btnCancelar.addEventListener("click", function () {
  //Restablezco valores y oculto los elementos necesarios.
  btnAdd.disabled = false;
  modificando = false;
  creando = false;
  formulario.reset();
  infoEmpleados.classList.remove("ocultar");
  formulario.classList.add("ocultar");
});

btnCancelarDel.addEventListener("click", function () {
  document.getElementById("alert-section").classList.add("ocultar");
});
//------------------- EVENTO SUBMIT FORMULARIO-------------------------//
//Formulario que agrega y modifica empleados
formulario.addEventListener("submit", function (event) {
  event.preventDefault();
  //Recojo la información del formulario
  var datosJson = JSON.stringify({
    nombre: formulario[1].value,
    edad: formulario[2].value,
    cargo: formulario[3].value,
    contratado: formulario[4].checked ? 1 : 0,
    created_at: "",
    updated_at: "",
  });

  //llamo a la función que crea el formulario o a la que lo modifica en
  //función del estado de "creando" y "modificando".
  switch (true) {
    case creando:
      creando = false;
      actionPost(datosJson);
      formulario.reset();
      break;
    case modificando:
      modificando = false;
      var id = formulario[5].value;
      actionPut(datosJson, id);
      formulario.reset();
      break;
    default:
      break;
  }
});


//función para actualizar el DOM
function actualizarDOM(datos) {
  document.getElementById("list").innerHTML = `<thead></thead>`;
  empleadosRecibidos = datos;
  //Por cada empleado se agregauna fila a la tabla
  for (var i = 0; i < empleadosRecibidos.length; i++) {
    var idEmpleado = empleadosRecibidos[i].id;
    var nombreEmpleado = empleadosRecibidos[i].nombre;
    var edadEmpleado = empleadosRecibidos[i].edad;
    var cargoEmpleado = empleadosRecibidos[i].cargo;
    var estadoContratado = empleadosRecibidos[i].contratado;
    //Se agregan los datos de los empleados existentes al DOM
    document.getElementById("list").innerHTML += `<tr>
                                                        <td>${idEmpleado}</td>
                                                        <td>${nombreEmpleado}</td>
                                                        <td>${edadEmpleado}</td>
                                                        <td>${cargoEmpleado}</td>
                                                        <td>${estadoContratado}</td>
                                                        <td class="acciones">
                                                          <button class="${idEmpleado}" onclick="prepararModificado(this)">Modificar</button>
                                                          <button onclick="confirmarDel(this)" class="${idEmpleado} btnBorrar">Borrar</button>
                                                        </td>
                                                      </tr>`;
  }
  btnAdd.disabled = false;
  infoEmpleados.classList.remove("ocultar"); //muestra el lisatdo de formularios
  formulario.classList.add("ocultar"); //oculta el formulario
  comprobarSiEliminarMas();
}


//---------------------------FUNCIONES CRUD---------------------------//
//Obtiene los datos y actualiza el DOM
function getData() {
  var peticion = new XMLHttpRequest();
  peticion.onreadystatechange = function () {
    if (peticion.readyState == 4 && peticion.status == 200) {
      var datosJson = JSON.parse(peticion.responseText);
      actualizarDOM(datosJson);
    }
  };
  // Establezco la comunicación
  peticion.open("GET", "http://test-api.jtarrega.es/api/empleados", true);
  peticion.setRequestHeader("Content-Type", "application/json");
  peticion.send();
}
//Crea nuevo empleado
function actionPost(datos) {
  var peticion = new XMLHttpRequest();
  peticion.onreadystatechange = function () {
    if (peticion.readyState == 4 && peticion.status == 201) {
      getData();
    }
  };
  peticion.open("POST", "http://test-api.jtarrega.es/api/empleados", true);
  peticion.setRequestHeader("Content-Type", "application/json");
  peticion.send(datos);
}
//Mofifica el empleado
function actionPut(datos, id) {
  var peticion = new XMLHttpRequest();
  peticion.onreadystatechange = function () {
    if (peticion.readyState == 4 || peticion.status === 201) {
      getData();
    }
  };
  peticion.open(
    "PUT",
    `http://test-api.jtarrega.es/api/empleados/${id}`, //recoge el id en el campo oculto de este formulario
    true
  );
  peticion.setRequestHeader("Content-Type", "application/json");
  peticion.send(datos);
}
//(La accion se llama desde el HTML desde el btnContinuar de la alerta de eliminación) 
//Elimina al empleado a partir del id que se pasa en la clase del elemento que lanza la acción (el evento se recoge en el html)
function actionDelete(element) {
  var peticion = new XMLHttpRequest();
  peticion.onreadystatechange = function () {
    if (
      peticion.readyState == 4 &&
      (peticion.status === 200 ||
        peticion.status === 201 ||
        peticion.status === 204)
    ) {
      getData();
      alert.classList.add("ocultar");
    }
  };
  peticion.open(
    "DELETE",
    `http://test-api.jtarrega.es/api/empleados/${element.classList[0]}`,
    true
  );
  peticion.setRequestHeader("Content-Type", "application/json");
  peticion.send();
}

//--------------------------FUNCIONES AUXILIARES---------------------------------//

//Deshabilita el button "borrar" si quedara solo un empleado por eliminar.
//Esta función se llama cada vez que se obtienen los datos y se actualiza el DOM
function comprobarSiEliminarMas() {
  restantes = [...document.querySelectorAll(".btnBorrar")]; //guarda todos los elementos borrar en un array
  //comprueba la cantidad y deshabilita si solo queda uno
  if (restantes.length <= 1) {
    [...restantes].forEach((element) => {
      element.disabled = true;
    });
  } else {
    [...restantes].forEach((element) => {
      element.disabled = false;
    });
  }
}


//function que maneja el evento de cada uno de los buttons modificar
//Envía al formulario los datos del empleado desde el cual se lanzó la acción de modificación
//El id del empleado viaje la clase del elemento desde la cual se lanzó la acción de modificación
function prepararModificado(element) {
  var peticion = new XMLHttpRequest();
  peticion.onreadystatechange = function () {
    if (
      peticion.readyState == 4 &&
      (peticion.status === 200 ||
        peticion.status === 201 ||
        peticion.status === 204)
    ) {
      modificando = true;
      btnAdd.disabled = true;
      //Agrega los valores del empleado seleccionado a los imputs correspondientes
      empleado = JSON.parse(peticion.responseText)[0];
      formulario[1].value = empleado.nombre;
      formulario[2].value = empleado.edad;
      formulario[3].value = empleado.cargo;
      formulario[4].checked = empleado.contratado == 1 ? true : false;
      formulario[5].value = empleado.id;
      //muestro el fomulario de modificacion de empleados
      legend.innerHTML = "Modifique los datos necesarios";
      infoEmpleados.classList.add("ocultar");
      formulario.classList.remove("ocultar");
    }
  };
  peticion.open(
    "GET",
    `http://test-api.jtarrega.es/api/empleados/${element.classList[0]}`,
    true
  );
  peticion.setRequestHeader("Content-Type", "application/json");
  peticion.send();
}



//Se pide confirmación para continuar eliminando y se transfiere la clase (id del empleado a eliminar) del elemento borrar que lanzó el evento al button continuar
function confirmarDel(element) {
  btnContinuar.classList = ""; //se elimina el contenido de las clases si hubiera para que no se acumulen
  btnContinuar.classList.add(element.classList[0]); //Se agrega la clase del button "borrar" que lanzó el evento.
  alert.classList.remove("ocultar"); //muestro la alerta para que el usuario decida si eliminar o no
}
