 "use strict";
 import {BaseException,
	InvalidAccessConstructorException,
	EmptyValueException,
	ParameterValidationException,
	InvalidValueException,
	AbstractClassException } from './ImageManager.js';
import {Coords, Author, Image, Portrait, Landscape, Category} from './ImageManager.js';
import {ImageManagerException,
	AuthorImageManagerException,
	AuthorExistsImageManagerException,
	AuthorNotExistsImageManagerException,
	DefaultAuthorImageManagerException,
	CategoryImageManagerException,
	CategoryExistsImageManagerException,
	CategoryNotExistsImageManagerException,
	DefaultCategoryImageManagerException,
	ImageImageManagerException,
	ImageExistsImageManagerException,
	ImageNotExistsImageManagerException,
	ImageBelongsDifferentAuthorManagerException} from './ImageManager.js';

import ImageManager from './ImageManager.js';


/* 
Testeo del gestor de imágenes.
*/
function testImageManager(){

	function testCoords(){
		console.log ("##### Testeo Objeto Coords. ##### ");
		//Coordenadas c1: -90, 90
		console.log("Coordenadas c1: " + c1.latitude + ", " + c1.longitude);
		console.log("Coordenadas c1: " + c1.getSexagesimalLatitude());
		console.log("Coordenadas c1: " + c1.getSexagesimalLongitude());

		try {
			let c2 = new Coords(-190,90);
			console.log("Coordenadas c1: " + c1.latitude + ", " + c1.longitude);
		} catch(err) {
			//Error: InvalidValueException: Error: The paramenter latitude has an invalid value. (latitude: -190)
			console.log("Error: " + err.toString());
		}

		try {
			let c3 = new Coords(-90,190);
			console.log("Coordenadas c1: " + c1.latitude + ", " + c1.longitude);
		} catch(err) {
			//Error: InvalidValueException: Error: The paramenter longitude has an invalid value. (longitude: 190)
			console.log("Error: " + err.toString());
		}	
		console.log ("##### Fin: Testeo Objeto Coords. ##### ");
		console.log("");
		console.log("");
	}

	function testImage(){
		console.log ("##### Testeo Objeto Image. ##### ");
		//Image: Pepito Portrait(http://www.google.com:8944/jkjhjh/gdffg/dfgfd/pepe1.gif). Descripción de la imagen de Pepe Portrait
		console.log(ip1.toString());
		//Coordenadas ip1: -89.654654, -89.23323
		console.log("Coordenadas ip1: " + ip1.coords.latitude + ", " + ip1.coords.longitude);
		//Image: Pepito Landscape(http://www.google.com:8944/jkjhjh/gdffg/dfgfd/pepe2.gif). Descripción de la imagen de Pepe Landscape
		console.log(il1.toString());
		//Coordenadas il1: -89.654654, -89.23323
		console.log("Coordenadas il1: " + il1.coords.latitude + ", " + il1.coords.longitude);

		try {
			let i2 = new Image("","");		
			console.log(i2.toString());
		} catch(err) {
			//Error: AbstractClassException: Image is a abstract class.
			console.log("Error: " + err.toString());
		}
		console.log ("##### Fin: Testeo Objeto Image. ##### ");		
		console.log("");
		console.log("");
	}

	function testAuthor(){
		console.log ("##### Testeo Objeto Author. ##### ");
		//Author: pepito(pepito@gmail.com)
		console.log(a1.toString());

		try {
			let aN = new Author("pepito","pepito");		
			console.log(aN.toString());
		} catch(err) {
			//Error: InvalidValueException: Error: The paramenter email has an invalid value. (email: pepito)
			console.log("Error: " + err.toString());
		}
		//Author: manolito(manolito@gmail.com)
		console.log(a2.toString());
		console.log ("##### Fin: Testeo Objeto Author. ##### ");
		console.log("");
		console.log("");		
	}

	function testCategory(){
		console.log ("##### Testeo Category. ##### ");
		//Categoría cat1: Category: Categoría 1(Descripción categoría 1)
		console.log ("Categoría cat1: " + cat1.toString());
		//Categoría cat2: Category: Categoría 2(Descripción categoría 2)
		console.log ("Categoría cat2: " + cat2.toString());
		console.log ("##### Fin: Testeo Category. ##### ");
		console.log("");
		console.log("");				
	}

	function testImageManagerWithAuthor(){
		console.log ("##### Testeo ImageManager: Autores ##### ");
		//Probamos los autores.
		//Añadimos el autor: pepito
		console.log("Añadimos el autor: " + a1.nickname);
		//Añadimos el autor: manolito
		console.log("Añadimos el autor: " + a2.nickname);
		//Añadimos el autor: juanito
		console.log("Añadimos el autor: " + a3.nickname);

		try{
			manager.addAuthor(a1);
		} catch (err){
			//AuthorExistsImageManagerException: Error: The author exists in the image manager.
			console.log(err.toString());
		}

		//Borramos el autor: manolito
		console.log("Borramos el autor: " + a3.nickname);
		//Intento de borrado autor no existente.
		console.log("Intento de borrado autor no existente.");
		try{
			manager.removeAuthor(a3);
		} catch (err){
			//AuthorNotExistsImageManagerException: Error: The author doesn't exist in the image manager.
			console.log(err.toString());
		}
		//Autor por defecto: Anonymous author
		console.log("Autor por defecto: " + manager.defaultAuthor.nickname);
		try{
			manager.removeAuthor(manager.defaultAuthor);
		} catch (err){
			//Error: The deafult author can't be removed.
			console.log(err.toString());
		}	

		console.log ("##### Fin: Testeo ImageManager: Autores ##### ");		
		console.log("");
		console.log("");						
	}

	function showAuthors(){
		//Recorremos los autores.
		console.log ("Recorremos los autores.");
		for (let author of manager.authors){
			console.log ("Author: " + author.nickname);
		}
	}

	function testImageManagerWithCategory(){
		console.log ("##### Testeo ImageManager: Categorías ##### ");
		//Probamos las categorías.
		//Añadimos la categoría: Categoría 1
		console.log("Añadimos la categoría: " + cat1.title);
		//Añadimos la categoría: Categoría 2
		console.log("Añadimos la categoría: " + cat2.title);
		try{
			manager.addCategory(cat2);
		} catch (err){
			//CategoryExistsImageManagerException: Error: The category exists in the image manager.
			console.log(err.toString());
		}

		//Borramos la categoría: Categoría 2
		console.log("Borramos la categoría: " + cat3.title);
		//Categoría por defecto: Anonymous category
		console.log("Categoría por defecto: " + manager.defaultCategory.title);
		try{
			manager.removeCategory(manager.defaultCategory);
		} catch (err){
			//DefaultCategoryImageManagerException: Error: The deafult category can't be removed.
			console.log(err.toString());
		}

		console.log ("##### Fin: Testeo ImageManager: Categorías ##### ");
		console.log("");
		console.log("");						

	}

	function testImageManagerWithImage(){
		console.log ("##### Testeo ImageManager: Imágenes ##### ");
		try{
			manager.addImage (ip1,cat1,a1);
		} catch (err){
			//ImageExistsImageManagerException: Error: The image exists in the category 'Categoría 1'.
			console.log(err.toString());
		}
		//Borrado: http://www.google.com:8944/jkjhjh/gdffg/dfgfd/pepe1.gif. Nº de imágenes: 1
		console.log("Borrado: " + ip1.url + ". Nº de imágenes: " + manager.removeImageCategory (ip1,cat1));
		try{
			manager.removeImageCategory (new Portrait("Prueba Portrait","http://www.google.com:8944/jkjhjh/gdffg/dfgfd/prueba.gif"),cat1);
		} catch (err){
			//ImageNotExistsImageManagerException: Error: The image doesn't exist in the category 'Categoría 1'.
			console.log(err.toString());
		}		
		try{
			manager.removeImageCategory (il1,new Category("Categoría 4"));
		} catch (err){
			//CategoryNotExistsImageManagerException: Error: The category doesn't exist in the image manager.
			console.log(err.toString());
		}		

		//Borrado: http://www.google.com:8944/jkjhjh/gdffg/dfgfd/pepe1.gif
		console.log("Borrado: " + ip1.url);
		try{
			manager.removeImage (new Portrait("Prueba Portrait","http://www.google.com:8944/jkjhjh/gdffg/dfgfd/prueba.gif"));
		} catch (err){
			//ImageNotExistsImageManagerException: Error: The image doesn't exist in the category ''.
			console.log(err.toString());
		}		
		console.log ("##### Fin: Testeo ImageManager: Imágenes ##### ");
		console.log("");
		console.log("");								
	}

	function showImagesByCategory (category){
		console.log ("##### Imágenes por categoría: " + category.title);
		showImages(manager.getImagesByCategory(category));	
		console.log ("####### Fin: Imágenes por categoría. #######");	
	}

	function showImagesByAuthor (author){
		console.log ("##### Imágenes por autor: " + author.nickname);
		showImages(manager.getImagesByAuthor(author));	
		console.log ("####### Fin: Imágenes por autor. #######");	
	}

	function showImagesByCategoryAuthor (category,author){
		console.log ("##### Imágenes por autor y categoría: " + author.nickname + ", " + category.title);
		showImages(manager.getImagesByCategoryAndAuthor(category, author));	
		console.log ("####### Fin: Imágenes por autor y categoría. #######");	
	}


	function showAllImages(){
		console.log ("####### Mostramos las imágenes de cada categoría. #######");
		for (let category of manager.categories){
			console.log ("Category: " + category.title);	
			showImages(manager.getImagesByCategory(category));
		}
		console.log ("####### Fin: Mostramos las imágenes de cada categoría. #######");
	}

	function showImages(images){
		for (let image of images){
			console.log ("Image: " + image.title + " (" + image.url + ")");			
		}
	}

	function showPortraits(){
		console.log ("##### Imágenes Portraits");
		showImages(manager.getPortraits());	
		console.log ("##### Fin: Imágenes Portraits");
	}

	function showLandscapes(){
		console.log ("##### Imágenes Landscapes");
		showImages(manager.getLandscapes());	
		console.log ("##### Fin: Imágenes Landscapes");
	}

	function showCategories(categories){
		console.log("Categorías: ");
		for (let cat of categories){
			console.log("Categoría: " + cat.title);
		} 		
	}


	let c1 = new Coords(-89.654654,-89.23323);
	testCoords();

	let ip1 = new Portrait("Pepito Portrait","http://www.google.com:8944/jkjhjh/gdffg/dfgfd/pepe1.gif");
	ip1.description = "Descripción de la imagen de Pepe Portrait";
	ip1.coords = c1;

	let il1 = new Landscape("Pepito Landscape","http://www.google.com:8944/jkjhjh/gdffg/dfgfd/pepe2.gif");
	il1.description = "Descripción de la imagen de Pepe Landscape";
	il1.coords = c1;

	let ip2 = new Portrait("Manolito Portrait","http://www.google.com:8944/jkjhjh/gdffg/dfgfd/manolito1.gif");
	let il2 = new Landscape("Manolito Landscape","http://www.google.com:8944/jkjhjh/gdffg/dfgfd/manolito2.gif");

	testImage();

	let a1 = new Author("pepito","pepito@gmail.com");
	let a2 = new Author("manolito","manolito@gmail.com");
	let a3 = new Author("juanito","juanito@gmail.com");
	testAuthor();

	let cat1 = new Category("Categoría 1");
	cat1.description = "Descripción categoría 1";
	let cat2 = new Category("Categoría 2");
	cat2.description = "Descripción categoría 2";
	let cat3 = new Category("Categoría 3");
	cat3.description = "Descripción categoría 3";	
	testCategory();

	console.log ("##### Testeo ImageManager. ##### ");
	let manager = ImageManager.getInstance();
	manager.title = "Galería de imágenes de prueba";
	//Instancia ImageManager: Galería de imágenes de prueba
	console.log ("Instancia ImageManager: " + manager.title);			

	manager.addAuthor(a1);
	manager.addAuthor(a2);
	manager.addAuthor(a3);
	showAuthors();
	try {
		manager.addAuthor(a3); // AuthorExistsImageManagerException: Error: The author exists in the image manager.
	} catch (error){
		console.log(error);
	}

	manager.addCategory(cat1);
	manager.addCategory(cat2);
	manager.addCategory(cat3);
	showCategories(manager.categories);
	try {
		manager.addCategory(cat3); // CategoryExistsImageManagerException: Error: The category exists in the image manager.
	} catch (error){
		console.log(error);
	}

	manager.addImage (ip1,cat1,a1);
	manager.addImage (il1,cat1,a1);
	manager.addImage (ip2,cat1,a2);
	manager.addImage (il2,cat1,a2);	
	manager.addImage (ip1,cat2,a1);
	manager.addImage (il1,cat2,a1);
	manager.addImage (ip2,cat2,a2);
	manager.addImage (il2,cat2,a2);	
	manager.addImage (ip1,cat3,a1);

	console.log("Información de la imangen: " + ip1.url);
	console.log("Autor: " + manager.getImageAuthor(ip1).toString());
	showCategories(manager.getImageCategories(ip1));
	showAllImages();
	showImagesByAuthor (a1);
	showImagesByCategoryAuthor (cat3,a1);
	showImagesByCategoryAuthor (cat1,a2);	
	showPortraits();	
	showLandscapes();

	console.log("##### Borrado de imagen en categoría #####");
	showCategories(manager.getImageCategories(ip1));
	manager.removeImageInCategory(ip1, cat2);
	showCategories(manager.getImageCategories(ip1));

	console.log("##### Borrado de imagen en autor #####");
	showImagesByAuthor (a1);
	manager.removeImage(ip1);
	showImagesByAuthor (a1);

	try{
		manager.removeImage(ip1);
	}catch(error){
		console.log(error.message); // Error: The image doesn't exist.
	}
	showAllImages();

	console.log("#### Borrado de autor ####");
	showImagesByAuthor (a1);
	manager.removeAuthor(a1);
	showAuthors();
	showImagesByAuthor (manager.defaultAuthor);

	console.log("#### Borrado de categoría ####");
	showAllImages();
	manager.removeImageInCategory(ip2, cat2); // Borramos ip2 en cat 2
	manager.removeCategory(cat1);
	showAllImages(); // "manolito1.gif" pasa a la categoría por defecto.
		
} 
window.onload = testImageManager;

