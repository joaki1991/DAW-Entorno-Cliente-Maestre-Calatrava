"use strict";
// Objeto ImageManager

function ImageManagerException() {
	this.name = "ImageManagerException";
	this.message = "Error: Image Manger Generic Exception.";
}
ImageManagerException.prototype = new BaseException(); //Heredamos de BaseException
ImageManagerException.prototype.constructor = ImageManagerException;

function AuthorImageManagerException() {
	this.name = "AuthorImageManagerException";
	this.message = "Error: The method needs a Author parameter.";
}
AuthorImageManagerException.prototype = new ImageManagerException(); //Heredamos de ImageManagerException
AuthorImageManagerException.prototype.constructor = AuthorImageManagerException;

function AuthorExistsImageManagerException() {
	this.name = "AuthorExistsImageManagerException";
	this.message = "Error: The author exists in the image manager.";
}
AuthorExistsImageManagerException.prototype = new ImageManagerException(); //Heredamos de ImageManagerException
AuthorExistsImageManagerException.prototype.constructor = AuthorExistsImageManagerException;

function AuthorNotExistsImageManagerException() {
	this.name = "AuthorNotExistsImageManagerException";
	this.message = "Error: The author doesn't exist in the image manager.";
}
AuthorNotExistsImageManagerException.prototype = new ImageManagerException(); //Heredamos de ImageManagerException
AuthorNotExistsImageManagerException.prototype.constructor = AuthorNotExistsImageManagerException;

function DefaultAuthorImageManagerException() {
	this.name = "DefaultAuthorImageManagerException";
	this.message = "Error: The deafult author can't be removed.";
}
DefaultAuthorImageManagerException.prototype = new ImageManagerException(); //Heredamos de ImageManagerException
DefaultAuthorImageManagerException.prototype.constructor = DefaultAuthorImageManagerException;

function CategoryImageManagerException() {
	this.name = "CategoryImageManagerException";
	this.message = "Error: The method needs a Category parameter.";
}
CategoryImageManagerException.prototype = new ImageManagerException(); //Heredamos de ImageManagerException
CategoryImageManagerException.prototype.constructor = CategoryImageManagerException;

function CategoryExistsImageManagerException() {
	this.name = "CategoryExistsImageManagerException";
	this.message = "Error: The category exists in the image manager.";
}
CategoryExistsImageManagerException.prototype = new ImageManagerException(); //Heredamos de ImageManagerException
CategoryExistsImageManagerException.prototype.constructor = CategoryExistsImageManagerException;

function CategoryNotExistsImageManagerException() {
	this.name = "CategoryNotExistsImageManagerException";
	this.message = "Error: The category doesn't exist in the image manager.";
}
CategoryNotExistsImageManagerException.prototype = new ImageManagerException(); //Heredamos de ImageManagerException
CategoryNotExistsImageManagerException.prototype.constructor = CategoryNotExistsImageManagerException;

function DefaultCategoryImageManagerException() {
	this.name = "DefaultCategoryImageManagerException";
	this.message = "Error: The deafult category can't be removed.";
}
DefaultCategoryImageManagerException.prototype = new ImageManagerException(); //Heredamos de ImageManagerException
DefaultCategoryImageManagerException.prototype.constructor = DefaultCategoryImageManagerException;

function ImageImageManagerException() {
	this.name = "ImageImageManagerException";
	this.message = "Error: The method needs a Image parameter.";
}
ImageImageManagerException.prototype = new ImageManagerException(); //Heredamos de ImageManagerException
ImageImageManagerException.prototype.constructor = ImageImageManagerException;

function ImageExistsImageManagerException(category) {
	this.name = "ImageExistsImageManagerException";
	this.message = "Error: The image exists in the category '" + category.title + "'.";
}
ImageExistsImageManagerException.prototype = new ImageManagerException(); //Heredamos de ImageManagerException
ImageExistsImageManagerException.prototype.constructor = ImageExistsImageManagerException;

function ImageNotExistsImageManagerException(category) {
	var cat = (!category) ? '' : category.title;
	this.name = "ImageNotExistsImageManagerException";
	this.message = "Error: The image doesn't exist in the category '" + cat + "'.";
}
ImageNotExistsImageManagerException.prototype = new ImageManagerException(); //Heredamos de ImageManagerException
ImageNotExistsImageManagerException.prototype.constructor = ImageNotExistsImageManagerException;

