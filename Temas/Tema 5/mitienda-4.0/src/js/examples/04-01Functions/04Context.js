(function () {
  const examples = document.getElementById('examples');
  const divExamples = examples.children[7];
  const buttons = divExamples.getElementsByClassName('tab-pane')[3].getElementsByTagName('button');

  const computer = {
    computerID: 134,
    brand: 'HP',
    model: 'EliteBook',
    memory: 16,
  };

  const computers = [
    {
      computerID: 134,
      brand: 'HP',
      model: 'EliteBook',
      memory: 16,
    },
    {
      computerID: 456,
      brand: 'HP',
      model: 'Pavilion',
      memory: 16,
    },
    {
      computerID: 14,
      brand: 'HP',
      model: 'EliteBook',
      memory: 32,
    },
  ];

  function functionProperties(arg1, arg2, arg3) {
    $$result.clear();
    $$result.log(functionProperties.name); // functionProperties
    $$result.log(functionProperties.length); // 3
  }
  buttons[0].addEventListener('click', functionProperties);

  function defaultContext() {
    (function () {
      $$result.clear();
      $$result.log(this); // undefined
    }());
  }
  buttons[1].addEventListener('click', defaultContext);

  function implicitContext() {
    const computer = {
      computerID: 134,
      brand: 'HP',
      model: 'EliteBook',
      memory: 16,
      toString() {
        return `${this.computerID}: ${this.brand} ${this.model}`;
      },
    };
    $$result.clear();
    $$result.log(computer.toString()); // 134: HP EliteBook
  }
  buttons[2].addEventListener('click', implicitContext);

  function callExampleV1() {
    function toString() {
      return `${this.computerID}: ${this.brand} ${this.model}`;
    }
    const c = toString.call(computer);
    $$result.log(c); // 134: HP EliteBook
  }

  function callExampleV2() {
    for (let i = 0; i < computers.length; i++) {
      (function (num) {
        this.toString = function () {
          $$result.log(`#${num} ${this.computerID}: ${this.brand} ${this.model}`);
        };
        this.toString();
      }).call(computers[i], i);
    }
  }

  buttons[3].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Método call con objeto como contexto');
    callExampleV1();
    $$result.logBold('Método call con parámetros');
    callExampleV2();
  });

  function applyExample() {
    $$result.clear();
    const numbers = [5, 6, 2, 3, 7];
    const max = Math.max.apply(null, numbers);
    const min = Math.min.apply(null, numbers);
    $$result.log(max); // 7
    $$result.log(min); // 2
  }
  buttons[4].addEventListener('click', applyExample);

  function bindExampleV1() {
    const computer1 = {
      computerID: 134,
      brand: 'HP',
      model: 'EliteBook',
      memory: 16,
      toString() {
        return `${this.computerID}: ${this.brand} ${this.model}`;
      },
    };
    const computer2 =	{
      computerID: 14,
      brand: 'HP',
      model: 'EliteBook',
      memory: 32,
    };

    const toStringCopy = computer1.toString.bind(computer2);
    $$result.log(computer1.toString());
    $$result.log(toStringCopy());
  }

  function bindExampleV2() {
    function list() {
      return Array.from(arguments);
    }
    const listCopy = list.bind(undefined, 37);
    $$result.logBold('Función list');
    $$result.log(list(1, 2, 3)); // [1, 2, 3]
    $$result.logBold('Función ligada sin argumentos');
    $$result.log(listCopy()); // [37]
    $$result.logBold('Función ligada con argumentos');
    $$result.log(listCopy(1, 2, 3)); // [37, 1, 2, 3]
  }

  buttons[5].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Ligar una función');
    bindExampleV1();
    $$result.logBold('Ligar una función con parámetros predefinidos');
    bindExampleV2();
  });
}());
