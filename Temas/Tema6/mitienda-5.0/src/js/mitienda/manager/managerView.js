import { newCategoryValidation, newProductValidation } from './validation.js';

const EXCECUTE_HANDLER = Symbol('excecuteHandler');

class ManagerView {
  constructor() {
    this.main = document.getElementsByTagName('main')[0];
    this.categories = document.getElementById('categories');
    this.menu = document.querySelector('.navbar-nav');
    this.productWindow = null;
  }

  instance = {
    Laptop: this.LaptopCharacteristics,
    Camera: this.CameraCharacteristics,
    Smartphone: this.SmartphoneCharacteristics,
    Tablet: this.TabletCharacteristics,
  };

  [EXCECUTE_HANDLER](handler, handlerArguments, scrollElement, data, url, event) {
    handler(...handlerArguments);
    const scroll = document.querySelector(scrollElement);
    if (scroll) scroll.scrollIntoView();
    history.pushState(data, null, url);
    event.preventDefault();
  }

  LaptopCharacteristics(product) {
    return (`<div>Características de portátil. ${product.brand} ${product.model}</div>`);
  }

  CameraCharacteristics(product) {
    return (`<div>Características de cámara. ${product.brand} ${product.model}</div>`);
  }

  SmartphoneCharacteristics(product) {
    return (`<div>Características de teléfono. ${product.brand} ${product.model}</div>`);
  }

  TabletCharacteristics(product) {
    return (`<div>Características de tablet. ${product.brand} ${product.model}</div>`);
  }

  // Métodos para generar la vista.

  showProductTypes() {
    this.categories.replaceChildren();
    this.categories.insertAdjacentHTML('beforeend', `<div class="row" id="type-list">
			<div class="col-lg-3 col-md-6"><a href="#product-list" data-type="Camera">
					<div class="cat-list-image"><img alt="Categoría cámaras" src="img/catcamara.jpg" />
					</div>
					<div class="cat-list-text">
						<h3>Cámaras</h3>
						<div>Digitales y reflex</div>
					</div>
				</a>
			</div>
			<div class="col-lg-3 col-md-6"><a href="#product-list" data-type="Smartphone">
					<div class="cat-list-image"><img alt="Categoría móviles" src="img/catmovi.jpg" />
					</div>
					<div class="cat-list-text">
						<h3>Móviles</h3>
						<div>Modelos exclusivos</div>
					</div>
				</a>
			</div>
			<div class="col-lg-3 col-md-6"><a href="#product-list" data-type="Laptop">
					<div class="cat-list-image"><img alt="Categoría portátiles" src="img/catpportatil.jpg" />
					</div>
					<div class="cat-list-text">
						<h3>Portátiles</h3>
						<div>Intel y AMD</div>
					</div>
				</a>
			</div>
			<div class="col-lg-3 col-md-6"><a href="#product-list" data-type="Tablet">
					<div class="cat-list-image"><img alt="Categoría Tablets" src="img/cattablet.jpg" />
					</div>
					<div class="cat-list-text">
						<h3>Tablets</h3>
						<div>Android y iPad</div>
					</div>
				</a>
			</div>
		</div>`);
  }

  showProductTypesInMenu() {
    const productListMenu = document.getElementById('product-list-menu');
    productListMenu.insertAdjacentHTML('beforeend', `<ul class="dropdown-menu">
				<li><a class="dropdown-item" href="#product-list" data-type="Camera">Cámaras</a></li>
				<li><a class="dropdown-item" href="#product-list" data-type="Laptop">Portátiles</a></li>
				<li>
					<hr class="dropdown-divider">
				</li>
				<li><a class="dropdown-item" href="#product-list" data-type="Tablet">Tablets</a></li>
				<li><a class="dropdown-item" href="#product-list" data-type="Smartphone">Teléfonos móviles</a></li>
			</ul>`);
  }

  showCategories(categories) {
    if (this.categories.children.length > 1) this.categories.children[1].remove();
    const container = document.createElement('div');
    container.id = 'category-list';
    container.classList.add('row');
    for (const category of categories) {
      container.insertAdjacentHTML('beforeend', `<div class="col-lg-3 col-md-6"><a data-category="${category.title}" href="#product-list">
        <div class="cat-list-image"><img alt="${category.title}" src="${category.url}" />
        </div>
        <div class="cat-list-text">
          <h3>${category.title}</h3>
          <div>${category.description}</div>
        </div>
      </a>
    </div>`);
    }
	  this.categories.append(container);
  }

