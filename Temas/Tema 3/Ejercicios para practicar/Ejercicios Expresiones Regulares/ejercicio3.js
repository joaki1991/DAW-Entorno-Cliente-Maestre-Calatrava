 "use strict";

 function addDouble () {
 	document.getElementById ("expreg").value = "\"Fecha y hora: 10/01/2006 15:45\"";
 }

 function addSimple () {
 	document.getElementById ("expreg").value = "\'CCC: 1234 5668 85 1234567890\'";
 }

 function addDoubleSimple () {
 	document.getElementById ("expreg").value = "\"Fecha y hora: 10/01/2006 15:45\'";
 }

 function addSimpleDouble () {
 	document.getElementById ("expreg").value = "\'CCC: 1234 5668 85 1234567890\"";
 }

function validarExpresion (){
	var opcion = document.getElementById ("tipoexp");
	var cadena = document.getElementById ("expreg");
	var resultado = document.getElementById ("resultado");
	var arrayResult = [];
	var expresion = /(["']).*\1/; //Esta expresión recoge lo que tenemos entre parentesis, o comilla doble o comilla simple, y el "\1" tiene que ser lo mismo que lo recogido en el paréntesis.
		
	arrayResult = cadena.value.match (expresion);

	if (arrayResult !== null){		
		resultado.innerHTML = arrayResult;
		resultado.style.color = "blue";
	} else {		
		resultado.innerHTML = "No ha encontrado nada";
		resultado.style.color = "red";
	}
}

