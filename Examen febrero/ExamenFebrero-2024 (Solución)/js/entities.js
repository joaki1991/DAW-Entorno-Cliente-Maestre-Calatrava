class Event {
	//Atributos privados
	#name;
    #about;
    #duration;
    #startDate;
    #endDate;
    #location;

	constructor (name, duration, startDate, endDate, location){
        const locationER = /\d{1,2}º\d{1,2}'\d{1,2}''[NS];\d{1,2}º\d{1,2}'\d{1,2}''[OE];/;
		//Control de excepciones
		if (!new.target) throw new InvalidAccessConstructorException();
        if (!name) throw new EmptyValueException("name");
        if (!duration) throw new EmptyValueException("duration");
        if (!startDate) throw new EmptyValueException("startDate");
        if (!endDate) throw new EmptyValueException("endDate");
        if (!location) throw new EmptyValueException("location");
        if (!locationER.test(location)) throw new ExamException(`The location doesn't have the correcto format: ${location}`);        
        if (!startDate  instanceof Date) throw new InvalidValueException("startDate");
        if (!endDate  instanceof Date) throw new InvalidValueException("endDate");
        if (endDate < startDate) throw new ExamException('La fecha de inicio debe ser posterior a la fecha de finalización');
        
		//Atributos privados
		this.#name = name;
        this.#duration = duration;
        this.#startDate = startDate;
        this.#endDate = endDate;
        this.#location = location;
	}
    
	get name(){
		return this.#name;
	}
	set name(value){
		if (!value) throw new EmptyValueException("name");
		this.#name = value;
	}

	get duration(){
		return this.#duration;
	}
	set duration(value){
		if (!value) throw new EmptyValueException("duration");
		this.#duration = value;
	}

	get location(){
		return this.#location;
	}
	set location(value){
		if (!value) throw new EmptyValueException("location");
		this.#location = value;
	}

	get about(){
		return this.#about;
	}
	set about(value){
		if (!value) throw new EmptyValueException("about");
		this.#about = value;
	}

	get startDate(){
		return this.#startDate;
	}
	set startDate(value){
		if (!value) throw new EmptyValueException("startDate");
        if (!value  instanceof Date) throw new InvalidValueException("startDate");
        if (this.#endDate < value) throw new ExamException('La fecha de inicio debe ser posterior a la fecha de finalización');
		this.#startDate = value;
	}

	get endDate(){
		return this.#endDate;
	}
	set endDate(value){
		if (!value) throw new EmptyValueException("endDate");
        if (!value  instanceof Date) throw new InvalidValueException("endDate");
        if (this.#startDate > value) throw new ExamException('La fecha de inicio debe ser posterior a la fecha de finalización');
		this.#endDate = value;
	}

    toString(){
        return this.#name + ': ' + this.#duration + ' en ' + this.#location + '. Del ' + this.#startDate.toLocaleDateString() + ' al ' + this.#endDate.toLocaleDateString() + '. ';
    }
}

class MusicEvent extends Event {
	//Atributos privados
	#performer;
	constructor (name, duration, startDate, endDate, location, performer){
		//La función se invoca con el operador new
		if (!new.target) throw new InvalidAccessConstructorException();
		//Llamada al superconstructor.
		super(name, duration, startDate, endDate, location);

        if (!performer) throw new EmptyValueException("performer");

		//Atributos privados
		this.#performer = performer;
	}
    
	get performer(){
		return this.#performer;
	}
	set performer(value){
		if (!value) throw new EmptyValueException("performer");
		this.#performer = value;
	}

    toString(){
        return super.toString() + 'Artista: ' + this.#performer;
    }
}

class SportEvent extends Event {
	//Atributos privados
	#homeTeam;
    #awayTeam;
	constructor (name, duration, startDate, endDate, location, homeTeam, awayTeam){
		//La función se invoca con el operador new
		if (!new.target) throw new InvalidAccessConstructorException();
		//Llamada al superconstructor.
		super(name, duration, startDate, endDate, location);

        if (!homeTeam) throw new EmptyValueException("homeTeam");
        if (!awayTeam) throw new EmptyValueException("awayTeam");

		//Atributos privados
		this.#homeTeam = homeTeam;
        this.#awayTeam = awayTeam;
	}
    
	get homeTeam(){
		return this.#homeTeam;
	}
	set homeTeam(value){
		if (!value) throw new EmptyValueException("homeTeam");
		this.#homeTeam = value;
	}

	get awayTeam(){
		return this.#awayTeam;
	}
	set awayTeam(value){
		if (!value) throw new EmptyValueException("awayTeam");
		this.#awayTeam = value;
	}

    toString(){
        return super.toString() + this.#homeTeam + ' vs ' + this.#awayTeam;
    }
}

class Organization {
	//Atributos privados
	#name;
    #email;
    #phone;
    #description;

	constructor (name, email, phone){
		//La función se invoca con el operador new
		if (!new.target) throw new InvalidAccessConstructorException();
		//Llamada al superconstructor.

        if (!name) throw new EmptyValueException("name");
        if (!email) throw new EmptyValueException("email");
        if (!phone) throw new EmptyValueException("phone");

		//Atributos privados
		this.#name = name;
        this.#email = email;
        this.#phone = phone;
	}
    
	get name(){
		return this.#name;
	}
	set name(value){
		if (!value) throw new EmptyValueException("name");
		this.#name = value;
	}

	get email(){
		return this.#email;
	}
	set email(value){
		if (!value) throw new EmptyValueException("email");
		this.#email = value;
	}

	get phone(){
		return this.#phone;
	}
	set phone(value){
		if (!value) throw new EmptyValueException("phone");
		this.#phone = value;
	}

	get description(){
		return this.#description;
	}
	set description(value){
		if (!value) throw new EmptyValueException("description");
		this.#description = value;
	}

    toString(){
        return this.#name + ', ' + this.#email + ', ' + this.#phone;
    }
}

