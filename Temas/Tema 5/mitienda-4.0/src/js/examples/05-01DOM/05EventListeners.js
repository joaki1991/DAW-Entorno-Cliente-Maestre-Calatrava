(function () {
  const examples = document.getElementById('examples');
  const divExamples = examples.children[15];
  const buttons = divExamples.getElementsByClassName('tab-pane')[4].getElementsByTagName('button');

  function testListenerV1() {
    const button = document.getElementById('button');
    button.onclick = function () {
      alert('Ejecución del manejador');
    };
  }

  buttons[0].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('onclick');
    $$result.log('Botón ver artículo');
    testListenerV1();
  });

  function testListenerV2() {
    const button = document.getElementById('button');
    button.onclick = function () {
      alert(`Identificador: ${this.id}`);
    };
  }

  buttons[1].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('onclick con this');
    $$result.log('Botón ver artículo');
    testListenerV2();
  });

  function testListenerV3() {
    const button = document.getElementById('button');
    button.addEventListener('click', function () {
      console.log('Evento minúsculas.');
      this.classList.toggle('text-lowercase');
    });
    button.addEventListener('click', function () {
      console.log('Evento negrita.');
      this.classList.toggle('font-weight-bold');
    });
  }

  buttons[2].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('onclick addEventListener');
    $$result.log('Botón ver artículo');
    $$result.log('Cambio de negrita y minúsculas');
    testListenerV3();
  });

  function testListenerV4() {
    const profile = document.querySelector('.image');
    profile.addEventListener(
      'click',
      () => {
        alert('John Doe');
      },
      {
        once: true,
      },
    );
  }

  buttons[3].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Opción once');
    $$result.log('Cliquea en la imagen del perfil del usuario.');
    $$result.log('Se mostrará una alerta un única vez.');
    testListenerV4();
  });

  function listenerExercise1() {
    const ul = document.querySelector('#footer div.row div:nth-child(2) ul');
    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'new-link';
    input.placeholder = 'Nuevo enlace';
    ul.parentElement.append(input);

    const button = document.createElement('button');
    button.innerText = 'Añadir';
    ul.parentElement.append(button);

    button.addEventListener('click', () => {
      const input = document.getElementById('new-link');
      if (input.value.length > 4) {
        const ul = document.querySelector('#footer div.row div:nth-child(2) ul');
        const li = document.createElement('li');
        ul.append(li);
        const anchor = document.createElement('a');
        anchor.href = '#';
        li.append(anchor);
        const i = document.createElement('i');
        i.classList.add('bi');
        i.classList.add('bi-chevron-right');
        anchor.append(i);
        const text = document.createTextNode(` ${input.value}`);
        anchor.append(text);
      } else {
        alert('La longitud debe ser de al menos 5 caracteres.');
      }
      input.value = '';
    });
  }

  buttons[4].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Ejercicio 1 input y button');
    $$result.log('Añade un elemento input y un button en los enlaces de interés. El botón debe recoger el texto del input, validar que tenga al menos cinco caracteres y añadirlo como enlace al listado.');
    listenerExercise1();
  });

  // Manejador de eventos
  function imageFullScreen() {
    if (this.requestFullscreen) {
      this.requestFullscreen();
    }
  }

  function listenerExercise2() {
    const categories = document.getElementById('categories');
    const images = categories.getElementsByTagName('img');
    for (const image of images) {
      image.addEventListener('click', imageFullScreen);
    }
  }

  buttons[5].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Ejercicio 2: Categorías a pantalla completa');
    $$result.log('Añade un manejador de eventos para cada una de la sección de categorías, para que al cliquear en ellas se abra la imagen a tamaño de pantalla completo.');
    listenerExercise2();
  });

  function testRemoveEventListener() {
    const categories = document.getElementById('categories');
    const images = categories.getElementsByTagName('img');
    images[0].removeEventListener('click', imageFullScreen);
  }

  buttons[6].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Borrado de manejador imágenes de categoría');
    $$result.log('Eliminamos el manejador creado en el ejercicio 2.');
    testRemoveEventListener();
  });
}());
