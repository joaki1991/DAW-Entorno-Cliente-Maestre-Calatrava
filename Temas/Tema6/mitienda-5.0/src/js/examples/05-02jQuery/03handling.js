$(() => {
  const examples = document.getElementById('examples');
  const divExamples = examples.children[16];
  const buttons = divExamples.getElementsByClassName('tab-pane')[4].getElementsByTagName('button');

  function testContent() {
    $$result.logBold('Método text() con función de callback');
    $$result.log('Modificamos enlaces de servicios.');
    const ul = $('#footer div.row div:nth-child(3) ul');
    ul.find('a').text((index, oldText) => `${oldText} MiTienda ${index + 1}`);

    $$result.logBold('Método val()');
    $$result.log('Modificamos suscríbete.');
    const email = $('input[type=email');
    email.val('usuario@dominio.es');

    $$result.logBold('Método attr()');
    $$result.log('Modificamos enlace del logo.');
    const logo = $('#logo');
    logo.attr({
      title: 'Enlace logo',
      href: 'https://api.jquery.com/',
      alt: 'Logo de la página',
    });
  }

  buttons[0].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Fijar contenido');
    testContent();
  });

  function testStyle() {
    $$result.logBold('Método css()');
    $$result.log('Modificamos simultanea de servicios.');
    const ul = $('#footer div.row div:nth-child(3) ul');
    ul.children().css({
      border: '1px solid red',
      textDecoration: 'underline',
    });
  }

  buttons[1].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Cambiar estilos: Utilizando el objeto style');
    testStyle();
  });

  function testClasses() {
    $$result.logBold('Métodos addClass() y removeClass()');
    $$result.log('Modificamos de clases en servicios.');
    const ul = $('#footer div.row div:nth-child(3) ul');
    const oddI = ul.children().odd().find('i');
    oddI.removeClass(['bi', 'bi-chevron-right']);
    oddI.addClass(['bi', 'bi-balloon-fill']);
    const evenI = ul.children().even().find('i');
    evenI.removeClass(['bi', 'bi-chevron-right']);
    evenI.addClass((index, classes) => {
      console.log(index);
      if (index % 2 === 0) { return ['bi', 'bi-bug']; }
      return ['bi', 'bi-bug-fill'];
    });
  }

  buttons[2].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Cambiar estilos: Utilizando clases');
    testClasses();
  });

  function testCreateElements() {
    $$result.logBold('Métodos append(), prepend(), after() y before()');
    $$result.log('Añadimos elementos en categorías.');

    const div1 = $('<div></div>').text('Append').css('border', '1px solid red');
    const div2 = $('<div></div>').text('Prepend').css('border', '1px solid red');
    const div3 = $('<div></div>').text('After').css('border', '1px solid red');
    const div4 = $('<div></div>').text('Before').css('border', '1px solid red');
    const ul = $('<ul><li>item1</li><li>item2</li><li>item3</li></ul>');

    const dom1 = document.createElement('div');
    dom1.appendChild(document.createTextNode('DOM Append'));
    dom1.style.border = '1px solid blue';
    const dom2 = document.createElement('div');
    dom2.appendChild(document.createTextNode('DOM Prepend'));
    dom2.style.border = '1px solid blue';
    const dom3 = document.createElement('div');
    dom3.appendChild(document.createTextNode('DOM After'));
    dom3.style.border = '1px solid blue';
    const dom4 = document.createElement('div');
    dom4.appendChild(document.createTextNode('DOM Before'));
    dom4.style.border = '1px solid blue';

    const categories = $('#categories');
    categories.css('border', '5px solid green');
    categories.append(div1, [dom1, 'Texto en append']);
    categories.prepend(div2, [dom2, 'Texto en prepend']);
    categories.after(div3, [dom3, 'Texto en after']);
    categories.before(div4, [dom4, 'Texto en before']);
  }

  buttons[3].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Añadir contenido: Insertar elementos');
    testCreateElements();
  });

  function testInsertElementsV1() {
    $$result.logBold('Métodos appendTo() y preprendTo()');
    $$result.log('Creamos dos objetos DIV y los añadimos en cada columna de categorías.');
    const div1 = $('<div></div>').text('appendTo').css('border', '1px solid red');
    const div2 = $('<div></div>').text('prependTo').css('border', '1px solid red');
    div1.appendTo('#categories div.row > div');
    div2.prependTo('#categories div.row > div');
  }

  buttons[4].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Añadir contenido: Insertar elementos respecto un elemento');
    testInsertElementsV1();
  });

  function testMoveElementsV1() {
    $$result.logBold('Métodos appendTo() y preprendTo()');
    $$result.log('Intercambiamos la primera por la última categoría en categorías.');
    const firstColumn = $('#categories div.row > div').first();
    const lastColumn = $('#categories div.row > div').last();
    firstColumn.appendTo('#categories div.row ');
    lastColumn.prependTo('#categories div.row ');
  }

  buttons[5].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Añadir contenido: Mover elementos respecto un elemento');
    testMoveElementsV1();
  });

  function testInsertElementsV2() {
    $$result.logBold('Métodos insertAfter(), insertBefore() y clone()');
    $$result.log('Insertamos nueva categoría a partir de segunda categoría.');
    const category = $('#categories div.row > div').first();
    const newCategory = category.clone(true, true);
    newCategory.find('img').attr('src', 'https://via.placeholder.com/258x172.jpg?text=Categoría nueva');
    newCategory.find('h3').text('Nueva categoría');
    newCategory.insertAfter(category.next());
  }

  buttons[6].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Añadir contenido: Insertar elementos como hermanos');
    testInsertElementsV2();
  });

  function testMoveElementsV2() {
    $$result.logBold('Métodos appendTo() y preprendTo()');
    $$result.log('Intercambiamos la primera por la última categoría en categorías.');
    const firstColumn = $('#categories div.row > div').first();
    const lastColumn = $('#categories div.row > div').last();
    firstColumn.insertAfter('#categories div.row > div:last-child');
    lastColumn.insertBefore('#categories div.row > div:first-child');
  }

  buttons[7].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Añadir contenido: Mover elementos respecto un elemento');
    testMoveElementsV2();
  });

  function testReplaceElements() {
    $$result.logBold('Métodos replaceWith() y replaceAll()');
    $$result.log('Reemplazamos Enlaces de Interés y Servicios.');
    const newAnchor = $('<a></a>').text('Nuevo enlace');
    newAnchor.attr('href', '#');

    const links1 = $('#footer div.row div:nth-child(2) ul li a');
    const links2 = $('#footer div.row div:nth-child(3) ul li a');
    links1.replaceWith(newAnchor);
    newAnchor.replaceAll(links2);
  }

  buttons[8].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Añadir contenido: Reempalzar elementos');
    testReplaceElements();
  });

  function testWrappers() {
    $$result.logBold('Métodos wrapInner(), wrapAll() y unwrap()');
    $$result.log('Añadimos a los ul del footer un nuevo div.');
    $$result.log('Seleccionamos el header y el primer div para que tengan el mismo padre.');
    $$result.log('Eliminamos los padres de los contenedores de footer.');
    const div = $('<div></div>').css({
      border: '5px solid red',
      margin: '10px',
    });
    $('footer ul').wrap(div);
    $('#categories div.row > div').wrapInner(div);
    $('body > header, body > div').wrapAll(div);
    $('footer div.container').unwrap();
  }

  buttons[9].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Añadir contenido: Envolver elementos');
    testWrappers();
  });

  function testRemoveElements() {
    $$result.logBold('Métodos remove(), empty() y detach()');
    $$result.log('Todos los elementos li del footer, pero al no seleccionar los que están en primera posición, estos se mantienen.');
    $$result.log('Eliminamos el contenido de div.banner.');
    $$result.log('Eliminamos la primera categoría y la añadimos al final del contenedor.');
    $('footer ul li').remove('li:not(:first-child)');
    $('div.banner').empty();
    let firstColumn = $('#categories div.row > div').first();
    firstColumn = firstColumn.detach();
    $('#categories div.row').append(firstColumn);
  }

  buttons[10].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Añadir contenido: Eliminar elementos');
    testRemoveElements();
  });

  window.testRemoveElements = function () {
  };
});
