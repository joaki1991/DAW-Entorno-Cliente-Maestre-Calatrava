import {
  Laptop, Camera, Smartphone, Tablet,
} from './manager.js';

const MODEL = Symbol('ShoppingCartModel');
const VIEW = Symbol('ShoppingCartView');
const LOAD_MANAGER_OBJECTS = Symbol('Load Manager Objects');

class ManagerController {
  constructor(model, view) {
    this[MODEL] = model;
    this[VIEW] = view;

    this.onLoad();
    this.onInit();

    this[VIEW].bindInit(this.handleInit);

    // this.onInit();
    // this.onAddCategory();
  }

  [LOAD_MANAGER_OBJECTS]() {
    const category1 = this[MODEL].getCategory('Apple', 'img/brands/apple.png');
    const category2 = this[MODEL].getCategory('HP', 'img/brands/HP.png');
    const category3 = this[MODEL].getCategory('Microsoft', 'img/brands/microsoft.png');
    const category4 = this[MODEL].getCategory('Samsung', 'img/brands/samsung.png');
    category1.description = 'Think Different.';
    category2.description = 'HP makes technology work for you.';
    category3.description = 'Be what\'s next.';
    category4.description = 'Designed For.';

    this[MODEL].addCategory(category1, category2, category3, category4);

    const product1 = this[MODEL].getProduct('1', 'Apple', 'Laptop Model1', 1100, 'Laptop');
    const product2 = this[MODEL].getProduct('2', 'Apple', 'Camera Model2', 1200, 'Camera');
    const product3 = this[MODEL].getProduct('3', 'Apple', 'Smartphone Model3', 1300, 'Smartphone');
    const product4 = this[MODEL].getProduct('4', 'Apple', 'Tablet Model4', 1400, 'Tablet');
    const product5 = this[MODEL].getProduct('5', 'Apple', 'Laptop Model5', 1500, 'Laptop');
    const product6 = this[MODEL].getProduct('6', 'HP', 'Laptop Model1', 2100, 'Laptop');
    const product7 = this[MODEL].getProduct('7', 'HP', 'Camera Model2', 2200, 'Camera');
    const product8 = this[MODEL].getProduct('8', 'HP', 'Tablet Model3', 2300, 'Tablet');
    const product9 = this[MODEL].getProduct('9', 'HP', 'Smartphone Model4', 2400, 'Smartphone');
    const product10 = this[MODEL].getProduct('10', 'HP', 'Laptop Model5', 2500, 'Laptop');
    const product11 = this[MODEL].getProduct('11', 'Microsoft', 'Laptop Model1', 3100, 'Laptop');
    const product12 = this[MODEL].getProduct('12', 'Microsoft', 'Camera Model2', 3200, 'Camera');
    const product13 = this[MODEL].getProduct('13', 'Microsoft', 'Tablet Model3', 3300, 'Tablet');
    const product14 = this[MODEL].getProduct('14', 'Microsoft', 'Smartphone Model4', 3400, 'Smartphone');
    const product15 = this[MODEL].getProduct('15', 'Microsoft', 'Laptop Model5', 3500, 'Laptop');
    const product16 = this[MODEL].getProduct('16', 'Samsung', 'Laptop Model1', 4100, 'Laptop');
    const product17 = this[MODEL].getProduct('17', 'Samsung', 'Camera Model2', 4200, 'Camera');
    const product18 = this[MODEL].getProduct('18', 'Samsung', 'Tablet Model3', 4300, 'Tablet');
    const product19 = this[MODEL].getProduct('19', 'Samsung', 'Tablet Model4', 4400, 'Tablet');
    const product20 = this[MODEL].getProduct('20', 'Samsung', 'Laptop Model5', 4500, 'Laptop');

    product1.url = `https://via.placeholder.com/258x172.jpg?text=${product1.brand}+${product1.model}`;
    product2.url = `https://via.placeholder.com/258x172.jpg?text=${product2.brand}+${product2.model}`;
    product3.url = `https://via.placeholder.com/258x172.jpg?text=${product3.brand}+${product3.model}`;
    product4.url = `https://via.placeholder.com/258x172.jpg?text=${product4.brand}+${product4.model}`;
    product5.url = `https://via.placeholder.com/258x172.jpg?text=${product5.brand}+${product5.model}`;
    product6.url = `https://via.placeholder.com/258x172.jpg?text=${product6.brand}+${product6.model}`;
    product7.url = `https://via.placeholder.com/258x172.jpg?text=${product7.brand}+${product7.model}`;
    product8.url = `https://via.placeholder.com/258x172.jpg?text=${product8.brand}+${product8.model}`;
    product9.url = `https://via.placeholder.com/258x172.jpg?text=${product9.brand}+${product9.model}`;
    product10.url = `https://via.placeholder.com/258x172.jpg?text=${product10.brand}+${product10.model}`;
    product11.url = `https://via.placeholder.com/258x172.jpg?text=${product11.brand}+${product11.model}`;
    product12.url = `https://via.placeholder.com/258x172.jpg?text=${product12.brand}+${product12.model}`;
    product13.url = `https://via.placeholder.com/258x172.jpg?text=${product13.brand}+${product13.model}`;
    product14.url = `https://via.placeholder.com/258x172.jpg?text=${product14.brand}+${product14.model}`;
    product15.url = `https://via.placeholder.com/258x172.jpg?text=${product15.brand}+${product15.model}`;
    product16.url = `https://via.placeholder.com/258x172.jpg?text=${product16.brand}+${product16.model}`;
    product17.url = `https://via.placeholder.com/258x172.jpg?text=${product17.brand}+${product17.model}`;
    product18.url = `https://via.placeholder.com/258x172.jpg?text=${product18.brand}+${product18.model}`;
    product19.url = `https://via.placeholder.com/258x172.jpg?text=${product19.brand}+${product19.model}`;
    product20.url = `https://via.placeholder.com/258x172.jpg?text=${product20.brand}+${product20.model}`;
    product1.description = `Descripción ${product1.model}`;
    product2.description = `Descripción ${product2.model}`;
    product3.description = `Descripción ${product3.model}`;
    product4.description = `Descripción ${product4.model}`;
    product5.description = `Descripción ${product5.model}`;
    product6.description = `Descripción ${product6.model}`;
    product7.description = `Descripción ${product7.model}`;
    product8.description = `Descripción ${product8.model}`;
    product9.description = `Descripción ${product9.model}`;
    product10.description = `Descripción ${product10.model}`;
    product11.description = `Descripción ${product11.model}`;
    product12.description = `Descripción ${product12.model}`;
    product13.description = `Descripción ${product13.model}`;
    product14.description = `Descripción ${product14.model}`;
    product15.description = `Descripción ${product15.model}`;
    product16.description = `Descripción ${product16.model}`;
    product17.description = `Descripción ${product17.model}`;
    product18.description = `Descripción ${product18.model}`;
    product19.description = `Descripción ${product19.model}`;
    product20.description = `Descripción ${product20.model}`;

    this[MODEL].addProductInCategory(category1, product1, product2, product3, product4, product5);
    this[MODEL].addProductInCategory(category2, product6, product7, product8, product9, product10);
    this[MODEL].addProductInCategory(category3, product11, product12, product13, product14, product15);
    this[MODEL].addProductInCategory(category4, product16, product17, product18, product19, product20);
  }

