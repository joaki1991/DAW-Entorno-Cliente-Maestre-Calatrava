(function () {
  let abstractCreateLock = true; // Definición del cerrojo.

  function Product(
    serial,
    brand,
    model,
    price,
    taxPercentage = Product.IVA,
  ) {
    if (!(this instanceof Product)) { throw new InvalidAccessConstructorException(); }
    if (abstractCreateLock) { throw new AbstractClassException('Product'); }
    abstractCreateLock = true; // Reactivamos el cerrojo.

    if (!serial) throw new EmptyValueException('serial');
    if (!brand) throw new EmptyValueException('brand');
    if (!model) throw new EmptyValueException('model');
    price = Number.parseFloat(price);
    if (!price || price <= 0) throw new InvalidValueException('price', price);
    if (!taxPercentage || taxPercentage < 0) throw new InvalidValueException('taxPercentage', taxPercentage);

    const _serial = serial;
    let _brand = brand;
    let _model = model;
    let _price = price;
    let _taxPercentage = taxPercentage;

    Object.defineProperty(this, 'serial', {
      get() {
        return _serial;
      },
      set(value) {
        if (!value) throw new EmptyValueException('serial');
        _serialNumber = value;
      },
    });

    Object.defineProperty(this, 'brand', {
      get() {
        return _brand;
      },
      set(value) {
        if (!value) throw new EmptyValueException('brand');
        _brand = value;
      },
    });

    Object.defineProperty(this, 'model', {
      get() {
        return _model;
      },
      set(value) {
        if (!value) throw new EmptyValueException('model');
        _model = value;
      },
    });

    Object.defineProperty(this, 'price', {
      get() {
        return _price;
      },
      set(value) {
        value = Number.parseFloat(value);
        if (Number.isNaN(value) && value > 0) throw new InvalidValueException('price', value);
        _price = value;
      },
    });

    Object.defineProperty(this, 'taxPercentage', {
      get() {
        return _taxPercentage;
      },
      set(value = Product.IVA) {
        if (!value || value < 0) throw new InvalidValueException('taxPercentage', value);
        _taxPercentage = value;
      },
    });
  }
  Product.prototype = {};
  Product.prototype.constructor = Product;
  Object.defineProperty(Product.prototype, 'description', {
    enunmerable: true,
    writable: true,
    configurable: false,
  });
  Object.defineProperty(Product.prototype, 'priceWithoutTaxes', {
    get() {
      return this.price - (this.price * this.taxPercentage / 100);
    },
  });
  Object.defineProperty(Product.prototype, 'tax', {
    get() {
      return this.price * this.taxPercentage / 100;
    },
  });
  Product.prototype.toString = function () {
    return `Serial: ${this.serial} Brand: ${this.brand} Model: ${this.model} Price: ${this.price}€ Tax: ${this.taxPercentage}%`;
  };
  Object.defineProperty(Product, 'IVA', {
    value: 21,
    writable: false,
    enumerable: true,
    configurable: false,
  });

  function Laptop(
    serial,
    brand,
    model,
    price,
    taxPercentage = Product.IVA,
    processor = 'unkonwn',
    memory = '0GB',
    hd = '-',
    size = '0GB',
  ) {
  	// La función se invoca con el operador new
    if (!(this instanceof Laptop)) { throw new InvalidAccessConstructorException(); }
    abstractCreateLock = false; // Desactivamos el cerrojo.
    // Llamada al superconstructor.
    Product.call(this, serial, brand, model, price, taxPercentage);

    // Validación de argumentos
    if (!processor) throw new EmptyValueException('processor');
    if (!/^((\d+GB)|(\d+TB))$/.test(memory)) throw new InvalidValueException('memory', memory);
    if (!/^((HDD)|(SDD)|(-))$/.test(hd)) throw new InvalidValueException('hd', hd);
    if (!/^((\d+GB)|(\d+TB))$/.test(size)) throw new InvalidValueException('size', size);

    // Atributos privados
    let _processor = processor;
    let _memory = memory;
    let _hd = hd;
    let _size = size;

    // Propiedades de acceso a los atributos privados
    Object.defineProperty(this, 'processor', {
      get() {
        return _processor;
      },
      set(value) {
        if (!value) throw new EmptyValueException('processor');
        _processor = value;
      },
    });

    Object.defineProperty(this, 'memory', {
      get() {
        return _memory;
      },
      set(value) {
        if (!/^((\d+GB)|(\d+TB))$/.test(value)) throw new InvalidValueException('memory', value);
        _memory = value;
      },
    });

    Object.defineProperty(this, 'hd', {
      get() {
        return _hd;
      },
      set(value) {
        if (!/^((HDD)|(SDD))$/.test(value)) throw new InvalidValueException('hd', value);
        _hd = value;
      },
    });

    Object.defineProperty(this, 'size', {
      get() {
        return _size;
      },
      set(value) {
        if (!/^((\d+GB)|(\d+TB))$/.test(value)) throw new InvalidValueException('size', value);
        _size = value;
      },
    });
  }
  Laptop.prototype = Object.create(Product.prototype);
  Laptop.prototype.constructor = Laptop;
  Laptop.prototype.system = 'Unknown'; // Propiedad pública
  Laptop.prototype.toString = function () {
    return `${Product.prototype.toString.call(this)} System: ${this.system} Processor: ${this.processor
    } Memoria: ${this.memory} HD: ${this.hd
    } Size: ${this.size}`;
  };

  // Definimos la subclase Camera
  function Camera(serial, brand, model, price, taxPercentage = Product.IVA, type = '-', resolution = 0, size = 0) {
  	// La función se invoca con el operador new
    if (!(this instanceof Camera)) { throw new InvalidAccessConstructorException(); }
    abstractCreateLock = false; // Desactivamos el cerrojo.
    // Llamada al superconstructor.
    Product.call(this, serial, brand, model, price, taxPercentage);

    // Validación de argumentos
    resolution = Number.parseFloat(resolution);
    size = Number.parseFloat(size);
    if (!/^((Digital)|(Reflex)|(-))$/.test(type)) throw new InvalidValueException('type', type);
    if (Number.isNaN(resolution) || resolution < 0) throw new InvalidValueException('resolution', resolution);
    if (Number.isNaN(size) || size < 0) throw new InvalidValueException('size', size);

    // Atributos privados
    let _type = type;
    let _resolution = resolution;
    let _size = size;

    // Propiedades de acceso a los atributos privados
    Object.defineProperty(this, 'type', {
      get() {
        return _type;
      },
      set(value) {
        if (!/^((Digital)|(Reflex)|(-))$/.test(value)) throw new InvalidValueException('type', value);
        _type = value;
      },
    });

    Object.defineProperty(this, 'resolution', {
      get() {
        return _resolution;
      },
      set(value) {
        value = Number.parseFloat(value);
        if (Number.isNaN(value) || value < 0) throw new InvalidValueException('resolution', value);
        _resolution = value;
      },
    });

    Object.defineProperty(this, 'size', {
      get() {
        return _size;
      },
      set(value) {
        value = Number.parseFloat(value);
        if (Number.isNaN(value) || value < 0) throw new InvalidValueException('size', value);
        _size = value;
      },
    });
  }
  Camera.prototype = Object.create(Product.prototype); // Heredamos de Product
  Camera.prototype.constructor = Camera;
  Camera.prototype.toString = function () {
    return `${Product.prototype.toString.call(this)
    } Tipo: ${this.type} Resolución: ${this.resolution}MP Size: ${this.size}''`;
  };

  // Definimos la subclase Smartphone
  function Smartphone(serial, brand, model, price, taxPercentage = Product.IVA, memory = '0GB', storage = '0GB', resolution = '0x0', size = 0) {
  	// La función se invoca con el operador new
    if (!(this instanceof Smartphone)) { throw new InvalidAccessConstructorException(); }
    abstractCreateLock = false; // Desactivamos el cerrojo.
    // Llamada al superconstructor.
    Product.call(this, serial, brand, model, price, taxPercentage);

    // Validación de argumentos
    if (!/^((\d+GB)|(\d+TB))$/.test(memory)) throw new InvalidValueException('memory', memory);
    if (!/^((\d+GB)|(\d+TB))$/.test(storage)) throw new InvalidValueException('storage', storage);
    size = Number.parseFloat(size);
    if (Number.isNaN(size) || size < 0) throw new InvalidValueException('size', size);
    if (!/^(\d+x\d+)$/.test(resolution)) throw new InvalidValueException('resolution', resolution);

    // Atributos privados
    let _memory = memory;
    let _storage = storage;
    let _resolution = resolution;
    let _size = size;

    // Propiedades de acceso a los atributos privados
    Object.defineProperty(this, 'memory', {
      get() {
        return _memory;
      },
      set(value) {
        if (!/^((\d+GB)|(\d+TB))$/.test(value)) throw new InvalidValueException('memory', value);
        _memory = value;
      },
    });

    Object.defineProperty(this, 'resolution', {
      get() {
        return _resolution;
      },
      set(value) {
        if (!/^(\d+x\d+)$/.test(value)) throw new InvalidValueException('resolution', value);
        _resolution = value;
      },
    });

    Object.defineProperty(this, 'storage', {
      get() {
        return _storage;
      },
      set(value) {
        if (!/^((\d+GB)|(\d+TB))$/.test(value)) throw new InvalidValueException('storage', value);
        _storage = value;
      },
    });

    Object.defineProperty(this, 'size', {
      get() {
        return _size;
      },
      set(value) {
        value = Number.parseFloat(value);
        if (Number.isNaN(value) || value < 0) throw new InvalidValueException('size', value);
        _size = value;
      },
    });
  }
  Smartphone.prototype = Object.create(Product.prototype); // Heredamos de Product
  Smartphone.prototype.constructor = Smartphone;
  Smartphone.prototype.system = 'Unknown'; // Propiedad pública
  Smartphone.prototype.toString = function () {
    return `${Product.prototype.toString.call(this)} System: ${this.system
    } Memoria: ${this.memory} Almacenamiento: ${this.storage} Resolución: ${this.resolution} Size: ${this.size}''`;
  };

  // Definimos la subclase Tablet
  function Tablet(serial, brand, model, price, taxPercentage = Product.IVA, memory = '0GB', storage = '0GB', resolution = '0x0', size = 0) {
  	// La función se invoca con el operador new
    if (!(this instanceof Tablet)) { throw new InvalidAccessConstructorException(); }
    abstractCreateLock = false; // Desactivamos el cerrojo.
    // Llamada al superconstructor.
    Product.call(this, serial, brand, model, price, taxPercentage);

    // Validación de argumentos
    if (!/^((\d+GB)|(\d+TB))$/.test(memory)) throw new InvalidValueException('memory', memory);
    if (!/^((\d+GB)|(\d+TB))$/.test(storage)) throw new InvalidValueException('storage', storage);
    size = Number.parseFloat(size);
    if (Number.isNaN(size) || size < 0) throw new InvalidValueException('size', size);
    if (!/^(\d+x\d+)$/.test(resolution)) throw new InvalidValueException('resolution', resolution);

    // Atributos privados
    let _memory = memory;
    let _storage = storage;
    let _resolution = resolution;
    let _size = size;

    // Propiedades de acceso a los atributos privados
    Object.defineProperty(this, 'memory', {
      get() {
        return _memory;
      },
      set(value) {
        if (!/^((\d+GB)|(\d+TB))$/.test(value)) throw new InvalidValueException('memory', value);
        _memory = value;
      },
    });

    Object.defineProperty(this, 'resolution', {
      get() {
        return _resolution;
      },
      set(value) {
        if (!/^(\d+x\d+)$/.test(value)) throw new InvalidValueException('resolution', value);
        _resolution = value;
      },
    });

    Object.defineProperty(this, 'storage', {
      get() {
        return _storage;
      },
      set(value) {
        if (!/^((\d+GB)|(\d+TB))$/.test(value)) throw new InvalidValueException('storage', value);
        _storage = value;
      },
    });

    Object.defineProperty(this, 'size', {
      get() {
        return _size;
      },
      set(value) {
        value = Number.parseFloat(value);
        if (Number.isNaN(value) || value < 0) throw new InvalidValueException('size', value);
        _size = value;
      },
    });
  }
  Tablet.prototype = Object.create(Product.prototype); // Heredamos de Product
  Tablet.prototype.constructor = Tablet;
  Tablet.prototype.system = 'Unknown'; // Propiedad pública
  Tablet.prototype.toString = function () {
    return `${Product.prototype.toString.call(this)} System: ${this.system
    } Memoria: ${this.memory} Almacenamiento: ${this.storage} Resolución: ${this.resolution} Size: ${this.size}''`;
  };

  window.Product = Product;
  window.Laptop = Laptop;
  window.Camera = Camera;
  window.Smartphone = Smartphone;
  window.Tablet = Tablet;
}()); // Invocamos la función global.
