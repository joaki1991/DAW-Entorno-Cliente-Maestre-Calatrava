 "use strict";

 function addExample () {
 	document.getElementById ("expreg").value = "1000g, 10kg, 20kg, 13kg y 23Kg";
 }

function validarExpresion (){
	var opcion = document.getElementById ("tipoexp");
	var cadena = document.getElementById ("expreg");
	var resultado = document.getElementById ("resultado");
	var arrayResult = [];
	var expresion = /\d+(?=kg)/ig; //Buscamos secuencia de digitos, y si los encotramos seguidos de 'kg', obtenemos solo los digitos por eliminar 'kg' gracias a "?="
		
	arrayResult = cadena.value.match(expresion);

	if (arrayResult !== null){		
		resultado.innerHTML = arrayResult;
		resultado.style.color = "blue";
	} else {		
		resultado.innerHTML = "No ha encontrado nada";
		resultado.style.color = "red";
	}
}