  // Eventos de aplicación

  onLoad = () => {
    this[LOAD_MANAGER_OBJECTS]();
    this[VIEW].showProductTypes();
    this[VIEW].showProductTypesInMenu();
    this.onAddCategory();
    this[VIEW].bindProductsTypeList(this.handleProductsTypeList);
    this[VIEW].bindProductsTypeListInMenu(this.handleProductsTypeList);
  };

  onInit = () => {
    this[VIEW].showCategories(this[MODEL].categories);
    this[VIEW].bindProductsCategoryList(
      this.handleProductsCategoryList,
    );
  };

  onAddCategory = () => {
    this[VIEW].showCategoriesInMenu(this[MODEL].categories);
    this[VIEW].bindProductsCategoryListInMenu(
      this.handleProductsCategoryList,
    );
  };

  // Métodos handlers

  handleInit = () => {
    this.onInit();
  };

  handleProductsCategoryList = (title) => {
    const category = this[MODEL].getCategory(title);
    this[VIEW].listProducts(this[MODEL].getCategoryProducts(category), category.title);
    this[VIEW].bindShowProduct(this.handleShowProduct);
  };

  handleProductsTypeList = (type) => {
    const instance = {
      Laptop,
      Camera,
      Smartphone,
      Tablet,
    };
    if (instance[type]) {
      this[VIEW].listProducts(this[MODEL].getTypeProducts(instance[type]), type);
      this[VIEW].bindShowProduct(this.handleShowProduct);
    } else {
      throw new Error(`${type} isn't a type of Product.`);
    }
  };

  handleShowProduct = (serial) => {
    try {
      const product = this[MODEL].getProduct(serial);
      this[VIEW].showProduct(product);
      this[VIEW].bindShowProductInNewWindow(
        this.handleShowProductInNewWindow,
      );
    } catch (error) {
      this[VIEW].showProduct(null, 'No existe este producto en la página.');
    }
  };

  handleShowProductInNewWindow = (serial) => {
    try {
      const product = this[MODEL].getProduct(serial);
      this[VIEW].showProductInNewWindow(product);
    } catch (error) {
      this[VIEW].showProductInNewWindow(null, 'No existe este producto en la página.');
    }
  };
}

export default ManagerController;
