<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Formulario 2</h1>
    <form action="">
        <fieldset>
            <legend>Formulario 2</legend>

<!--En el select el value se indica en los option-->            
        <label for="inmueble">Tipo vivienda</label>
        <select name="inmueble" id="inmueble">
            <option value="piso">Piso</option>
            <option value="adosado">Adosado</option>
            <option value="parcela">Parcela</option>
            <option value="casa">Casa</option>
        </select>

        <br><br>
<!--El datalist lleva un input con un atributo list que lo enlaza con el datalist 
    En el id del datalist debe ir el valor indicado en el list del input
-->
        <label for="provincia">Provincia</label>
        <input type="text" id="provincia" name="provincia" list="listaProvincias" autocomplete="on">
        <datalist id="listaProvincias">
           <option value="madrid">Madrid</option>
           <option value="valencia">Valencia</option>
           <option value="barcelona">Barcelona</option>
           <option value="murcia">Murcia</option>
        </datalist>

        <br><br>

        <label for="ubicacion">Ubicación</label>
        <select name="ubicacion" id="ubicacion" multiple>
            <option value="este">Este</option>
            <option value="oeste">Oeste</option>
            <option value="sur">Sur</option>
            <option value="norte">Norte</option>
        </select>
        <br><br>
<!--El for del label debe ir en el id del input con el que se relaciona-->
        <label for="precio">Precio Máximo</label>
        <input type="number" min="0" max="500000" step="10000">
        <br><br>

        <label for="metros">Metros mínimos</label>
        <input type="number" min="0" max="5000" step="50">

        <br><br>
        <label for="altura">Altura</label>
        <input type="text" id="altura" name="altura" min="0" max="40">

        <br><br>

<!--Los checkbox (selección múltiple) son input de tipo radio que tienen el mismo name, se les debe indicar el value-->
          <fieldset>
            <legend>Características</legend>
            
            <label for="calefaccion">Calefaccion</label>
            <input type="checkbox" id="calefaccion" name="caracteristicas" value="calefaccion">

            <label for="aireAcondicionado">Aire Acondicionado</label>
            <input type="checkbox" id="aireAcondicionado" name="caracteristicas" value="aire">

            <label for="garaje">Garaje</label>
            <input type="checkbox" id="garaje" name="caracteristicas" value="garaje">
          </fieldset>

          <br><br>
<!--Los radio (selección excluyente) son input de tipo radio que tienen el mismo name, se les debe indicar el value-->
          <fieldset>
            <legend>Estado</legend>
            <input type="radio" id="indiferente" name="estado" value="indiferente" checked>            
            <label for="indiferente">Indiferente</label>
            <br>

            <input type="radio" id="nuevo" name="estado" value="nuevo">            
            <label for="nuevo">Nuevo</label>
            <br>

            <input type="radio" id="buenEstado" name="estado" value="buenEstado">            
            <label for="buenEstado">Buen Estado</label>
          </fieldset>

          <br><br>

<!--Cuando recojo el valor de un formulario lo hago a través del name del elemento-->
<!--El atributo value es que el coge el valor del campo, el valor que se quiere procesar-->
          <label for="nombre">Nombre</label>
          <input type="text" id="nombre" name="nombre" maxlength="35">
          <br><br>

          <label for="email">Email</label>
          <input type="email" id="email" name="email">

          <br><br>
          <label for="fecha">Fecha</label>
          <input type="date" id="fecha" name="fechaNacimiento">

          <br><br>
          <label for="dni">DNI</label>
          <input type="password" id="dni" name="dni">

          <br><br>
          <button type="submit">Enviar</button>
          <button type="reset">Resetear</button>
        </fieldset>
    </form>


</body>
</html>