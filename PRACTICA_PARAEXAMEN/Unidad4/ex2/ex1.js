
function introducirNumero()
{
    let numeros=[];
    let numero=-1;
    do{
    numero= prompt("Introduzca un número");
    if(!isNaN(numero)){
        numero=parseInt(numero);
        numeros.push(numero);
    }  
    }while(numero!==0);
    
    document.getElementById('longitud').innerHTML=`<p>El array tiene una longitud de: </p>${numeros.length}`;
    document.getElementById('normal').innerHTML=`<p>Array de números normal: </p>${numeros.join("-")}`;

    numeros.reverse();
    while(numeros.length!==0){
        let quitar= numeros.pop();
        document.write(quitar);
    }

   document.getElementById('longitudFinal').innerHTML=`<p>El array tiene una longitud de: </p>${numeros.length}`;
    

}

debugger;
introducirNumero();