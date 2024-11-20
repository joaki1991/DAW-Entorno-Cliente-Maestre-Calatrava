/* eslint-disable no-restricted-syntax */
/* eslint-disable max-classes-per-file */

import {
  BaseException,
  InvalidAccessConstructorException,
  EmptyValueException,
  InvalidValueException,
  AbstractClassException,
} from '../exceptions.js';
import {
  Product, Laptop, Camera, Smartphone, Tablet, Category,
} from '../entities/products.js';

class ManagerException extends BaseException {
  constructor(message = 'Error: Manager Exception.', fileName, lineNumber) {
    super(message, fileName, lineNumber);
    this.name = 'ManagerException';
  }
}

class ObjecManagerException extends ManagerException {
  constructor(param, className, fileName, lineNumber) {
    super(`Error: The ${param} is not a ${className}`, fileName, lineNumber);
    this.param = param;
    this.param = className;
    this.name = 'ObjecManagerException';
  }
}

class CategoryExistsException extends ManagerException {
  constructor(category, fileName, lineNumber) {
    super(`Error: The ${category.title} already exists in the manager.`, fileName, lineNumber);
    this.category = category;
    this.name = 'CategoryExistsException';
  }
}

class ProductExistsException extends ManagerException {
  constructor(product, fileName, lineNumber) {
    super(`Error: The ${product.serial} already exists in the manager.`, fileName, lineNumber);
    this.product = product;
    this.name = 'ProductExistsException';
  }
}

class ProductExistInCategoryException extends ManagerException {
  constructor(product, category, fileName, lineNumber) {
    super(`Error: The ${product.serial} already exist in ${category.title}.`, fileName, lineNumber);
    this.category = category;
    this.product = product;
    this.name = 'ProductExistInCategoryException';
  }
}

class CategoryNotExistException extends ManagerException {
  constructor(category, fileName, lineNumber) {
    super(`Error: The ${category.title} doesn't exist in the manager.`, fileName, lineNumber);
    this.category = category;
    this.name = 'CategoryNotExistException';
  }
}

class ProductNotExistInManagerException extends ManagerException {
  constructor(product, fileName, lineNumber) {
    super(`Error: The ${product.serial} doesn't exist in the manager.`, fileName, lineNumber);
    this.product = product;
    this.name = 'ProductNotExistInManagerException';
  }
}

class ProductNotExistInCategoryException extends ManagerException {
  constructor(product, category, fileName, lineNumber) {
    super(`Error: The ${product.serial} doesn't exist in ${category.title}.`, fileName, lineNumber);
    this.category = category;
    this.product = product;
    this.name = 'ProductNotExistInCategoryException';
  }
}

