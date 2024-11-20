 "use strict";

 function addExample () {
 	document.getElementById ("expreg").value = "12.34, 12.4 y 123.56";
 }

function validarExpresion (){
	var opcion = document.getElementById ("tipoexp");
	var cadena = document.getElementById ("expreg");
	var resultado = document.getElementById ("resultado");
	var arrayResult = [];
	var expresion = /(?=\.)\.\d+/g;
		
	arrayResult = cadena.value.match(expresion);

	if (arrayResult !== null){		
		resultado.innerHTML = arrayResult;
		resultado.style.color = "blue";
	} else {		
		resultado.innerHTML = "No ha encontrado nada";
		resultado.style.color = "red";
	}
}

