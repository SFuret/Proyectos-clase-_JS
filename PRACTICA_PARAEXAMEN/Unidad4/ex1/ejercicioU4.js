
//objeto Hospital

class Hospital{

    constructor(cH, nH, tel, pob)
    {
        this.codigo=cH;
        this.nombre=nH;
        this.telefono=tel;
        this.poblacion=pob;
    }

    
}

//objeto Medico

class Medico {

constructor(cM, nM, esp, sueldo, Hosp)
{
this.codigo=cM;
this.nombre=nM;
this.especialidad=esp;
this.sueldo=sueldo;
this.Hospital=Hosp;
}

cambiaSueldo(sueldoNuevo) {
        this.sueldo=sueldoNuevo;
}

retencionMedico(porcentaje)
{
return (this.sueldo*porcentaje)/100;
}


mostrarDatos()
{
    let tabla= `<table border="1 px solid b">
        <tr> ${this.nombre}
            <td>${this.codigo}</td>
            <td>${this.especialidad}</td>
            <td>${this.sueldo}</td>
        </tr>
        <tr>${this.Hospital.nombre}
            <td>${this.Hospital.poblacion}</td>
            <td>${this.Hospital.telefono}</td>
        </tr>
    </table>`;

return tabla;

}
}

//Trabajo con las clases
debugger
let hospitalRibera= new Hospital("h1", "Hospital Rivera", 8255210,"Valencia");

let traumatologo= new Medico("t1", "Alberto", "trauma", 2000, hospitalRibera);
let digestivo= new Medico("t2", "Juana", "digestivo", 3000, hospitalRibera);
/*

let elemento= document.createElement("div");
let contenido= document.createNode(traumatologo.mostrarDatos());
elemento.appendChild(contenido);
document.getElementById("mostrar1").appendChild(elemento);
*/

//document.write(traumatologo.mostrarDatos());

document.getElementById("mostrar1").innerHTML= `${traumatologo.mostrarDatos()}`;


