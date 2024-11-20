(function () {
  const examples = document.getElementById('examples');
  const divExamples = examples.children[15];
  const buttons = divExamples.getElementsByClassName('tab-pane')[0].getElementsByTagName('button');

  function testGetElementById() {
    const message = document.getElementById('message');
    console.dir(message);
    message.style.border = '2px solid red';
  }
  buttons[0].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Selección de un elemento por id');
    $$result.log('Seleccionamos texto cabecera y añadimos borde rojo.');
    testGetElementById();
  });

  function testQuerySelector() {
    document.querySelector('#message').style.background = 'blue';
    document.querySelector('.navbar .account').style.background = 'yellow';
    document.querySelector('li:first-child').style.background = 'red';
    document.querySelector('li:last-child').style.background = 'green';
    document.querySelector('li:nth-child(3)').style.background = 'purple';

    const message = document.getElementById('footer');
    message.querySelector('li:first-child').style.background = 'red';
    message.querySelector('li:last-child').style.background = 'green';
    message.querySelector('li:nth-child(3)').style.background = 'purple';
  }

  buttons[1].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Selección de un elemento por selector');
    $$result.logBold('Desde la raíz');
    $$result.log('Seleccionamos el primer elemento que cumple el selector especificado.');
    $$result.log('#message' + ' blue');
    $$result.log('.navbar .account' + ' yellow');
    $$result.log('li:first-child' + ' red');
    $$result.log('li:last-child' + ' green');
    $$result.log('li:nth-child(3)' + ' purple');
    $$result.logBold('Desde footer');
    $$result.log('li:first-child' + ' red');
    $$result.log('li:last-child' + ' green');
    $$result.log('li:nth-child(3)' + ' purple');

    testQuerySelector();
  });

  function testQuerySelectorAll() {
    const ul = document.querySelector('#footer .footer-links ul');
    const itemList = ul.querySelectorAll('li a');
    itemList.forEach((item, index) => {
      item.textContent = index + 1 + item.textContent;
    });
  }

  buttons[2].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Selección de mltiples elementos por selector');
    $$result.log('Devuelve NodeList es estático, utiliza for-each');
    $$result.log('Primera lista en el footer');
    $$result.log('#footer .footer-links ul');
    $$result.log('Seleccionamos los enlaces dentro de li');
    $$result.log('li a');
    $$result.log('Numeramos estos enlaces');

    testQuerySelectorAll();
  });

  function testGetElementsByTagName() {
    const ul = document.querySelector('#footer div.row div:nth-child(3) ul');
    const itemList = ul.getElementsByTagName('a');
    for (const link of itemList) {
      link.style.textDecoration = 'underline';
    }
  }

  buttons[3].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Selección de múltiples elementos por nombre de Tag');
    $$result.log('Devuelve HTMLCollection');
    $$result.log('Tercera lista en el footer');
    $$result.log('#footer div.row div:nth-child(3) ul');
    $$result.log('Todos los enlaces subrayados');

    testGetElementsByTagName();
  });

  function testGetElementsByClassName() {
    const footer = document.getElementById('footer');
    const divs = footer.getElementsByClassName('footer-links');
    for (let i = 0; i < divs.length; i++) {
      divs[i].style.border = '2px solid red';
    }
  }

  buttons[4].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Selección de múltiples elementos por nombre de clase');
    $$result.log('Devuelve HTMLCollection');
    $$result.log('Contenedores de listas en el footer');
    $$result.log('Añadimos border rojo de 2px');

    testGetElementsByClassName();
  });

  function testClosest() {
    const element = document.getElementById('button');
    let container = button.closest('div');
    while (container) {
      container.style.border = '2px solid green';
      container = container.parentElement.closest('div');
    }
  }

  buttons[5].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Selección de elemento padre en base a selector CSS');
    $$result.log('Devuelve elemento');
    $$result.log('Recorremos todos los padres a partir del botón "Ver Artículo"');
    $$result.log('Añadimos border verde de 2px');

    testClosest();
  });

  function testMatches() {
    const links = document.querySelectorAll('a');
    for (const link of links) {
      if (link.matches('.dropdown-item')) $$result.log(link.textContent);
    }
  }

  buttons[6].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Emparejar con selector');
    $$result.log('Muestra todos los enlaces .dropdown-item a partir de la selección completa.');
    testMatches();
  });

  function testNodeListVSHTMLCollection() {
    const nodelist = document.querySelectorAll('a');
    const htmlCollection = document.getElementsByTagName('a');
    $$result.log(`Tamaño NodeList: ${nodelist.length}`);
    $$result.log(`Tamaño HTMLCollection: ${htmlCollection.length}`);
    document.body.insertAdjacentHTML('beforeend', '<a>NodeList vs HTMLCollection</a>');
    $$result.log(`Tamaño NodeList: ${nodelist.length}`);
    $$result.log(`Tamaño HTMLCollection: ${htmlCollection.length}`);
  }

  buttons[7].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Comparativa NodeList vs HTMLCollection');

    testNodeListVSHTMLCollection();
  });
}());
