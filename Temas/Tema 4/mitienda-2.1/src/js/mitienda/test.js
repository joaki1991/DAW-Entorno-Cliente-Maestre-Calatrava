import ShoppingCart from './shoppingcart/shoppingcart.js';
import Manager, {
  Laptop, Smartphone, Tablet, Camera, Product,
} from './manager/manager.js';

function productTest() {
  $$result.logBold('Product');
  try {
    const p1 = Manager.getInstance().getProduct();
  } catch (error) {
    // EmptyValueException: Error: The parameter serial can't be empty.
    $$result.log(error.toString());
  }
  try {
    // EmptyValueException: Error: The parameter brand can't be empty.
    const p1 = Manager.getInstance().getProduct('111-111-111');
  } catch (error) {
    $$result.log(error.toString());
  }
  try {
    // EmptyValueException: Error: The parameter model can't be empty.
    const p1 = Manager.getInstance().getProduct('111-111-111', 'HP');
  } catch (error) {
    $$result.log(error.toString());
  }
  try {
    // InvalidValueException: Error: The paramenter price has an invalid value. (price: undefined)
    const p1 = Manager.getInstance().getProduct('111-111-111', 'HP', 'EliteBook');
  } catch (error) {
    $$result.log(error.toString());
  }
  const p1 = Manager.getInstance().getProduct('111-111-111', 'HP', 'EliteBook', 10, Manager.Laptop);
  p1.description = 'Producto de prueba';
  // Serial: 111-111-111 Brand: HP Model: EliteBook Price: 10€ Tax: 21%
  $$result.log(p1.toString());
  $$result.log(p1.description); // Producto de prueba
  $$result.log(p1.priceWithoutTaxes); // 7.9
  $$result.log(p1.tax); // 2.1
}

function laptopTest() {
  $$result.logBold('Laptop');
  const p1 = Manager.getInstance().getProduct('111-111-111', 'HP', 'EliteBook', 1000, Manager.Laptop);
  // Serial: 111-111-111 Brand: HP Model: EliteBook Price: 1000€ Tax: 21% Procesaor: unkonwn Memoria: 0GB HD: - Size: 0GB
  $$result.log(p1.toString());
  $$result.log(p1 instanceof Laptop); // true
  $$result.log(p1 instanceof Product); // true
  p1.processor = 'i7 8 núcleos';
  try {
    p1.memory = '16GB2';
  } catch (error) {
    // InvalidValueException: Error: The paramenter memory has an invalid value. (memory: 16GB2)
    $$result.log(error.toString());
  }
  p1.memory = '16GB';
  try {
    p1.hd = 'SDDD';
  } catch (error) {
    // InvalidValueException: Error: The paramenter hd has an invalid value. (hd: SDDD)
    $$result.log(error.toString());
  }
  p1.hd = 'SDD';
  try {
    p1.size = '1TB2';
  } catch (error) {
    // InvalidValueException: Error: The paramenter size has an invalid value. (size: 1TB2)
    $$result.log(error.toString());
  }
  p1.size = '1TB';
  p1.system = 'Windows 10';
  // Serial: 111-111-111 Brand: HP Model: EliteBook Price: 1000€ Tax: 21% Procesaor: i7 8 núcleos Memoria: 16GB HD: SDD Size: 1TB
  $$result.log(p1.toString());
}

function cameraTest() {
  $$result.logBold('Camera');
  const p1 = Manager.getInstance().getProduct('111-111-111', 'Canon', 'PowerShot', 500, Manager.Camera);
  // Serial: 111-111-111 Brand: Canon Model: PowerShot Price: 500€ Tax: 21% Tipo: - Resolución: 0MP Size: 0''
  $$result.log(p1.toString());
  $$result.log(p1 instanceof Camera); // true
  $$result.log(p1 instanceof Product); // true
  try {
    p1.type = 'Digitall';
  } catch (error) {
    // InvalidValueException: Error: The paramenter type has an invalid value. (type: Digitall)
    $$result.log(error.toString());
  }
  p1.type = 'Digital';
  try {
    p1.resolution = 'm5';
  } catch (error) {
    // InvalidValueException: Error: The paramenter resolution has an invalid value. (resolution: NaN)
    $$result.log(error.toString());
  }
  p1.resolution = 7;
  try {
    p1.size = 'm5';
  } catch (error) {
    // InvalidValueException: Error: The paramenter size has an invalid value. (size: NaN)
    $$result.log(error.toString());
  }
  p1.size = 7;
  // Serial: 111-111-111 Brand: Canon Model: PowerShot Price: 500€ Tax: 21% Tipo: Digital Resolución: 7MP Size: 7''
  $$result.log(p1.toString());
}

