const EXCECUTE_HANDLER = Symbol('excecuteHandler');
class ShoppingCartView {
  constructor() {
    this.main = document.getElementsByTagName('main')[0];
    this.linkShoppingcart = document.getElementById('shoppingcart');
    this.categories = document.getElementById('categories');
  }

  [EXCECUTE_HANDLER](handler, handlerArguments, scrollElement, data, url, event) {
    handler(...handlerArguments);
    const scroll = document.querySelector(scrollElement);
    if (scroll) scroll.scrollIntoView();
    history.pushState(data, null, url);
    event.preventDefault();
  }

  init() {
    this.main.replaceChildren();
    this.main.insertAdjacentHTML('afterbegin', `<div class="container article-banner">
    <div class="row">
      <div class="col d-md-flex align-items-md-stretch flex-md-nowrap">
        <div class="article-banner-image flex-sm-grow-1">
          <h4 class="d-lg-none">Artículo semanal</h4>
        </div>
        <div
          class="article-banner-text d-flex flex-column align-items-center justify-content-center flex-sm-grow-1">
          <h4>Artículo semanal</h4>
          <h5>Coworking</h5>
          <p>¿Cómo compartir espacios de trabajo?</p>
          <a id="button" class="btn" href="#">Ver artículo</a>
        </div>
      </div>
    </div>
  </div>`);
  }

  showNumberProductsInCart(numProducts) {
    const spanNumProducts = this.linkShoppingcart.querySelector('span');
    if (spanNumProducts) spanNumProducts.remove();
    if (numProducts > 0) {
      this.linkShoppingcart.insertAdjacentHTML('beforeend', ` <span class="rounded-circle px-2">${numProducts}</span>`);
      this.linkShoppingcart.classList.add('shopping');
      this.linkShoppingcart.href = '#shoppingcart-table';
    }
  }

  showShoppingCart(data) {
    if (data.numProducts > 0) {
      if (this.categories.children.length > 1) this.categories.children[1].remove();
      this.main.replaceChildren();
      const container = document.createElement('div');
      container.classList.add('container');
      container.classList.add('article-banner');
      container.insertAdjacentHTML('beforeend', `<div class="row">
				<div class="table-responsive" id="shoppingcart-table">
					<table class="table">
						<thead>
								<tr>
										<th scope="col">#</th>
										<th scope="col">Marca</th>
										<th scope="col">Modelo</th>
										<th scope="col" class="text-center">Cantidad</th>
										<th scope="col" class="text-right">Precio</th>
								</tr>
						</thead>
						<tbody>
						</tbody>
						<tfoot>
						</tfoot>
					</table>
				</div>
			</div>`);
      this.main.append(container);

      const tbody = container.querySelector('tbody');
      for (const item of data.products) {
        const row = `<tr>
					<td scope="row">${item.product.serial}</td>
					<td>${item.product.brand}</td>
					<td>${item.product.model}</td>
					<td class="text-center">${item.quantity}</td>
					<td class="text-right">${(item.quantity * item.product.price).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</td>
				</tr>`;
        tbody.insertAdjacentHTML('beforeend', row);
      }

      const tfoot = container.querySelector('tfoot');
      const totalWithoutTaxes = `<tr>
				<td colspan="4">Total sin impuestos</td>
				<td class="text-right">${data.totalWithoutTaxes.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</td>
			</tr>`;
      tfoot.insertAdjacentHTML('beforeend', totalWithoutTaxes);
      const taxes = `<tr>
				<td colspan="4">Impuestos</td>
				<td class="text-right">${data.taxes.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</td>
			</tr>`;
      tfoot.insertAdjacentHTML('beforeend', taxes);
      const total = `<tr>
				<td colspan="4"><strong>Total</strong></td>
				<td class="text-right"><strong>${data.total.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</strong></td>
			</tr>`;
      tfoot.insertAdjacentHTML('beforeend', total);
    }
  }

  showBuyProductModal(done, product, error) {
    const messageModalContainer = document.getElementById('messageModal');
    const messageModal = new bootstrap.Modal('#messageModal');

    const title = document.getElementById('messageModalTitle');
    title.innerHTML = 'Producto añadido al carrito';
    const body = messageModalContainer.querySelector('.modal-body');
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML('afterbegin', `<div class="p-3">El producto <strong>${product.brand} - ${product.model}</strong> con nº de serie <strong>${product.serial}</strong> ha sido añadido al carrito.</div>`);
    } else {
      body.insertAdjacentHTML(
        'afterbegin',
        '<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> No se ha podido añadir el producto al carrito.</div>',
      );
    }
    messageModal.show();
  }

  bindInit(handler) {
    document.getElementById('init').addEventListener('click', (event) => {
      // this[EXCECUTE_HANDLER](handler, [], 'body', { action: 'init' }, '#', event);
      handler();
    });
    document.getElementById('logo').addEventListener('click', (event) => {
      // this[EXCECUTE_HANDLER](handler, [], 'body', { action: 'init' }, '#', event);
      handler();
    });
  }

  bindShowShoppingCart(handler) {
    this.linkShoppingcart.addEventListener('click', (event) => {
      this[EXCECUTE_HANDLER](
        handler,
        [],
        '#shoppingcart-table',
        { action: 'showShoppingCart' },
        '#shoppingcart',
        event,
      );
    });
  }
}

export default ShoppingCartView;
