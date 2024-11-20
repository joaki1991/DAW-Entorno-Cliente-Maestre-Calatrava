(function () {
  const examples = document.getElementById('examples');
  const divExamples = examples.children[15];
  const buttons = divExamples.getElementsByClassName('tab-pane')[3].getElementsByTagName('button');

  function testCreateElement() {
    const ul = document.querySelector('#footer div.row div:nth-child(3) ul');
    const li = document.createElement('li');
    ul.append(li);
    const anchor = document.createElement('a');
    anchor.href = '#';
    li.append(anchor);
    const i = document.createElement('i');
    i.classList.add('bi');
    i.classList.add('bi-chevron-right');
    anchor.append(i);
    const text = document.createTextNode(` Servicio ${ul.children.length}`);
    anchor.append(text);
  }

  buttons[0].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('createElement() y appendChild()');
    $$result.log('Añadimos nuevo enlace en Servicios');
    testCreateElement();
  });

  function testInsert() {
    const dom1 = document.createElement('div');
    dom1.append(document.createTextNode('DOM Append'));
    dom1.style.border = '1px solid blue';
    const dom2 = document.createElement('div');
    dom2.append(document.createTextNode('DOM Prepend'));
    dom2.style.border = '1px solid blue';
    const dom3 = document.createElement('div');
    dom3.append(document.createTextNode('DOM After'));
    dom3.style.border = '1px solid blue';
    const dom4 = document.createElement('div');
    dom4.append(document.createTextNode('DOM Before'));
    dom4.style.border = '1px solid blue';

    const categories = document.getElementById('categories');
    categories.style.border = '5px solid green';
    categories.append(dom1, 'Texto en append');
    categories.prepend(dom2, 'Texto en prepend');
    categories.after(dom3, 'Texto en after');
    categories.before(dom4, 'Texto en before');

    const banner = document.querySelector('.article-banner');
    banner.replaceWith('Aquí estaba el banner');

    const div1 = '<div style="border: 1px solid red">beforebegin</div>';
    const div2 = '<div style="border: 1px solid red">afterbegin</div>';
    const div3 = '<div style="border: 1px solid red">beforeend</div>';
    const div4 = '<div style="border: 1px solid red">afterend</div>';
    categories.insertAdjacentHTML('beforebegin', div1);
    categories.insertAdjacentHTML('afterbegin', div2);
    categories.insertAdjacentHTML('beforeend', div3);
    categories.insertAdjacentHTML('afterend', div4);
  }

  buttons[1].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Insersición en categorías');
    $$result.log('Añadimos nuevo enlace de interés');
    testInsert();
  });

  function testCloneNode() {
    const li = document.querySelector('#footer div.row div:nth-child(2) ul li:nth-child(2)');
    const new_li = li.cloneNode(true);
    new_li.firstElementChild.childNodes[1].textContent = ' Nuevo enlace';
    li.parentElement.append(new_li);
  }

  buttons[2].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('cloneNode()');
    $$result.log('Añadimos nuevo enlace de interés clonado');
    testCloneNode();
  });

  function testRemove() {
    const li = document.querySelector('#footer div.row div:nth-child(2) ul li:nth-child(2)');
    const ul = li.parentElement;
    li.remove();
    ul.append(li);
  }

  buttons[3].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('remove()');
    $$result.log('Borramo el segundo enlace de interés');
    testRemove();
  });

  function getDocumentFragment(links) {
    const df = new DocumentFragment();
    for (const child of links.children) {
      df.append(child.cloneNode(true));
    }
    return df;
  }

  function getArrayFromNode(links) {
    const array = [];
    for (const child of links.children) {
      array.push(child.cloneNode(true));
    }
    return array;
  }

  buttons[4].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('remove()');
    $$result.log('Añadimos los enlaces de interés a los servicios');
    $$result.log('Añadimos los servicios a los enlaces de interés');

    const linksOfInteres = document.querySelector('#footer div.row div:nth-child(2) ul');
    const services = document.querySelector('#footer div.row div:nth-child(3) ul');
    const dfLinks = getDocumentFragment(linksOfInteres);
    const arrayServices = getArrayFromNode(services);
    console.log(linksOfInteres);
    services.append(dfLinks);
    linksOfInteres.append(...arrayServices);
  });
}());
