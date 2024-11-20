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

function defaultCheckElement(event) {
  this.value = this.value.trim();
  if (!this.checkValidity()) {
    showFeedBack(this, false);
  } else {
    showFeedBack(this, true);
  }
}

function newCategoryValidation(handler) {
  const form = document.forms.fNewCategory;
  form.setAttribute('novalidate', true);
  form.addEventListener('submit', function (event) {
    let isValid = true;
    let firstInvalidElement = null;

    this.ncDescription.value = this.ncDescription.value.trim();
    showFeedBack(this.ncDescription, true);

    if (!this.ncUrl.checkValidity()) {
      isValid = false;
      showFeedBack(this.ncUrl, false);
      firstInvalidElement = this.ncUrl;
    } else {
      showFeedBack(this.ncUrl, true);
    }

    if (!this.ncTitle.checkValidity()) {
      isValid = false;
      showFeedBack(this.ncTitle, false);
      firstInvalidElement = this.ncTitle;
    } else {
      showFeedBack(this.ncTitle, true);
    }

    if (!isValid) {
      firstInvalidElement.focus();
    } else {
      handler(this.ncTitle.value, this.ncUrl.value, this.ncDescription.value);
    }
    event.preventDefault();
    event.stopPropagation();
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
    this.ncTitle.focus();
  }));

  form.ncTitle.addEventListener('change', defaultCheckElement);
  form.ncUrl.addEventListener('change', defaultCheckElement);
}

function newProductValidation(handler) {
  const form = document.forms.fNewProduct;
  form.setAttribute('novalidate', '');

  form.addEventListener('submit', function (event) {
    let isValid = true;
    let firstInvalidElement = null;

    this.npDescription.value = this.npDescription.value.trim();
    showFeedBack(this.npDescription, true);

    if (!this.npCategories.checkValidity()) {
      isValid = false;
      showFeedBack(this.npCategories, false);
      firstInvalidElement = this.npCategories;
    } else {
      showFeedBack(this.npCategories, true);
    }

    if (!this.npUrl.checkValidity()) {
      isValid = false;
      showFeedBack(this.npUrl, false);
      firstInvalidElement = this.npUrl;
    } else {
      showFeedBack(this.npUrl, true);
    }

    if (!this.npTax.checkValidity()) {
      isValid = false;
      showFeedBack(this.npTax, false);
      firstInvalidElement = this.npTax;
    } else {
      showFeedBack(this.npTax, true);
    }

    if (!this.npPrice.checkValidity()) {
      isValid = false;
      showFeedBack(this.npPrice, false);
      firstInvalidElement = this.npPrice;
    } else {
      showFeedBack(this.npPrice, true);
    }

    if (!this.npType.checkValidity()) {
      isValid = false;
      showFeedBack(this.npType, false);
      firstInvalidElement = this.cType;
    } else {
      showFeedBack(this.npType, true);
    }

    if (!this.npModel.checkValidity()) {
      isValid = false;
      showFeedBack(this.npModel, false);
      firstInvalidElement = this.npModel;
    } else {
      showFeedBack(this.npModel, true);
    }

    if (!this.npBrand.checkValidity()) {
      isValid = false;
      showFeedBack(this.npBrand, false);
      firstInvalidElement = this.npBrand;
    } else {
      showFeedBack(this.npBrand, true);
    }

    if (!this.npSerial.checkValidity()) {
      isValid = false;
      showFeedBack(this.npSerial, false);
      firstInvalidElement = this.npSerial;
    } else {
      showFeedBack(this.npSerial, true);
    }

    if (!isValid) {
      firstInvalidElement.focus();
    } else {
      const categories = [...this.npCategories.selectedOptions].map((option) => option.value);
      handler(
        Number.parseInt(this.npSerial.value),
        this.npBrand.value,
        this.npModel.value,
        this.npType.value,
        this.npPrice.value,
        this.npTax.value,
        this.npUrl.value,
        this.npDescription.value,
        categories,
      );
    }

    event.preventDefault();
    event.stopPropagation();
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
    this.npSerial.focus();
  }));

  form.npSerial.addEventListener('change', defaultCheckElement);
  form.npBrand.addEventListener('change', defaultCheckElement);
  form.npModel.addEventListener('change', defaultCheckElement);
  form.npType.addEventListener('change', defaultCheckElement);
  form.npPrice.addEventListener('change', defaultCheckElement);
  form.npTax.addEventListener('change', defaultCheckElement);
  form.npUrl.addEventListener('change', defaultCheckElement);
  form.npDescription.addEventListener('change', defaultCheckElement);
}

export { newCategoryValidation, newProductValidation };
