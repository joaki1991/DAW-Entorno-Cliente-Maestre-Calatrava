 "use strict";

 var array = [100,"Europa",3,"Asia",-5,"America",23,"Africa",32,"Oceania",14,2]; //Array de valores heterogéneos de number y string.
 document.getElementById("datos").innerHTML = array;
 document.getElementById("bCalcular").onclick = calcularResultado;

 function calcularResultado(){
	array.sort(ordenarArray);
	document.getElementById("resultado").innerHTML = array;
 }

 function ordenarArray(a, b){
	//Si number está el primero devolvemos -1 para no intercambiar datos.
	if (typeof a == "number" && typeof b == "string") return 1; 
	//Si number está el segundo devolvemos 1 para intercambiar datos.
	if (typeof a == "string" && typeof b == "number") return -1; 
	//Si ambos datos son numéricos comparamos los datos.
	if (typeof a == "number" && typeof b == "number") return b - a;
	//Si tenemos dos string los comparamos para saber cuál es mayor y cuál es menor.
	if (typeof a == "string" && typeof b == "string"){
		var x = a.toLowerCase();
		var y = b.toLowerCase();
		if (x < y) {return 1;}
		if (x > y) {return -1;}		
	}
 }


