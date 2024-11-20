"use strict";

var usuarios = [
	{
		id: 133,
		firstName: "Juan Carlos",
		lastName: "Rolón",
		email: "Hernn84@hotmail.com"
	},
	{
		id: 134,
		firstName: "César",
		lastName: "Jáquez",
		email: "Lorena_Delarosa@hotmail.com"
	},
	{
		id: 135,
		firstName: "Leticia",
		lastName: "Fuentes",
		email: "Santiago56@gmail.com"
	},
	{
		id: 136,
		firstName: "Amancio",
		lastName: "Fuentes",
		email: "Santiago56@gmail.com"
	},
	{
		id: 137,
		firstName: "Lourdes",
		lastName: "Armenta",
		email: "Timoteo42@gmail.com"
	}
];

document.getElementById("datos").innerHTML = mostrarArray(usuarios);
document.getElementById("bCalcular").onclick = calcularResultado;

function mostrarArray(array) {
	var texto = "", i = 0;
	for (let item of array) {
		texto += "(" + item.id + ") " + item.firstName + " " + item.lastName + ", <a href='mailto:" + item.email + "'>" + item.email + "</a><br>";
	}

	return texto;
}

function calcularResultado() {
	usuarios.sort(ordenarArray);
	document.getElementById("resultado").innerHTML = mostrarArray(usuarios);
}

function ordenarArray(email1, email2) {
	var erEmail = /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+)@([a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*)$/;
	var aEmail1 = email1.match(erEmail);
	var aEmail2 = email2.match(erEmail);
	var dominio1 = aEmail1[1];
	var dominio2 = aEmail2[2];
	if (dominio1 != dominio2) { //Comparamos por dominio si no son iguales.
		if (dominio1 < dominio2) { return -1; } 
		else { return 1; };
	} else { //Si son iguales comparamos por usuario.
		var usuario1 = aEmail1[1];
		var usuario2 = aEmail2[2];	
		if (usuario1 < usuario2) {return -1; }
		else {return 1; };
	}
}





