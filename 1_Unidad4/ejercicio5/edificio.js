class Propietario {
  // Las variables definidas dentro del constructor son variables de instancia
  constructor(nombre, planta, puerta) {
    this.nombre = nombre;
    this.planta = planta;
    this.puerta = puerta;
  }
}


class Edificio {
    
  // Variables de instancia
  constructor(calle, numero, cp) {
    this.calle = calle;
    this.numero = numero;
    this.codigoPostal = cp;
    this.numPlantas = 0;  
    this.numPuertas = 0;
    this.propietarios = []; // Array de propietarios
  }

  // Incrementa el número de plantas y puertas del edificio
  agregarPlantasYPuertas(numplantas, puertas) {
    this.numPlantas += numplantas;
    this.numPuertas += puertas;
  }

  modificarNumero(numero) {
    this.numero = numero;
  }

  modificarCalle(calle) {
    this.calle = calle;
  }

  modificarCodigoPostal(codigo) {
    this.codigoPostal = codigo;
  }

  imprimeCalle() {
    return this.calle;
  }

  imprimeNumero() {
    return this.numero;
  }

  imprimeCodigoPostal() {
    return this.codigoPostal;
  } 

  agregarPropietario(nombre, planta, puerta) {
    let propietarioNuevo = new Propietario(nombre, planta, puerta);
    this.propietarios.push(propietarioNuevo); // Agrego el propietario al array de propietarios
    document.body.innerHTML += `${propietarioNuevo.nombre} es ahora el propietario de la puerta ${propietarioNuevo.puerta} de la planta ${propietarioNuevo.planta}<br>`;
  }

  imprimePlantas() {
    let devolverPropietarios = ''; // Lo inicializo vacío para que no me devuelva undefined
    for (let index = 0; index < this.propietarios.length; index++) {
      // Almaceno todos los propietarios para devolverlos de una vez
      devolverPropietarios += `  
        <p> Propietario: ${this.propietarios[index].nombre} Planta: ${this.propietarios[index].planta} Puerta: ${this.propietarios[index].puerta} </p>
      `;
    }
    return devolverPropietarios; // Muevo el return fuera del bucle
  }
}

 
