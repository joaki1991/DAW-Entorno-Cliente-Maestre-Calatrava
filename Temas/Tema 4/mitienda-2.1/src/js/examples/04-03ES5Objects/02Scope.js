(function () {
  const examples = document.getElementById('examples');
  const divExamples = examples.children[9];
  const buttons = divExamples.getElementsByClassName('tab-pane')[1].getElementsByTagName('button');

  function membersScope() {
    const Employee = (function () {
      let counter = 0;

      // Constructor Employee
      function Employee(name = '') {
        // Campos privados
        let _name = name;
        let _id;
        if (name) {
          _id = ++counter;
        }

        // Propiedades de acceso a los atributos privados
        Object.defineProperty(this, 'id', {
          get() {
            return _id;
          },
        });
        Object.defineProperty(this, 'name', {
          get() {
            return _name;
          },
          set(value = '') {
            _name = value;
          },
        });

        // Método interno
        function getUserName() {
          return _name + _id;
        }
        Object.defineProperty(this, 'username', {
          get() {
            return getUserName();
          },
        });
      }
      return Employee;
    }());
    Employee.prototype.constructor = Employee;
    // Métodos públicos
    Employee.prototype.toString = function () {
      return `(${this.username}): ${this.name} ${this.id}`;
    };

    // Método estático
    Employee.getRandomNumber = function (level = 10) {
      return Math.floor(Math.random() * level);
    };

    function testExample() {
      $$result.clear();
      const employee = new Employee('anon');
      $$result.log(employee.id); // 1
      $$result.log(employee.name); // anon
      employee.name = 'Pablo';
      $$result.log(employee.name); // Pablo
      $$result.log(employee.username); // Pablo1
      $$result.log(employee.toString()); // (Pablo1): Pablo 1
      $$result.log(Employee.getRandomNumber()); // Número aleatorio
    }
    testExample();
  }
  buttons[0].addEventListener('click', membersScope);

  function scopeExercise1() {
    const Employee = (function () {
      let counter = 0;

      // Constructor Employee
      function Employee(name = '') {
        // Campos privados
        let _name = name;
        let _id;
        if (name) {
          _id = ++counter;
        }

        // Propiedades de acceso a los atributos privados
        Object.defineProperty(this, 'id', {
          get() {
            return _id;
          },
        });
        Object.defineProperty(this, 'name', {
          get() {
            return _name;
          },
          set(value = '') {
            _name = value;
          },
        });

        // Método interno
        function getUserName() {
          return _name + _id;
        }
        Object.defineProperty(this, 'username', {
          get() {
            return getUserName();
          },
        });
      }
      return Employee;
    }());
    Employee.prototype.constructor = Employee;
    // Métodos públicos
    // Propiedades públicas heredadas
    Employee.prototype.dept = 'general';
    Employee.prototype.specialty = 'none';
    Employee.prototype.toString = function () {
      return `(${this.username}): ${this.name} ${this.id}`;
    };

    // Método estático
    Employee.getRandomNumber = function (level = 10) {
      return Math.floor(Math.random() * level);
    };

    // Constructor Manager
    function Manager(name, reps = []) {
      // Invocamos al superconstructor Employee con call y pasandole como contexto this y los argumentos que espera.
      Employee.call(this, name);

      const _reports = reps;
      // Propiedades de acceso a los atributos privados
      Object.defineProperty(this, 'reports', {
        get() {
          return _reports;
        },
      });
    }
    // Manager hereda del objeto Employee sus propiedades
    Manager.prototype = Object.create(Employee.prototype);
    Manager.prototype.constructor = Manager;

    // Constructor WorkerBee
    function WorkerBee(name, projs = []) {
      // Invocamos al superconstructor Employee con call y pasandole como contexto this y los argumentos que espera.
      Employee.call(this, name);

      const _projects = projs;
      // Propiedades de acceso a los atributos privados
      Object.defineProperty(this, 'projects', {
        get() {
          return _projects;
        },
      });
    }
    // WorkerBee hereda del objeto Employee sus propiedades
    WorkerBee.prototype = Object.create(Employee.prototype);
    WorkerBee.prototype.constructor = WorkerBee;

    // Constructor SalesPerson
    function SalesPerson(name, projs, q = 100) {
      WorkerBee.call(this, name, projs);

      const _quota = q;
      // Propiedades de acceso a los atributos privados
      Object.defineProperty(this, 'quota', {
        get() {
          return _quota;
        },
      });
    }
    // SalesPerson hereda del objeto WorkerBee sus propiedades
    SalesPerson.prototype = Object.create(WorkerBee.prototype);
    SalesPerson.prototype.constructor = SalesPerson;
    SalesPerson.prototype.dept = 'sales';

    // Constructor Engineer
    function Engineer(name, projs, mach = '', hobby) {
      WorkerBee.call(this, name, projs);

      const _machine = mach;
      // Propiedades de acceso a los atributos privados
      Object.defineProperty(this, 'machine', {
        get() {
          return _machine;
        },
      });
    }
    // Engineer hereda del objeto WorkerBee sus propiedades
    Engineer.prototype = Object.create(WorkerBee.prototype);
    Engineer.prototype.constructor = Engineer;
    Engineer.prototype.dept = 'engineering';
    Engineer.prototype.specialty = 'code';

    function testExample() {
      $$result.clear();
      const employee = new Employee('anon');
      const manager = new Manager('manager', ['project1', 'project2', 'project3']);
      const engineer = new Engineer('engineer', ['project4', 'project5', 'project6'], 'Machine1');
      $$result.logBold(manager.id); // 2
      $$result.log(manager.name); // manager
      $$result.log(manager.reports); // project1,project2,project3
      $$result.log(manager.dept); // general
      $$result.log(manager.specialty); // none
      engineer.name = 'Pablo';
      $$result.logBold(engineer.id); // 3
      $$result.log(engineer.name); // Pablo
      $$result.log(engineer.projects); // project4,project5,project6
      $$result.log(engineer.dept); // engineering
      $$result.log(engineer.specialty); // code
    }
    testExample();
  }
  buttons[1].addEventListener('click', scopeExercise1);

  function toStringMethods() {
    const Employee = (function () {
      let counter = 0;

      // Constructor Employee
      function Employee(name = '') {
        // Campos privados
        let _name = name;
        let _id;
        if (name) {
          _id = ++counter;
        }

        // Propiedades de acceso a los atributos privados
        Object.defineProperty(this, 'id', {
          get() {
            return _id;
          },
        });
        Object.defineProperty(this, 'name', {
          get() {
            return _name;
          },
          set(value = '') {
            _name = value;
          },
        });

        // Método interno
        function getUserName() {
          return _name + _id;
        }
        Object.defineProperty(this, 'username', {
          get() {
            return getUserName();
          },
        });
      }
      return Employee;
    }());
    Employee.prototype.constructor = Employee;
    // Métodos públicos
    // Propiedades públicas heredadas
    Employee.prototype.dept = 'general';
    Employee.prototype.specialty = 'none';
    Employee.prototype.toString = function () {
      return `(${this.username}): ${this.name} ${this.id}`;
    };

    // Método estático
    Employee.getRandomNumber = function (level = 10) {
      return Math.floor(Math.random() * level);
    };

    // Constructor Manager
    function Manager(name, reps = []) {
      // Invocamos al superconstructor Employee con call y pasandole como contexto this y los argumentos que espera.
      Employee.call(this, name);

      const _reports = reps;
      // Propiedades de acceso a los atributos privados
      Object.defineProperty(this, 'reports', {
        get() {
          return _reports;
        },
      });
    }
    // Manager hereda del objeto Employee sus propiedades
    Manager.prototype = Object.create(Employee.prototype);
    Manager.prototype.constructor = Manager;
    Manager.prototype.toString = function () {
      return `${Employee.prototype.toString.call(this)} Reports: ${this.reports}`;
    };

    // Constructor WorkerBee
    function WorkerBee(name, projs = []) {
      // Invocamos al superconstructor Employee con call y pasandole como contexto this y los argumentos que espera.
      Employee.call(this, name);

      const _projects = projs;
      // Propiedades de acceso a los atributos privados
      Object.defineProperty(this, 'projects', {
        get() {
          return _projects;
        },
      });
    }
    // WorkerBee hereda del objeto Employee sus propiedades
    WorkerBee.prototype = Object.create(Employee.prototype);
    WorkerBee.prototype.constructor = WorkerBee;
    WorkerBee.prototype.toString = function () {
      return `${Employee.prototype.toString.call(this)} Projects: ${this.projects}`;
    };

    // Constructor SalesPerson
    function SalesPerson(name, projs, q = 100) {
      WorkerBee.call(this, name, projs);

      const _quota = q;
      // Propiedades de acceso a los atributos privados
      Object.defineProperty(this, 'quota', {
        get() {
          return _quota;
        },
      });
    }
    // SalesPerson hereda del objeto WorkerBee sus propiedades
    SalesPerson.prototype = Object.create(WorkerBee.prototype);
    SalesPerson.prototype.constructor = SalesPerson;
    SalesPerson.prototype.dept = 'sales';
    SalesPerson.prototype.toString = function () {
      return `${WorkerBee.prototype.toString.call(this)} Quota: ${this.quota}`;
    };

    // Constructor Engineer
    function Engineer(name, projs, mach = '', hobby) {
      WorkerBee.call(this, name, projs);

      const _machine = mach;
      // Propiedades de acceso a los atributos privados
      Object.defineProperty(this, 'machine', {
        get() {
          return _machine;
        },
      });
    }
    // Engineer hereda del objeto WorkerBee sus propiedades
    Engineer.prototype = Object.create(WorkerBee.prototype);
    Engineer.prototype.constructor = Engineer;
    Engineer.prototype.dept = 'engineering';
    Engineer.prototype.specialty = 'code';
    Engineer.prototype.toString = function () {
      return `${WorkerBee.prototype.toString.call(this)} Machine: ${this.machine}`;
    };

    function testExample() {
      $$result.clear();
      const employee = new Employee('anon');
      const manager = new Manager('manager', ['project1', 'project2', 'project3']);
      const engineer = new Engineer('engineer', ['project4', 'project5', 'project6'], 'Machine1');
      // (manager2): manager 2 Reports: project1,project2,project3
      $$result.log(manager.toString());
      // (engineer3): engineer 3 Projects: project4,project5,project6 Machine: Machine1
      $$result.log(engineer.toString());
    }
    testExample();
  }
  buttons[2].addEventListener('click', toStringMethods);

  function getSalaryMethods() {
    const Employee = (function () {
      let counter = 0;

      // Constructor Employee
      function Employee(name = '', checks = []) { // Redefinimios el constructor para el array de las nóminas.
        // Campos privados
        let _name = name;
        let _id;
        if (name) {
          _id = ++counter;
        }

        const paychecks = checks; // Asignamos el array compartido entre constructores.

        this.paySalary = function (salary, tax) {
          paychecks.push(salary - (salary * tax / 100));
        };

        this.getSalaries = function () {
          return paychecks.reduce((salary, total) => total + salary, 0);
        };

        // Propiedades de acceso a los atributos privados
        Object.defineProperty(this, 'id', {
          get() {
            return _id;
          },
        });
        Object.defineProperty(this, 'name', {
          get() {
            return _name;
          },
          set(value = '') {
            _name = value;
          },
        });

        // Método interno
        function getUserName() {
          return _name + _id;
        }
        Object.defineProperty(this, 'username', {
          get() {
            return getUserName();
          },
        });
      }
      return Employee;
    }());
    Employee.prototype.constructor = Employee;
    // Métodos públicos
    // Propiedades públicas heredadas
    Employee.prototype.dept = 'general';
    Employee.prototype.specialty = 'none';
    Employee.prototype.toString = function () {
      return `(${this.username}): ${this.name} ${this.id}`;
    };

    // Método estático
    Employee.getRandomNumber = function (level = 10) {
      return Math.floor(Math.random() * level);
    };

    // Constructor Manager
    function Manager(name, reps = []) {
      const paychecks = []; // Campo privado para nóminas

      // Invocamos al superconstructor Employee con call y pasandole como contexto this y los argumentos que espera.
      // Invocamos al superconstructor pasando el campo privado.
      Employee.call(this, name, paychecks);

      const _reports = reps;
      // Propiedades de acceso a los atributos privados
      Object.defineProperty(this, 'reports', {
        get() {
          return _reports;
        },
      });

      const paySalaryEmployee = this.paySalary; // Guardamos la referencia a paySalary heredado de Employee.
      this.paySalary = function (salary, tax, bonus) { // El nuevo método paySalary invoca al del padre.
        paySalaryEmployee.call(this, salary + bonus, tax);
      };

      this.getSalaries = function (annualTax = 0) {
        const total = paychecks.reduce((salary, total) => total + salary, 0);
        return total - annualTax;
      };
    }
    // Manager hereda del objeto Employee sus propiedades
    Manager.prototype = Object.create(Employee.prototype);
    Manager.prototype.constructor = Manager;
    Manager.prototype.toString = function () {
      return `${Employee.prototype.toString.call(this)} Reports: ${this.reports}`;
    };

    // Constructor WorkerBee
    function WorkerBee(name, projs = []) {
      const paychecks = []; // Campo privado para nóminas

      // Invocamos al superconstructor Employee con call y pasandole como contexto this y los argumentos que espera.
      // Invocamos al superconstructor pasando el campo privado.
      Employee.call(this, name, paychecks);

      const _projects = projs;
      // Propiedades de acceso a los atributos privados
      Object.defineProperty(this, 'projects', {
        get() {
          return _projects;
        },
      });

      const paySalaryEmployee = this.paySalary; // Guardamos la referencia a paySalary heredado de Employee.
      this.paySalary = function (salary, tax, bonus) { // El nuevo método paySalary invoca al del padre.
        paySalaryEmployee.call(this, salary + bonus, tax);
      };

      this.getSalaries = function (annualTax = 0) {
        const total = paychecks.reduce((salary, total) => total + salary, 0);
        return total - annualTax;
      };
    }
    // WorkerBee hereda del objeto Employee sus propiedades
    WorkerBee.prototype = Object.create(Employee.prototype);
    WorkerBee.prototype.constructor = WorkerBee;
    WorkerBee.prototype.toString = function () {
      return `${Employee.prototype.toString.call(this)} Projects: ${this.projects}`;
    };

    // Constructor SalesPerson
    function SalesPerson(name, projs, q = 100) {
      WorkerBee.call(this, name, projs);

      const _quota = q;
      // Propiedades de acceso a los atributos privados
      Object.defineProperty(this, 'quota', {
        get() {
          return _quota;
        },
      });
    }
    // SalesPerson hereda del objeto WorkerBee sus propiedades
    SalesPerson.prototype = Object.create(WorkerBee.prototype);
    SalesPerson.prototype.constructor = SalesPerson;
    SalesPerson.prototype.dept = 'sales';
    SalesPerson.prototype.toString = function () {
      return `${WorkerBee.prototype.toString.call(this)} Quota: ${this.quota}`;
    };

    // Constructor Engineer
    function Engineer(name, projs, mach = '', hobby) {
      WorkerBee.call(this, name, projs);

      const _machine = mach;
      // Propiedades de acceso a los atributos privados
      Object.defineProperty(this, 'machine', {
        get() {
          return _machine;
        },
      });
    }
    // Engineer hereda del objeto WorkerBee sus propiedades
    Engineer.prototype = Object.create(WorkerBee.prototype);
    Engineer.prototype.constructor = Engineer;
    Engineer.prototype.dept = 'engineering';
    Engineer.prototype.specialty = 'code';
    Engineer.prototype.toString = function () {
      return `${WorkerBee.prototype.toString.call(this)} Machine: ${this.machine}`;
    };

    function testExample() {
      $$result.clear();
      const employee = new Employee('anon');
      const manager = new Manager('manager', ['project1', 'project2', 'project3']);
      const engineer = new Engineer('engineer', ['project4', 'project5', 'project6'], 'Machine1');

      console.dir(manager);

      $$result.logBold('Manager');
      manager.paySalary(1000, 10, 300);
      manager.paySalary(1100, 10, 350);
      manager.paySalary(1200, 10, 200);
      $$result.log(manager.getSalaries(1500)); // 2235

      $$result.logBold('Engineer');
      engineer.paySalary(1000, 10, 300);
      engineer.paySalary(1100, 10, 350);
      engineer.paySalary(1200, 10, 200);
      $$result.log(engineer.getSalaries(1500)); // 2235

      $$result.logBold('Employee');
      employee.paySalary(1000, 10);
      employee.paySalary(1100, 10);
      employee.paySalary(1200, 10);
      $$result.log(employee.getSalaries()); // 2970
    }
    testExample();
  }
  buttons[3].addEventListener('click', getSalaryMethods);
}());
