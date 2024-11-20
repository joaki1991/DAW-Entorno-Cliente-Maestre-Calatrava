const MODEL = Symbol('ShoppingCartModel');
const VIEW = Symbol('ShoppingCartView');
const MANAGER = Symbol('Manager');

class ShoppingCartController {
  constructor(modelShoppingCart, viewShoppingCart, manager) {
    this[MODEL] = modelShoppingCart;
    this[VIEW] = viewShoppingCart;
    this[MANAGER] = manager;

    // Eventos iniciales del Controlador
    this.onInit();
    this.onNumberProductsInCartChanged();

    // Enlazamos handlers con la vista
    this[VIEW].bindInit(this.handleInit);
    this[VIEW].bindShowShoppingCart(this.handleShowShoppingCart);
  }

  onInit = () => {
    this[VIEW].init();
  };

  handleInit = () => {
    // alert(this[MODEL].getNumberProducts()); // 4
    this.onInit();
  };

  onLoad = (products) => {
    for (const product of products) {
      const quantity = product.quantity || 1;
      this[MODEL].addProduct(product.instance, quantity);
    }

    this.onNumberProductsInCartChanged();
  };

  onNumberProductsInCartChanged = () => {
    this[VIEW].showNumberProductsInCart(this[MODEL].getNumberProducts());
  };

  handleShowShoppingCart = () => {
    const data = {
      numProducts: this[MODEL].getNumberProducts(),
      products: this[MODEL][Symbol.iterator](),
      totalWithoutTaxes: this[MODEL].getTotalWithoutTaxes(),
      taxes: this[MODEL].getTaxes(),
      total: this[MODEL].getTotal(),
    };
    this[VIEW].showShoppingCart(data);
  };

  handleBuyProduct = (serial) => {
    let done; let error; let
      product;
    try {
      product = this[MANAGER].getProduct(serial);
      this[MODEL].addProduct(product);
      this.onNumberProductsInCartChanged();
      done = true;
    } catch (exception) {
      done = false;
      error = exception;
    }
    this[VIEW].showBuyProductModal(done, product, error);
  };
}

export default ShoppingCartController;
