
function colorCaja(elemento){
    if(document.getElementById(elemento).className=="requerido")
        {
            document.getElementById(elemento).style.backgroundColor= "#F2EC94";
        }
}

function comprobarValido(elemento)
{
if(document.getElementById(elemento).value==="" || document.getElementById(elemento).checkValidity()===false)
    /*checkValidity() comprueba que el campo cumple con las reglas definidas*/
{
   document.getElementById(elemento).style.backgroundColor="#F29F05";
}
}