function smartphoneTest() {
  $$result.logBold('Smartphone');
  const p1 = Manager.getInstance().getProduct('111-111-111', 'Sansung', 'Galaxy', 500, Manager.Smartphone);
  // Serial: 111-111-111 Brand: Sansung Model: Galaxy Price: 500€ Tax: 21% Memoria: 0GB Almacenamiento: 0GB Resolución: 0x0 Size: 0''
  $$result.log(p1.toString());
  $$result.log(p1 instanceof Smartphone); // true
  $$result.log(p1 instanceof Product); // true
  try {
    p1.memory = '8GB2';
  } catch (error) {
    // InvalidValueException: Error: The paramenter memory has an invalid value. (memory: 8GB2)
    $$result.log(error.toString());
  }

  p1.memory = '8GB';
  try {
    p1.storage = '64GB2';
  } catch (error) {
    // InvalidValueException: Error: The paramenter storage has an invalid value. (storage: 64GB2)
    $$result.log(error.toString());
  }
  p1.storage = '64GB';

  try {
    p1.resolution = '1024';
  } catch (error) {
    // InvalidValueException: Error: The paramenter resolution has an invalid value. (resolution: 1024)
    $$result.log(error.toString());
  }
  p1.resolution = '1024x1024';

  try {
    p1.size = 'm5';
  } catch (error) {
    // InvalidValueException: Error: The paramenter size has an invalid value. (size: NaN)
    $$result.log(error.toString());
  }
  p1.size = 7;
  p1.system = 'Android';
  // Serial: 111-111-111 Brand: Sansung Model: Galaxy Price: 500€ Tax: 21% Memoria: 8GB Almacenamiento: 64GB Resolución: 1024x1024 Size: 7''
  $$result.log(p1.toString());
}

function tabletTest() {
  $$result.logBold('Tablet');
  const p1 = Manager.getInstance().getProduct('111-111-111', 'Sansung', 'Galaxy', 500, Manager.Tablet);
  // Serial: 111-111-111 Brand: Sansung Model: Galaxy Price: 500€ Tax: 21% Memoria: 0GB Almacenamiento: 0GB Resolución: 0x0 Size: 0''
  $$result.log(p1.toString());
  $$result.log(p1 instanceof Smartphone); // true
  $$result.log(p1 instanceof Product); // true
  try {
    p1.memory = '8GB2';
  } catch (error) {
    // InvalidValueException: Error: The paramenter memory has an invalid value. (memory: 8GB2)
    $$result.log(error.toString());
  }

  p1.memory = '8GB';
  try {
    p1.storage = '64GB2';
  } catch (error) {
    // InvalidValueException: Error: The paramenter storage has an invalid value. (storage: 64GB2)
    $$result.log(error.toString());
  }
  p1.storage = '64GB';

  try {
    p1.resolution = '1024';
  } catch (error) {
    // InvalidValueException: Error: The paramenter resolution has an invalid value. (resolution: 1024)
    $$result.log(error.toString());
  }
  p1.resolution = '1024x1024';

  try {
    p1.size = 'm5';
  } catch (error) {
    // InvalidValueException: Error: The paramenter size has an invalid value. (size: NaN)
    $$result.log(error.toString());
  }
  p1.size = 15;
  p1.system = 'Android';
  // Serial: 111-111-111 Brand: Sansung Model: Galaxy Price: 500€ Tax: 21% Memoria: 8GB Almacenamiento: 64GB Resolución: 1024x1024 Size: 15''
  $$result.log(p1.toString());
}

