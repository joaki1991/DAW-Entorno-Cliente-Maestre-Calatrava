(function () {
  const examples = document.getElementById('examples');
  const divExamples = examples.children[7];
  const buttons = divExamples.getElementsByClassName('tab-pane')[1].getElementsByTagName('button');

  function greetingV3() {
    const message = 'Hello';
    const sayHi = function hi() {
      $$result.log(message);
    };
    sayHi(); // Hello
  }

  function greetingV4() {
    const sayHi = function hi() {
      const text = 'Hi';
    };
    sayHi();
    try {
      $$result.log(text);
    } catch (error) {
      $$result.log(error.message); // text is not defined
    }
  }

  buttons[0].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Acceso a variable en función padre');
    greetingV3();
    $$result.logBold('Acceso a variable en función interna');
    greetingV4();
  });

  function IIFE_V1() {
    (function () {
      $$result.log('Hello'); // Hello
    }());
  }

  function IIFE_V2() {
    (function (name) {
      $$result.log(`Hello ${name}`); // Hello Pablo
    }('Pablo'));
  }

  function IIFE_V3() {
    const result = (function () {
      const name = 'Pablo';
      return `Hello ${name}`;
    }());
    $$result.log(result); // Hello Pablo
  }

  buttons[1].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Patrón IIFE simple');
    IIFE_V1();
    $$result.logBold('Patrón IIFE con paso de argumentos');
    IIFE_V2();
    $$result.logBold('Valor de retorno de patrón IIFE');
    IIFE_V3();
  });

  function closureV1() {
    function mainFunction() {
      const name = 'Pablo';
      function greting() {
        $$result.log(`Hello ${name}`);
      }
      return greting;
    }
    const myGreeting = mainFunction();
    myGreeting(); // Hello Pablo
  }

  function closureV2() {
    function setupCounter(val) {
      let count = val || 0;
      return function counter() {
        return ++count;
      };
    }
    const counter = setupCounter(5);
    $$result.log(counter()); // 6
    $$result.log(counter()); // 7
  }

  buttons[2].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Ejemplo de closure');
    closureV1();
    $$result.logBold('Contador implementado con closure');
    closureV2();
  });

  function closureV3() {
    // app es el objeto global que almacenará la referencia al contenido devuelto.
    const app = (function (id) { // Función principal anónima
      const computerId = id; // Variable con ámbito local solo accesible desde la función anónima y por tanto encapsulada.
      const getId = function () { // función que permite cambiar el contenido de la variable local.
        return computerId;
      };
      return { // Objeto devuelto por función anónima y asignado a app.
        getId, // propiedad del objeto que hace referencia a la función local.
      };
    }(123)); // Invocación de la función anónima. Se hace justo en el momento de su declaración.
    // El objeto global puede acceder al ámbito de la función anónima a través de sus funciones internas.
    $$result.log(app.getId()); // 123
  }

  buttons[3].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Closure con IIFE');
    closureV3();
  });

  function closureV4() {
    $$result.clear();
    function setupCounter(val) {
      let count = val || 0;
      function increment() {
        return ++count;
      }
      function decrement() {
        return --count;
      }
      return {
        increment,
        decrement,
      };
    }

    $$result.logBold('Contador con operaciones de incremento y decremento');
    const counter = setupCounter(5);
    $$result.log(counter.increment()); // 6
    $$result.log(counter.increment()); // 7
    $$result.log(counter.decrement()); // 6
    $$result.log(counter.decrement()); // 5
  }

  buttons[4].addEventListener('click', closureV4);
}());
