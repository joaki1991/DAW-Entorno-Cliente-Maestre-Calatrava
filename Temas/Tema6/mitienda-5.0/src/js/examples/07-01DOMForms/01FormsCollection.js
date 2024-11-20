(function () {
  const examples = document.getElementById('examples');
  const divExamples = examples.children[18];
  const buttons = divExamples.getElementsByClassName('tab-pane')[0].getElementsByTagName('button');

  buttons[0].addEventListener('click', () => {
    showFormExample('login1');
    $$result.clear();
    $$result.logBold('Colección forms');
    $$result.log(`Nº de formularios en la página: ${document.forms.length}`);
    $$result.logBold('Acceso por índice');
    $$result.log(`Nombre del formulario: ${document.forms[0].name}`);
    $$result.logBold('Acceso por nombre');
    $$result.log(`Nombre del formulario: ${document.forms.login1.name}`);
    $$result.logBold('Acceso con notación punto');
    $$result.log(`Nombre del formulario: ${document.forms.login1.name}`);
    $$result.logBold('Acceso a campos del formulario');
    $$result.log(`Nombre campo pwd: ${document.forms.login1.pwd.name}`);
    $$result.log(`Valor campo pwd: ${document.forms.login1.pwd.value}`);
  });

  buttons[1].addEventListener('click', () => {
    showFormExample('login1');
    $$result.clear();
    $$result.logBold('Colección elements');
    $$result.log(document.forms.login1.elements.length);
    $$result.log(document.forms.login1.elements[0].name);
    $$result.log(document.forms.login1.elements[0].value);
    $$result.log(document.forms.login1.elements.pwd.name);
    $$result.log(document.forms.login1.elements.pwd.value);
    $$result.log(document.forms.login1.elements.pwd.name);
    $$result.log(document.forms.login1.elements.pwd.value);
    $$result.log(document.forms.login1.elements[3].type);
  });

  buttons[2].addEventListener('click', () => {
    showFormExample('login1');
    const bSubmit = document.forms.login1.elements[3];
    bSubmit.addEventListener(
      'click',
      function (event) {
        event.preventDefault();
        $$result.log(this.type);
        $$result.log(this.form.name);
        this.form.email.value = 'cambiado@test.es';
        this.form.pwd.value = '67890';
        $$result.log(this.form.email.value);
        $$result.log(this.form.pwd.value);
      },
    );

    $$result.clear();
    $$result.logBold('Evento click sobre botón de submit');
  });
}());
