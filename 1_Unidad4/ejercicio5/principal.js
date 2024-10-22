let edificios = [];

        function crearEdificio(edificioNuevo) {
            edificios.push(edificioNuevo);
            document.getElementById('mostrar').innerHTML += `Construido nuevo edificio en calle: ${edificioNuevo.calle}, nº: ${edificioNuevo.numero}, CP: ${edificioNuevo.codigoPostal}.<br>`;
        }

        // Crear los edificios
        let edificioA = new Edificio("Garcia Prieto", 58, 15706);
        let edificioB = new Edificio("Camino Caneiro", 29, 32004);
        let edificioC = new Edificio("San Clemente", "s/n", 15705);

        // Agregar los edificios al array de edificios
        crearEdificio(edificioA);
        crearEdificio(edificioB);
        crearEdificio(edificioC);

        // Mostrar información del CP y la calle de los edificios
        /*document.getElementById('mostrar').innerHTML += `El código postal del edificio A es: ${edificioA.imprimeCodigoPostal()}<br>`;
        document.getElementById('mostrar').innerHTML += `La calle del edificio C es: ${edificioC.imprimeCalle()}<br>`;
        document.getElementById('mostrar').innerHTML += `El edificio B está situado en la calle: ${edificioB.imprimeCalle()} número ${edificioB.imprimeNumero()}<br>`;*/

        document.getElementById('mostrar').insertAdjacentHTML('beforeend', 
        `<p>El código postal del edificio A es: ${edificioA.imprimeCodigoPostal()}</p><br>`);
       document.getElementById('mostrar').insertAdjacentHTML('beforeend', 
        `<p>La calle del edificio C es: ${edificioC.imprimeCalle()}</p><br>`);
       document.getElementById('mostrar').insertAdjacentHTML('beforeend', 
        `<p>El edificio B está situado en la calle: ${edificioB.imprimeCalle()} número ${edificioB.imprimeNumero()}</p><br>`);

        //es mejor usar insertAdjacentHTML: En lugar de usar innerHTML +=, que puede ser ineficiente o incluso 
        //sobreescribir contenido no deseado, usamos insertAdjacentHTML que agrega contenido sin eliminar lo que ya está.

   