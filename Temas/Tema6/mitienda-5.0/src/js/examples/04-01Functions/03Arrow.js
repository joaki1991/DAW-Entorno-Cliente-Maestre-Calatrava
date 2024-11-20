(function () {
  const examples = document.getElementById('examples');
  const divExamples = examples.children[7];
  const buttons = divExamples.getElementsByClassName('tab-pane')[2].getElementsByTagName('button');

  function arrowV1() {
    function greeting() {
      return 'Hello World';
    }
    $$result.log(greeting()); // Hello World

    const arrow = () => 'Hello World';
    $$result.log(arrow()); // Hello World
  }

  function arrowV2() {
    function greeting(name) {
      return `Hello ${name}`;
    }
    $$result.log(greeting('Pablo')); // Hello Pablo

    function multiply(a, b) {
      return a * b;
    }
    $$result.log(multiply(3, 5)); // 15

    const greet = (name) => `Hello ${name}`;
    $$result.log(greet('Pablo')); // Hello Pablo

    const multi = (a, b) => a * b;
    $$result.log(multi(3, 5)); // 15
  }

  function arrowV3() {
    const greet = (name) => `Hello ${name}`;
    $$result.log(greet('Pablo')); // Hello Pablo

    const multi = (a, b) => a * b;
    $$result.log(multi(3, 5)); // 15
  }

  function arrowV4() {
    const greet = () => ({ name: 'Pablo' });
    $$result.log(greet().name); // Pablo
  }

  function arrowV5() {
    const multi = (a = 1, b = 1) => a * b;
    $$result.log(multi(3)); // 3
  }

  buttons[0].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Función arrow sin parámetros');
    arrowV1();
    $$result.logBold('Función arrow con parámetros');
    arrowV2();
    $$result.logBold('Notación de bloque');
    arrowV3();
    $$result.logBold('Retorno de objetos literales');
    arrowV4();
    $$result.logBold('Parámetros predeterminados');
    arrowV5();
  });

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

  function sortComputersByModel() {
    const localComputers = [...computers];
    localComputers.sort((elemA, elemB) => elemA.model.localeCompare(elemB.model));
    // EliteBook,EliteBook,Pavilion
    localComputers.forEach((elem) => $$result.log(elem.model));
  }

  function findHighPerformanceComputer() {
    const computer = computers.find((elem) => elem.memory > 16);
    $$result.log(`ID: ${computer.computerID
			 } Brand: ${computer.brand
			 } Memory: ${computer.memory}`);// ID: 14 Brand: HP Memory: 32
  }

  function findLowPerformanceComputer() {
    const lowPerformanceComputer = computers.filter((elem) => elem.memory <= 16);
    lowPerformanceComputer.forEach((elem) => $$result.log(elem.computerID));
  }

  function ArrayToString() {
    $$result.log(
      computers.reduce((str, elem) => (str += ` ${elem.brand} ${elem.model}.`), ''),
    );
  }

  function evenAndOddNumbers() {
    const numbers = [32, -5, 66, 32, 23, 14, 32, 16];
    const evenNumbers = numbers.filter((elem) => !(elem % 2));
    const oddNumbers = numbers.filter((elem) => elem % 2);

    $$result.logBold('Números pares');
    $$result.log(evenNumbers);// 32,66,32,14,32,16
    $$result.logBold('Números impares');
    $$result.log(oddNumbers);// -5,23
  }

  buttons[1].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Ordenar un array');
    sortComputersByModel();
    $$result.logBold('Encontrar elemento');
    findHighPerformanceComputer();
    $$result.logBold('Filtrar elementos');
    findLowPerformanceComputer();
    $$result.logBold('Transformar un array en string');
    ArrayToString();

    evenAndOddNumbers();
  });
}());