function testShoppingCart() {
  const p1 = Manager.getInstance().getProduct('111-111-111', 'HP', 'EliteBook', 1000, Manager.Laptop);
  p1.processor = 'i7 8 núcleos';
  p1.memory = '16GB';
  p1.hd = 'SDD';
  p1.size = '1TB';
  p1.system = 'Windows 10';
  const p2 = Manager.getInstance().getProduct('111-111-112', 'Canon', 'PowerShot', 500, Manager.Camera);
  p2.type = 'Digital';
  p2.resolution = 7;
  p2.size = 7;
  const p3 = Manager.getInstance().getProduct('111-111-113', 'Sansung', 'Galaxy', 500, Manager.Smartphone);
  p3.memory = '8GB';
  p3.storage = '64GB';
  p3.resolution = '1024x1024';
  p3.size = 7;
  p3.system = 'Android';
  const p4 = Manager.getInstance().getProduct('111-111-114', 'Sansung', 'Galaxy', 500, Manager.Tablet);
  p4.memory = '8GB';
  p4.storage = '64GB';
  p4.resolution = '1024x1024';
  p4.size = 15;
  p4.system = 'Android';
  const p5 = Manager.getInstance().getProduct('111-111-111', 'HP', 'EliteBook', 1000, Manager.Laptop);
  p5.processor = 'i7 8 núcleos';
  p5.memory = '16GB';
  p5.hd = 'SDD';
  p5.size = '1TB';
  p5.system = 'Windows 10';

  const sc = ShoppingCart.getInstance();
  sc.addProduct(p1, 2).addProduct(p2, 3).addProduct(p3).addProduct(p4, 2)
    .addProduct(p5);
  $$result.log(sc.getNumberProducts()); // 4
  // Serial: 111-111-111 Quantity: 3 Serial: 111-111-112 Quantity: 3 Serial: 111-111-113 Quantity: 1 Serial: 111-111-114 Quantity: 2
  $$result.log(sc.toString('<br>'));

  $$result.log(sc.getTotal()); // 6000
  $$result.log(sc.getTotalWithoutTaxes()); // 4740
  $$result.log(sc.getTaxes()); // 1260

  $$result.log(sc.getQuantityProducts(p3)); // 1
  $$result.log(sc.getQuantityProductPosition(2)); // 1
  $$result.log(sc.getProduct(2).serial); // 111-111-113

  sc.updateProduct(p4, 5).updateProductPosition(1, 5);
  // Serial: 111-111-111 Quantity: 3 Serial: 111-111-112 Quantity: 5 Serial: 111-111-113 Quantity: 1 Serial: 111-111-114 Quantity: 5
  $$result.log(sc.toString('<br>'));

  sc.removeProduct(p5).removeProduct(p2).removeProduct(p3).removeAllProduct(p4);
  $$result.log(sc.getNumberProducts()); // 2
  // Serial: 111-111-111 Quantity: 2 Serial: 111-111-112 Quantity: 4
  $$result.log(sc.toString('<br>'));

  sc.removeProductPosition(0, 2).removeAllProductPosition(1);
  $$result.log(sc.getNumberProducts()); // 1
  // Serial: 111-111-111 Quantity: 1
  $$result.log(sc.toString('<br>'));

  sc.clear();
  $$result.log(sc.getNumberProducts()); // 0
  $$result.log(sc.toString('<br>'));
}

function testMitiendaEntities() {
  $$result.clear();
  // productTest();
  // laptopTest();
  // cameraTest();
  // smartphoneTest();
  // tabletTest();
  testShoppingCart();
}
const link = document.getElementById('mitienda-example1');
link.addEventListener('click', testMitiendaEntities);

