 "use strict";
 
function validarExpresion (){
	var opcion = document.getElementById ("tipoexp");
	var cadena = document.getElementById ("expreg");
	var resultado = document.getElementById ("resultado");
	var expresion = / /;
	
	switch (parseInt (opcion.value)) {
		case 1: 			
			expresion = /^[A-Z].*\.$/;
			break;
		case 2: 
			expresion = /^[96][0-9]{8}$/;
			break;
		case 3: 
			expresion = /^\(\+34\)[96][0-9]{8}$/;
			break;
		case 4: 
			expresion = /^(0[123456789]|[12]\d|3[01])\/(0[123456789]|1[012])\/\d{4}\s([01]\d|2[0123])\:[012345]\d$/;
			break;
		case 5: 
			expresion = /^\d{5}$/;
			break;
		case 6: 
			expresion = /^[a-z][a-z0-9_\-]*(\.[a-z0-9_\-]*)*[a-z0-9]\@[a-z0-9]+\.[a-z]{2,3}$/;
			break;
		case 7: 
			//expresion = /^[-]?\d+$/;
			expresion = /^((\-?[1-9]\d*)|0)$/;
			break;
		case 8: 
			//expresion = /^[-]?\d+([,.]\d+)?$/;
			//expresion = /^(((\-?[1-9]\d*)|0)|)$/;
			expresion = /^((\-?[1-9]\d*|0)|[-]?([1-9]\d*|0)[,.][0-9]*[1-9])$/;
			break;
		case 9: 
			expresion = /^\d{4}\s\d{4}\s\d{2}\s\d{10}$/;
			break;
		case 10: 
			expresion = /^www\.[\d\w]+\.(com|net|es)$/i;
			break;
		case 11: 
			expresion = /^(http|ftp)\:\/\/(\w+\.)?\w+\.(com|net|es)(\:(\d){1,4})?$/i;
			break;			
		case 12: 
			expresion = /^(http|ftp)\:\/\/(\w+\.)?\w+\.(com|net|es)(\:(\d){1,4})?(\?(\w+=.*)(\&(\w+=.*))*)?$/i;
			break;			
		default: expresion = / /;
	}	

	if (expresion.test (cadena.value) === true){		
		resultado.innerHTML = "La cadena cumple la expresión regular";
		resultado.style.color = "blue";
	} else {		
		resultado.innerHTML = "La cadena NO cumple la expresión regular";
		resultado.style.color = "red";
	}
}

