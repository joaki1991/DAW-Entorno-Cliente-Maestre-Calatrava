(function () {
  const examples = document.getElementById('examples');
  const divExamples = examples.children[17];
  const buttons = divExamples.getElementsByClassName('tab-pane')[2].getElementsByTagName('button');

  buttons[0].addEventListener('click', () => {
    const value = confirm('Confirma o cancela la acción');
    $$result.log(value);
  });

  buttons[1].addEventListener('click', () => {
    const value = prompt('Dime tu nombre', 'anónimo');
    $$result.log(value);
  });
}());