  showRemoveCategoryForm(categories) {
    this.main.replaceChildren();
    if (this.categories.children.length > 1) this.categories.children[1].remove();

    const container = document.createElement('div');
    container.classList.add('container');
    container.classList.add('my-3');
    container.id = 'remove-category';
    container.insertAdjacentHTML(
      'afterbegin',
      '<h1 class="display-5">Eliminar una categoría</h1>',
    );

    const row = document.createElement('div');
    row.classList.add('row');

    for (const category of categories) {
      row.insertAdjacentHTML('beforeend', `<div class="col-lg-3 col-md-6">
        <div class="cat-list-image"><img alt="${category.title}" src="${category.url}" />
        </div>
        <div class="cat-list-text">
          <a data-category="${category.title}" href="#category-list"><h3>${category.title}</h3></a>
					<div>${category.description}</div>
        </div>
				<div><button class="btn btn-primary" data-category="${category.title}" type='button'>Eliminar</button></div>
    </div>`);
    }
    container.append(row);
    this.main.append(container);
  }

  showCategoriesInMenu(categories) {
    const navCats = document.getElementById('navCats');
    const container = navCats.nextElementSibling;
    container.replaceChildren();
    for (const category of categories) {
      container.insertAdjacentHTML('beforeend', `<li><a data-category="${category.title}" class="dropdown-item" href="#product-list">${category.title}</a></li>`);
    }
  }

  listProducts(products, title) {
    this.main.replaceChildren();
    if (this.categories.children.length > 1) this.categories.children[1].remove();
    const container = document.createElement('div');
    container.id = 'product-list';
    container.classList.add('container');
    container.classList.add('my-3');
    container.insertAdjacentHTML('beforeend', '<div class="row"> </div>');

    for (const product of products) {
      const div = document.createElement('div');
      div.classList.add('col-md-4');
      div.insertAdjacentHTML('beforeend', `<figure class="card card-product-grid card-lg"> <a data-serial="${product.serial}" href="#single-product" class="img-wrap"><img class="${product.constructor.name}-style" src="${product.url}"></a>
					<figcaption class="info-wrap">
						<div class="row">
							<div class="col-md-8"> <a data-serial="${product.serial}" href="#single-product" class="title">${product.brand} - ${product.model}</a> </div>
							<div class="col-md-4">
								<div class="rating text-right"> <i class="bi bi-star-fill"></i> <i class="bi bi-star-fill"></i> <i class="bi bi-star-fill"></i> </div>
							</div>
						</div>
					</figcaption>
					<div class="bottom-wrap">
						<a href="#" data-serial="${product.serial}" class="btn btn-primary float-end"> Comprar </a>
						<div><span class="price h5">${product.price.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</span> <br> <small class="text-success">Free shipping</small></div>
					</div>
				</figure>`);
      container.children[0].append(div);
    }
    container.insertAdjacentHTML('afterbegin', `<h1>${title}</h1>`);
    this.main.append(container);
  }

  showProduct(product, message) {
    this.main.replaceChildren();
    if (this.categories.children.length > 1) this.categories.children[1].remove();
    const container = document.createElement('div');
    container.classList.add('container');
    container.classList.add('mt-5');
    container.classList.add('mb-5');

    if (product) {
      container.id = 'single-product';
      container.classList.add(`${product.constructor.name}-style`);
      container.insertAdjacentHTML('beforeend', `<div class="row d-flex justify-content-center">
        <div class="col-md-10">
          <div class="card">
            <div class="row">
              <div class="col-md-6">
                <div class="images p-3">
                  <div class="text-center p-4"> <img id="main-image" src="${product.url}"/> </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="product p-4">
                  <div class="mt-4 mb-3"> <span class="text-uppercase brand">${product.brand}</span>
                    <h5 class="text-uppercase">${product.model}</h5>
                    <div class="price d-flex flex-row align-items-center">
                      <span class="act-price">${product.price.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</span>
                    </div>
                  </div>
                  <p class="about">${product.description}</p>
                  <div class="sizes mt-5">
                    <h6 class="text-uppercase">Características</h6>
                  </div>
									<div class="cart mt-4 align-items-center">
										<button id="b-buy" data-serial="${product.serial}" class="btn btn-primary text-uppercase mr-2 px-4">Comprar</button>
										<button id="b-open" data-serial="${product.serial}" class="btn btn-primary text-uppercase mr-2 px-4">Abrir en nueva ventana</button>
									</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`);
      const characteristics = container.querySelector('h6');
      characteristics.insertAdjacentHTML('afterend', this.instance[product.constructor.name](product));
    } else {
      container.insertAdjacentHTML(
        'beforeend',
        `<div class="row d-flex justify-content-center">
        ${message}
      </div>`,
      );
    }
    this.main.append(container);
  }

