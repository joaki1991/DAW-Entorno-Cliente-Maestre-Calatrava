(function () {
  const examples = document.getElementById('examples');
  const divExamples = examples.children[15];
  const buttons = divExamples.getElementsByClassName('tab-pane')[1].getElementsByTagName('button');

  function elementManipulationV1() {
    const message = document.getElementsByClassName('banner')[0];
    alert(message.textContent);
    alert(message.innerText);
    alert(message.innerHTML);
    console.log(message.textContent);
    console.log(message.innerText);
    console.log(message.innerHTML);
  }

  function elementManipulationV2() {
    const message = document.getElementById('message');
    const message2 = document.getElementById('message2');
    message.innerText = '<span>1 span</span> <span>2 span</span>';
    message2.innerHTML = '<span>1 span</span> <span>2 span</span>';
  }

  buttons[0].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Propiedades para modificar contenido');
    $$result.log('textContent de Node');
    $$result.log('innerText de HTMLElement');
    $$result.log('innerHTML de HTMLElement');
    $$result.log('Modificamos los mensajes en el banner');
    elementManipulationV1();
    elementManipulationV2();
  });

  function testAttributesV1() {
    const ul = document.querySelector('#footer .footer-links ul');
    const itemList = ul.querySelectorAll('li a');
    itemList.forEach((item, index) => {
      if (item.getAttribute('href').indexOf('#') === -1) { item.setAttribute('href', `${document.documentURI}#`); } else { item.setAttribute('href', document.documentURI); }
      if (!item.hasAttribute('title')) {
        item.setAttribute('title', `Título ${index}`);
        item.setAttribute('alt', item.innerText);
      }
    });
  }

  function testAttributesV2() {
    const ul = document.querySelector('#footer .footer-links ul');
    ul.id = 'enlaces-interes';
    alert(ul.id);
  }

  buttons[1].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('getAttribute(), setAttribute() y hasAttribute()');
    $$result.log('Selección enlaces de interés.');
    $$result.log('Modificamos href');
    $$result.log('Añadimos alt y title');
    $$result.log('Creamos identificador');
    testAttributesV1();
    testAttributesV2();
  });

  function testAttributesV3() {
    const ul = document.querySelector('#footer div.row div:nth-child(3) ul');
    const itemList = ul.querySelectorAll('li:nth-child(odd) a i');
    for (const i of itemList) {
      i.classList.replace('fa-angle-right', 'fa-angle-left');
      i.classList.add('text-primary');
    }
  }

  buttons[2].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('replace() y add()');
    $$result.log('Seleccionamos los servicios en posición impar, para cambiar el icono de flecha derecha por la flecha izquierda.');
    testAttributesV3();
  });

  function testAttributesV4() {
    const ul = document.querySelector('#footer div.row div:nth-child(3) ul');
    const itemList = ul.querySelectorAll('li a i');
    for (const i of itemList) {
      i.classList.toggle('text-primary');
    }
  }

  buttons[3].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('toggle()');
    $$result.log('Seleccionamos los servicios todos los elementos para intercambiar la clase text-primary');
    testAttributesV4();
  });

  function testAttributesV5() {
    const ul = document.querySelector('#footer div.row div:nth-child(3) ul');
    const itemList = ul.querySelectorAll('li a i');
    for (const i of itemList) {
      if (i.classList.contains('bi-chevron-right')) {
        i.classList.remove('bi-chevron-right');
        i.classList.add('bi-chevron-left');
      }
    }
  }

  buttons[4].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('contains() y remove()');
    $$result.log('Seleccionamos servicios para cambiar flecha derecha por la izquierda.');
    testAttributesV5();
  });

  function testCustomAttributes() {
    const categories = document.getElementById('categories');
    console.dir(categories);
    $$result.log(`Type: ${categories.dataset.type}`);
    $$result.log(`Code: ${categories.dataset.code}`);
    categories.dataset.code = 41;
    $$result.log(`New code: ${categories.dataset.code}`);
  }

  buttons[5].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Objeto dataset');
    $$result.log('Acceso atributos data-type y data-code en categories');
    testCustomAttributes();
  });
}());