var ImageManager = (function () { //La función anónima devuelve un método getInstance que permite obtener el objeto único
	var instantiated; //Objeto con la instancia única ImageManager

	function init() { //Inicialización del Singleton

		//Declaración de la función constructora de la instancia ImageManager
		function ImageManager(){
			//La función se invoca con el operador new
			if (!(this instanceof ImageManager)) 
				throw new InvalidAccessConstructorException();

			/* Definición del atributo title */
			var _title = "Anonimous";
			Object.defineProperty(this, 'title', {
				get:function(){
					return _title;
				},
				set:function(title = "Anonimous"){
					title = title.trim();
					if (title === 'undefined' || title === 'Anon') throw new EmptyValueException("title");					
					_title = title;
				}		
			});		

			/* Definición del atributo authors como array para contener todos los autores del gestor. */
			var _authors = []; //array con los autores de imágenes.
			//Devuelve un iterator de los autores del gestor
			Object.defineProperty(this, 'authors', {
				get:function(){
				    var nextIndex = 0;		    
				    return {
				       next: function(){
				           return nextIndex < _authors.length ?
				               {value: _authors[nextIndex++], done: false} :
				               {done: true};
				       }
				    }
				}	
			});	

			//Añade un nuevo autor al gestor
			this.addAuthor = function(author){
				if (!(author instanceof Author)) { 
					throw new AuthorImageManagerException ();
				}		
				var position = getAuthorPosition(author); 	
				if (position === -1){
					_authors.push(author);
				} else{
					throw new AuthorExistsImageManagerException();
				}	

				return _authors.length;
			}

			//Elimina un nuevo autor del gestor
			this.removeAuthor = function(author){
				if (!(author instanceof Author)) { 
					throw new AuthorImageManagerException ();
				}		
				var position = getAuthorPosition(author); 	
				if (position !== -1){
					if (author.nickname !== _defaultAuthor.nickname){
						_authors.splice(position, 1);
					} else{
						throw new DefaultAuthorImageManagerException();
					}															
				} else{
					throw new AuthorNotExistsImageManagerException();
				}	
				return _authors.length;
			}

			//Dado un autor, devuelve la posición de ese autor en el array de autores o -1 si no lo encontramos.
			function getAuthorPosition(author){
				if (!(author instanceof Author)) { 
					throw new AuthorImageManagerException ();
				}		

				function compareElements(element) {
				  return (element.nickname === author.nickname)
				}
				
				return _authors.findIndex(compareElements);		
			}

			//Autor por defecto.
			var _defaultAuthor = new Author("Anonymous","anonymous@anonymous.com"); //Autor por defecto
			this.addAuthor(_defaultAuthor);

			//Devuelve un iterator de los autores del gestor
			Object.defineProperty(this, 'defaultAuthor', {
				get:function(){
					return _defaultAuthor;
				}	
			});	

			/* Definición del atributo categories como array para contener todas las categorías del gestor. */
			var _categories = []; //array de categorías.

			//Devuelve un iterator de los autores del gestor
			Object.defineProperty(this, 'categories', {
				get:function(){
				    var nextIndex = 0;		    
				    return {
				       next: function(){
				           return nextIndex < _categories.length ?
				               {value: _categories[nextIndex++].category, done: false} :
				               {done: true};
				       }
				    }
				}	
			});	

			//Añade un nuevo autor al gestor
			this.addCategory = function(category){
				if (!(category instanceof Category)) { 
					throw new CategoryImageManagerException();
				}		
				var position = getCategoryPosition(category); 	
				if (position === -1){
					_categories.push(
						{
							category: category,
							images:[]
						}
					);
				} else{
					throw new CategoryExistsImageManagerException();
				}	

				return _categories.length;
			}

			//Elimina una categoría del gestor
			this.removeCategory = function(category){
				if (!(category instanceof Category)) { 
					throw new CategoryImageManagerException();
				}		
				var position = getCategoryPosition(category); 	
				if (position !== -1){
					if (category.title !== _defaultCategory.title){
						_categories.splice(position, 1);
					} else{
						throw new DefaultCategoryImageManagerException();
					}					
				} else{
					throw new CategoryNotExistsImageManagerException();
				}	
				return _categories.length;
			}

			//Dado una categoría, devuelve la posición de esa categoría en el array de categorías o -1 si no lo encontramos.
			function getCategoryPosition(category){
				if (!(category instanceof Category)) { 
					throw new CategoryImageManagerException();
				}		

				function compareElements(element) {
				  return (element.category.title === category.title)
				}
				
				return _categories.findIndex(compareElements);		
			}

			//Categoría por defecto.
			var _defaultCategory = new Category ("Anonymous category"); //Categoría por defecto
			this.addCategory(_defaultCategory);

			//Devuelve un iterator de los autores del gestor
			Object.defineProperty(this, 'defaultCategory', {
				get:function(){
					return _defaultCategory;
				}	
			});	

			/* Métodos para trabajar con las imágenes */
			//Añade una nueva imagen a una categoría con un autor. Tiene en cuenta autores y categorías por defecto
			this.addImage = function(image, category, author){
				if (!(image instanceof Image)) { 
					throw new ImageImageManagerException();
				}	
				if (category === null || category === 'undefined' || category === ''){
					category = this.defaultCategory;
				}	
				if (!(category instanceof Category)) { 
					throw new CategoryImageManagerException();
				}		
				if (author === null || author === 'undefined' || author === ''){
					author = this.defaultAuthor;
				}	
				if (!(author instanceof Author)) { 
					throw new AuthorImageManagerException ();
				}		

				//Obtenemos posición de la categoría. Si no existe se añade.
				var categoryPosition = getCategoryPosition(category); 
				if (categoryPosition === -1){
					categoryPosition = this.addCategory(category)-1;
				}	

				//Obtenemos posición del autor. Si no existe se añade.
				var authorPosition = getAuthorPosition(author); 
				if (authorPosition === -1){
					authorPosition = this.addAuthor(author)-1;
				}

				//Obtenemos posición de la imagen en la categoría. Si no existe se añade. Si existe se lanza excepción.
				var imagePosition = getImagePosition(image, _categories[categoryPosition].images); 	
				if (imagePosition === -1){
					_categories[categoryPosition].images.push(
						{
							image: image,
							author: _authors[authorPosition].nickname
						}
					);
				} else{
					throw new ImageExistsImageManagerException(category);
				}	

				return _categories[categoryPosition].images.length;
			}

			//Dado una imagen, devuelve su posición en la categoría
			function getImagePosition(image, categoryImages){
				if (!(image instanceof Image)) { 
					throw new ImageImageManagerException();
				}		

				function compareElements(element) {
				  return (element.image.url === image.url)
				}
				
				return categoryImages.findIndex(compareElements);		
			}

			//Elimina una imagen de una categoría del gestor
			this.removeImageCategory = function(image, category){
				if (!(image instanceof Image)) { 
					throw new ImageImageManagerException();
				}						
				if (!(category instanceof Category)) { 
					throw new CategoryImageManagerException();
				}		

				var categoryPosition = getCategoryPosition(category); 	
				if (categoryPosition !== -1){
					var imagePosition = getImagePosition(image, _categories[categoryPosition].images); 	
					if (imagePosition !== -1){
						_categories[categoryPosition].images.splice(imagePosition, 1);
					} else{
						throw new ImageNotExistsImageManagerException(category);
					}	
				} else{
					throw new CategoryNotExistsImageManagerException();
				}	
				return _categories[categoryPosition].images.length; 
			}

			//Elimina una imagen del gestor
			this.removeImage = function(image){
				if (!(image instanceof Image)) { 
					throw new ImageImageManagerException();
				}				

				var i = _categories.length - 1, position = -1;
				while (i >= 0 && position === -1){					
					position = getImagePosition(image, _categories[i].images); 
					i--;
				}		

				if (position !== -1){
					_categories[i+1].images.splice(position, 1);
				} else {
					throw new ImageNotExistsImageManagerException();
				}
			}

			//Devuelve todas las imágenes de una determinada categoría
			this.getCategoryImages = function(category){
				if (!(category instanceof Category)) { 
					throw new CategoryImageManagerException();
				}		

				var categoryPosition = getCategoryPosition(category); 	
				if (categoryPosition === -1) throw new CategoryNotExistsImageManagerException();
				var nextIndex = 0;
			    return {
			       next: function(){
			           return nextIndex < _categories[categoryPosition].images.length ?
			               {value: _categories[categoryPosition].images[nextIndex++].image, done: false} :
			               {done: true};
			       }
			    }
			}

			//Devuelve todas las imágenes de una determinada categoría
			this.getAuthorImages = function(author){
				if (!(author instanceof Author)) { 
					throw new AuthorImageManagerException ();
				}		
				var authorPosition = getAuthorPosition(author);  	
				if (authorPosition === -1) throw new AuthorNotExistsImageManagerException();
				var categoryPosition = 0;
				var imagePosition = 0;

			    return {
			       next: function(){	
			       		var image = null;
			       		while (categoryPosition < _categories.length && image === null){
			       			if (imagePosition < _categories[categoryPosition].images.length &&
			       				_categories[categoryPosition].images[imagePosition].author === author.nickname){
			       				image = _categories[categoryPosition].images[imagePosition].image;
			       			}
			       			imagePosition++;
			       			if (imagePosition >= _categories[categoryPosition].images.length){
			       				imagePosition = 0;
			       				categoryPosition++;
			       			}
			       		}
			       		if (image !== null){
			       			return {value: image, done: false}
			       		}
			       		if (categoryPosition >= _categories.length) return {done: true};
			       }
			    }
			}

			//Devuelve todas las imágenes de una determinada categoría para un determinado autor.
			this.getCategoryAuthorImages = function(category, author){
				if (!(category instanceof Category)) { 
					throw new CategoryImageManagerException();
				}		
				if (!(author instanceof Author)) { 
					throw new AuthorImageManagerException ();
				}		
				var categoryPosition = getCategoryPosition(category); 	
				if (categoryPosition === -1) throw new CategoryNotExistsImageManagerException();
				var nextIndex = 0;
			    return {
			       next: function(){
			       		var image = null;
			       		while (nextIndex < _categories[categoryPosition].images.length && image === null){
			       			if (_categories[categoryPosition].images[nextIndex].author === author.nickname){
			       				image = _categories[categoryPosition].images[nextIndex].image;
			       			}
			       			nextIndex++;
			       		}
			       		if (image !== null){
			       			return {value: image, done: false}
			       		}
			       		if (nextIndex >= _categories[categoryPosition].images.length) return {done: true};
			       }
			    }
			}

			//Devuelve todas las imágenes Portraits
			this.getPortraits = function(){
				var categoryPosition = 0;
				var imagePosition = 0;
			    return {
			       next: function(){	
			       		var image = null;
			       		while (categoryPosition < _categories.length && image === null){
			       			if (imagePosition < _categories[categoryPosition].images.length &&
			       				_categories[categoryPosition].images[imagePosition].image instanceof Portrait){
			       				image = _categories[categoryPosition].images[imagePosition].image;
			       			}
			       			imagePosition++;
			       			if (imagePosition >= _categories[categoryPosition].images.length){
			       				imagePosition = 0;
			       				categoryPosition++;
			       			}
			       		}
			       		if (image !== null){
			       			return {value: image, done: false}
			       		}
			       		if (categoryPosition >= _categories.length) return {done: true};
			       }
			    }
			}

			//Devuelve todas las imágenes Portraits
			this.getLandscapes = function(){
				var categoryPosition = 0;
				var imagePosition = 0;
			    return {
			       next: function(){	
			       		var image = null;
			       		while (categoryPosition < _categories.length && image === null){
			       			if (imagePosition < _categories[categoryPosition].images.length &&
			       				_categories[categoryPosition].images[imagePosition].image instanceof Landscape){
			       				image = _categories[categoryPosition].images[imagePosition].image;
			       			}
			       			imagePosition++;
			       			if (imagePosition >= _categories[categoryPosition].images.length){
			       				imagePosition = 0;
			       				categoryPosition++;
			       			}
			       		}
			       		if (image !== null){
			       			return {value: image, done: false}
			       		}
			       		if (categoryPosition >= _categories.length) return {done: true};
			       }
			    }
			}		

		} //Fin constructor ImageManager
		ImageManager.prototype = {}; 
		ImageManager.prototype.constructor = ImageManager;

		var instance = new ImageManager();//Devolvemos el objeto ImageManager para que sea una instancia única.
		Object.freeze(instance);
		return instance;
	} //Fin inicialización del Singleton
	return {
		// Devuelve un objeto con el método getInstance
		getInstance: function () { 
			if (!instantiated) { //Si la variable instantiated es undefined, priemera ejecución, ejecuta init.
				instantiated = init(); //instantiated contiene el objeto único
			}
			return instantiated; //Si ya está asignado devuelve la asignación.
		}
	};
})();