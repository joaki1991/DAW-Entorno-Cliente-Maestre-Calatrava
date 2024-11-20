import * as ManagerTest from './test.js';
import { testShoppingCart as newTestFunctionName } from './test.js';

const examples = document.getElementById('examples');
const examplesRows = Array.from(examples.children);
const shoppingcartMenu = document.getElementById('shoppingcart-menu');
const managerMenu = document.getElementById('manager-menu');
const shoppingcart = document.getElementById('shoppingcart');
const listenerShoppingCart = () => {
  $$result.clear();
  examples.classList.remove('d-none');
  examplesRows.forEach((row) => {
    row.classList.add('d-none');
  });
  examplesRows[examplesRows.length - 1].classList.remove('d-none');
  ManagerTest.testShoppingCart();
  ManagerTest.laptopTest();
  ManagerTest.cameraTest();
  ManagerTest.smartphoneTest();
  ManagerTest.tabletTest();
  newTestFunctionName();
};
const listenerManager = () => {
  $$result.clear();
  examples.classList.remove('d-none');
  examplesRows.forEach((row) => {
    row.classList.add('d-none');
  });
  examplesRows[examplesRows.length - 1].classList.remove('d-none');
  ManagerTest.testManager();
};

shoppingcart.addEventListener('click', listenerShoppingCart);
shoppingcartMenu.addEventListener('click', listenerShoppingCart);
managerMenu.addEventListener('click', listenerManager);
