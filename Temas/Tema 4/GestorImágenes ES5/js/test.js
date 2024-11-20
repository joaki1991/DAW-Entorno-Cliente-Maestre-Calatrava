 "use strict";

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
			var c2 = new Coords(-190,90);
			console.log("Coordenadas c1: " + c1.latitude + ", " + c1.longitude);
		} catch(err) {
			//Error: InvalidValueException: Error: The paramenter latitude has an invalid value. (latitude: -190)
			console.log("Error: " + err.toString());
		}

		try {
			var c3 = new Coords(-90,190);
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
			var i2 = new Image("","");		
			console.log(i2.toString());
		} catch(err) {
			//Error: EmptyValueException: Error: The parameter title can't be empty.
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
			var aN = new Author("pepito","pepito");		
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
		var authors = manager.authors;
		var author = authors.next();
		while (author.done !== true){
			//Author: nickname
			console.log ("Author: " + author.value.nickname);
			author = authors.next();
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

	function showCategories(){
		//Recorremos las categorías.
		console.log ("Recorremos las categorías.");
		var categories = manager.categories;
		var category = categories.next();
		while (category.done !== true){
			//Category: title
			console.log ("Category: " + category.value.title);		
			category = categories.next();
		}		
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

	function showImagesByAuthor (author){
		console.log ("##### Imágenes por autor: " + author.nickname);
		showImages(manager.getAuthorImages(author));	
		console.log ("####### Fin: Imágenes por autor. #######");	
	}

	function showImagesByCategoryAuthor (category,author){
		console.log ("##### Imágenes por autor y categoría: " + author.nickname + ", " + category.title);
		showImages(manager.getCategoryAuthorImages(category, author));	
		console.log ("####### Fin: Imágenes por autor y categoría. #######");	
	}


	function showAllImages(){
		console.log ("####### Mostramos las imágenes de cada categoría. #######");
		var categories = manager.categories;
		var category = categories.next();
		while (category.done !== true){
			//Category: title
			console.log ("Category: " + category.value.title);	
			showImages(manager.getCategoryImages(category.value));
			category = categories.next();
		}
		console.log ("####### Fin: Mostramos las imágenes de cada categoría. #######");
	}

	function showImages(images){
		var image = images.next();
		while (image.done !== true){
			//Image: title(url)
			console.log ("Image: " + image.value.title + " (" + image.value.url + ")");		
			image = images.next();
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

	var c1 = new Coords(-89.654654,-89.23323);
	//testCoords();

	var ip1 = new Portrait("Pepito Portrait","http://www.google.com:8944/jkjhjh/gdffg/dfgfd/pepe1.gif");
	ip1.description = "Descripción de la imagen de Pepe Portrait";
	ip1.coords = c1;

	var il1 = new Landscape("Pepito Landscape","http://www.google.com:8944/jkjhjh/gdffg/dfgfd/pepe2.gif");
	il1.description = "Descripción de la imagen de Pepe Landscape";
	il1.coords = c1;

	console.log("Estático: " + il1.constructor.prueba());
	console.log("Estático: " + ip1.constructor.prueba());

	var ip2 = new Portrait("Manolito Portrait","http://www.google.com:8944/jkjhjh/gdffg/dfgfd/manolito1.gif");
	var il2 = new Landscape("Manolito Landscape","http://www.google.com:8944/jkjhjh/gdffg/dfgfd/manolito2.gif");

	//testImage();

	var a1 = new Author("pepito","pepito@gmail.com");
	var a2 = new Author("manolito","manolito@gmail.com");
	var a3 = new Author("juanito","juanito@gmail.com");
	//testAuthor();

	var cat1 = new Category("Categoría 1");
	cat1.description = "Descripción categoría 1";
	var cat2 = new Category("Categoría 2");
	cat2.description = "Descripción categoría 2";
	var cat3 = new Category("Categoría 3");
	cat3.description = "Descripción categoría 3";	
	//testCategory();

	console.log ("##### Testeo ImageManager. ##### ");
	var manager = ImageManager.getInstance();
	manager.title = "Galería de imágenes de prueba";
	//Instancia ImageManager: Galería de imágenes de prueba
	console.log ("Instancia ImageManager: " + manager.title);			

	manager.addAuthor(a1);
	manager.addAuthor(a2);
	manager.addAuthor(a3);
	manager.removeAuthor(a3);
	showAuthors();
	//testImageManagerWithAuthor();	

	manager.addCategory(cat1);
	manager.addCategory(cat2);
	manager.addCategory(cat3);
	manager.removeCategory(cat3);
	showCategories();
	//testImageManagerWithCategory();
	
	//Añadida: url. Nº de imágenes: entero
	console.log("Añadida: " + ip1.url + ". Nº de imágenes: " + manager.addImage (ip1,cat1,a1));
	console.log("Añadida: " + il1.url + ". Nº de imágenes: " + manager.addImage (il1,cat1,a1));
	console.log("Añadida: " + ip2.url + ". Nº de imágenes: " + manager.addImage (ip2,cat1,a2));
	console.log("Añadida: " + il2.url + ". Nº de imágenes: " + manager.addImage (il2,cat1,a2));	
	console.log("Añadida: " + ip1.url + ". Nº de imágenes: " + manager.addImage (ip1,null,null));
	console.log("Añadida: " + il1.url + ". Nº de imágenes: " + manager.addImage (il1,null,null));
	console.log("Añadida: " + ip1.url + ". Nº de imágenes: " + manager.addImage (ip1,new Category("Categoría 3"),new Author("jorgito","jorgito@gmail.com")));
	console.log("Añadida: " + il1.url + ". Nº de imágenes: " + manager.addImage (il1,new Category("Categoría 3"),new Author("jorgito","jorgito@gmail.com")));
	console.log("Añadida: " + ip2.url + ". Nº de imágenes: " + manager.addImage (ip2,new Category("Categoría 3"),a2));
	console.log("Añadida: " + il2.url + ". Nº de imágenes: " + manager.addImage (il2,new Category("Categoría 3"),a2));	
	manager.removeImage (il1);
	//testImageManagerWithImage();	

	showAllImages();
	showImagesByAuthor (a1);
	showImagesByAuthor (a2);
	showImagesByCategoryAuthor (cat1,a1);
	showImagesByCategoryAuthor (cat1,a2);	

	showPortraits();	
	showLandscapes();
} 
window.onload = testImageManager;

