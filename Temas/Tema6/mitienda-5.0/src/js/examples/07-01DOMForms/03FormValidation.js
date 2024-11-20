(function () {
  const examples = document.getElementById('examples');
  const divExamples = examples.children[18];
  const buttons = divExamples.getElementsByClassName('tab-pane')[2].getElementsByTagName('button');

  buttons[0].addEventListener('click', () => {
    showFormExample('cValidation');
    $$result.clear();
    $$result.logBold('Muestra formulario para validación estándar HTML5.');

    const form = document.forms.fValidation;
    form.removeAttribute('novalidate');
    form.vfPhone.setAttribute('placeholder', '(6-9)XXXXXXXX');
    form.vfPhone.setAttribute('maxlength', '9');
    form.vfPhone.setAttribute('pattern', '^[96][0-9]{8}$');
  });

  buttons[1].addEventListener('click', () => {
    showFormExample('cValidation');
    $$result.clear();
    $$result.logBold('Personalización de mensajes y validación mediante API.');

    const form = document.forms.fValidation;
    form.removeAttribute('novalidate');
    form.vfPhone.setAttribute('placeholder', '(6-9)XXXXXXXX');
    form.vfPhone.setAttribute('maxlength', '9');
    form.vfPhone.setAttribute('pattern', '^[96][0-9]{8}$');

    form.vfName.addEventListener('invalid', function () {
      this.setCustomValidity('El nombre es obligatorio.');
    });
    form.vfName.addEventListener('change', function () {
      this.setCustomValidity('');
    });
    form.vfSurname1.addEventListener('invalid', function () {
      this.setCustomValidity('El primer apellido es obligatorio.');
    });
    form.vfSurname1.addEventListener('change', function () {
      this.setCustomValidity('');
    });
    form.vfBirth.addEventListener('invalid', function () {
      this.setCustomValidity('La fecha de nacimiento es incorrecta.');
    });
    form.vfBirth.addEventListener('change', function () {
      this.setCustomValidity('');
    });
    form.vfEmail.addEventListener('invalid', function () {
      this.setCustomValidity('El formato del correo electrónico no es correcto.');
    });
    form.vfEmail.addEventListener('change', function () {
      this.setCustomValidity('');
    });
    form.vfUrl.addEventListener('invalid', function () {
      this.setCustomValidity('La URL no es válida.');
    });
    form.vfUrl.addEventListener('change', function () {
      this.setCustomValidity('');
    });
    form.vfNumber.addEventListener('invalid', function () {
      if (this.validity.rangeOverflow) {
        this.setCustomValidity('El valor está por encima del límite.');
      }
      if (this.validity.rangeUnderflow) {
        this.setCustomValidity('El valor está por debajo del límite.');
      }
    });
    form.vfNumber.addEventListener('change', function () {
      this.setCustomValidity('');
    });
    form.vfDni.addEventListener('invalid', function () {
      this.setCustomValidity('El DNI debe estar formado por 8 digitos y una letra.');
    });
    form.vfDni.addEventListener('change', function () {
      this.setCustomValidity('');
    });
    form.vfPhone.addEventListener('invalid', function () {
      this.setCustomValidity('El número de teléfono debe ser un móvil o un fijo.');
    });
    form.vfPhone.addEventListener('change', function () {
      this.setCustomValidity('');
    });
    form.vfCreditCard.addEventListener('invalid', function () {
      this.setCustomValidity('La tarjeta de crédito no es válida.');
    });
    form.vfCreditCard.addEventListener('change', function () {
      this.setCustomValidity('');
    });
    form.vfPwd.addEventListener('invalid', function () {
      this.setCustomValidity('La contraseña debe tener entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula. Puede tener otros símbolos.');
    });
    form.vfPwd.addEventListener('change', function () {
      this.setCustomValidity('');
    });
    form.vfConfirm.addEventListener('invalid', function () {
      if (this.validity.patternMismatch) {
        this.setCustomValidity('La contraseña debe tener entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula. Puede tener otros símbolos.');
      }
    });
    form.vfConfirm.addEventListener('change', function () {
      this.setCustomValidity('');
      if (form.vfPwd.value !== form.vfConfirm.value) {
        this.setCustomValidity('Las constaseñas deben ser iguales.');
      }
    });
    form.vfFile.addEventListener('change', function () {
      this.setCustomValidity('');
      if (!checkFileExtension(this.files[0], ['jpg', 'png', 'gif'])) {
        this.setCustomValidity('Debe seleccionar un archivo con extensión jpg, png o gif.');
      }
      const size = 10;
      if (checkFileSize(this.files[0], size)) {
        this.setCustomValidity(`"El archivo ${this.files[0].name} no debe ser mayor a ${size}KB"`);
      }
    });
    form.vfTerms.addEventListener('invalid', function () {
      this.setCustomValidity('Debe aceptar los términos de uso.');
    });
    form.vfTerms.addEventListener('change', function () {
      this.setCustomValidity('');
    });

    function checkFileExtension(file, allowedExtensions) {
      const fileExtension = file.name.split('.').pop().toLowerCase();
      return allowedExtensions.some((extension) => extension === fileExtension);
    }
    function checkFileSize(file, size) {
      return (file.size > size * 1024);
    }
  });

  buttons[2].addEventListener('click', () => {
    showFormExample('cValidation');
    $$result.clear();
    $$result.logBold('Validación mediante código JS.');
    $$result.log('Validación en evento submit.');
    $$result.log('Validación en línea submit.');
    $$result.log('Uso de máscaras.');

    const form = document.forms.fValidation;

    form.setAttribute('novalidate', '');
    form.vfPhone.setAttribute('placeholder', '(+34) XXX XX XX XX');
    form.vfPhone.setAttribute('maxlength', '18');
    form.vfPhone.setAttribute('pattern', '^\(\+\d\d\) \d\d\d \d\d \d\d \d\d$');

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
          message = 'El valor está po encima del límite.';
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

    form.vfDni.addEventListener('beforeinput', function (event) {
      let isValid = true;
      if (event.data) {
        if (this.value.length < 8) {
          if (!/\d/.test(event.data)) isValid = false;
        } else if (this.value.length === 8) {
          if (!/[A-Za-z]/.test(event.data)) isValid = false;
        } else {
          isValid = false;
        }
        if (!isValid) {
          event.preventDefault();
        } else {
          this.value += event.data.toUpperCase();
        }
      }
    });

    function formatPhoneNumber(phone) {
      phone = phone.replace(/^(\+|\(\+)/, '00');
      phone = phone.replace(/\D/g, '');
      phone = phone.replace(/^([69])/, '0034$1');

      if (phone.length > 11) {
        phone = phone.replace(/^00(\d\d)(\d\d\d)(\d\d)(\d\d)(\d+)/, '(+$1) $2 $3 $4 $5');
      } else if (phone.length > 9) {
        phone = phone.replace(/^00(\d\d)(\d\d\d)(\d\d)(\d+)/, '(+$1) $2 $3 $4');
      } else if (phone.length > 7) {
        phone = phone.replace(/^00(\d\d)(\d\d\d)(\d+)/, '(+$1) $2 $3');
      } else if (phone.length > 4) {
        phone = phone.replace(/^00(\d\d)(\d+)/, '(+$1) $2');
      } else if (phone.length > 2) {
        phone = phone.replace(/^00(\d+)/, '(+$1)');
      } else {
        phone = phone.replace(/^00/, '+');
      }
      return phone;
    }

    form.vfPhone.addEventListener('beforeinput', function (event) {
      let isValid = true;
      const character = event.data;
      if (character) {
        if (this.value.length === 15) {
          isValid = false;
        } else if (this.value.length === 0) {
          if (!/[690+]/.test(character)) isValid = false;
        } else if (this.value.length >= 1) {
          if (!/[\d]/.test(character)) isValid = false;
        } else {
          isValid = false;
        }
        if (!isValid) {
          event.preventDefault();
        }
      }
    });

    form.vfPhone.addEventListener('paste', function (event) {
      this.value = formatPhoneNumber(this.value);
    });
    form.vfPhone.addEventListener('change', function () {
      this.value = formatPhoneNumber(this.value);
    });

    form.vfPhone.addEventListener('input', function (event) {
      if (this.value.length <= 4 && event.inputType.indexOf('deleteContent') !== -1) this.value = '';
      this.value = formatPhoneNumber(this.value);
    });

    function formatCreditCard(card) {
      card = card.replace(/\D/g, '');
      card = card.replace(/^(\d{4})?(\d{4})?(\d{4})?(\d{4})/, '$1 $2 $3 $4 ');
      card = card.replace(/\s{2}/g, ' ');
      return (card.length < 19) ? card.trimStart() : card.trim();
    }

    form.vfCreditCard.addEventListener('beforeinput', function (event) {
      let isValid = true;
      const character = event.data;
      if (character) {
        if (!/[\d]/.test(character)) isValid = false;
        if (!isValid) {
          event.preventDefault();
        }
        this.value = formatCreditCard(this.value);
      }
    });
    form.vfCreditCard.addEventListener('paste', function (event) {
      this.value = formatCreditCard(this.value);
    });
    form.vfCreditCard.addEventListener('change', function () {
      this.value = formatCreditCard(this.value);
    });
  });
}());
