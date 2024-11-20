"use strict";
// Objeto Coords para definir coordenadas.

function Coords(latitude = 0, longitude = 0){
	//La función se invoca con el operador new
	if (!(this instanceof Coords)) 
		throw new InvalidAccessConstructorException();

	latitude = typeof latitude !== 'undefined' ? Number(latitude).valueOf() : 0;
	if (Number.isNaN(latitude)  || latitude < -90 || latitude > 90) 
		throw new InvalidValueException("latitude", latitude);
	longitude = typeof longitude !== 'undefined' ? Number(longitude).valueOf() : 0;
	if (Number.isNaN(longitude)  || longitude < -180 || longitude > 180) 
		throw new InvalidValueException("longitude", longitude);

	var _latitude = latitude;
	var _longitude = longitude;

	Object.defineProperty(this, 'latitude', {
		get:function(){
			return _latitude;
		},
		set:function(value){
			value = typeof value !== 'undefined' ? Number(value).valueOf() : 0;
			if (Number.isNaN(value)  || value < -90 || value > 90) 
				throw new InvalidValueException("latitude", value);
			_latitude = value;
		}		
	});		

	Object.defineProperty(this, 'longitude', {
		get:function(){
			return _longitude;
		},
		set:function(value){
			value = typeof value !== 'undefined' ? Number(value).valueOf() : 0;
			if (Number.isNaN(value)  || value < -180 || value > 180) 
				throw new InvalidValueException("latitude", value);
			_longitude = value;
		}		
	});		

}
Coords.prototype = {};
Coords.prototype.constructor = Coords;

Coords.prototype.getSexagesimalLatitude = function (){	
	var direction = this.latitude >= 0 ? "N" : "S";
	var latitude = Math.abs(this.latitude);
	var grades =  Math.floor (latitude);
	var tmpMinutes = (latitude - grades) * 60;
	var minutes = Math.floor (tmpMinutes);
	var tmpSeconds = (tmpMinutes - minutes) * 60;
	var seconds = Math.round (tmpSeconds);

	return grades + "°" + minutes + "'" + seconds + "''" + direction; 
}

Coords.prototype.getSexagesimalLongitude = function (){	
	var direction = this.longitude >= 0 ? "E" : "W";
	var longitude = Math.abs(this.longitude);
	var grades =  Math.floor (longitude);
	var tmpMinutes = (longitude - grades) * 60;
	var minutes = Math.floor (tmpMinutes);
	var tmpSeconds = (tmpMinutes - minutes) * 60;
	var seconds = Math.round (tmpSeconds);

	return grades + "°" + minutes + "'" + seconds + "''" + direction; 
}

// Objeto Author para definir el autor.

