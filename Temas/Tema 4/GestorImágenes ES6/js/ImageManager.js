"use strict";
import {BaseException,
	InvalidAccessConstructorException,
	EmptyValueException,
	ParameterValidationException,
	InvalidValueException,
	AbstractClassException } from './BaseException.js';
import {Coords, Author, Image, Portrait, Landscape, Category} from './ObjectsImageManager.js';

// Objeto ImageManager
class ImageManagerException extends BaseException {
	constructor(message = "Error: Image Manger Generic Exception.",fileName, lineNumber) {
		super(message, fileName, lineNumber);
		this.name = "ImageManagerException";
	}
}

class AuthorImageManagerException extends ImageManagerException {
	constructor(fileName, lineNumber) {
		super("Error: The method needs a Author parameter.", fileName, lineNumber);
		this.name = "AuthorImageManagerException";
	}
}

class AuthorExistsImageManagerException extends ImageManagerException {
	constructor(fileName, lineNumber) {
		super("Error: The author exists in the image manager.", fileName, lineNumber);
		this.name = "AuthorExistsImageManagerException";
	}
}

class AuthorNotExistsImageManagerException extends ImageManagerException {
	constructor(fileName, lineNumber) {
		super("Error: The author doesn't exist in the image manager.", fileName, lineNumber);
		this.name = "AuthorNotExistsImageManagerException";
	}
}

class DefaultAuthorImageManagerException extends ImageManagerException {
	constructor(fileName, lineNumber) {
		super("Error: The deafult author can't be removed.", fileName, lineNumber);
		this.name = "DefaultAuthorImageManagerException";
	}
}

class CategoryImageManagerException extends ImageManagerException {
	constructor(fileName, lineNumber) {
		super("Error: The method needs a Category parameter.", fileName, lineNumber);
		this.name = "CategoryImageManagerException";
	}
}

class CategoryExistsImageManagerException extends ImageManagerException {
	constructor(fileName, lineNumber) {
		super("Error: The category exists in the image manager.", fileName, lineNumber);
		this.name = "CategoryExistsImageManagerException";
	}
}

class CategoryNotExistsImageManagerException extends ImageManagerException {
	constructor(fileName, lineNumber) {
		super("Error: The category doesn't exist in the image manager.", fileName, lineNumber);
		this.name = "CategoryNotExistsImageManagerException";
	}
}

class DefaultCategoryImageManagerException extends ImageManagerException {
	constructor(fileName, lineNumber) {
		super("Error: The deafult category can't be removed.", fileName, lineNumber);
		this.name = "DefaultCategoryImageManagerException";
	}
}

class ImageImageManagerException extends ImageManagerException {
	constructor(fileName, lineNumber) {
		super("Error: The method needs a Image parameter.", fileName, lineNumber);
		this.name = "ImageImageManagerException";
	}
}

class ImageExistsImageManagerException extends ImageManagerException {
	constructor(category, fileName, lineNumber) {
		super("Error: The image exists in the category '" + category.title + "'.", fileName, lineNumber);
		this.name = "ImageExistsImageManagerException";
	}
}

class ImageNotExistsImageManagerException extends ImageManagerException {
	constructor(category, fileName, lineNumber) {
		let message = (!category) ? "Error: The image doesn't exist." : 
			"Error: The image doesn't exist in the category '" + category.title;
		super(message, fileName, lineNumber);
		this.name = "ImageNotExistsImageManagerException";
	}
}

class ImageBelongsDifferentAuthorManagerException extends ImageManagerException {
	constructor(fileName, lineNumber) {
		super("Error: the image belongs to another author", fileName, lineNumber);
		this.name = "ImageBelongsDifferentAuthorManagerException";
	}
}

