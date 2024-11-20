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
    #categories = [];

    #products = [];

    #sortCategoriesFunc = (catA, catB) => (
      (catA.category.title.toLocaleLowerCase() < catB.category.title.toLocaleLowerCase())
        ? -1 : 1
    );

    #sortProductsFunc = (productA, productB) => {
      if (productA.brand.toLocaleLowerCase() < productB.brand.toLocaleLowerCase()) {
        return -1;
      } if (productA.brand.toLocaleLowerCase() > productB.brand.toLocaleLowerCase()) {
        return 1;
      }
      return (productA.model.toLocaleLowerCase() < productB.model.toLocaleLowerCase()) ? -1 : 1;
    };

    #sortProductsInCategoryFunc = (productA, productB) => (
      (productA.price > productB.price) ? -1 : 1
    );

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
          const array = this.#categories;
          return {
            * [Symbol.iterator]() {
              for (const arrayCat of array) {
                yield arrayCat.category;
              }
            },
          };
        },
      });

      Object.defineProperty(this, 'products', {
        enumerable: true,
        get() {
          const array = this.#products;
          return {
            * [Symbol.iterator]() {
              for (const product of array) {
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
        const position = this.#getCategoryPosition(category);
        if (position === -1) {
          this.#categories.push({
            category,
            products: [],
          });
          this.#categories.sort(this.#sortCategoriesFunc);
        } else {
          throw new CategoryExistsException(category);
        }
      }
      return this;
    }

    #getCategoryPosition(category) {
      return this.#categories.findIndex((x) => x.category.title === category.title);
    }

    addProduct(...products) {
      for (const product of products) {
        if (!(product instanceof Product)) {
          throw new ObjecManagerException('product', 'Product');
        }
        const position = this.#getProductPosition(product);
        if (position === -1) {
          this.#products.push(product);
          this.#products.sort(this.#sortProductsFunc);
        } else {
          throw new ProductExistsException(product);
        }
      }
      return this;
    }

    #getProductPosition(product) {
      return this.#products.findIndex((x) => x.serial === product.serial);
    }

    addProductInCategory(category, ...products) {
      if (!(category instanceof Category)) {
        throw new ObjecManagerException('category', 'Category');
      }
      let pCategory = this.#getCategoryPosition(category);
      if (pCategory === -1) {
        this.addCategory(category);
        pCategory = this.#getCategoryPosition(category);
      }

      for (const product of products) {
        if (!(product instanceof Product)) {
          throw new ObjecManagerException('product', 'product');
        }
        let pProduct = this.#getProductPosition(product);
        if (pProduct === -1) {
          this.addProduct(product);
          pProduct = this.#getProductPosition(product);
        }
        const position = this.#getProductPositionInCategory(product, this.#categories[pCategory]);
        if (position === -1) {
          this.#categories[pCategory].products.push(this.#products[pProduct]);
          this.#categories[pCategory].products.sort(this.#sortProductsInCategoryFunc);
        } else {
          throw new ProductExistInCategoryException(product, category);
        }
      }
      return this;
    }

    #getProductPositionInCategory(product, category) {
      return category.products.findIndex((x) => x.serial === product.serial);
    }

    * getCategoryProducts(category) {
      if (!(category instanceof Category)) {
        throw new ObjecManagerException('category', 'Category');
      }
      const position = this.#getCategoryPosition(category);
      if (position !== -1) {
        const array = this.#categories[position].products;
        for (const product of array) {
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
        const position = this.#getCategoryPosition(category);
        if (position !== -1) {
          this.#categories.splice(position, 1);
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
        const position = this.#getProductPosition(product);
        if (position !== -1) {
          const storedProduct = this.#products[position];
          for (const category of this.#categories) {
            const pProduct = this.#getProductPositionInCategory(storedProduct, category);
            if (pProduct !== -1) {
              category.products.splice(pProduct, 1);
            }
          }
          this.#products.splice(position, 1);
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
      const pCategory = this.#getCategoryPosition(category);
      if (pCategory !== -1) {
        for (const product of products) {
          if (!(product instanceof Product)) {
            throw new ObjecManagerException('product', 'product');
          }
          const pProduct = this.#getProductPositionInCategory(product, this.#categories[pCategory]);
          if (pProduct !== -1) {
            this.#categories[pCategory].products.splice(pProduct, 1);
          } else {
            throw new ProductNotExistInCategoryException(product, this.#categories[pCategory].category);
          }
        }
      } else {
        throw new CategoryNotExistException(category);
      }
      return this;
    }

    * getTypeProducts(type, field) {
      const array = this.#products.filter((product) => product instanceof type);
      if (this.#order[field]) {
        array.sort(this.#order[field]);
      }

      for (const product of array) {
        yield product;
      }
    }

    clean() {
      this.#categories.length = 0;
      this.#products.length = 0;
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
