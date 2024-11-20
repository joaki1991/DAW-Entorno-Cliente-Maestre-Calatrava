(function () {
  function productTest() {
    $$result.logBold('Product');
    try {
      const p1 = new Product();
    } catch (error) {
    // EmptyValueException: Error: The parameter serial can't be empty.
      $$result.log(error.toString());
    }
    try {
    // EmptyValueException: Error: The parameter brand can't be empty.
      const p1 = new Product('111-111-111');
    } catch (error) {
      $$result.log(error.toString());
    }
    try {
    // EmptyValueException: Error: The parameter model can't be empty.
      const p1 = new Product('111-111-111', 'HP');
    } catch (error) {
      $$result.log(error.toString());
    }
    try {
    // InvalidValueException: Error: The paramenter price has an invalid value. (price: undefined)
      const p1 = new Product('111-111-111', 'HP', 'EliteBook');
    } catch (error) {
      $$result.log(error.toString());
    }
    const p1 = new Product('111-111-111', 'HP', 'EliteBook', 10);
    p1.description = 'Producto de prueba';
    // Serial: 111-111-111 Brand: HP Model: EliteBook Price: 10€ Tax: 21%
    $$result.log(p1.toString());
    $$result.log(p1.description); // Producto de prueba
    $$result.log(p1.priceWithoutTaxes); // 7.9
    $$result.log(p1.tax); // 2.1
  }

  function laptopTest() {
    $$result.logBold('Laptop');
    const p1 = new Laptop('111-111-111', 'HP', 'EliteBook', 1000);
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
    const p1 = new Camera('111-111-111', 'Canon', 'PowerShot', 500);
    // Serial: 111-111-111 Brand: Canon Model: PowerShot Price: 500€ Tax: 21% Tipo: - Resolución: 0MP Size: 0''
    $$result.log(p1.toString());
    $$result.log(p1 instanceof Camera); // true
    $$result.log(p1 instanceof Product); // true
    try {
      p1.type = 'Digitall';
      alert(p1.type);
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
    const p1 = new Smartphone('111-111-111', 'Sansung', 'Galaxy', 500);
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
    const p1 = new Tablet('111-111-111', 'Sansung', 'Galaxy', 500);
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
    const p1 = new Laptop('111-111-111', 'HP', 'EliteBook', 1000);
    p1.processor = 'i7 8 núcleos';
    p1.memory = '16GB';
    p1.hd = 'SDD';
    p1.size = '1TB';
    p1.system = 'Windows 10';
    const p2 = new Camera('111-111-112', 'Canon', 'PowerShot', 500);
    p2.type = 'Digital';
    p2.resolution = 7;
    p2.size = 7;
    const p3 = new Smartphone('111-111-113', 'Sansung', 'Galaxy', 500);
    p3.memory = '8GB';
    p3.storage = '64GB';
    p3.resolution = '1024x1024';
    p3.size = 7;
    p3.system = 'Android';
    const p4 = new Tablet('111-111-114', 'Sansung', 'Galaxy', 500);
    p4.memory = '8GB';
    p4.storage = '64GB';
    p4.resolution = '1024x1024';
    p4.size = 15;
    p4.system = 'Android';
    const p5 = new Laptop('111-111-111', 'HP', 'EliteBook', 1000);
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
}());
