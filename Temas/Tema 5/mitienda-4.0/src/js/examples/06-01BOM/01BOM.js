(function () {
  const examples = document.getElementById('examples');
  const divExamples = examples.children[17];
  const buttons = divExamples.getElementsByClassName('tab-pane')[0].getElementsByTagName('button');

  buttons[0].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Funciones globales sin window');
    $$result.log(document.getElementById('message').textContent);
    $$result.logBold('Funciones globales con window');
    $$result.log(window.document.getElementById('message').textContent);
  });

  buttons[1].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Dimensiones de la ventana');
    $$result.log(`Altura: ${window.innerHeight}`);
    $$result.log(`Anchura: ${window.innerWidth}`);
  });

  buttons[2].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Gestión de nueva ventana');
    $$result.log('Abrir ventanas');
    $$result.log('Pasar el foco entre ventanas');
    $$result.log('Modificar contenido entre ventanas');
    $$result.log('Invocar funciones entre ventanas');
    $$result.log('Abrir enlaces en nueva ventana');
    $$result.log('Mover ventanas');
    $$result.log('Redimensionar ventanas');

    let mywindow = null;
    const examples = document.getElementById('examples');
    examples.append(document.createElement('hr'));
    const bOpen = document.createElement('button');
    bOpen.classList.add('btn');
    bOpen.classList.add('m-1');
    bOpen.innerHTML = 'Abrir ventana';
    bOpen.addEventListener('click', (event) => {
      if (!mywindow || mywindow.closed) {
        mywindow = window.open('auxPage.html', 'Mywindow', 'width=800, height=600, top=250, left=250, titlebar=yes, toolbar=no, menubar=no, location=no');
      } else {
        mywindow.focus();
      }
    });
    examples.append(bOpen);

    // Close Window
    const bClose = document.createElement('button');
    bClose.classList.add('btn');
    bClose.classList.add('m-1');
    bClose.innerHTML = 'Cerrar ventana';
    bClose.addEventListener('click', (event) => {
      if (mywindow && !(mywindow.closed)) {
        mywindow.close();
        $$result.log('Acabas de cerrar la ventana.');
      } else {
        $$result.log('La ventana está cerrada.');
      }
    });
    bOpen.after(bClose);

    // Title
    const bTitle = document.createElement('button');
    bTitle.classList.add('btn');
    bTitle.classList.add('m-1');
    bTitle.innerHTML = 'Título';
    bTitle.addEventListener('click', (event) => {
      if (mywindow && !(mywindow.closed)) {
        $$result.log(mywindow.document.querySelector('h1').textContent);
      } else {
        $$result.log('La ventana está cerrada.');
      }
    });
    bClose.after(bTitle);

    // Greeting
    const bGreeting = document.createElement('button');
    bGreeting.classList.add('btn');
    bGreeting.classList.add('m-1');
    bGreeting.innerHTML = 'Saludar';
    bGreeting.addEventListener('click', (event) => {
      if (mywindow && !(mywindow.closed)) {
        mywindow.document.getElementById('message').textContent = greeting();
        mywindow.focus();
      } else {
        $$result.log('La ventana está cerrada.');
      }
    });
    bTitle.after(bGreeting);

    // Get Greeting
    const bGetGreeting = document.createElement('button');
    bGetGreeting.classList.add('btn');
    bGetGreeting.classList.add('m-1');
    bGetGreeting.innerHTML = 'Obtener Saludo';
    bGetGreeting.addEventListener('click', (event) => {
      if (mywindow && !(mywindow.closed)) {
        $$result.log(mywindow.greeting());
      } else {
        $$result.log('La ventana está cerrada.');
      }
    });
    bGreeting.after(bGetGreeting);

    const link = document.createElement('a');
    link.classList.add('btn');
    link.classList.add('m-1');
    link.innerHTML = 'Enlace a ventana';
    link.target = 'Mywindow';
    link.href = 'https://developer.mozilla.org/es/';
    bGetGreeting.after(link);

    const bMoveTo = document.createElement('button');
    bMoveTo.classList.add('btn');
    bMoveTo.classList.add('m-1');
    bMoveTo.innerHTML = 'Mover';
    bMoveTo.addEventListener('click', (event) => {
      if (mywindow && !(mywindow.closed)) {
        mywindow.moveTo(1250, 1250);
        mywindow.focus();
      } else {
        $$result.log('La ventana está cerrada.');
      }
    });
    link.after(bMoveTo);

    document.addEventListener('keydown', (event) => {
      event.preventDefault();
      switch (event.code) {
        case 'ArrowUp':
          mywindow.moveBy(0, -10);
          break;
        case 'ArrowDown':
          mywindow.moveBy(0, 10);
          break;
        case 'ArrowLeft':
          mywindow.moveBy(-10, 0);
          break;
        case 'ArrowRight':
          mywindow.moveBy(10, 0);
          break;
      }
    });

    const bResize = document.createElement('button');
    bResize.classList.add('btn');
    bResize.classList.add('m-1');
    bResize.innerHTML = 'Redimensionar';
    bResize.addEventListener('click', (event) => {
      if (mywindow && !(mywindow.closed)) {
        mywindow.resizeTo(1024, 768);
        mywindow.focus();
      } else {
        $$result.log('La ventana está cerrada.');
      }
    });
    bMoveTo.after(bResize);

    document.addEventListener('keydown', (event) => {
      event.preventDefault();
      switch (event.code) {
        case 'Numpad8':
          mywindow.resizeBy(0, 10);
          break;
        case 'Numpad2':
          mywindow.resizeBy(0, -10);
          break;
        case 'Numpad4':
          mywindow.resizeBy(-10, 0);
          break;
        case 'Numpad6':
          mywindow.resizeBy(10, 0);
          break;
      }
    });
  });

  buttons[3].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Propiedades objeto screen');
    $$result.log(`Width: ${screen.width}`);
    $$result.log(`Height: ${screen.height}`);
    $$result.log(`availWidth: ${screen.availWidth}`);
    $$result.log(`availHeight: ${screen.availHeight}`);
  });

  buttons[4].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Propiedades objeto location');
    $$result.log(`href: ${location.href}`);
    $$result.log(`hostname: ${location.hostname}`);
    $$result.log(`pathname: ${location.pathname}`);
    $$result.log(`protocol: ${location.protocol}`);
    $$result.log(`puerto: ${location.port}`);
  });

  function reload() {
    window.location.reload();
  }
  buttons[5].addEventListener('click', reload);

  function assign() {
    window.location.assign('https://developer.mozilla.org/es/');
  }
  buttons[6].addEventListener('click', assign);
}());

function greeting() {
  return 'La ventana propietaria dice hola.';
}