  showProductInNewWindow(product, message) {
    const main = this.productWindow.document.querySelector('main');
    const header = this.productWindow.document.querySelector('header nav');
    main.replaceChildren();
    header.replaceChildren();
    let container;
    if (product) {
      this.productWindow.document.title = `${product.brand} - ${product.model}`;
      header.insertAdjacentHTML('beforeend', `<h1 data-serial="${product.serial}" class="display-5">${product.brand} - ${product.model}</h1>`);
      container = document.createElement('div');
      container.id = 'single-product';
      container.classList.add(`${product.constructor.name}-style`);
      container.classList.add('container');
      container.classList.add('mt-5');
      container.classList.add('mb-5');
      container.insertAdjacentHTML('beforeend', `<div class="row d-flex justify-content-center">
					<div class="col-md-10">
						<div class="card">
							<div class="row">
								<div class="col-md-12">
									<div class="images p-3">
										<div class="text-center p-4"> <img id="main-image" src="${product.url}"/> </div>
									</div>
								</div>
								<div class="col-md-12">
									<div class="product p-4">
										<div class="mt-4 mb-3"> <span class="text-uppercase text-muted brand">${product.brand}</span>
											<h5 class="text-uppercase">${product.model}</h5>
											<div class="price d-flex flex-row align-items-center">
												<span class="act-price">${product.price.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</span>
											</div>
										</div>
										<p class="about">${product.description}</p>
										<div class="sizes mt-5">
											<h6 class="text-uppercase">Características</h6>
										</div>
										<div class="cart mt-4 align-items-center"> <button data-serial="${product.serial}" class="btn btn-primary text-uppercase mr-2 px-4">Comprar</button> </div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>`);
      container.insertAdjacentHTML('beforeend', '<button class="btn btn-primary text-uppercase m-2 px-4" onClick="window.close()">Cerrar</button>');
      container.querySelector('h6').insertAdjacentHTML('afterend', this.instance[product.constructor.name](product));
      main.append(container);
    } else {
      container = document.createElement('div');
      container.classList.add('container');
      container.classList.add('mt-5');
      container.classList.add('mb-5');
      container.insertAdjacentHTML('beforeend', `<div class="row d-flex justify-content-center">${message}</div>`);
    }
    main.append(container);
    this.productWindow.document.body.scrollIntoView();
  }

  showAdminMenu() {
    const menuOption = document.createElement('li');
    menuOption.classList.add('nav-item');
    menuOption.classList.add('dropdown');
    menuOption.insertAdjacentHTML(
      'afterbegin',
      '<a class="nav-link dropdown-toggle" href="#" id="navServices" role="button" data-bs-toggle="dropdown" aria-expanded="false">	Adminitración</a>',
    );
    const suboptions = document.createElement('ul');
    suboptions.classList.add('dropdown-menu');
    suboptions.insertAdjacentHTML('beforeend', '<li><a id="lnewCategory" class="dropdown-item" href="#new-category">Crear categoría</a></li>');
    suboptions.insertAdjacentHTML('beforeend', '<li><a id="ldelCategory" class="dropdown-item" href="#del-category">Eliminar categoría</a></li>');
    suboptions.insertAdjacentHTML('beforeend', '<li><a id="lnewProduct" class="dropdown-item" href="#new-product">Crear producto</a></li>');
    suboptions.insertAdjacentHTML('beforeend', '<li><a id="ldelProduct" class="dropdown-item" href="#del-product">Eliminar producto</a></li>');
    suboptions.insertAdjacentHTML('beforeend', '<li><a id="ldelProduct2" class="dropdown-item" href="#del-product">Eliminar producto 2</a></li>');
    menuOption.append(suboptions);
    this.menu.append(menuOption);
  }

  showNewCategoryForm() {
    this.main.replaceChildren();
    if (this.categories.children.length > 1) this.categories.children[1].remove();

    const container = document.createElement('div');
    container.classList.add('container');
    container.classList.add('my-3');
    container.id = 'new-category';

    container.insertAdjacentHTML(
      'afterbegin',
      '<h1 class="display-5">Nueva categoría</h1>',
    );
    container.insertAdjacentHTML(
      'beforeend',
      `<form name="fNewCategory" role="form" class="row g-3" novalidate>
			<div class="col-md-6 mb-3">
				<label class="form-label" for="ncTitle">Título *</label>
				<div class="input-group">
					<span class="input-group-text"><i class="bi bi-type"></i></span>
					<input type="text" class="form-control" id="ncTitle" name="ncTitle"
						placeholder="Título de categoría" value="" required>
					<div class="invalid-feedback">El título es obligatorio.</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
			<div class="col-md-6 mb-3">
				<label class="form-label" for="ncUrl">URL de la imagen *</label>
				<div class="input-group">
					<span class="input-group-text"><i class="bi bi-file-image"></i></span>
					<input type="url" class="form-control" id="ncUrl" name="ncUrl" placeholder="URL de la imagen"
						value="" required>
					<div class="invalid-feedback">La URL no es válida.</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
			<div class="col-md-12 mb-3">
				<label class="form-label" for="ncDescription">Descripción</label>
				<div class="input-group">
					<span class="input-group-text"><i class="bi bi-body-text"></i></span>
					<input type="text" class="form-control" id="ncDescription" name="ncDescription" value="">
					<div class="invalid-feedback"></div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
			<div class="mb-12">
				<button class="btn btn-primary" type="submit">Enviar</button>
				<button class="btn btn-primary" type="reset">Cancelar</button>
			</div>
		</form>`,
    );
    this.main.append(container);
  }