function testManager() {
  const category1 = Manager.getInstance().getCategory('Promociones', 'https://via.placeholder.com/258x172.jpg?text=Promociones');
  const category2 = Manager.getInstance().getCategory('Outlet', 'https://via.placeholder.com/258x172.jpg?text=Outlet');
  const category3 = Manager.getInstance().getCategory('Ofertas especiales', 'https://via.placeholder.com/258x172.jpg?text=Ofertas+especiales');
  const category4 = Manager.getInstance().getCategory('Reacondicionados', 'https://via.placeholder.com/258x172.jpg?text=Reacondicionados');
  category1.description = 'Productos en promoción.';
  category2.description = 'Outlet de productos con grandes descuentos.';
  category3.description = 'Ofertas actuales.';
  category4.description = 'Productos reacondicionados o seminuevos.';
  const errorCategory = Manager.getInstance().getCategory('Reacondicionados', 'https://via.placeholder.com/258x172.jpg?text=Reacondicionados');

  const product1 = Manager.getInstance().getProduct(1, 'brand1', 'model1', 1100, Manager.Laptop);
  const product2 = Manager.getInstance().getProduct(2, 'brand1', 'model2', 1200, Manager.Camera);
  const product3 = Manager.getInstance().getProduct(3, 'brand1', 'model3', 1300, Manager.Smartphone);
  const product4 = Manager.getInstance().getProduct(4, 'brand1', 'model4', 1400, Manager.Tablet);
  const product5 = Manager.getInstance().getProduct(5, 'brand1', 'model5', 1500, Manager.Laptop);
  const product6 = Manager.getInstance().getProduct(6, 'brand2', 'model1', 2100, Manager.Laptop);
  const product7 = Manager.getInstance().getProduct(7, 'brand2', 'model2', 2200, Manager.Camera);
  const product8 = Manager.getInstance().getProduct(8, 'brand2', 'model3', 2300, Manager.Tablet);
  const product9 = Manager.getInstance().getProduct(9, 'brand2', 'model4', 2400, Manager.Smartphone);
  const product10 = Manager.getInstance().getProduct(10, 'brand2', 'model5', 2500, Manager.Laptop);
  const product11 = Manager.getInstance().getProduct(11, 'brand3', 'model1', 3100, Manager.Laptop);
  const product12 = Manager.getInstance().getProduct(12, 'brand3', 'model2', 3200, Manager.Camera);
  const product13 = Manager.getInstance().getProduct(13, 'brand3', 'model3', 3300, Manager.Tablet);
  const product14 = Manager.getInstance().getProduct(14, 'brand3', 'model4', 3400, Manager.Smartphone);
  const product15 = Manager.getInstance().getProduct(15, 'brand3', 'model5', 3500, Manager.Laptop);
  const product16 = Manager.getInstance().getProduct(16, 'brand4', 'model1', 4100, Manager.Laptop);
  const product17 = Manager.getInstance().getProduct(17, 'brand4', 'model2', 4200, Manager.Camera);
  const product18 = Manager.getInstance().getProduct(18, 'brand4', 'model3', 4300, Manager.Tablet);
  const product19 = Manager.getInstance().getProduct(19, 'brand4', 'model4', 4400, Manager.Tablet);
  const product20 = Manager.getInstance().getProduct(20, 'brand4', 'model5', 4500, Manager.Laptop);

  function testCreateObjects() {
    const manager = Manager.getInstance();

    $$result.logBold('Testeo: Objetos categorias');
    manager.addCategory(category2, category1, category4);
    try {
      manager.addCategory(errorCategory);
    } catch (error) {
      console.log(error.toString());
    }

    $$result.logBold('Testeo: Objetos productos');
    manager.addProduct(product2, product3, product4, product5);
    manager.addProduct(product7, product8, product9, product10);
    manager.addProduct(product12, product13, product14, product15);
    manager.addProduct(product17, product18, product19, product20);

    manager.addProductInCategory(category1, product1, product2, product3, product4, product5);
    manager.addProductInCategory(category2, product6, product7, product8, product9, product10);
    manager.addProductInCategory(category3, product11, product12, product13, product14, product15);
    manager.addProductInCategory(category4, product16, product17, product18, product19, product20);
    try {
      manager.addProductInCategory(category4, product16);
    } catch (error) {
      $$result.log(error.toString());
    }

    $$result.logBold('Contenido del carrito');
    $$result.log(manager.toString('<br>'));
  }

  function testRemoveObjects() {
    const manager = Manager.getInstance();

    $$result.logBold('Test: Borrado de objetos');
    $$result.logBold('Test: Borrado de productos');
    $$result.log('Productos: p1 y p12');
    manager.removeProduct(product1, product12);
    $$result.logBold('Test: Borrado de productos en categorías');
    $$result.log('Productos: p2 y p3 en c1');
    manager.removeProductInCategory(category1, product3, product2);
    try {
      manager.removeProductInCategory(category1, product19);
    } catch (error) {
      console.log(error.toString());
    }

    $$result.logBold('Test: Borrado de categoría');
    $$result.log('Categoría: c2');
    manager.removeCategory(category2);

    try {
      manager.removeCategory(new Category('ErrorCategory', 'img/error.jpg'));
    } catch (error) {
      console.log(error.toString());
    }

    $$result.logBold('Contenido del carrito');
    $$result.log(manager.toString('<br>'));
  }

  function testListObjects() {
    const manager = Manager.getInstance();

    $$result.logBold('Listado Laptop ordenado por brand');
    for (const product of manager.getTypeProducts(Laptop, 'brand')) {
      $$result.log(product.toString('<br>'));
    }
  }

  testCreateObjects();
  testRemoveObjects();
  testListObjects();
  Manager.getInstance().clear();
}

// productTest();
// laptopTest();
// cameraTest();
// smartphoneTest();
// tabletTest();
// testShoppingCart();
// testManager();

export {
  testShoppingCart, laptopTest, cameraTest, smartphoneTest, tabletTest, testManager,
};
