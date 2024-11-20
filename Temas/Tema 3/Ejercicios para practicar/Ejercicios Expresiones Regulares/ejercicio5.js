 "use strict";

 function addExample () {
 	document.getElementById ("expreg").value = "hola, dos tres; cuatro";
 }

function validarExpresion (){
	var opcion = document.getElementById ("tipoexp");
	var cadena = document.getElementById ("expreg");
	var resultado = document.getElementById ("resultado");
	var arrayResult = [];
		
	arrayResult = cadena.value.split(/\W+/); //Separa el string delimitando por cualquier conjunto de caracteres ni númericos ni letras

	if (arrayResult !== null){		
		resultado.innerHTML = arrayResult;
		resultado.style.color = "blue";
	} else {		
		resultado.innerHTML = "No ha encontrado nada";
		resultado.style.color = "red";
	}
}

