(function () {
  const examples = document.getElementById('examples');
  const divExamples = examples.children[15];
  const buttons = divExamples.getElementsByClassName('tab-pane')[6].getElementsByTagName('button');

  function testBubbling() {
    const categories = document.getElementById('categories');
    const divImages = categories.querySelectorAll('.cat-list-image');

    function getElement(event) {
      this.style.border = '2px solid red';
      $$result.log(`Bubbling -> Target: ${event.target.nodeName} Element: ${this.nodeName}`);
    }

    for (const div of divImages) {
      div.firstElementChild.addEventListener('click', getElement);
      div.addEventListener('click', getElement);
    }
    categories.addEventListener('click', getElement);
    document.body.addEventListener('click', getElement);
    document.documentElement.addEventListener('click', getElement);
    document.addEventListener('click', () => { $$result.log('document'); });
    window.addEventListener('click', () => { $$result.log('window'); });

    // divImages[0].firstElementChild.click();
  }

  buttons[0].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Bubbling desde imágenes de categorías');
    $$result.log('Al cliquear en una categoría se genera un borde en cada uno de los ancestros hasta HTML.');
    $$result.log('Cada ancestro tiene asociado el manejador.');
    $$result.log('Los eventos se capturan de dentro hacía fuera.');
    testBubbling();
  });

  function testStopPropagation() {
    const categories = document.getElementById('categories');
    const divImages = categories.querySelectorAll('.cat-list-image');

    function getElement(event) {
      this.style.border = '2px solid red';
      $$result.log(`Target: ${event.target.nodeName} Element: ${this.nodeName}`);
    }

    for (const div of divImages) {
      div.firstElementChild.addEventListener('click', getElement);
      div.addEventListener('click', getElement);
    }
    categories.addEventListener('click', getElement);
    document.body.addEventListener('click', (event) => {
      event.stopPropagation();
    });
    document.documentElement.addEventListener('click', getElement);
    document.addEventListener('click', () => { $$result.log('document'); });
    window.addEventListener('click', () => { $$result.log('window'); });

    // divImages[0].firstElementChild.click();
  }

  buttons[1].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('stopPropagation() con bubbling');
    $$result.log('Detenemos la propagación en BODY.');
    $$result.log('El evento se lanza desde la primera imagen de las categorías.');
    testStopPropagation();
  });

  function testCapturing() {
    const categories = document.getElementById('categories');
    const divImages = categories.querySelectorAll('.cat-list-image');

    function getElement(event) {
      this.style.border = '2px solid red';
      $$result.log(`Capturing -> Target: ${event.target.nodeName} Element: ${this.nodeName}`);
    }

    for (const div of divImages) {
      div.firstElementChild.addEventListener('click', getElement, { capture: true });
      div.addEventListener('click', getElement, { capture: true });
    }
    categories.addEventListener('click', getElement, { capture: true });
    document.body.addEventListener('click', getElement, { capture: true });
    document.documentElement.addEventListener('click', getElement, { capture: true });
    document.addEventListener('click', () => { $$result.log('document'); }, { capture: true });
    window.addEventListener('click', () => { $$result.log('window'); }, { capture: true });

    // divImages[0].firstElementChild.click();
  }

  buttons[2].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Capturing desde imágenes de categorías');
    $$result.log('Al cliquear en una categoría se genera un borde en cada uno de los ancestros hasta HTML.');
    $$result.log('Cada ancestro tiene asociado el manejador.');
    $$result.log('Los eventos se capturan de fuera hacía dentro.');
    testCapturing();
  });

  function testStopPropagationV2() {
    const categories = document.getElementById('categories');
    const divImages = categories.querySelectorAll('.cat-list-image');

    function getElement(event) {
      this.style.border = '2px solid red';
      $$result.log(`Target: ${event.target.nodeName} Element: ${this.nodeName}`);
    }

    for (const div of divImages) {
      div.firstElementChild.addEventListener('click', getElement, { capture: true });
      div.addEventListener('click', getElement, { capture: true });
    }
    categories.addEventListener('click', getElement, { capture: true });
    document.body.addEventListener('click', (event) => {
      event.stopPropagation();
    }, { capture: true });
    document.documentElement.addEventListener('click', getElement, { capture: true });
    document.addEventListener('click', () => { $$result.log('document'); }, { capture: true });
    window.addEventListener('click', () => { $$result.log('window'); }, { capture: true });

    divImages[0].firstElementChild.click();
  }

  function testPreventDefault() {
    const links = document.querySelectorAll('#footer div.row div:nth-child(3) ul li a');
    for (const link of links) {
      link.addEventListener('click', function (event) {
        alert(this.innerText);
        event.preventDefault();
      });
    }

    const message = document.getElementById('message');
    message.addEventListener('dblclick', function () {
      alert(`Este es mi identificador: ${this.id}`);
    });
    message.addEventListener('mousedown', (event) => {
      event.preventDefault();
    });

    message.addEventListener('contextmenu', function (event) {
      alert(`Este es mi identificador: ${this.id}`);
      event.preventDefault();
    });
    document.addEventListener('contextmenu', (event) => {
      if (!event.defaultPrevented) {
        alert('contextmenu: document');
        event.preventDefault();
      }
    });
  }

  buttons[3].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('preventDefault()');
    $$result.log('Enlaces de servicios lanzan alert pero no se produce el cambio de documento.');
    $$result.log('Podemos hacer doble click en el texto de banner de descuento o botón secundario.');
    testPreventDefault();
  });

  function testEventsDelegation() {
    class TilesHandler {
      constructor() {
        this.selectedTile = null;
      }

      handleEvent(event) {
        const target = event.target.closest('.card');
        if (event.currentTarget.contains(target)) {
          if (this.selectedTile) {
            this.selectedTile.classList.remove('bg-danger');
            this.selectedTile.classList.remove('text-white');
          }
          this.selectedTile = target;
          this.selectedTile.classList.add('bg-danger');
          this.selectedTile.classList.add('text-white');
        }
      }
    }

    const tiles = document.getElementById('tiles');
    tiles.style.display = 'block';
    const th = new TilesHandler();
    tiles.addEventListener('click', th);
  }

  buttons[4].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Ejemplo de delegación');
    $$result.log('Enlaces de servicios lanzan alert pero no se produce el cambio de documento.');
    $$result.log('Podemos hacer doble click en el texto de banner de descuento o botón secundario.');
    testEventsDelegation();
  });

  function testCustomEvent() {
    function getElement(event) {
      $$result.log(`Target: ${event.target.nodeName} Element: ${this.nodeName}`);
      $$result.log(event.isTrusted);
      $$result.log(`clientX: ${event.clientX} clientY: ${event.clientY}`);
    }

    function getElementInCustomEvent(event) {
      $$result.log(`Target: ${event.target.nodeName} Element: ${this.nodeName}`);
      $$result.log(`prop1: ${event.detail.prop1} prop2: ${event.detail.prop2}`);
    }

    const categories = document.getElementById('categories');
    const divImages = categories.querySelectorAll('.cat-list-image');

    for (const div of divImages) {
      div.firstElementChild.addEventListener('click', getElement);
      div.addEventListener('click', getElement);
    }
    categories.addEventListener('click', getElement);
    document.body.addEventListener('click', getElement);
    document.documentElement.addEventListener('click', getElement);
    document.addEventListener('click', getElement);

    const clickEvent = new MouseEvent('click', {
      bubbles: true,
      clientX: 100,
      clientY: 200,
    });
    divImages[0].dispatchEvent(clickEvent);

    for (const div of divImages) {
      div.firstElementChild.addEventListener('myevent', getElementInCustomEvent);
      div.addEventListener('myevent', getElementInCustomEvent);
    }
    categories.addEventListener('myevent', getElementInCustomEvent);
    document.body.addEventListener('myevent', getElementInCustomEvent);
    document.documentElement.addEventListener('myevent', getElementInCustomEvent);
    document.addEventListener('myevent', getElementInCustomEvent);

    const myevent = new CustomEvent('myevent', {
      bubbles: true,
      detail: {
        prop1: 'value1',
        prop2: 'value2',
      },
    });
    divImages[0].firstElementChild.dispatchEvent(myevent);

    const button = document.getElementById('button');
    button.onclick = function (event) {
      alert('Primera parte del evento');

      button.dispatchEvent(new CustomEvent('myevent', {
        bubbles: true,
      }));

      alert('Segunda parte del evento');
    };
    document.addEventListener('myevent', () => alert('Evento anidado'));
  }

  buttons[5].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Evento myevent');
    $$result.log('Definimos evento para que se propague y que reciba objeto concreto.');
    $$result.log('El evento se lanza desde la primera imagen de las categorías.');
    testCustomEvent();
  });
}());