const Manager = (function () {
  let instantiated;

  class Manager {
    #categories = new Map();

    #products = new Map();

    #order = {
      serial: (productA, productB) => (productA.serial < productB.serial ? -1 : 1),
      brand: (productA, productB) => (productA.brand < productB.brand ? -1 : 1),
      model: (productA, productB) => (productA.model < productB.model ? -1 : 1),
      price: (productA, productB) => (productA.price < productB.price ? -1 : 1),
    };

    constructor() {
      if (!new.target) throw new InvalidAccessConstructorException();

      Object.defineProperty(this, 'categories', {
        enumerable: true,
        get() {
          const values = this.#categories.values();
          return {
            * [Symbol.iterator]() {
              for (const storedCategory of values) {
                yield storedCategory.category;
              }
            },
          };
        },
      });

      Object.defineProperty(this, 'products', {
        enumerable: true,
        get() {
          const values = this.#products.values();
          return {
            * [Symbol.iterator]() {
              for (const product of values) {
                yield product;
              }
            },
          };
        },
      });
    }

    addCategory(...categories) {
      for (const category of categories) {
        if (!(category instanceof Category)) {
          throw new ObjecManagerException('category', 'Category');
        }
        if (!this.#categories.has(category.title)) {
          this.#categories.set(category.title, {
            category,
            products: new Map(),
          });
        } else {
          throw new CategoryExistsException(category);
        }
      }
      return this;
    }

    addProduct(...products) {
      for (const product of products) {
        if (!(product instanceof Product)) {
          throw new ObjecManagerException('product', 'Product');
        }
        if (!this.#products.has(product.serial)) {
          this.#products.set(product.serial, product);
        } else {
          throw new ProductExistsException(product);
        }
      }
      return this;
    }

    addProductInCategory(category, ...products) {
      if (!(category instanceof Category)) {
        throw new ObjecManagerException('category', 'Category');
      }
      if (!this.#categories.has(category.title)) {
        this.addCategory(category);
      }
      const storedCategory = this.#categories.get(category.title);
      for (const product of products) {
        if (!(product instanceof Product)) {
          throw new ObjecManagerException('product', 'product');
        }
        if (!this.#products.has(product.serial)) {
          this.addProduct(product);
        }
        const storedProduct = this.#products.get(product.serial);
        if (!storedCategory.products.has(product.serial)) {
          storedCategory.products.set(product.serial, storedProduct);
        } else {
          throw new ProductExistInCategoryException(product, category);
        }
      }
      return this;
    }

    * getCategoryProducts(category) {
      if (!(category instanceof Category)) {
        throw new ObjecManagerException('category', 'Category');
      }
      if (this.#categories.has(category.title)) {
        const storedCategory = this.#categories.get(category.title);
        const values = storedCategory.products.values();
        for (const product of values) {
          yield product;
        }
      } else {
        throw new CategoryNotExistException(category);
      }
    }

    toString(separator = '\n') {
      let str = '';
      for (const category of this.categories) {
        str += category.title + separator;
        for (const product of this.getCategoryProducts(category)) {
          str += product.toString() + separator;
        }
      }
      return str;
    }

    removeCategory(...categories) {
      for (const category of categories) {
        if (!(category instanceof Category)) {
          throw new ObjecManagerException('category', 'Category');
        }
        if (this.#categories.has(category.title)) {
          this.#categories.delete(category.title);
        } else {
          throw new CategoryNotExistException(category);
        }
      }
      return this;
    }

    removeProduct(...products) {
      for (const product of products) {
        if (!(product instanceof Product)) {
          throw new ObjecManagerException('product', 'product');
        }
        if (this.#products.has(product.serial)) {
          for (const category of this.#categories.values()) {
            if (category.products.has(product.serial)) {
              category.products.delete(product.serial);
            }
          }
          this.#products.delete(product.serial);
        } else {
          throw new ProductNotExistInManagerException(product);
        }
      }
      return this;
    }

    removeProductInCategory(category, ...products) {
      if (!(category instanceof Category)) {
        throw new ObjecManagerException('category', 'Category');
      }
      if (this.#categories.has(category.title)) {
        const storedCategory = this.#categories.get(category.title);
        for (let i = 1; i < arguments.length; i++) {
          const product = arguments[i];
          if (!(product instanceof Product)) {
            throw new ObjecManagerException('product', 'product');
          }
          if (storedCategory.products.has(product.serial)) {
            storedCategory.products.delete(product.serial);
          } else {
            throw new ProductNotExistInCategoryException(product, storedProduct.category);
          }
        }
      } else {
        throw new CategoryNotExistException(category);
      }
      return this;
    }

    * getTypeProducts(type, field) {
      const array = [...this.#products.values()].filter((product) => product instanceof type);
      if (this.#order[field]) {
        array.sort(this.#order[field]);
      }

      for (const product of array) {
        yield product;
      }
    }

    clear() {
      this.#categories.clear();
      this.#products.clear();
    }
  }

  function init() {
    const manager = new Manager();
    Object.freeze(manager);
    return manager;
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

export default Manager;
export {
  Product, Laptop, Camera, Smartphone, Tablet, Category,
} from '../entities/products.js';
