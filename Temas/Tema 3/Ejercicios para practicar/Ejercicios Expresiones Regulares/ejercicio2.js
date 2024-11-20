 "use strict";

 function addDates () {
 	document.getElementById ("expreg").value = "Fecha y hora: 10/01/2006 15:45";
 	document.getElementById ("tipoexp").value = 1;
 }

 function addCounts () {
 	document.getElementById ("expreg").value = "CCC: 1234 5668 85 1234567890";
 	document.getElementById ("tipoexp").value = 2;
 }
 
function validarExpresion (){
	var opcion = document.getElementById ("tipoexp");
	var cadena = document.getElementById ("expreg");
	var resultado = document.getElementById ("resultado");
	var arrayResult = [];
	var expresion = / /;
	
	switch (parseInt (opcion.value)) {
		case 1: 
			expresion = /(0[123456789]|[12]\d|3[01])\/(0[123456789]|1[012])\/(\d{4})\s([01]\d|2[0123])\:([012345]\d)/;
			break;
		case 2: 
			expresion = /(\d{4})\s(\d{4})\s(\d{2})\s(\d{10})/;
			break;
		default: expresion = / /;
	}	
	
	arrayResult = cadena.value.match (expresion);

	if (arrayResult !== null){		
		resultado.innerHTML = arrayResult;
		resultado.style.color = "blue";
	} else {		
		resultado.innerHTML = "No ha encontrado nada";
		resultado.style.color = "red";
	}
}