function Author(nickname, email){
	//La función se invoca con el operador new
	if (!(this instanceof Author)) 
		throw new InvalidAccessConstructorException();

	nickname = nickname.trim();
	email = email.trim();

	if (nickname === 'undefined' || nickname === '') throw new EmptyValueException("nickname");
	if (/^[a-zA-Z][a-zA-Z0-9_\-]*(\.[a-zA-Z0-9_\-]*)*[a-zA-Z0-9]$/.test (nickname) !== true)
		throw new InvalidValueException("nickname", nickname);		

	if (email === 'undefined' || email === '') throw new EmptyValueException("email");	
	if (/^[a-zA-Z][a-zA-Z0-9_\-]*(\.[a-zA-Z0-9_\-]*)*[a-zA-Z0-9]\@[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test (email) !== true)
		throw new InvalidValueException("email", email);		

	var _nickname = nickname;
	var _email = email;
	var _avatar = null;

	Object.defineProperty(this, 'nickname', {
		get:function(){
			return _nickname;
		},
		set:function(value){
			if (value === 'undefined' || value === '') throw new EmptyValueException("nickname");
			if (/^[a-z][a-z0-9_\-]*(\.[a-z0-9_\-]*)*[a-z0-9]$/.test (value) !== true)
				throw new InvalidValueException("nickname", value);		
			_nickname = value;
		}		
	});		

	Object.defineProperty(this, 'email', {
		get:function(){
			return _email;
		},
		set:function(value){
			if (value === 'undefined' || value === '') throw new EmptyValueException("email");	
			if (/^[a-z][a-z0-9_\-]*(\.[a-z0-9_\-]*)*[a-z0-9]\@[a-z0-9]+\.[a-z]{2,3}$/.test (value) !== true)
				throw new InvalidValueException("email", value);		
			_email = value;
		}		
	});			

	Object.defineProperty(this, 'avatar', {
		get:function(){
			return _avatar;
		},
		set:function(value){
			if (value === 'undefined' || value == null) throw new EmptyValueException("avatar");	
			if (!value instanceof Image) throw new InvalidValueException("avatar", value);		
			_avatar = value;
		}		
	});				
}
Author.prototype = {};
Author.prototype.constructor = Author;

Author.prototype.toString = function (){	
	return "Author: " + this.nickname + "(" + this.email + ")"; 
}

//Objeto Image para definir una imagen. Es abstracto

function Image(title, url){
	//La función se invoca con el operador new
	if (!(this instanceof Image)) 
		throw new InvalidAccessConstructorException();

	//Comprobación para que Image sea clase abstracta.
    if ((this.constructor === Image)) {
        throw new AbstractClassException("Image");
    }

	title = title.trim();
	url = url.trim();

	if (title === 'undefined' || title === '') throw new EmptyValueException("title");

	if (url === 'undefined' || url === '') throw new EmptyValueException("url");	
	if (/^https?:\/\/(www\.)?[-a-zA-Z0-9@%._\+~#=]{2,256}(\:(\d){2,4})?(\/[a-zA-Z0-9_.$%._\+~#]+)*(\?(\w+=.*)(\&(\w+=.+))*)?$/.test (url) === true ||
		/^(\/?[a-zA-Z0-9_.$%._\+~#]+)*(\?(\w+=.*)(\&(\w+=.+))*)?$/.test (url) === true)
		var _url = url;
	else
		throw new InvalidValueException("url", url);		

	var _title = title;
	var _description = "";
	var _coords = null;

	Object.defineProperty(this, 'title', {
		get:function(){
			return _title;
		},
		set:function(value){
			if (value === 'undefined' || value === '') throw new EmptyValueException("title");
			_title = value;
		}		
	});		

	Object.defineProperty(this, 'url', {
		get:function(){
			return _url;
		},
		set:function(value){
			if (value === 'undefined' || value === '') throw new EmptyValueException("url");	
			if (/^https?:\/\/(www\.)?[-a-zA-Z0-9@%._\+~#=]{2,256}(\:(\d){2,4})?(\/[a-zA-Z0-9_.$%._\+~#]+)*(\?(\w+=.*)(\&(\w+=.+))*)?$/.test (value) === true ||
				/^(\/?[a-zA-Z0-9_.$%._\+~#]+)*(\?(\w+=.*)(\&(\w+=.+))*)?$/.test (value) === true)
				_url = value;
			else
				throw new InvalidValueException("url", value);		
		}		
	});			

	Object.defineProperty(this, 'coords', {
		get:function(){
			return _coords;
		},
		set:function(value){
			if (value === 'undefined' || value == null) throw new EmptyValueException("coords");	
			if (!value instanceof Coords) throw new InvalidValueException("coords", value);		
			_coords = value;
		}		
	});				

	Object.defineProperty(this, 'description', {
		get:function(){
			return _description;
		},
		set:function(value){
			if (value === 'undefined') throw new EmptyValueException("description");	
			_description = value;
		}		
	});				

}
Image.prototype = {};
Image.prototype.constructor = Image;

Image.prototype.toString = function (){	
	return this.constructor.name + ": " + this.title + "(" + this.url + "). " + this.description; 
}

// Objeto Portrait herencia de Image

function Portrait(title, url){
	//Invocamos el constructor de la clase padre, en él se comprueba que utilizamos el operador new.
	Image.call(this,title, url);	
}
Portrait.prototype = Object.create(Image.prototype);
Portrait.prototype.constructor = Portrait;

Portrait.prueba = function (){
	return "Portrait";
}

// Objeto Portrait herencia de Image

function Landscape(title, url){
	//Invocamos el constructor de la clase padre, en él se comprueba que utilizamos el operador new.
	Image.call(this,title, url);	
}
Landscape.prototype = Object.create(Image.prototype);
Landscape.prototype.constructor = Landscape;

Landscape.prueba = function (){
	return "Landscape";
}


// Objeto Category para definir el autor.

function Category(title = "Anon"){
	//La función se invoca con el operador new
	if (!(this instanceof Category)) 
		throw new InvalidAccessConstructorException();

	title = title.trim();
	if (title === 'undefined' || title === 'Anon') throw new EmptyValueException("title");					

	var _title = title;	
	var _description = "";

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
	
	Object.defineProperty(this, 'description', {
		get:function(){
			return _description;
		},
		set:function(value){
			if (value === 'undefined') throw new EmptyValueException("description");	
			_description = value;
		}		
	});				

}
Category.prototype = {};
Category.prototype.constructor = Category;
Category.prototype.toString = function (){	
	return "Category: " + this.title + " (" + this.description + ")"; 
}