  showNewCategoryModal(done, cat, error) {
    const messageModalContainer = document.getElementById('messageModal');
    const messageModal = new bootstrap.Modal('#messageModal');

    const title = document.getElementById('messageModalTitle');
    title.innerHTML = 'Nueva Categoría';
    const body = messageModalContainer.querySelector('.modal-body');
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML('afterbegin', `<div class="p-3">La categoría <strong>${cat.title}</strong> ha sido creada correctamente.</div>`);
    } else {
      body.insertAdjacentHTML(
        'afterbegin',
        `<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> La categoría <strong>${cat.title}</strong> ya está creada.</div>`,
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        document.fNewCategory.reset();
      }
      document.fNewCategory.ncTitle.focus();
    };
    messageModalContainer.addEventListener('hidden.bs.modal', listener, { once: true });
  }

  showRemoveCategoryModal(done, cat, error) {
    const messageModalContainer = document.getElementById('messageModal');
    const messageModal = new bootstrap.Modal('#messageModal');

    const title = document.getElementById('messageModalTitle');
    title.innerHTML = 'Borrado de categoría';
    const body = messageModalContainer.querySelector('.modal-body');
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML('afterbegin', `<div class="p-3">La categoría <strong>${cat.title}</strong> ha sido eliminada correctamente.</div>`);
    } else {
      body.insertAdjacentHTML(
        'afterbegin',
        `<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> La categoría <strong>${cat.title}</strong> no se ha podido borrar.</div>`,
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        const removeCategory = document.getElementById('remove-category');
        const button = removeCategory.querySelector(`button.btn[data-category="${cat.title}"]`);
        button.parentElement.parentElement.remove();
      }
    };
    messageModalContainer.addEventListener('hidden.bs.modal', listener, { once: true });
  }

  showNewProductForm(categories) {
    this.main.replaceChildren();
    if (this.categories.children.length > 1) this.categories.children[1].remove();

  	const container = document.createElement('div');
  	container.classList.add('container');
  	container.classList.add('my-3');
  	container.id = 'new-product';

    container.insertAdjacentHTML(
      'afterbegin',
      '<h1 class="display-5">Nuevo producto</h1>',
    );

    const form = document.createElement('form');
    form.name = 'fNewProduct';
    form.setAttribute('role', 'form');
    form.setAttribute('novalidate', '');
    form.classList.add('row');
    form.classList.add('g-3');

    form.insertAdjacentHTML(
      'beforeend',
      `<div class="col-md-4 mb-3">
				<label class="form-label" for="npSerial">Número de serie *</label>
				<div class="input-group">
					<span class="input-group-text"><i class="bi bi-key"></i></span>
					<input type="text" class="form-control" id="npSerial" name="npSerial" value="" required>
					<div class="invalid-feedback">El número de serie es obligatorio. Debe ser un entero.</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>`,
    );
    form.insertAdjacentHTML(
      'beforeend',
      `<div class="col-md-4 mb-3">
				<label class="form-label" for="npBrand">Marca *</label>
				<div class="input-group">
					<span class="input-group-text"><i class="bi bi-pen"></i></span>
					<input type="text" class="form-control" id="npBrand" name="npBrand"
						placeholder="Marca" value="" required>
					<div class="invalid-feedback">La marca es obligatoria.</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>`,
    );
    form.insertAdjacentHTML(
      'beforeend',
      `<div class="col-md-4 mb-3">
				<label class="form-label" for="npModel">Modelo *</label>
				<div class="input-group">
					<span class="input-group-text"><i class="bi bi-hash"></i></span>
					<input type="text" class="form-control" id="npModel" name="npModel"
						placeholder="Modelo" value="" required>
					<div class="invalid-feedback">El modelo es obligatorio.</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>`,
    );
    form.insertAdjacentHTML(
      'beforeend',
      `<div class="col-md-12 mb-3 input-group">
				<label class="input-group-text" for="npType" style="color: #faa541">* Tipo de producto</label>
				<select class="form-select" name="npType" id="npType" requiered>
					<option selected>Selecciona...</option>
					<option value="Camera">Cámara</option>
					<option value="Laptop">Portátil</option>
					<option value="Tablet">Tablet</option>
					<option value="Smartphone">Teléfono</option>
				</select>
				<div class="invalid-feedback">El tipo es obligatorio.</div>
				<div class="valid-feedback">Correcto.</div>
			</div>`,
    );
    form.insertAdjacentHTML(
      'beforeend',
      `<div class="col-md-3 mb-3">
				<label class="form-label" for="npPrice">Precio *</label>
				<div class="input-group">
					<span class="input-group-text"><i class="bi bi-currency-euro"></i></span>
					<input type="number" class="form-control" id="npPrice" name="npPrice"
						placeholder="Precio" value="" min="0" step="10" required>
					<div class="invalid-feedback">El precio es obligatorio.</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>`,
    );
    form.insertAdjacentHTML(
      'beforeend',
      `<div class="col-md-3 mb-3">
				<label class="form-label" for="npTax">Porcentaje de impuestos *</label>
				<div class="input-group">
					<span class="input-group-text"><i class="bi bi-percent"></i></span>
					<input type="number" class="form-control" id="npTax" name="npTax"
						placeholder="21%" value="21" min="0" step="1" required>
					<div class="invalid-feedback">Los impuestos son obligatorios.</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>`,
    );
    form.insertAdjacentHTML(
      'beforeend',
      `<div class="col-md-6 mb-3">
				<label class="form-label" for="npUrl">URL *</label>
				<div class="input-group">
					<span class="input-group-text"><i class="bi bi-card-image"></i></span>
					<input type="url" class="form-control" id="npUrl" name="npUrl"
						placeholder="http://www.test.es" value="" min="0" step="1" required>
					<div class="invalid-feedback">La URL no es válida.</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>`,
    );
    form.insertAdjacentHTML(
      'beforeend',
      `<div class="col-md-3 mb-3">
				<label class="form-label" for="npCategories">Categorías *</label>
				<div class="input-group">
					<label class="input-group-text" for="npCategories"><i class="bi bi-card-checklist"></i></label>
					<select class="form-select" name="npCategories" id="npCategories" multiple required>
					</select>
					<div class="invalid-feedback">El producto debe pertenecer al menos a una categoría.</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>`,
    );
    const npCategories = form.querySelector('#npCategories');
    for (const category of categories) {
      npCategories.insertAdjacentHTML('beforeend', `<option value="${category.title}">${category.title}</option>`);
    }
    form.insertAdjacentHTML(
      'beforeend',
      `<div class="col-md-9 mb-3">
				<label class="form-label" for="npModel">Descripción</label>
				<div class="input-group">
					<span class="input-group-text"><i class="bi bi-text-paragraph"></i></span>
					<textarea class="form-control" id="npDescription" name="npDescription" rows="4">
					</textarea>
					<div class="invalid-feedback"></div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>`,
    );
    form.insertAdjacentHTML(
      'beforeend',
      `<div class="mb-12">
				<button class="btn btn-primary" type="submit">Enviar</button>
				<button class="btn btn-primary" type="reset">Cancelar</button>
			</div>`,
    );

    container.append(form);
  	this.main.append(container);
  }

  showNewProductModal(done, product, error) {
    const messageModalContainer = document.getElementById('messageModal');
    const messageModal = new bootstrap.Modal('#messageModal');

    const title = document.getElementById('messageModalTitle');
    title.innerHTML = 'Producto creado';
    const body = messageModalContainer.querySelector('.modal-body');
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML('afterbegin', `<div class="p-3">El producto <strong>${product.brand} - ${product.model}</strong> con nº de serie <strong>${product.serial}</strong> ha sido creada correctamente.</div>`);
    } else {
      body.insertAdjacentHTML(
        'afterbegin',
        `<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> El producto <strong>${product.brand} - ${product.model}</strong> no ha podido crearse correctamente.</div>`,
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        document.fNewProduct.reset();
      }
      document.fNewProduct.npSerial.focus();
    };
    messageModalContainer.addEventListener('hidden.bs.modal', listener, { once: true });
  }

  showRemoveProductForm(categories) {
    this.main.replaceChildren();
    if (this.categories.children.length > 1) this.categories.children[1].remove();

  	const container = document.createElement('div');
  	container.classList.add('container');
  	container.classList.add('my-3');
  	container.id = 'remove-product';

    container.insertAdjacentHTML(
      'afterbegin',
      '<h1 class="display-5">Eliminar un producto</h1>',
    );

    const form = document.createElement('form');
    form.name = 'fRemoveProduct';
    form.setAttribute('role', 'form');
    form.setAttribute('novalidate', '');
    form.classList.add('row');
    form.classList.add('g-3');

    form.insertAdjacentHTML(
      'beforeend',
      `<div class="col-md-6 mb-3">
				<label class="form-label" for="rpType">Tipos de producto</label>
				<div class="input-group">
					<label class="input-group-text" for="rpType"><i class="bi bi-card-checklist"></i></label>
					<select class="form-select" name="rpType" id="rpType">
						<option disabled selected>Selecciona un tipo...</option>
						<option value="Camera">Cámara</option>
						<option value="Laptop">Portátil</option>
						<option value="Tablet">Tablet</option>
						<option value="Smartphone">Teléfono</option>
					</select>
				</div>
			</div>`,
    );

    form.insertAdjacentHTML(
      'beforeend',
      `<div class="col-md-6 mb-3">
				<label class="form-label" for="rpCategories">Categorías del producto</label>
				<div class="input-group">
					<label class="input-group-text" for="rpCategories"><i class="bi bi-card-checklist"></i></label>
					<select class="form-select" name="rpCategories" id="rpCategories">
						<option disabled selected value=''>Selecciona una categoría</option>
					</select>
				</div>
			</div>`,
    );
    const rpCategories = form.querySelector('#rpCategories');
    for (const category of categories) {
      rpCategories.insertAdjacentHTML('beforeend', `<option value="${category.title}">${category.title}</option>`);
    }

    container.append(form);
    container.insertAdjacentHTML(
      'beforeend',
      '<div id="product-list" class="container my-3"><div class="row"></div></div>',
    );

  	this.main.append(container);
  }

  showRemoveProductForm2(categories) {
    this.main.replaceChildren();
    if (this.categories.children.length > 1) this.categories.children[1].remove();

  	const container = document.createElement('div');
  	container.classList.add('container');
  	container.classList.add('my-3');
  	container.id = 'remove-product';

    container.insertAdjacentHTML(
      'afterbegin',
      `<h1 class="display-5">Eliminar un producto 2</h1>
			 <p>Filtra tanto por tipo como por categoría.</p>
			`,
    );

    const form = document.createElement('form');
    form.name = 'fRemoveProduct';
    form.setAttribute('role', 'form');
    form.setAttribute('novalidate', '');
    form.classList.add('row');
    form.classList.add('g-3');

    form.insertAdjacentHTML(
      'beforeend',
      `<div class="col-md-6 mb-3">
				<label class="form-label" for="rpType">Tipos de producto</label>
				<div class="input-group">
					<label class="input-group-text" for="rpType"><i class="bi bi-card-checklist"></i></label>
					<select class="form-select" name="rpType" id="rpType">
						<option selected>Selecciona un tipo...</option>
						<option value="Camera">Cámara</option>
						<option value="Laptop">Portátil</option>
						<option value="Tablet">Tablet</option>
						<option value="Smartphone">Teléfono</option>
					</select>
				</div>
			</div>`,
    );

    form.insertAdjacentHTML(
      'beforeend',
      `<div class="col-md-6 mb-3">
				<label class="form-label" for="rpCategories">Categorías del producto</label>
				<div class="input-group">
					<label class="input-group-text" for="rpCategories"><i class="bi bi-card-checklist"></i></label>
					<select class="form-select" name="rpCategories" id="rpCategories">
						<option selected value=''>Selecciona una categoría</option>
					</select>
				</div>
			</div>`,
    );

    form.insertAdjacentHTML(
      'beforeend',
      `<div class="col-md-12 mb-3">
				<button class="btn btn-primary">Filtrar</button>
			</div>`,
    );
    const rpCategories = form.querySelector('#rpCategories');
    for (const category of categories) {
      rpCategories.insertAdjacentHTML('beforeend', `<option value="${category.title}">${category.title}</option>`);
    }

    container.append(form);
    container.insertAdjacentHTML(
      'beforeend',
      '<div id="product-list" class="container my-3"><div class="row"></div></div>',
    );

  	this.main.append(container);
  }

  showRemoveProductList(products) {
    const listContainer = document.getElementById('product-list').querySelector('div.row');
    listContainer.replaceChildren();

    let exist = false;
    for (const product of products) {
      exist = true;
      listContainer.insertAdjacentHTML('beforeend', `<div class="col-md-4 rProduct">
				<figure class="card card-product-grid card-lg"> <a data-serial="${product.serial}" href="#single-product" class="img-wrap"><img class="${product.constructor.name}-style" src="${product.url}"></a>
					<figcaption class="info-wrap">
						<div class="row">
							<div class="col-md-8"> <a data-serial="${product.serial}" href="#single-product" class="title">${product.brand} - ${product.model}</a> </div>
							<div class="col-md-4">
								<div class="rating text-right"> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> </div>
							</div>
						</div>
					</figcaption>
					<div class="bottom-wrap"> <a href="#" data-serial="${product.serial}" class="btn btn-primary float-right"> Eliminar </a>
						<div class="price-wrap"> <span class="price h5">${product.price.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</span> <br> <small class="text-success">Free shipping</small> </div>
					</div>
				</figure>
			</div>`);
    }
    if (!exist) {
      listContainer.insertAdjacentHTML('beforeend', '<p class="text-danger"><i class="bi bi-exclamation-triangle"></i> No existen productos para esta categoría o tipo.</p>');
    }
  }

  showRemoveProductListError(category) {
    const listContainer = document.getElementById('product-list').querySelector('div.row');
    listContainer.replaceChildren();
    listContainer.insertAdjacentHTML('beforeend', `<p class="text-danger"><i class="bi bi-exclamation-triangle"></i> La categoría <strong>${category.title}</strong> no existe en el Manager.</p>`);
  }

  showRemoveProductModal(done, product, error) {
    const productList = document.getElementById('product-list');
    const messageModalContainer = document.getElementById('messageModal');
    const messageModal = new bootstrap.Modal('#messageModal');

    const title = document.getElementById('messageModalTitle');
    title.innerHTML = 'Producto eliminado';
    const body = messageModalContainer.querySelector('.modal-body');
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML('afterbegin', `<div class="p-3">El producto <strong>${product.brand} - ${product.model}</strong> con nº de serie <strong>${product.serial}</strong> ha sido eliminado correctamente.</div>`);
    } else {
      body.insertAdjacentHTML(
        'afterbegin',
        '<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> El producto no existe en el manager.</div>',
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        const button = productList.querySelector(`a.btn[data-serial="${product.serial}"]`);
        button.parentElement.parentElement.parentElement.remove();
      }
    };
    messageModalContainer.addEventListener('hidden.bs.modal', listener, { once: true });
  }

  // Métodos bind

  bindInit(handler) {
    document.getElementById('init').addEventListener('click', (event) => {
      this[EXCECUTE_HANDLER](handler, [], 'body', { action: 'init' }, '#', event);
      handler();
    });
    document.getElementById('logo').addEventListener('click', (event) => {
      this[EXCECUTE_HANDLER](handler, [], 'body', { action: 'init' }, '#', event);
      handler();
    });
  }

  bindProductsCategoryList(handler) {
    const categoryList = document.getElementById('category-list');
    const links = categoryList.querySelectorAll('a');
    for (const link of links) {
      link.addEventListener('click', (event) => {
        const { category } = event.currentTarget.dataset;
        this[EXCECUTE_HANDLER](
          handler,
          [category],
          '#product-list',
          { action: 'productsCategoryList', category },
          '#category-list',
          event,
        );
      });
    }
  }

  bindProductsCategoryListInMenu(handler) {
    const navCats = document.getElementById('navCats');
    const links = navCats.nextElementSibling.querySelectorAll('a');
    for (const link of links) {
      link.addEventListener('click', (event) => {
        const { category } = event.currentTarget.dataset;
        this[EXCECUTE_HANDLER](
          handler,
          [category],
          '#product-list',
          { action: 'productsCategoryList', category },
          '#category-list',
          event,
        );
      });
    }
  }

  bindProductsTypeList(handler) {
    const typeList = document.getElementById('type-list');
    const links = typeList.querySelectorAll('a');
    for (const link of links) {
      link.addEventListener('click', (event) => {
        const { type } = event.currentTarget.dataset;
        this[EXCECUTE_HANDLER](
          handler,
          [type],
          '#product-list',
          { action: 'productsTypeList', type },
          '#type-list',
          event,
        );
      });
    }
  }

  bindProductsTypeListInMenu(handler) {
    const productListMenu = document.getElementById('product-list-menu');
    const links = productListMenu.querySelectorAll('a');
    for (const link of links) {
      link.addEventListener('click', (event) => {
        const { type } = event.currentTarget.dataset;
        this[EXCECUTE_HANDLER](
          handler,
          [type],
          '#product-list',
          { action: 'productsTypeList', type },
          '#type-list',
          event,
        );
      });
    }
  }

  bindShowProduct(handler) {
    const productList = document.getElementById('product-list');
    const links = productList.querySelectorAll('a.img-wrap');
    for (const link of links) {
      link.addEventListener('click', (event) => {
        const { serial } = event.currentTarget.dataset;
        this[EXCECUTE_HANDLER](
          handler,
          [serial],
          '#single-product',
          { action: 'showProduct', serial },
          '#single-product',
          event,
        );
      });
    }
    const images = productList.querySelectorAll('figcaption a');
    for (const image of images) {
      image.addEventListener('click', (event) => {
        const { serial } = event.currentTarget.dataset;
        this[EXCECUTE_HANDLER](
          handler,
          [serial],
          '#single-product',
          { action: 'showProduct', serial },
          '#single-product',
          event,
        );
      });
    }
  }

  bindShowProductInNewWindow(handler) {
    const bOpen = document.getElementById('b-open');
    bOpen.addEventListener('click', (event) => {
      if (!this.productWindow || this.productWindow.closed) {
        this.productWindow = window.open('product.html', 'ProductWindow', 'width=800, height=600, top=250, left=250, titlebar=yes, toolbar=no, menubar=no, location=no');
        this.productWindow.addEventListener('DOMContentLoaded', () => {
          handler(event.target.dataset.serial);
        });
      } else {
        handler(event.target.dataset.serial);
        this.productWindow.focus();
      }
    });
  }

  bindAdminMenu(hNewCategory, hRemoveCategory, hNewProductForm, hRemoveProduct, hRemoveProduct2) {
    const newCategoryLink = document.getElementById('lnewCategory');
    newCategoryLink.addEventListener('click', (event) => {
      this[EXCECUTE_HANDLER](hNewCategory, [], '#new-category', { action: 'newCategory' }, '#', event);
    });
    const delCategoryLink = document.getElementById('ldelCategory');
    delCategoryLink.addEventListener('click', (event) => {
      this[EXCECUTE_HANDLER](hRemoveCategory, [], '#remove-category', { action: 'removeCategory' }, '#', event);
    });
    const newProductLink = document.getElementById('lnewProduct');
    newProductLink.addEventListener('click', (event) => {
      this[EXCECUTE_HANDLER](hNewProductForm, [], '#new-product', { action: 'newProduct' }, '#', event);
    });
    const delProductLink = document.getElementById('ldelProduct');
    delProductLink.addEventListener('click', (event) => {
      this[EXCECUTE_HANDLER](hRemoveProduct, [], '#remove-product', { action: 'removeProduct' }, '#', event);
    });
    const delProductLink2 = document.getElementById('ldelProduct2');
    delProductLink2.addEventListener('click', (event) => {
      this[EXCECUTE_HANDLER](hRemoveProduct2, [], '#remove-product', { action: 'removeProduct2' }, '#', event);
    });
  }

  bindNewCategoryForm(handler) {
    newCategoryValidation(handler);
  }

  bindRemoveCategoryForm(delHandler, getCategoryHandler) {
    const removeContainer = document.getElementById('remove-category');
    const buttons = removeContainer.getElementsByTagName('button');
    for (const button of buttons) {
      button.addEventListener('click', function (event) {
      	delHandler(this.dataset.category);
    	});
    }
    const categoryLinks = removeContainer.querySelectorAll('a[data-category]');
    for (const link of categoryLinks) {
      link.addEventListener('click', (event) => {
        this[EXCECUTE_HANDLER](
          getCategoryHandler,
          [link.dataset.category],
          '#product-list',
          { action: 'productsCategoryList', category: link.dataset.category },
          '#category-list',
          event,
        );
    	});
    }
  }

  bindNewProductForm(handler) {
    newProductValidation(handler);
  }

  bindRemoveProductSelects(hTypes, hCategories) {
    const rpType = document.getElementById('rpType');
    rpType.addEventListener('change', (event) => {
      this[EXCECUTE_HANDLER](
        hTypes,
        [event.currentTarget.value],
        '#remove-product',
        { action: 'removeProductByType', type: event.currentTarget.value },
        '#remove-product',
        event,
      );
    });
    const rpCategories = document.getElementById('rpCategories');
    rpCategories.addEventListener('change', (event) => {
      this[EXCECUTE_HANDLER](
        hCategories,
        [event.currentTarget.value],
        '#remove-product',
        { action: 'removeProductByCategory', category: event.currentTarget.value },
        '#remove-product',
        event,
      );
    });
  }

  bindRemoveProduct(handler) {
    const productList = document.getElementById('product-list');
    const buttons = productList.querySelectorAll('a.btn');
    for (const button of buttons) {
      button.addEventListener('click', function (event) {
        handler(this.dataset.serial);
        event.preventDefault();
      });
    }
  }

  bindBuyProduct(handler) {
    const bBuy = document.getElementById('b-buy');
    bBuy.addEventListener('click', (event) => {
      handler(event.currentTarget.dataset.serial);
      event.preventDefault();
    });
  }

  bindBuyProductInList(handler) {
    const productList = document.getElementById('product-list');
    const buttons = productList.querySelectorAll('a.btn');
    for (const button of buttons) {
      button.addEventListener('click', (event) => {
        handler(event.currentTarget.dataset.serial);
        event.preventDefault();
      });
    }
  }

  bindBuyProductInNewWindow(handler) {
    const button = this.productWindow.document.querySelector('#single-product button');
    button.addEventListener('click', (event) => {
      this.productWindow.close();
      handler(event.currentTarget.dataset.serial);
      event.preventDefault();
    });
  }

  bindRemoveProductSubmit(handler) {
    document.forms.fRemoveProduct.addEventListener('submit', (event) => {
      this[EXCECUTE_HANDLER](
        handler,
        [document.forms.fRemoveProduct.rpType.value, document.forms.fRemoveProduct.rpCategories.value],
        '#remove-product',
        {
          action: 'removeProductByTypeCategory',
          category: document.forms.fRemoveProduct.rpCategories.value,
          type: document.forms.fRemoveProduct.rpType.value,
        },
        '#remove-product',
        event,
      );
      event.preventDefault();
      event.stopPropagation();
    });
  }
}

export default ManagerView;
