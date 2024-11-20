 "use strict";

 function addExample () {
 	document.getElementById ("expreg").value = "casa a juguete u pelota o";
 }

function validarExpresion (){
	var opcion = document.getElementById ("tipoexp");
	var cadena = document.getElementById ("expreg");
	var resultado = document.getElementById ("resultado");
	var arrayResult = [];
	var expresion = /\b[aeiou]\b/g;
		
	arrayResult = cadena.value.match (expresion);

	if (arrayResult !== null){		
		resultado.innerHTML = arrayResult;
		resultado.style.color = "blue";
	} else {		
		resultado.innerHTML = "No ha encontrado nada";
		resultado.style.color = "red";
	}
}

