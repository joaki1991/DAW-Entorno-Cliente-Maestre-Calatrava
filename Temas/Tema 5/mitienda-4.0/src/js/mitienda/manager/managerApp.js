import Manager from './manager.js';
import ManagerController from './managerController.js';
import ManagerView from './managerView.js';

const ManagerApp = new ManagerController(Manager.getInstance(), new ManagerView());

export default ManagerApp;
