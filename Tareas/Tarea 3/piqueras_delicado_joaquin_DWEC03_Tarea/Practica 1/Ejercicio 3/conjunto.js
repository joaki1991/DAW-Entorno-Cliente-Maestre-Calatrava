"use strict";
// Estas funciones son independientes de la página y por lo tanto reutilizables

// Dado que el ejercicio nos ofrece la composición del objeto literal, podremos crear un constructor de este objeto mediante la siguiente función

class Book {
    constructor(ISBN, title, author, publicationDate, price) {

        this.ISBN = ISBN;
        this.title = title;
        this.author = author;
        this.publicationDate = publicationDate;
        this.price = price;
    }
}


// Creamos el objeto literal book y lo implementamos dentro de nuestro objeto Book
 let book = { ISBN: "978-84-9804-654-0", 
    title: "El Quijote", 
    author: "Miguel de Cervantes", 
    publicationDate: 
    new Date(1605, 0, 1), 
    price: 20, 
}

//También crearemos otros objetos de ejemplo:
let book1 = { ISBN: "778-84-9444-624-1",
    title: "Las aventuras del capitan Aliaga",
    author: "Miguel de Unamuno", 
    publicationDate: 
    new Date(1685, 2, 4), 
    price: 22, 
}

let book2 = { ISBN: "228-14-2144-8-4",
    author: "Lope de Vega", 
    publicationDate: 
    new Date(1885, 12, 4), 
    price: 34, 
}

let book3 = { ISBN: "558-34-2344-536-2",
    title: "La vida de Pi",
    author: "Quevedo", 
    publicationDate: 
    new Date(1833, 8, 12), 
    price: 50, 
}

let book4 = { ISBN: "346-74-9134-624-8",
    title: "Una historia interminable",
    author: "Federico Garcia Lorca", 
    publicationDate: 
    new Date(1744, 7, 2), 
    price: 20, 
}
let book5 = { ISBN: "226-64-2344-554-7",
    title: "Pulgarcito",
    author: "Steve Jobbs", 
    publicationDate: 
    new Date(1444, 4, 2), 
    price: 30, 
}
//Antes de empezar, tal y como dice el ejercicio, vamos a crear una variable denominada elem, que será la que utilicemos para referirnos a los objetos Book
let elem = Book;

//Ejercicio 4 = vamos a crear una constante, que consistirá en una expresión regular, la cual nos permitirá validar el formato del ISBN
const validarISBN = /^(\d{3})-(\d{2})-(\d{4})-(\d{3})-(\d{1})$/;

//Ya podemos empezar a crear las funciones que nos pide el ejercicio

//Primero vamos a crear la función que nos permita crear un conjutno
function create() {
	//No hay que instanciar los elementos del array, el cual contendrá los objetos Book
	return [];
}
//A continuación creamos la función para saber si nuestro conjunto está vacío
function isEmpty(set) {
	return (set.length === 0);
}
//Función para saber el tamaño o número de elementos de nuestro conjunto
function size(set){
    return set.length;
}
//Función para añadir elementos/books a nuestro conjunto:
function add(set, elem) {
    
    //En primer lugar, lanzaremos una excepción en caso de que el elemento introducido no sea del tipo Book
	if (!elem || typeof elem !== 'object') {
        throw new Error("El elemento no es un Book.");
      }
    //También podemos añadir otras excepciones en caso de que falte algún dato    
	if (!elem.ISBN) { //Si el elemento libro no contiene ISBN lanzamos excepción
		throw "El libro introducido carece de ISBN";
	}
    if (validarISBN.test(elem.ISBN) == false) {//Excepción, del ejercicio 4, en caso de que el ISBN no tenga el formato correcto
        throw new Error('El formato del ISBN es incorrecto.');
    }    
    //Además, tendremos que incorporar una nueva excepción, en caso de que el ISBN del libro ya exista    
	if (set.some(Book => Book.ISBN === elem || Book === elem)) {
        throw new Error('El ISBN ya está incluido en el conjunto.');
    }	
    if (!elem.title) { //Si el elemento libro no contiene titulo lanzamos excepción
		throw "El libro introducido carece de título";
	}
    if (!elem.author) { //Si el elemento libro no contiene autor lanzamos excepción
		throw "El libro introducido carece de autor";
	}
    if (!elem.publicationDate) { //Si el elemento libro no contiene fecha de pusblicación lanzamos excepción
		throw "El libro introducido carece de fecha de publicación";
	}
    if (!elem.price) { //Si el elemento libro no contiene precio lanzamos excepción
		throw "El libro introducido carece de precio";	
	} else { 
        set.push(elem); //Utilizamos los métodos de array para gestionar el conjunto
	}
	return size(set); //Devolvemos el tamaño
}

//Con esta función, podremos saber si existe o no un determinado libro en el conjunto, pudiendolo buscar también por su ISBN
function has(set, elem) {
    
    if (!elem || typeof elem == 'number' || typeof elem == 'boolean' || typeof elem == 'undefined') {
      throw new Error("El elemento no es un Book.");//Mostramos excepción en caso de no introducir un libro o ISBN
    }
    if (validarISBN.test(elem) == false) {//Excepción, del ejercicio 4, en caso de que el ISBN no tenga el formato correcto
        throw new Error('El formato del ISBN es incorrecto.');
    }
    return set.some(Book => Book.ISBN === elem || Book === elem);        
}

//La siguiente función, nos permitirá mostrar los elementos que contiene el conjunto en formato de cadena de texto y separados por un guión
function toString(set) {	
    const myJson = set.map(elem => JSON.stringify(elem)).join('-');
	return myJson;
  }

//Función para limpiar elementos del conjunto
function clear(set) {
	set.splice(0, set.length);
	
}
//Función que nos permitirá borrar el elemento o libro introducido, mostrando true en caso de ser borrado correctamento o false en caso contrario
function remove(set, elem){  
  if (!elem || typeof elem == 'number' || typeof elem == 'boolean' || typeof elem == 'undefined') {
      throw new Error("El elemento no es un Book.");//Excepción en caso de nos ser un libro
    }
    if (validarISBN.test(elem) == false) {//Excepción, del ejercicio 4, en caso de que el ISBN no tenga el formato correcto
        throw new Error('El formato del ISBN es incorrecto.');
    }       
    const index = set.findIndex(Book => Book.ISBN === elem);
    if (index !== -1) {
      set.splice(index, 1);
      return true;
    }
  
    return false;        
}




    
