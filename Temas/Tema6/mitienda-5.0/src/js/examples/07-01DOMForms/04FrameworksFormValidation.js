(function () {
  const examples = document.getElementById('examples');
  const divExamples = examples.children[18];
  const buttons = divExamples.getElementsByClassName('tab-pane')[3].getElementsByTagName('button');

  buttons[0].addEventListener('click', () => {
    alert();
    showFormExample('cValidation');
    $$result.clear();
    $$result.logBold('Máscaras utilizando plugin.');
    $$result.log('En DNI.');
    $$result.log('En teléfono.');
    $$result.log('En tarjeta de crédito.');

    const form = document.forms.fValidation;
    form.setAttribute('novalidate', '');
    form.vfPhone.setAttribute('placeholder', '(+34) XXX XX XX XX');
    form.vfPhone.setAttribute('maxlength', '18');
    form.vfPhone.setAttribute('pattern', '^\(\+\d\d\) \d\d\d \d\d \d\d \d\d$');

    // Definición de máscaras
    $(form.vfDni).mask('00000000S');
    $(form.vfPhone).mask(PhoneMaskBehavior, {
      translation: {
        I: { pattern: /[\+069]/ },
        P: { pattern: /[\+]/ },
        Z: { pattern: /0/ },
        N: { pattern: /[69]/ },
      },
      onKeyPress(val, e, elem, options) {
        if (elem.val().length < 3) elem.mask(PhoneMaskBehavior.apply({}, arguments), options);
      },
      onComplete(val, e, elem, options) {
        let mask = '(P00) 000 00 00 00';
        if (/^\(\+/.test(val)) {
          mask = '(P00) 000 00 00 00';
        } else if (/^\(0/.test(val)) {
          elem.val(elem.val().replace(/^\(00/, '(+'));
        } else if (/^(\()?[69]/.test(val)) {
          elem.val(`(+34)${elem.val()}`);
        }
        elem.mask(mask, options);
        maskCheckElement(e, elem);
      },
    });
    $(form.vfCreditCard).mask('0000 0000 0000 0000', {
      clearIfNotMatch: true,
      placeholder: '0000 0000 0000 0000',
    });

    function PhoneMaskBehavior(val, e, elem) {
      let mask = '(I00) 000 00 00 00';
      if (/^\(\+/.test(val)) {
        mask = '(P00) 000 00 00 00';
      } else if (/^\(0/.test(val)) {
        mask = '(ZZ00) 000 00 00 00';
      } else if (/^(\()?[69]/.test(val)) {
        mask = 'N00 00 00 00';
      }
      return mask;
    }

    function maskCheckElement(event, elem) {
      elem.val(elem.val().trim());
      if (!elem.get(0).checkValidity()) {
        showFeedBack(elem.get(0), false);
      } else {
        showFeedBack(elem.get(0), true);
      }
    }

    form.addEventListener('submit', function (event) {
      form.setAttribute('novalidate', true);
      let isValid = true;
      let firstInvalidElement = null;

      if (!this.vfTerms.checked) {
        isValid = false;
        showFeedBack(this.vfTerms, false);
        firstInvalidElement = this.vfTerms;
      } else {
        showFeedBack(this.vfTerms, true);
      }

      const size = 10;
      if (!this.vfFile.value) {
        isValid = false;
        firstInvalidElement = this.vfFile;
        const message = 'Adjuntar un fichero es obligatorio.';
        showFeedBack(this.vfFile, false, message);
      } else if (!checkFileExtension(this.vfFile.files[0], ['jpg', 'png', 'gif'])) {
        isValid = false;
        firstInvalidElement = this.vfFile;
        const message = 'Debe seleccionar un archivo con extensión jpg, png o gif.';
        showFeedBack(this.vfFile, false, message);
      } else if (checkFileSize(this.vfFile.files[0], size)) {
        isValid = false;
        firstInvalidElement = this.vfFile;
        const message = `El archivo ${this.vfFile.files[0].name} no debe ser mayor a ${size}KB`;
        showFeedBack(this.vfFile, false, message);
      } else {
        showFeedBack(this.vfFile, true, message);
      }

      if (!this.vfPwd.checkValidity()) {
        isValid = false;
        showFeedBack(this.vfPwd, false);
        firstInvalidElement = this.vfPwd;
      } else if (this.vfPwd.value !== this.vfConfirm.value) {
        isValid = false;
        showFeedBack(this.vfPwd, false, 'La contraseña y la confirmación deben ser iguales.');
        showFeedBack(this.vfConfirm, false, ' ');
        firstInvalidElement = this.vfPwd;
      } else {
        showFeedBack(this.vfPwd, true);
        showFeedBack(this.vfConfirm, true, ' ');
      }

      this.vfCreditCard.value = this.vfCreditCard.value.trim();
      if (!this.vfCreditCard.checkValidity()) {
        isValid = false;
        showFeedBack(this.vfCreditCard, false);
        firstInvalidElement = this.vfCreditCard;
      } else {
        showFeedBack(this.vfCreditCard, true);
      }

      this.vfPhone.value = this.vfPhone.value.trim();
      if (!this.vfPhone.checkValidity()) {
        isValid = false;
        showFeedBack(this.vfPhone, false);
        firstInvalidElement = this.vfPhone;
      } else {
        showFeedBack(this.vfPhone, true);
      }

      this.vfDni.value = this.vfDni.value.trim();
      if (!this.vfDni.checkValidity()) {
        isValid = false;
        showFeedBack(this.vfDni, false);
        firstInvalidElement = this.vfDni;
      } else {
        showFeedBack(this.vfDni, true);
      }

      if (!this.vfNumber.checkValidity()) {
        isValid = false;
        let message;
        if (this.vfNumber.validity.rangeOverflow) {
          message = 'El valor está po encima del límite.';
        }
        if (this.vfNumber.validity.rangeUnderflow) {
          message = 'El valor está por debajo del límite.';
        }
        showFeedBack(this.vfNumber, false, message);
        firstInvalidElement = this.vfNumber;
      } else {
        showFeedBack(this.vfNumber, true);
      }

      if (!this.vfUrl.checkValidity()) {
        isValid = false;
        showFeedBack(this.vfUrl, false);
        firstInvalidElement = this.vfUrl;
      } else {
        showFeedBack(this.vfUrl, true);
      }

      if (!this.vfEmail.checkValidity()) {
        isValid = false;
        showFeedBack(this.vfEmail, false);
        firstInvalidElement = this.vfEmail;
      } else {
        showFeedBack(this.vfEmail, true);
      }

      if (!this.vfBirth.checkValidity()) {
        isValid = false;
        showFeedBack(this.vfBirth, false);
        firstInvalidElement = this.vfBirth;
      } else {
        showFeedBack(this.vfBirth, true);
      }

      this.vfSurname2.value = this.vfSurname2.value.trim();
      showFeedBack(this.vfSurname2, true);

      if (!this.vfSurname1.checkValidity()) {
        isValid = false;
        showFeedBack(this.vfSurname1, false);
        firstInvalidElement = this.vfSurname1;
      } else {
        showFeedBack(this.vfSurname1, true);
      }

      if (!this.vfName.checkValidity()) {
        isValid = false;
        showFeedBack(this.vfName, false);
        firstInvalidElement = this.vfName;
      } else {
        showFeedBack(this.vfName, true);
      }

      if (!isValid) {
        event.preventDefault();
        event.stopPropagation();
        firstInvalidElement.focus();
      }
    });

    form.addEventListener('reset', (function (event) {
      for (const div of this.querySelectorAll('div.valid-feedback, div.invalid-feedback')) {
        div.classList.remove('d-block');
        div.classList.add('d-none');
      }
      for (const input of this.querySelectorAll('input')) {
        input.classList.remove('is-valid');
        input.classList.remove('is-invalid');
      }
      this.vfName.focus();
    }));

    function showFeedBack(input, valid, message) {
      const validClass = (valid) ? 'is-valid' : 'is-invalid';
      const messageDiv = (valid) ? input.parentElement.querySelector('div.valid-feedback') : input.parentElement.querySelector('div.invalid-feedback');
      for (const div of input.parentElement.getElementsByTagName('div')) {
        div.classList.remove('d-block');
      }
      messageDiv.classList.remove('d-none');
      messageDiv.classList.add('d-block');
      input.classList.remove('is-valid');
      input.classList.remove('is-invalid');
      input.classList.add(validClass);
      if (message) {
        messageDiv.innerHTML = message;
      }
    }

    function checkFileExtension(file, allowedExtensions) {
      const fileExtension = file.name.split('.').pop().toLowerCase();
      return allowedExtensions.some((extension) => extension === fileExtension);
    }
    function checkFileSize(file, size) {
      return (file.size > size * 1024);
    }

    function defaultCheckElement(event) {
      this.value = this.value.trim();
      if (!this.checkValidity()) {
        showFeedBack(this, false);
      } else {
        showFeedBack(this, true);
      }
    }

    form.vfName.addEventListener('change', defaultCheckElement);
    form.vfSurname1.addEventListener('change', defaultCheckElement);
    form.vfSurname2.addEventListener('change', defaultCheckElement);
    form.vfBirth.addEventListener('change', defaultCheckElement);
    form.vfEmail.addEventListener('change', defaultCheckElement);
    form.vfUrl.addEventListener('change', defaultCheckElement);
    form.vfDni.addEventListener('change', defaultCheckElement);
    form.vfPhone.addEventListener('change', defaultCheckElement);
    form.vfCreditCard.addEventListener('change', defaultCheckElement);
    form.vfPwd.addEventListener('change', defaultCheckElement);
    form.vfConfirm.addEventListener('change', defaultCheckElement);
    form.vfTerms.addEventListener('change', defaultCheckElement);

    form.vfNumber.addEventListener('change', function (event) {
      if (!this.checkValidity()) {
        let message;
        if (this.validity.rangeOverflow) {
          message = 'El valor está por encima del límite.';
        }
        if (this.validity.rangeUnderflow) {
          message = 'El valor está por debajo del límite.';
        }
        showFeedBack(this, false, message);
      } else {
        showFeedBack(this, true);
      }
    });

    form.vfFile.addEventListener('change', function (event) {
      const size = 10;
      if (!this.value) {
        const message = 'Adjuntar un fichero es obligatorio.';
        showFeedBack(this, false, message);
      } else if (!checkFileExtension(this.files[0], ['jpg', 'png', 'gif'])) {
        const message = 'Debe seleccionar un archivo con extensión jpg, png o gif.';
        showFeedBack(this, false, message);
      } else if (checkFileSize(this.files[0], size)) {
        const message = `El archivo ${this.files[0].name} no debe ser mayor a ${size}KB`;
        showFeedBack(this, false, message);
      } else {
        showFeedBack(this, true, message);
      }
    });
  });

  buttons[1].addEventListener('click', () => {
    showFormExample('cValidation');
    $$result.clear();
    $$result.logBold('Validación mediante Bootstrap.');

    const form = document.forms.fValidation;
    form.setAttribute('novalidate', '');
    form.classList.add('needs-validation');

    form.addEventListener('submit', (event) => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });
}());
