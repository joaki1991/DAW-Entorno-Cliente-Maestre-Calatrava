"use strict";
class MaestreComponentesException extends BaseException {
	constructor (message = 'Error: MaestreComponentes Exception.', fileName, lineNumber){
			super(message, fileName, lineNumber);
			this.name = 'ManagerException';
	}
}

const MaestreComponentesArray = (function () {
    class MaestreComponentes {
        #appliances;

        #findAppliancePosition(appliance) {
            return this.#appliances.findIndex((storedAppliance) => {
                return (storedAppliance.id === appliance.id);
            })
        }

        constructor(){
            this.#appliances = [];
        }

        insert(...apliances) {
            // Se debe utiliza una función arrow para mantener el contexto, es decir no se pierda la referencia this
            apliances.forEach((appliance) => { 
                if (appliance instanceof Appliance) {
                    if (this.#findAppliancePosition(appliance) === -1) {                        
                        this.#appliances.push(appliance); 
                        // Mantenemos siempre ordenado el array.
                        this.#appliances.sort((a, b) => a.id.localeCompare(b.id));                      
                    } else {
                        throw new MaestreComponentesException(`The appliance ${appliance.id} already exists.`);
                    }
                } else {
                    new MaestreComponentesException(`The argument is not an Appliance.`);
                }
            })
            return this; // Permite encadenar métodos.
        }

        //donde va a mostrar un String con todos los objetos que tiene la coleccion
        toString(sortFunction) {
            let array;
            if (sortFunction instanceof Function){
                array = Array.from(this.#appliances.values()); //Hacemos una copia para no perder la ordenación actual.
                array.sort(sortFunction);
            } else {
                array = this.#appliances;
            }            
            return array.join("\n");
        }

        // Métodos generadores devuelven objetos iterable e iterador.
        * filter(filterFunction) {
            if (!filterFunction) throw new EmptyValueException("Filter function");
            // Al usar un generador no podemos utilizar métodos con funciones callback.
            for (let index = 0; index < this.#appliances.length; index++){
                if (filterFunction(this.#appliances[index])){
                    yield this.#appliances[index];
                }       
            }
        }

        delete(id) {
            if (!Appliance.ID.test(id)) throw new MaestreComponentesException("The id is not correct.");
            let position = this.#appliances.findIndex((a) => a.id === id);
            if (position === -1) throw new MaestreComponentesException(`The ${id} doesn't exist.`);
            this.#appliances.splice(position,1);
            return this;
        }

        // Transformamos MaestreComponentes en un iterable
        // Al implementar el método como generador también es un iterador.
        * [Symbol.iterator]() {
            for (const appliance of this.#appliances){ 
                yield appliance; 
            }            
        }
    }

    let instanciated;

    function init() {
        return new MaestreComponentes();
    }

    return {
        getInstance: function () {
            if (!instanciated) instanciated = init();
            return instanciated
        }
    }

})();


const MaestreComponentesMap = (function () {
    class MaestreComponentes {
        #appliances;

        constructor(){
            this.#appliances = new Map();
        }

        insert(...apliances) {
            apliances.forEach((appliance) => { // Se debe utiliza una función arrow para mantener el contexto
                if (appliance instanceof Appliance) {                  
                    if (!this.#appliances.has(appliance.id)){
                        // Guardamos el objeto con clave el identificador por lo que es fácil buscable
                        this.#appliances.set(appliance.id, appliance);
                    } else {
                        throw new MaestreComponentesException(`The appliance ${appliance.id} already exists.`);
                    }
                } else {
                    new MaestreComponentesException(`The argument is not an Appliance.`);
                }
            })
            return this; // Permite encadenar métodos.
        }

        //donde va a mostrar un String con todos los objetos que tiene la coleccion
        toString(sortFunction = (a, b) => a.id.localeCompare(b.id)) {
            // Para ordenar un Map es necesario conseguir un array.
            let array = Array.from(this.#appliances.values());
            array.sort(sortFunction); 

            return array.join("\n");
        }

        // Métodos generadores devuelven objetos iterable e iterador.
        * filter(filterFunction) {
            if (!filterFunction) throw new EmptyValueException("Filter function");
            // Al usar un generador no podemos utilizar métodos con funciones callback.
            for (let appliance of this.#appliances.values()){
                if (filterFunction(appliance)){
                    yield appliance;
                }       
            }
        }

        delete(id) {
            if (!Appliance.ID.test(id)) throw new MaestreComponentesException("The id is not correct.");
            if (this.#appliances.has(id)) {            
                this.#appliances.delete(id);
            } else {            
                throw new MaestreComponentesException(`The ${id} doesn't exist.`);
            }            
            return this;
        }

        // Transformamos MaestreComponentes en un iterable
        // Al implementar el método como generador también es un iterador.
        * [Symbol.iterator]() {
            for (const appliance of this.#appliances){ 
                yield appliance; 
            }            
        }
    }

    let instanciated;

    function init() {
        return new MaestreComponentes();
    }

    return {
        getInstance: function () {
            if (!instanciated) instanciated = init();
            return instanciated
        }
    }

})();



