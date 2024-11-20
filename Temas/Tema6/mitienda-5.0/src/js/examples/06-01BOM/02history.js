(function () {
  const examples = document.getElementById('examples');
  const divExamples = examples.children[17];
  const buttons = divExamples.getElementsByClassName('tab-pane')[1].getElementsByTagName('button');

  function showHistoryLength() {
    $$result.clear();
    $$result.log('Número de páginas en history');
    $$result.log(`Length: ${window.history.length}`);
  }
  buttons[0].addEventListener('click', showHistoryLength);

  buttons[1].addEventListener('click', () => {
    const examples = document.getElementById('examples');
    examples.append(document.createElement('hr'));
    $$result.clear();
    $$result.logBold('Navegar con objeto history');
    $$result.log('Botones de ir hacía adelante y hacía atrás.');

    // Botón atrás
    const bBack = document.createElement('button');
    bBack.classList.add('btn');
    bBack.classList.add('m-1');
    bBack.innerHTML = 'Atrás';
    bBack.addEventListener('click', (event) => {
      window.history.back();
    });
    examples.append(bBack);

    // Botón adelante
    const bForward = document.createElement('button');
    bForward.classList.add('btn');
    bForward.classList.add('m-1');
    bForward.innerHTML = 'Adelante';
    bForward.addEventListener('click', (event) => {
      window.history.forward();
    });
    bBack.after(bForward);

    // Botón atrás
    const bGoBack = document.createElement('button');
    bGoBack.classList.add('btn');
    bGoBack.classList.add('m-1');
    bGoBack.innerHTML = 'go (-1)';
    bGoBack.addEventListener('click', (event) => {
      window.history.go(-1);
    });
    bForward.after(bGoBack);

    // Botón reload
    const bGoReload = document.createElement('button');
    bGoReload.classList.add('btn');
    bGoReload.classList.add('m-1');
    bGoReload.innerHTML = 'go ()';
    bGoReload.addEventListener('click', (event) => {
      window.history.go();
    });
    bGoBack.after(bGoReload);

    // Botón reload
    const bGoForward = document.createElement('button');
    bGoForward.classList.add('btn');
    bGoForward.classList.add('m-1');
    bGoForward.innerHTML = 'go (1)';
    bGoForward.addEventListener('click', (event) => {
      window.history.go(1);
    });
    bGoReload.after(bGoForward);
  });

  buttons[2].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Manipulación de history');
    $$result.log('Método pushState()');
    $$result.log('Evento popstate');

    function selectCategory(cat) {
      cat.style.border = '3px solid red';
      cat.style.display = 'block';
      for (const link of links) {
        if (link !== cat) link.style.border = 'none';
      }
    }

    const categories = document.getElementById('categories');
    let links = categories.getElementsByTagName('a');
    links = [...links];
    for (const link of links) {
      link.addEventListener('click', function (event) {
        selectCategory(this);
        const index = links.indexOf(link);
        history.pushState({ category: index }, null);
        event.preventDefault();
      });
    }

    window.addEventListener('popstate', (event) => {
      if (event.state) {
        selectCategory(links[event.state.category]);
      }
    });
  });
}());
