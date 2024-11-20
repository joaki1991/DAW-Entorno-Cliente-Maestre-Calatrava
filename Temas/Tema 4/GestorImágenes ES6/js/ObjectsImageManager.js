"use strict";
import {BaseException,
	InvalidAccessConstructorException,
	EmptyValueException,
	ParameterValidationException,
	InvalidValueException,
	AbstractClassException } from './BaseException.js';

// Objeto Coords para definir coordenadas.
class Coords {
	#latitude;
	#longitude;

	constructor(latitude = 0, longitude = 0){

		latitude = typeof latitude !== 'undefined' ? Number(latitude).valueOf() : 0;
		if (Number.isNaN(latitude)  || latitude < -90 || latitude > 90) 
			throw new InvalidValueException("latitude", latitude);
		longitude = typeof longitude !== 'undefined' ? Number(longitude).valueOf() : 0;
		if (Number.isNaN(longitude)  || longitude < -180 || longitude > 180) 
			throw new InvalidValueException("longitude", longitude);
	
		this.#latitude = latitude;
		this.#longitude = longitude;		
	}

	get latitude(){
		return this.#latitude;
	}
	set latitude(value){
		value = typeof value !== 'undefined' ? Number(value).valueOf() : 0;
		if (Number.isNaN(value)  || value < -90 || value > 90) 
			throw new InvalidValueException("latitude", value);
		this.#latitude = value;
	}

	get longitude(){
		return this.#longitude;
	}
	set longitude(value){
		value = typeof value !== 'undefined' ? Number(value).valueOf() : 0;
		if (Number.isNaN(value)  || value < -180 || value > 180) 
			throw new InvalidValueException("longitude", value);
		this.#longitude = value;
	}

	getSexagesimalLatitude(){
		let direction = this.latitude >= 0 ? "N" : "S";
		let latitude = Math.abs(this.latitude);
		let grades =  Math.floor (latitude);
		let tmpMinutes = (latitude - grades) * 60;
		let minutes = Math.floor (tmpMinutes);
		let tmpSeconds = (tmpMinutes - minutes) * 60;
		let seconds = Math.round (tmpSeconds);
	
		return grades + "°" + minutes + "'" + seconds + "''" + direction; 	
	} 


	getSexagesimalLongitude(){	
		let direction = this.longitude >= 0 ? "E" : "W";
		let longitude = Math.abs(this.longitude);
		let grades =  Math.floor (longitude);
		let tmpMinutes = (longitude - grades) * 60;
		let minutes = Math.floor (tmpMinutes);
		let tmpSeconds = (tmpMinutes - minutes) * 60;
		let seconds = Math.round (tmpSeconds);
	
		return grades + "°" + minutes + "'" + seconds + "''" + direction; 
	}
	
}

// Objeto Author para definir el autor.
class Author {
	#nickname;
	#email;
	#avatar;

	constructor(nickname, email){
		nickname = nickname.trim();
		email = email.trim();
	
		if (nickname === 'undefined' || nickname === '') throw new EmptyValueException("nickname");
		if (/^[a-zA-Z][a-zA-Z0-9_\-]*(\.[a-zA-Z0-9_\-]*)*[a-zA-Z0-9]$/.test (nickname) !== true)
			throw new InvalidValueException("nickname", nickname);		
	
		if (email === 'undefined' || email === '') throw new EmptyValueException("email");	
		if (/^[a-zA-Z][a-zA-Z0-9_\-]*(\.[a-zA-Z0-9_\-]*)*[a-zA-Z0-9]\@[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test (email) !== true)
			throw new InvalidValueException("email", email);		
	
		this.#nickname = nickname;
		this.#email = email;
		this.#avatar = null;
	}

	get nickname() {
		return this.#nickname;
	}
	set nickname(value){
		if (value === 'undefined' || value === '') throw new EmptyValueException("nickname");
		if (/^[a-z][a-z0-9_\-]*(\.[a-z0-9_\-]*)*[a-z0-9]$/.test (value) !== true)
			throw new InvalidValueException("nickname", value);		
		this.#nickname = value;
	}		

	get email(){
		return this.#email;
	}
	set nickname(value){
		if (value === 'undefined' || value === '') throw new EmptyValueException("email");	
		if (/^[a-z][a-z0-9_\-]*(\.[a-z0-9_\-]*)*[a-z0-9]\@[a-z0-9]+\.[a-z]{2,3}$/.test (value) !== true)
			throw new InvalidValueException("email", value);		
		this.#email = value;
	}			

	get avatar(){
		return _avatar;
	}
	set avatar(value){
		if (value === 'undefined' || value == null) throw new EmptyValueException("avatar");	
		if (!value instanceof Image) throw new InvalidValueException("avatar", value);		
		this.#avatar = value;
	}	
	
	toString(){	
		return "Author: " + this.nickname + "(" + this.email + ")"; 
	}	
}

//Objeto Image para definir una imagen. Es abstracto
class Image {
	#url;
	#title;
	#description;
	#coords;

