(function () {
  const examples = document.getElementById('examples');
  const divExamples = examples.children[8];
  const buttons = divExamples.getElementsByClassName('tab-pane')[0].getElementsByTagName('button');

  function dynamicObject() {
    const product = {
      serial: '111-111-111',
      name: 'Portátil',
    };
    product.price = 750;
    product.fullName = function () {
      return `${this.serial}: ${this.name}`;
    };
    $$result.log(product.price); // 750
    $$result.log(product.fullName()); // 111-111-111: Portátil
  }

  function shortCutLiteralObjects() {
    function createProduct(serial, name) {
      return {
        serial,
        name,
        fullName() {
          return `${this.serial}: ${this.name}`;
        },
      };
    }
    const product = createProduct('111-111-111', 'Portátil');
    // Object {serial: 111-111-111, name: Portátil, fullName...}
    $$result.log(product);
    // 111-111-111: Portátil
    $$result.log(product.fullName());
  }

  function objectClass() {
    const product = {
      serial: '111-111-111',
      name: 'Portátil',
      price: 750,
      fullName() {
        return `${this.serial}: ${this.name}`;
      },
    };
    // serial,name,price,fullName
    $$result.logBold('Nombres de propiedades');
    $$result.log(Object.keys(product));
    // 111-111-111,Portátil,750,fullName() {...}
    $$result.logBold('Valores de propiedades');
    $$result.log(Object.values(product));
  }

  buttons[0].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Objeto dinámico');
    dynamicObject();
    $$result.logBold('Atajo para objetos literales');
    shortCutLiteralObjects();
    $$result.logBold('Clase Object');
    objectClass();
  });

  function assignMethod() {
    const product1 = {
      serial: '111-111-111',
      name: 'Portátil',
      price: 750,
      fullName() {
        return `${this.serial}: ${this.name}`;
      },
    };

    const product2 = { };
    Object.assign(product2, product1);
    // Object {serial: 111-111-111,	name: Portátil,	price: 750,	fullName: fullName() { ... },}
    $$result.log(product2);
    $$result.log(product1 === product2); // false
  }

  function mergeObjectsV1() {
    const product = {
      serial: '111-111-111',
      name: 'Portátil',
    };
    const price = {
      price: 750,
      currency: 'euro',
    };

    Object.assign(product, price);
    // Object {serial: 111-111-111,	name: Portátil,	price: 12, currency: euro,}
    $$result.log(product);
  }

  function mergeObjectsV2() {
    const product = {
      serial: '111-111-111',
      name: 'Portátil',
    };
    const price = {
      price: 750,
      currency: 'euro',
    };
    function mergePrice(product, price) {
      return Object.assign(product, price);
    }
    const fullProduct = mergePrice(product, price);
    // Object {serial: 111-111-111,	name: Portátil,	price: 12, currency: euro,}
    $$result.log(fullProduct);
  }

  function mergeObjectsV3() {
    const product = {
      serial: '111-111-111',
      name: 'Portátil',
    };
    const price = {
      price: 750,
      currency: 'euro',
    };
    function mergePrice(product, price) {
      return Object.assign(product, price);
    }
    // Object {serial: 111-111-111,name: Portátil,}
    $$result.log(product);
    const fullProduct = mergePrice(product, price);
    // Object {serial: 111-111-111,name: Portátil,price: 750,currency: euro,}
    $$result.log(product);
  }

  function mergeObjectsV4() {
    const product = {
      serial: '111-111-111',
      name: 'Portátil',
    };
    const price = {
      price: 750,
      currency: 'euro',
    };

    function mergePrice(product, price) {
      return Object.assign({}, product, price);
    }

    // Object {serial: 111-111-111,name: Portátil,}
    $$result.log(product);
    const fullProduct = mergePrice(product, price);
    // Object {serial: 111-111-111,name: Portátil,}
    $$result.log(product);
    $$result.log(fullProduct === product); // false
  }

  buttons[1].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Copiando objetos');
    assignMethod();
    $$result.logBold('Fusionando objetos');
    mergeObjectsV1();
    $$result.logBold('Función de fusionado de objetos');
    mergeObjectsV2();
    $$result.logBold('Los objetos fusionados como referencias');
    mergeObjectsV3();
    $$result.logBold('Copiar un objeto');
    mergeObjectsV4();
  });

  function constructorFunction() {
    $$result.clear();
    $$result.logBold('Uso de un función constructora');

    function Product(serial, name, price) {
      this.serial = serial;
      this.name = name;
      this.price = price;
      this.fullName = function () {
        return `${this.serial}: ${this.name}`;
      };
    }
    const product1 = new Product('111-111-111', 'Portátil', 750);
    // Object {serial: 111-111-111,name: Portátil,price: 750,currency: euro,fullname...}
    $$result.log(product1);
    const product2 = new Product('222-222-222', 'Tablet', 500);
    // Object {serial: 222-222-222,name: Tablet,price: 500,currency: euro,fullname...}
    $$result.log(product2);
  }

  buttons[2].addEventListener('click', constructorFunction);

  function createMethodV1() {
    const product = {
      serial: '111-111-111',
      name: 'Portátil',
      price: 750,
    };
    const product2 = Object.create(product);
    // Object {serial: 111-111-111, name: Portátil, price: 750}
    $$result.log(product2.serial);
    $$result.log(product2.name);
    $$result.log(product2.price);
  }

  function createMethodV2() {
    const product = Object.create(Object.prototype, {
      serial: {
        value: '111-111-111', enumerable: true, writable: true, configurable: true,
      },
      name: {
        value: 'Portátil', enumerable: true, writable: true, configurable: true,
      },
      price: {
        value: 750, enumerable: true, writable: true, configurable: true,
      },
    });
    // Object {serial: 111-111-111, name: Portátil, price: 750}
    $$result.log(product);
  }

  buttons[3].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Utilizando méotodo create');
    createMethodV1();
    $$result.logBold('Método create con descripción de propiedades');
    createMethodV2();
  });
}());
