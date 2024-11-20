/* eslint-disable prefer-destructuring */

function ShoppingCartException() {
  const instance = BaseException.call(this, 'Error: Shopping Cart Exception.');
  instance.name = 'ShoppingCartException';
  return instance;
}
ShoppingCartException.prototype = Object.create(BaseException.prototype, {
  constructor: {
    value: ShoppingCartException,
    enumerable: false,
    writable: false,
    configurable: false,
  },
});

function ProductShoppingCartException() {
  const instance = ShoppingCartException.call(this, 'Error: The method needs a Product parameter.');
  instance.name = 'ProductShoppingCartException';
  return instance;
}
ProductShoppingCartException.prototype = Object.create(BaseException.prototype, {
  constructor: {
    value: ProductShoppingCartException,
    enumerable: false,
    writable: false,
    configurable: false,
  },
});

function ProductNotExistException(product) {
  const instance = ShoppingCartException.call(this, `Error: The product doesn't exist in the cart. ${product.serial}`);
  instance.name = 'ProductNotExistException';
  return instance;
}
ProductNotExistException.prototype = Object.create(BaseException.prototype, {
  constructor: {
    value: ProductNotExistException,
    enumerable: false,
    writable: false,
    configurable: false,
  },
});

function PositionOutBoundsException() {
  const instance = ShoppingCartException.call(this, 'Error: The position is out of bounds.');
  instance.name = 'PositionOutBoundsException';
  return instance;
}
PositionOutBoundsException.prototype = Object.create(BaseException.prototype, {
  constructor: {
    value: PositionOutBoundsException,
    enumerable: false,
    writable: false,
    configurable: false,
  },
});

const ShoppingCart = (function () {
  let instantiated;

  function ShoppingCart() {
  // La función se invoca con el operador new
    if (!(this instanceof ShoppingCart)) { throw new InvalidAccessConstructorException(); }

    // Definición de atributos privados del objeto
    const _products = []; // array con los productos del carrito
    const _quantities = []; // array con las cantidades de cada producto del carrito.

    function getProductPosition(product) {
      if (!(product instanceof Product)) {
        throw new ProductShoppingCartException();
      }
      return _products.findIndex((x) => x.serial === product.serial);
    }

    this.addProduct = function (product, quantity = 1) {
      if (!(product instanceof Product)) {
        throw new ProductShoppingCartException();
      }
      const position = getProductPosition(product);
      if (position === -1) {
        _products.push(product);
        _quantities.push(quantity);
      } else {
        _quantities[position] = _quantities[position] + quantity;
      }

      return this;
    };

    this.getNumberProducts = function () {
      return _products.length;
    };

    Object.defineProperty(this, 'products', {
      get() {
        let nextIndex = 0;
        return {
          next() {
            let value;
            if (nextIndex < _products.length) {
              value = {
                value: { product: _products[nextIndex], quantity: _quantities[nextIndex] },
                done: false,
              };
              nextIndex += 1;
            } else {
              value = { done: true };
            }
            return value;
          },
        };
      },
    });

    this.getQuantityProducts = function (product) {
      if (!(product instanceof Product)) {
        throw new ProductShoppingCartException();
      }
      const position = getProductPosition(product);
      if (position === -1) {
        throw new ProductNotExistException(product);
      }
      return _quantities[position];
    };

    this.getQuantityProductPosition = function (position) {
      if (position === 'undefined') throw new EmptyValueException('position');
      if (position >= _products.length || position < 0) throw new PositionOutBoundsException();
      return _quantities[position];
    };

    this.getProduct = function (position) {
      if (position === 'undefined') throw new EmptyValueException('position');
      if (position >= _products.length || position < 0) throw new PositionOutBoundsException();
      return _products[position];
    };

    this.updateProduct = function (product, quantity = 1) {
      if (!(product instanceof Product)) {
        throw new ProductShoppingCartException();
      }
      if (quantity < 0) throw new InvalidValueException('quantity', quantity);
      const position = getProductPosition(product);
      if (position !== -1) {
        _quantities[position] = quantity;
        if (_quantities[position] === 0) {
          _products.splice(position, 1);
          _quantities.splice(position, 1);
        }
      } else {
        throw new ProductNotExistException(product);
      }

      return this;
    };

    this.updateProductPosition = function (position, quantity = 1) {
      if (position === 'undefined') throw new EmptyValueException('position');
      if (position >= _products.length || position < 0) throw new PositionOutBoundsException();
      if (quantity < 0) throw new InvalidValueException('quantity', quantity);
      _quantities[position] = quantity;
      if (_quantities[position] === 0) {
        _products.splice(position, 1);
        _quantities.splice(position, 1);
      }

      return this;
    };

    this.removeProduct = function (product) {
      if (!(product instanceof Product)) {
        throw new ProductShoppingCartException();
      }
      const position = getProductPosition(product);
      if (position !== -1) {
        _quantities[position] = _quantities[position] - 1;
        if (_quantities[position] <= 0) {
          _products.splice(position, 1);
          _quantities.splice(position, 1);
        }
      } else {
        throw new ProductNotExistException(product);
      }

      return this;
    };

    this.removeAllProduct = function (product) {
      if (!(product instanceof Product)) {
        throw new ProductShoppingCartException();
      }
      const position = getProductPosition(product);
      if (position !== -1) {
        _products.splice(position, 1);
        _quantities.splice(position, 1);
      } else {
        throw new ProductNotExistException(product);
      }

      return this;
    };

    this.removeProductPosition = function (position) {
      if (position === 'undefined') throw new EmptyValueException('position');
      if (position >= _products.length || position < 0) throw new PositionOutBoundsException();
      _quantities[position] = _quantities[position] - 1;
      if (_quantities[position] <= 0) {
        _products.splice(position, 1);
        _quantities.splice(position, 1);
      }

      return this;
    };

    this.removeAllProductPosition = function (position) {
      if (position === 'undefined') throw new EmptyValueException('position');
      if (position >= _products.length || position < 0) throw new PositionOutBoundsException();
      _products.splice(position, 1);
      _quantities.splice(position, 1);

      return this;
    };

    this.clear = function () {
      _products.length = 0;
      _quantities.length = 0;

      return this;
    };
  }
  ShoppingCart.prototype = {};
  ShoppingCart.prototype.constructor = ShoppingCart;
  ShoppingCart.prototype.toString = function (separator = '\n') {
    let str = '';
    const products = this.products;
    let product = products.next();
    while (!product.done) {
      str = `${str + product.value.product.toString()} Quantity: ${product.value.quantity}${separator}`;
      product = products.next();
    }
    return str;
  };
  ShoppingCart.prototype.getTotal = function () {
    let total = 0;
    const products = this.products;
    let product = products.next();
    while (!product.done) {
      total += product.value.product.price * product.value.quantity;
      product = products.next();
    }
    return total;
  };
  ShoppingCart.prototype.getTotalWithoutTaxes = function () {
    let total = 0;
    const products = this.products;
    let product = products.next();
    while (!product.done) {
      total += product.value.product.priceWithoutTaxes * product.value.quantity;
      product = products.next();
    }
    return total;
  };
  ShoppingCart.prototype.getTaxes = function () {
    let total = 0;
    const products = this.products;
    let product = products.next();
    while (!product.done) {
      total += product.value.product.tax * product.value.quantity;
      product = products.next();
    }
    return total;
  };

  function init() {
    const sc = new ShoppingCart();
    Object.freeze(sc);
    return sc;
  }
  return {
    getInstance() {
      if (!instantiated) {
        instantiated = init();
      }
      return instantiated;
    },
  };
}());