	constructor (title, url){
		//Comprobación para que Image sea clase abstracta.
		if ((new.target === Image)) {
			throw new AbstractClassException("Image");
		}		

		title = title.trim();
		url = url.trim();
	
		if (title === 'undefined' || title === '') throw new EmptyValueException("title");

		if (url === 'undefined' || url === '') throw new EmptyValueException("url");	
		if (/^https?:\/\/(www\.)?[-a-zA-Z0-9@%._\+~#=]{2,256}(\:(\d){2,4})?(\/[a-zA-Z0-9_.$%._\+~#]+)*(\?(\w+=.*)(\&(\w+=.+))*)?$/.test (url) === true ||
			/^(\/?[a-zA-Z0-9_.$%._\+~#]+)*(\?(\w+=.*)(\&(\w+=.+))*)?$/.test (url) === true)
			this.#url = url;
		else
			throw new InvalidValueException("url", url);		

		this.#title = title;
		this.#description = "";
		this.#coords = null;	
	}

	get title(){
		return this.#title;
	}
	set title(value){
		if (value === 'undefined' || value === '') throw new EmptyValueException("title");
		this.#title = value;
	}		

	get url(){
		return this.#url;
	}
	set url(value){
		if (value === 'undefined' || value === '') throw new EmptyValueException("url");	
		if (/^https?:\/\/(www\.)?[-a-zA-Z0-9@%._\+~#=]{2,256}(\:(\d){2,4})?(\/[a-zA-Z0-9_.$%._\+~#]+)*(\?(\w+=.*)(\&(\w+=.+))*)?$/.test (value) === true ||
			/^(\/?[a-zA-Z0-9_.$%._\+~#]+)*(\?(\w+=.*)(\&(\w+=.+))*)?$/.test (value) === true)
			this.#url = value;
		else
			throw new InvalidValueException("url", value);		
	}		

	get coords(){
		return this.#coords;
	}
	set coords(value){
		if (value === 'undefined' || value == null) throw new EmptyValueException("coords");	
		if (!value instanceof Coords) throw new InvalidValueException("coords", value);		
		this.#coords = value;
	}		

	get description(){
		return this.#description;
	}
	set description(value){
		if (value === 'undefined') throw new EmptyValueException("description");	
		this.#description = value;
	}		

	toString(){	
		return this.constructor.name + ": " + this.title + "(" + this.url + "). " + this.description; 
	}
}

// Objeto Portrait herencia de Image
class Portrait extends Image {
	constructor(title, url){
		super(title, url);
	}
}

// Objeto Portrait herencia de Image
class Landscape extends Image {
	constructor(title, url){
		super(title, url);
	}
}

// Objeto Category para definir el autor.
class Category {
	#title;	
	#description;

	constructor(title = "Anon"){
		title = title.trim();
		if (title === 'undefined' || title === 'Anon') throw new EmptyValueException("title");					
	
		this.#title = title;	
		this.#description = "";
	}

	get title(){
		return this.#title;
	}
	set title(title = "Anon"){
		title = title.trim();
		if (title === 'undefined' || title === 'Anon') throw new EmptyValueException("title");					
		this.#title = title;
	}		

	get description(){
		return this.#description;
	}
	set description(value){
		if (value === 'undefined') throw new EmptyValueException("description");	
		this.#description = value;
	}		

	toString(){	
		return "Category: " + this.title + " (" + this.description + ")"; 
	}
	
}

export {Coords, Author, Image, Portrait, Landscape, Category};