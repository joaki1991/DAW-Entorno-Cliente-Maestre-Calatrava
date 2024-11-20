(function () {
  const examples = document.getElementById('examples');
  const divExamples = examples.children[15];
  const buttons = divExamples.getElementsByClassName('tab-pane')[5].getElementsByTagName('button');

  function testEventV1() {
    const button = document.getElementById('button');
    button.onclick = function (event) {
      alert(`Identificador: ${event.target.id} Tipo: ${event.type}`);
    };
  }

  buttons[0].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('event.target');
    $$result.log('Botón ver artículo');
    testEventV1();
  });

  function testEventV2() {
    const categories = document.getElementById('categories');
    categories.addEventListener('click', function (event) {
      alert(`this: ${this.id} target: ${event.target.nodeName}, ${this === event.currentTarget}`);
    });
  }

  buttons[1].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('this vs target');
    $$result.log('Cliquear en categorías');
    testEventV2();
  });

  class CounterHandler {
    constructor(init, target) {
      this.value = init;
      this.target = target;
    }

    increment() {
      this.value += 1;
    }

    handleEvent(event) {
      this.increment();
      (this.target)
        ? this.target.innerHTML = this.value
      	: event.currentTarget.innerHTML = this.value;
    }
  }

  function testHandler() {
    const button = document.getElementById('button');
    const message = document.getElementById('message');
    const profile = document.querySelector('.image');
    const handler = new CounterHandler(3, message);
    button.addEventListener('click', handler);
    profile.addEventListener('click', handler);
  }

  buttons[2].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Handler');
    $$result.log('El botón "ver artículos" se convierte en un contador de clicks.');
    $$result.log('La imagen del perfil también lo es.');
    testHandler();
  });

  function testClickEvent() {
    const banner = document.querySelector('.banner');
    const div = document.createElement('div');
    div.id = 'references';
    div.style.border = '5px solid red';
    banner.after(div);
    banner.addEventListener('click', (event) => {
      let str = '';
      str = `offsetX: ${event.offsetX} offsetY: ${event.offsetY}<br>`;
      str += `clientX: ${event.clientX} clientY: ${event.clientY}<br>`;
      str += `pageX: ${event.pageX} pageY: ${event.pageY}<br>`;
      str += `screenX: ${event.screenX} screenY: ${event.screenY}<br>`;
      div.innerHTML = str;
    });

    const button = document.getElementById('button');
    button.addEventListener('click', (event) => {
      if (event.ctrlKey) banner.click();
    });
  }

  buttons[3].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Evento click');
    $$result.log('Cliquea en el banner de la página.');
    testClickEvent();
  });

  function testMouseDownAndUpEvent() {
    const banner = document.querySelector('.banner');
    const message = document.getElementById('message');
    banner.addEventListener('mousedown', (event) => {
      banner.style.border = '10px solid red';
      message.innerHTML = event.button;
    });
    banner.addEventListener('mouseup', (event) => {
      banner.style.border = 'none';
    });
  }

  buttons[4].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Eventos mousedown y mouseup');
    $$result.log('Cliquea con cualquier botón en el banner.');
    $$result.log('Mientras el botón esté pulsado se mostrar un borde.');
    $$result.log('Al liberarlo se eliminará.');
    $$result.log('Muestra el botón pulsado.');
    testMouseDownAndUpEvent();
  });

  function testMouseEnterAndLeave() {
    const categories = document.getElementById('categories');
    const divImages = categories.querySelectorAll('.cat-list-image');
    function showDimensions(event) {
      const dimensionsDiv = document.createElement('div');
      dimensionsDiv.classList.add('border');
      dimensionsDiv.classList.add('border-primary');
      dimensionsDiv.classList.add('p-2');
      dimensionsDiv.style.background = '#f5f5f5';
      dimensionsDiv.style.width = '150px';
      dimensionsDiv.style.position = 'absolute';
      dimensionsDiv.style.top = `${event.offsetY}px`;
      dimensionsDiv.style.left = `${event.offsetX}px`;
      const str = `offsetWidth: ${this.offsetWidth}<br>` + `offsetHeight: ${this.offsetHeight}`;
      dimensionsDiv.innerHTML = str;
      this.append(dimensionsDiv);
    }

    function hideDimensions(event) {
      this.children[1].remove();
    }

    function moveDimensions(event) {
      this.children[1].style.top = `${event.offsetY + 10}px`;
      this.children[1].style.left = `${event.offsetX + 10}px`;
    }

    for (const div of divImages) {
      div.style.position = 'relative';
      div.addEventListener('mouseenter', showDimensions);
      div.addEventListener('mousemove', moveDimensions);
      div.addEventListener('mouseleave', hideDimensions);
    }
  }

  buttons[5].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Eventos mouseenter, mouseleave y mousemove');
    $$result.log('Capa flotante en imágenes de categorías');
    testMouseEnterAndLeave();
  });

  function testMouseOverAndOut() {
    document.body.addEventListener('mouseover', (event) => {
      event.target.classList.add('border');
      event.target.classList.add('border-danger');
      event.relatedTarget.classList.remove('border');
      event.relatedTarget.classList.remove('border-danger');
    });

    /*
    document.body.addEventListener('mouseout', (event) => {
      event.target.classList.remove('border');
      event.target.classList.remove('border-danger');
    });
		*/
  }

  buttons[6].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Eventos mouseover y mouseout');
    $$result.log('Evento en body para mostrar borde en cada uno de sus descendientes.');
    testMouseOverAndOut();
  });

  function testFocus() {
    const input = document.querySelector("input[name = 'email']");
    input.addEventListener('focus', (event) => {
      const div = document.createElement('div');
      event.target.parentElement.append(div);
      div.innerText = 'Introduce un correo electrónico.';
    });
    input.addEventListener('blur', (event) => {
      event.target.nextElementSibling.nextElementSibling.remove();
    });
  }

  buttons[7].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Eventos focus y blur');
    $$result.log('Muestra mensaje en caja de texto del botón de suscripción.');
    testFocus();
  });

  function testKeyEventV1() {
    const input = document.querySelector("input[name = 'email']");
    const div = document.createElement('div');
    input.parentElement.append(div);
    input.focus();

    input.addEventListener('keydown', function (event) {
      this.parentElement.append(
        document.createTextNode(`${event.key}(${event.code}) `),
      );
      this.normalize();
    });
  }

  buttons[8].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Evento keydown');
    $$result.log('Muestra teclas pulsadas en caja de texto del botón de suscripción.');
    testKeyEventV1();
  });

  function testKeyEventV2() {
    const categories = document.getElementById('categories');
    const divImages = categories.querySelectorAll('.cat-list-image');

    document.addEventListener('keydown', (event) => {
      if (event.altKey) {
        if (event.code.indexOf('Numpad') > -1
					|| event.code.indexOf('Digit') > -1) {
          let number = (event.code.length === 7)
            ? event.code.substring(6)
            : event.code.substring(5);
          number = +number;
          if (number < divImages.length && divImages[number].children.length < 2) {
            const dimensionsDiv = document.createElement('div');
            dimensionsDiv.classList.add('border');
            dimensionsDiv.classList.add('border-primary');
            dimensionsDiv.classList.add('p-2');
            dimensionsDiv.style.background = '#f5f5f5';
            dimensionsDiv.style.width = '150px';
            dimensionsDiv.style.position = 'absolute';
            dimensionsDiv.style.top = `${0}px`;
            dimensionsDiv.style.left = `${0}px`;
            const str = `offsetWidth: ${divImages[number].offsetWidth}<br>` + `offsetHeight: ${divImages[number].offsetHeight}`;
            dimensionsDiv.innerHTML = str;

            divImages[number].style.position = 'relative';
            divImages[number].append(dimensionsDiv);
          }
        }
      }
    });

    document.addEventListener('keyup', (event) => {
      if (event.altKey) {
        if (event.code.indexOf('Numpad') > -1
					|| event.code.indexOf('Digit') > -1) {
          let number = (event.code.length === 7)
            ? event.code.substring(6)
            : event.code.substring(5);
          number = +number;
          if (number < divImages.length) {
            divImages[number].children[1].remove();
          }
        }
      }
    });
  }

  buttons[9].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Evento keydown');
    $$result.log('Muestra capa en cada imágen al pulsar alt + Nº de imágen.');
    testKeyEventV2();
  });
}());
