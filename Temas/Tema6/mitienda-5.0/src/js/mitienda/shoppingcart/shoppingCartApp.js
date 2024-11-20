import ShoppingCart, {
  Product, Laptop, Camera, Smartphone, Tablet,
} from './shoppingCartModel.js';
import ShoppingCartController from './shoppingCartController.js';
import ShoppingCartView from './shoppingCartView.js';
import Manager from '../manager/manager.js';

const ShoppingCartApp = new ShoppingCartController(ShoppingCart.getInstance(), new ShoppingCartView(), Manager.getInstance());

// let ShoppingCartApp;
// $(() => {
//   ShoppingCartApp = new ShoppingCartController(ShoppingCart.getInstance(), new ShoppingCartView());
// });

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
const p3 = new Smartphone('111-111-113', 'Samsung', 'Galaxy', 500);
p3.memory = '8GB';
p3.storage = '64GB';
p3.resolution = '1024x1024';
p3.size = 7;
p3.system = 'Android';
const p4 = new Tablet('111-111-114', 'Samsung', 'Galaxy', 500);
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

ShoppingCartApp.onLoad([
  { instance: p1, quantity: 2 },
  { instance: p2, quantity: 3 },
  { instance: p3 },
  { instance: p4, quantity: 2 },
  { instance: p5 },
]);

export default ShoppingCartApp;
