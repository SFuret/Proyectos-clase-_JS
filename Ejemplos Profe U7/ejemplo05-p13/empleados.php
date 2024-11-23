<?php 
    // Recoge los datos enviados por  
    //la petición en formato JSON  
    $json = file_get_contents('php://input'); 
    // Abre el fichero datosEmpleados.json   
    $fichero = fopen('datosEmpleados.json', 'w'); 
    // Escribe la cadena en el fichero 
    fwrite($fichero, $json); 
    // Cierra el fichero 
    fclose($fichero); 
    echo "Datos almacenados"; 
?> 