(function () {
  const examples = document.getElementById('examples');
  const divExamples = examples.children[18];
  const buttons = divExamples.getElementsByClassName('tab-pane')[1].getElementsByTagName('button');

  buttons[0].addEventListener('click', () => {
    showFormExample('dynamicForm');
    $$result.clear();
    $$result.log('Muestra contenido en base a radio botones.');

    const radioHandler = (event) => {
      const fieldset = event.currentTarget.form[`fs${event.currentTarget.value}`];
      const fieldsets = event.currentTarget.form.querySelectorAll('fieldset.details');
      for (const fd of fieldsets) {
        fd.classList.add('d-none');
        fd.disabled = true;
      }
      fieldset.classList.remove('d-none');
      fieldset.disabled = false;
    };

    const radios = document.forms.dynamic.product;
    for (const radio of radios) {
      radio.addEventListener('click', radioHandler);
    }

    document.getElementById('b-dynamic').addEventListener('click', (event) => {
      event.preventDefault();
      $$result.log('##########');
      $$result.log(event.currentTarget.form.product.value);
      for (const radio of event.currentTarget.form.product) {
        $$result.log(radio.checked);
      }
    });
  });
}());
