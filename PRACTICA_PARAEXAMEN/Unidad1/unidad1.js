
function mostrarNumeros()
{
   let numero=[];
    let n=1;
    while (n<=100)
    {
      //  debugger;
if(n%5===0)
{
    numero.push(n);
}
n++;
    }
    return numero;
    //console.log(numero);
}

//mostrar con document.write
document.write(mostrarNumeros());

//mostrar con alert
alert(mostrarNumeros());

//mostrar un array como si fuera una cadena sin tener que recorrerlo

//document.getElementById("principal").innerText=mostrarNumeros().join(', ');