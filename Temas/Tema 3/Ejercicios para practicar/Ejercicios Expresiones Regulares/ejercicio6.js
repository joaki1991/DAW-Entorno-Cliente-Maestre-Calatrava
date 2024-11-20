 "use strict";

 function addExample () {
 	document.getElementById ("expreg").value = "Ca5sa Ca5sa Ca5sa Ca5er3423432sa";
 }

function validarExpresion (){
	var opcion = document.getElementById ("tipoexp");
	var cadena = document.getElementById ("expreg");
	var resultado = document.getElementById ("resultado");
	var arrayResult = [];
	var expresion = / /;
		
	arrayResult = cadena.value.replace(/(\d+)/g,"-$1-"); //Reemplazamos lo que tenemos entre paréntesis, secuencia de digitos, por los mismos dígitos, "$1", delimitados por dos guiones.

	if (arrayResult !== null){		
		resultado.innerHTML = arrayResult;
		resultado.style.color = "blue";
	} else {		
		resultado.innerHTML = "No ha encontrado nada";
		resultado.style.color = "red";
	}
}

