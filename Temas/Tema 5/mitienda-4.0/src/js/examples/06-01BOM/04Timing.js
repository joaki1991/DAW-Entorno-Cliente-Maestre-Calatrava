(function () {
  const examples = document.getElementById('examples');
  const divExamples = examples.children[17];
  const buttons = divExamples.getElementsByClassName('tab-pane')[3].getElementsByTagName('button');

  buttons[0].addEventListener('click', () => {
    const categories = $('#categories');
    $$result.clear();
    $$result.logBold('setTimeout()');
    $$result.log('Ejemplo de uso del método.');

    const examples = document.getElementById('examples');
    examples.append(document.createElement('hr'));
    const bStartTimeOut = document.createElement('button');
    bStartTimeOut.classList.add('btn');
    bStartTimeOut.classList.add('m-1');
    bStartTimeOut.innerHTML = 'Inicio TimeOut';

    let controlTimeOut = null;

    bStartTimeOut.addEventListener('click', (event) => {
      controlTimeOut = setTimeout(() => {
        alert('Función Timeout');
        $$result.log('Fin del Time out.');
      }, 3000);
      $$result.log('Inicio del Time out.');
    });
    examples.append(bStartTimeOut);

    const bStopTimeOut = document.createElement('button');
    bStopTimeOut.classList.add('btn');
    bStopTimeOut.classList.add('m-1');
    bStopTimeOut.innerHTML = 'Parar TimeOut';

    bStopTimeOut.addEventListener('click', (event) => {
      clearTimeout(controlTimeOut);
      $$result.log('Timeout cancelado.');
    });
    bStartTimeOut.after(bStopTimeOut);
  });

  buttons[1].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('setInterval()');
    $$result.log('Ejemplo de uso del método.');

    const examples = document.getElementById('examples');
    const message = document.getElementById('message');
    examples.append(document.createElement('hr'));

    let controlInterval = null;
    const bStartInterval = document.createElement('button');
    bStartInterval.classList.add('btn');
    bStartInterval.classList.add('m-1');
    bStartInterval.innerHTML = 'Iniciar Reloj';

    bStartInterval.addEventListener('click', (event) => {
      controlInterval = setInterval(() => {
        const date = new Date();
        message.innerHTML = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      }, 1000);
    });
    examples.append(bStartInterval);

    const bStopInterval = document.createElement('button');
    bStopInterval.classList.add('btn');
    bStopInterval.classList.add('m-1');
    bStopInterval.innerHTML = 'Parar Reloj';

    bStopInterval.addEventListener('click', (event) => {
      clearTimeout(controlInterval);
    });
    bStartInterval.after(bStopInterval);
  });
}());
