"use strict";
// Estas funciones son independientes de la página y por lo tanto reutilizables

const MAX_ELEM_LIST = 5; //Constante con la capacidad máxima de la lista.


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

//Primero vamos a crear la función que nos permita crear una lista 
function create() {
	//No hay que instanciar los elementos del array, el cual contendrá los objetos Book
	return [];
}
//A continuación creamos la función para saber si nuestra lista está vacía
function isEmpty(list) {
	return (list.length === 0);
}
//Ahora creamos la función para saber si nuestra lista está llena
function isFull(list) {
	return (list.length === MAX_ELEM_LIST);
}
//Función para saber el tamaño o número de elementos de nuestra lista
function size(list){
    return list.length;
}
//Función para añadir elementos/books a nuestra lista:
function add(list, elem) {
    
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
	}
	if (!isFull(list)) { //Añadimos si la lista no está completa
		list.push(elem); //Utilizamos los métodos de array para gestionar la lista        
	} else { //Si está completa lanzamos excepción
		throw new Error ("La lista ya esta llena, no puedes introducir más libros");
	}
	return size(list); //Devolvemos el tamaño
}

//Función para añadir elementos/books a nuestra lista en la posición especificada, la cual será igual a la anterior pero un tercer parámetro:
function addAtt(list, elem, index) {
    //En primer lugar, lanzaremos una excepción en caso de que el elemento introducido no sea del tipo Book    
    if (!elem || typeof elem !== 'object') {
        throw new Error("El elemento no es un Book.");
      }       
    if (!elem.ISBN) { //Si el elemento libro no contiene ISBN lanzamos excepción
		throw "El libro introducido carece de ISBN";
	}
    if (validarISBN.test(elem.ISBN) == false) {//Excepción, del ejercicio 4, en caso de que el ISBN no tenga el formato correcto
        throw new Error('El formato del ISBN es incorrecto.');
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
	}
    if (index < 0 || index > size(list)) { // Si el indice introducido está fuero de los límites de la lista se lanza excepción
    throw new Error ("El índice está fuera de los límites de la lista");
    }
    list.splice(index, 0, elem); 
    // Realizamos la adición del elemento en la lista en el índice indicado
	if (!isFull(list)) { //Añadimos si la lista esta llena para lanzar excepción		
		throw new Error ("La lista ya esta llena, no puedes introducir más libros");
	}        
	return size(list); //Devolvemos el tamaño

}

//Vamos a crear la función que nos permita obtener el libro de la lista en función del índice o posición introducido
function get(list, index) {
    
    if (index < 0 || index >= size(list)) {
      throw new Error("El índice está fuera de los límites de la lista.");//Mostraremos el error en caso de que el índice no este en el límite de la lista
    }
  
    const elemento = list.find((elem, currentIndex) => currentIndex === index);

  // Devolver el elemento encontrado
  return (elemento);
	
  }


//La siguiente función, nos permitirá mostrar los elementos que contiene la lista en formato de cadena de texto y separados por un guión
function toString(list) {	
    const myJson = list.map(elem => JSON.stringify(elem)).join('-');
	return myJson;
  }

//Con esta función, podremos devolver la primera posición o índice de un libo buscado, pudiendolo buscar tambiñen por su ISBN
function indexOf(list, elem) {
    if (!elem || typeof elem == 'number' || typeof elem == 'boolean' || typeof elem == 'undefined') {
      throw new Error("El elemento no es un Book.");//Mostramos excepción en caso de no introducir un libro o ISBN
    }
    if (validarISBN.test(elem) == false) {//Excepción, del ejercicio 4, en caso de que el ISBN no tenga el formato correcto
      throw new Error('El formato del ISBN es incorrecto.');
    }   
    
        return list.findIndex(function (item){
            return item === elem || item.ISBN === elem;
        });             
}

//Esta otra función, nos devolverá la última posición o índice de un libo buscado, pudiendolo buscar tambiñen por su ISBN
function lastIndexOf(list, elem) {
    if (!elem || typeof elem == 'number' || typeof elem == 'boolean' || typeof elem == 'undefined') {
      throw new Error("El elemento no es un Book.");//Mostramos excepción en caso de no introducir un libro
    }
    if (validarISBN.test(elem) == false) {//Excepción, del ejercicio 4, en caso de que el ISBN no tenga el formato correcto
      throw new Error('El formato del ISBN es incorrecto.');
   }   
    const reversedList = list.slice().reverse();
    return reversedList.findIndex(function (item){
		return item === elem || item.ISBN === elem;
	});
}
//Creamos la función para mostrar la capacidad máxima de la lista
function capacity(list) {
	return MAX_ELEM_LIST;
}

//Función para limpiar elementos de la lista
function clear(list) {
	list.splice(0, list.length);
	
}
//Función para mostrar el primer libro de la lista, o mensaje en caso de estar vacía
function firstElement(list) {
	if (isEmpty(list)) throw new Error("La lista está vacía");//Excepción si la lista esta vacía
    const primerElemento = list[0];
	return primerElemento;
}
//Función para mostrar el último libro de la lista, o mensaje en caso de estar vacía
function lastElement(list) {
	if (isEmpty(list)) throw new Error("La lista está vacía");//Excepción si la lista esta vacía
    const ultimoElemento = list[list.length-1];
	return ultimoElemento;
}
//Con la siguiente función, borraremos el libro de la lista indicado a través de su índice, mostrando con un mensaje el libro borrado por pantalla 
function remove(list,index){
    if (index < 0 || index >= size(list)) {
        throw new Error("El índice está fuera de los límites de la lista.");//Mensaje de error en caso de star la lista vacía
      }    
    console.log("El libro borrado en la posición " + index + " es: ");     
    return list.splice(index, 1)[0];//Además de borrar el elemento, nos muestra el elemento borrado       
}

//Función que nos permitirá borrar el elemento o libro introducido, mostrando true en caso de ser borrado correctamento o false en caso contrario
function removeElement(list, elem){
    
    if (!elem || typeof elem !== 'object') {
        throw new Error("El elemento no es un Book.");//Excepción en caso de nos ser un libro
      }
    if (validarISBN.test(elem.ISBN) == false) {//Excepción, del ejercicio 4, en caso de que el ISBN no tenga el formato correcto
        throw new Error('El formato del ISBN es incorrecto.');
    }       
         
      const indice = list.findIndex(function (item){
        return item === elem || item.ISBN === elem;
    });
      if (indice !== -1) {
        list.splice(indice, 1);
        return true;
      }
    
      return false;        
}

//Esta última función, nos introduce un libro en la posición o índice indicado, borrando el que se encontraba en dicha posición
function set(list, elem, index) {
    if (!elem || typeof elem !== 'object') {
      throw new Error("El elemento no es un Book.");//Excepción en caso de nos ser un libro
    }
  
    if (index < 0 || index >= size(list)) {
      throw new Error("El índice está fuera de los límites de la lista.");//Mostraremos el error en caso de que el índice no este en el límite de la lista
    }

    if (validarISBN.test(elem.ISBN) == false) {//Excepción, del ejercicio 4, en caso de que el ISBN no tenga el formato correcto
      throw new Error('El formato del ISBN es incorrecto.');
    }   
  
    const previousElement = list[index];
    list.splice(index, 1, elem);
    return previousElement;//Además se mostrará por pantalla el elemento que ha sido borrado
  }





    
