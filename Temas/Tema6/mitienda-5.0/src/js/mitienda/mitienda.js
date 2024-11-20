import ShoppingCartApp from './shoppingcart/shoppingCartApp.js';
import ManagerApp from './manager/managerApp.js';

const historyActions = {
  init: () => {
    ManagerApp.handleInit();
    ShoppingCartApp.handleInit();
  },
  showShoppingCart: () => ShoppingCartApp.handleShowShoppingCart(),
  productsCategoryList: (event) => ManagerApp.handleProductsCategoryList(event.state.category),
  productsTypeList: (event) =>	ManagerApp.handleProductsTypeList(event.state.type),
  showProduct: (event) => ManagerApp.handleShowProduct(event.state.serial),
  newCategory: () =>	ManagerApp.handleNewCategoryForm(),
  removeCategory: () =>	ManagerApp.handleRemoveCategoryForm(),
  newProduct: () =>	ManagerApp.handleNewProductForm(),
  removeProduct: () => ManagerApp.handleRemoveProductForm(),
  removeProductByType: (event) => {
    ManagerApp.handleRemoveProductForm();
    ManagerApp.handleRemoveProductListByType(event.state.type);
  },
  removeProductByCategory: (event) => {
    ManagerApp.handleRemoveProductForm();
    ManagerApp.handleRemoveProductListByCategory(event.state.category);
  },
  removeProduct2: () => ManagerApp.handleRemoveProductForm2(),
  removeProductByTypeCategory: (event) => {
    ManagerApp.handleRemoveProductForm2();
    ManagerApp.handleRemoveProductListByTypeCategory(event.state.type, event.state.category);
  },
};

window.addEventListener('popstate', (event) => {
  if (event.state) {
    historyActions[event.state.action](event);
  }
});

history.replaceState({ action: 'init' }, null);