let ImageManager = (function () { //La función anónima devuelve un método getInstance que permite obtener el objeto único
	let instantiated; //Objeto con la instancia única ImageManager

	function init() { //Inicialización del Singleton

		//Declaración de la clase ImageManager
		class ImageManager {
			#title = "Anonimous";
			/* Definición del atributo authors como array para contener todos los autores del gestor. */
			#authors = []; //array con los autores de imágenes.
			/* Definición del atributo categories como array para contener todas las categorías del gestor. */
			#categories = []; //array de categorías.
			/* Definición del atributo images con las imágenes del gestor */
			#images = []; //array con las imágenes.

			/*
				Estructura para almacenar los objetos
				#images: [] // Array con las imágenes del gestor
				#categories: [ // Array contiene objeto literal con la categoría y un array con las imágenes de esa categoría
					{ 
						category: category,
						images: [ Image ] // El array contiene las referencias al objeto Image
					}
				]
				#authors: [ // Array contiene objeto literal con el Author y un array con las imágenes de ese autor
					{ 
						author: author,
						images: [ Image ] // El array contiene las referencias al objeto Image
					}
				]

			*/

			#defaultAuthor = new Author("Anonymous", "anonymous@anonymous.com"); //Autor por defecto
			#defaultCategory = new Category("Anonymous category"); //Categoría por defecto	
			// Imágenes del autor y la categoría por defecto.
			#defaultAuthorImages;
			#defaultCategoryImages;

			//Declaración de funciones privadas
			//Dado un autor, devuelve la posición de ese autor en el array de autores o -1 si no lo encontramos.
			//Hemos elegido comparar por contenido no por referencia.
			#getAuthorPosition(author) {
				if (!(author instanceof Author)) {
					throw new AuthorImageManagerException();
				}

				function compareElements(element) {
					return (element.author.nickname === author.nickname)
				}

				return this.#authors.findIndex(compareElements);
			}

			//Dado una categoría, devuelve la posición de esa categoría en el array de categorías o -1 si no lo encontramos.
			//Hemos elegido comparar por contenido no por referencia.
			#getCategoryPosition(category) {
				if (!(category instanceof Category)) {
					throw new CategoryImageManagerException();
				}

				function compareElements(element) {
					return (element.category.title === category.title)
				}

				return this.#categories.findIndex(compareElements);
			}

			//Dado una imagen, devuelve su posición 
			//Hemos elegido comparar por contenido no por referencia.
			#getImagePosition(image, images = this.#images) {
				if (!(image instanceof Image)) {
					throw new ImageImageManagerException();
				}

				function compareElements(element) {
					return (element.url === image.url)
				}

				return images.findIndex(compareElements);
			}

			constructor() {
				//Añadimos author y category por defecto.
				this.addAuthor(this.#defaultAuthor);
				this.addCategory(this.#defaultCategory);
				this.#defaultAuthorImages = this.#authors[0].images;
				this.#defaultCategoryImages = this.#categories[0].images;
			}

			/* Definición del atributo title */
			get title() {
				return this.#title;
			}
			set title(title = "Anonimous") {
				title = title.trim();
				if (title === 'undefined' || title === 'Anon') throw new EmptyValueException("title");
				this.#title = title;
			}

			//Devuelve un iterator de los autores del gestor
			get authors() {
				let nextIndex = 0;
				// referencia para habilitar el closure en el objeto. En el generador se pierde la referencia this, por lo que hay que guardarla como closure
				let array = this.#authors;
				// Los getter no admiten generadores, deben devolver un objeto iterable. [Symbol.iterator]() puede ser generador.
				return {
				  * [Symbol.iterator](){
					// Recorremos todos los autores menos el de por defecto.
					for (let i = 1; i < array.length; i++){
					  yield array[i].author;
					}
				  }
				}			  
			}

			//Añade un nuevo autor al gestor
			addAuthor(author) {
				if (!(author instanceof Author)) {
					throw new AuthorImageManagerException();
				}
				// Trabaja con un array de objetos Author
				let position = this.#getAuthorPosition(author);
				if (position === -1) {
					this.#authors.push({
						author:author,
						images: []
					});
				} else {
					throw new AuthorExistsImageManagerException();
				}

				return this;
			}

			//Devuelve Author por defecto
			get defaultAuthor() {
				return this.#defaultAuthor;
			}

			//Devuelve un iterator de los autores del gestor
			get categories() {
				let nextIndex = 0;
				// referencia para habilitar el closure en el objeto
				let array = this.#categories;
				return {
				  * [Symbol.iterator](){
					for (let i = 0; i < array.length; i++){
						yield array[i].category;
					}  
				  }
				}			  
			}

			//Añade un nuevo autor al gestor
			addCategory(category) {
				if (!(category instanceof Category)) {
					throw new CategoryImageManagerException();
				}
				let position = this.#getCategoryPosition(category);
				if (position === -1) {
					// Añade objeto literal con una propiedad para la categoría y un array para las imágenes dentro de la categoría
					this.#categories.push(
						{
							category: category,
							images: []
						}
					);
				} else {
					throw new CategoryExistsImageManagerException();
				}

				return this;
			}


			//Devuelve un iterator de los autores del gestor
			get defaultCategory() {
				return this.#defaultCategory;
			}

			/* Métodos para trabajar con las imágenes */
			//Añade una nueva imagen a una categoría con un autor. Tiene en cuenta autores y categorías por defecto
			addImage(image, category = this.defaultCategory, author = this.defaultAuthor) {
				if (!(image instanceof Image)) {
					throw new ImageImageManagerException();
				}
				if (!(category instanceof Category)) {
					throw new CategoryImageManagerException();
				}
				if (!(author instanceof Author)) {
					throw new AuthorImageManagerException();
				}

				//Obtenemos posición de la categoría. Si no existe se añade.
				let categoryPosition = this.#getCategoryPosition(category);
				if (categoryPosition === -1) {
					categoryPosition = this.addCategory(category) - 1;
				}

				//Obtenemos posición del autor. Si no existe se añade.
				let authorPosition = this.#getAuthorPosition(author);
				if (authorPosition === -1) {
					authorPosition = this.addAuthor(author) - 1;
				}

				//Obtenemos posición de la imagen. Si no existe se añade.
				let imagePosition = this.#getImagePosition(image);
				if (imagePosition === -1) {
					this.#images.push (image);
					imagePosition = this.#images.length -1;
				}

				// Verificamos que la imagen no pertenece a otro autor.
				let owner = this.getImageAuthor(image);
				if (owner !== null && owner.nickname !== author.nickname){
					throw new ImageBelongsDifferentAuthorManagerException();
				}			

				// Asiganamos la imagen al autor si no existe
				if (this.#getImagePosition(image, this.#authors[authorPosition].images) === -1){
					this.#authors[authorPosition].images.push(this.#images[imagePosition]);
				}

				// Asiganamos la imagen a la categoría si no existe
				if (this.#getImagePosition(image, this.#categories[categoryPosition].images) === -1){
					this.#categories[categoryPosition].images.push(this.#images[imagePosition]);
				}

				return this;
			}

			getImageAuthor(image){
				for (let author of this.#authors){
					for (let img of author.images){
						if (img.url === image.url) return author.author;
					}
				}

				return null;
			}

			//Devuelve todas las categorías de una imágen.
			* getImageCategories(image) {
				// Iteramos array con las categorías
				for (let cat of this.#categories){
					// Iteramos el array de imágenes de cada categoría
					let category = null;
					let i = 0;
					while (i < cat.images.length && !category){ // Condición de salida si encontramos la imagen.
						if(cat.images[i].url === image.url){ // Comparamos por url
							category = cat.category;
						}
						i++;
					}
					if(category) yield category;
				}
			}

			//Devuelve todas las imágenes de una determinada categoría
			* getImagesByCategory(category) {
				if (!(category instanceof Category)) {
					throw new CategoryImageManagerException();
				}
				let categoryPosition = this.#getCategoryPosition(category);
				if (categoryPosition === -1) throw new CategoryNotExistsImageManagerException();
				// Iteramos sobre el array de imágenes de la categoría encontrada
				for (let img of this.#categories[categoryPosition].images){
					yield img;
				}
			}

			//Devuelve todas las imágenes de una determinada categoría
			* getImagesByAuthor(author) {
				if (!(author instanceof Author)) {
					throw new AuthorImageManagerException();
				}
				let authorPosition = this.#getAuthorPosition(author);
				if (authorPosition === -1) throw new AuthorNotExistsImageManagerException();
				// Iteramos sobre el array de imágenes del autor encontrado
				for (let img of this.#authors[authorPosition].images){
					yield img;
				}
			}

			//Devuelve todas las imágenes de una determinada categoría para un determinado autor.
			* getImagesByCategoryAndAuthor(category, author) {
				if (!(category instanceof Category)) {
					throw new CategoryImageManagerException();
				}
				if (!(author instanceof Author)) {
					throw new AuthorImageManagerException();
				}
				let categoryPosition = this.#getCategoryPosition(category);
				if (categoryPosition === -1) throw new CategoryNotExistsImageManagerException();
				let authorPosition = this.#getAuthorPosition(author);
				if (authorPosition === -1) throw new AuthorNotExistsImageManagerException();

				// Iteramos sobre la categoría encontrada
				for (let img of this.#categories[categoryPosition].images){
					if(this.getImageAuthor(img).nickname === author.nickname){ // Comparamos nickname
						yield img;
					}
				}
			}

			//Devuelve todas las imágenes Portraits
			* getPortraits() {
				for (let img of this.#images){
					if(img instanceof Portrait){ // Comparamos tipo instancia
						yield img;
					}
				}
			}

			//Devuelve todas las imágenes Portraits
			* getLandscapes() {
				for (let img of this.#images){
					if(img instanceof Landscape){ // Comparamos tipo instancia
						yield img;
					}
				}
			}


			//Elimina una imagen de una categoría del gestor
			removeImageInCategory(image, category) {
				if (!(image instanceof Image)) {
					throw new ImageImageManagerException();
				}
				if (!(category instanceof Category)) {
					throw new CategoryImageManagerException();
				}
				// Obtenemos la posición de la categoría
				let categoryPosition = this.#getCategoryPosition(category);
				if (categoryPosition !== -1) {
					// Obtenemos la posición de la imagen en la categoría
					let imagePosition = this.#getImagePosition(image, this.#categories[categoryPosition].images);
					if (imagePosition !== -1) {
						this.#categories[categoryPosition].images.splice(imagePosition, 1);
					} else {
						throw new ImageNotExistsImageManagerException(category);
					}
				} else {
					throw new CategoryNotExistsImageManagerException();
				}

				return this;
			}

			//Elimina una imagen del gestor. No devuelve nada, sabemos que se ha borrado porque no hay excepción.
			removeImage(image) {
				if (!(image instanceof Image)) {
					throw new ImageImageManagerException();
				}

				let author = this.getImageAuthor(image);
				if (!author) throw new ImageNotExistsImageManagerException(); // La imagen no existe en el manager
				let authorPosition = this.#getAuthorPosition(author); // Posición del autor
				// Borrado de la imagen en el array de imágenes del autor
				this.#authors[authorPosition].images.splice(this.#getImagePosition(image, this.#authors[authorPosition].images),1);

				// Borrado de la imagen en las categorías
				for (let cat of this.#categories){
					// Iteramos el array de imágenes de cada categoría
					let i = 0;
					while (i < cat.images.length){ // Condición de salida si hemos borrado
						if(cat.images[i].url === image.url){ // Comparamos por url
							cat.images.splice(i, 1); // Borrado
							break; // No necesitamos seguir iterando
						}
						i++;
					}
				}

				let imagePosition = this.#getImagePosition(image, this.#images); // Posición en el array de imágenes
				this.#images.splice(imagePosition, 1); // Borrado de la imagen en el array de imágenes

				return this;
			}

			//Elimina un nuevo autor del gestor
			removeAuthor(author) {
				if (!(author instanceof Author)) {
					throw new AuthorImageManagerException();
				}
				// Recuperamos la posición del Author en el array.
				let position = this.#getAuthorPosition(author);
				if (position !== -1) {
					if (author.nickname !== this.#defaultAuthor.nickname) {
						// Pasamos todas sus imágenes al usuario por defecto
						for (let image of this.#authors[position].images){
							this.#authors[0].images.push(image);
						}		
						this.#authors.splice(position, 1);
					} else {
						throw new DefaultAuthorImageManagerException();
					}
				} else {
					throw new AuthorNotExistsImageManagerException();
				}
				return this.#authors.length;
			}

			//Elimina una categoría del gestor
			removeCategory(category) {
				if (!(category instanceof Category)) {
					throw new CategoryImageManagerException();
				}
				let position = this.#getCategoryPosition(category);
				if (position !== -1) {
					if (category.title !== this.#defaultCategory.title) {
						// Recogemos todas los índices de las categorías menos las de por defecto y la que estamos borrando
						let restPositions = Array.from(Array(this.#categories.length), (el, i) => i);
						restPositions.splice(position,1);
						restPositions.splice(0,1);
						// Recorremos todas las imágenes de la categoría que estamos borrando 
						for(let image of this.#categories[position].images){
							let insertInDefault = true;
							for(let index of restPositions){ // Chequeamos si cada imagen pertenece a otra categoría que no sea la de por defecto
								if (this.#getImagePosition(image, this.#categories[index].images) > -1){
									insertInDefault = false;
									break;
								}
							}
							if (insertInDefault) this.#categories[0].images.push(image);
						}
						this.#categories.splice(position, 1);
					} else {
						throw new DefaultCategoryImageManagerException();
					}
				} else {
					throw new CategoryNotExistsImageManagerException();
				}
				return this;
			}
		}

		let instance = new ImageManager();//Devolvemos el objeto ImageManager para que sea una instancia única.
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

export {BaseException,
	InvalidAccessConstructorException,
	EmptyValueException,
	ParameterValidationException,
	InvalidValueException,
	AbstractClassException };
export {Coords, Author, Image, Portrait, Landscape, Category};
export {ImageManagerException,
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
	ImageBelongsDifferentAuthorManagerException};

export default ImageManager;

