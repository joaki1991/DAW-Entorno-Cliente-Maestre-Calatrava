const monthCtx = document.getElementById('monthlySales').getContext('2d');
const deptCtx = document.getElementById('deptSales').getContext('2d');
const yearlyLabel = document.getElementById('yearlyTotal');
const bSalesOver5000 = document.getElementById('bSalesOver5000');
bSalesOver5000.addEventListener('click', getSalesMonths);
const bReset = document.getElementById('bReset');
bReset.addEventListener('click',resetMonthlySales);
// Valores del formulario
const newAmount = document.getElementById('itemAmount');
const newMonth = document.getElementById('monthId');
const bAddSaleModal = document.getElementById('bAddSaleModal');
bAddSaleModal.addEventListener('click', addSale);
const bRemoveSale = document.getElementById('bRemoveSale');
bRemoveSale.addEventListener('click',drawSelectMontlySales);
const bRemoveSaleModal = document.getElementById('bRemoveSaleModal');
bRemoveSaleModal.addEventListener('click',removeMonthlySale);
const newProduct = document.forms[0].inlineRadioOptions;//Definimos la nueva variable para obtener el tipo de producto
// Variables

const monthSales = Array.of(6500, 3250, 4000);
const monthLabels = Array.of[('Octubre', 'Noviembre', 'Diciembre')];
let deptSales = [0, 0, 0, 0];//Modificamos la variable para que deje ser constante y sus valores.
let deptLabels = Array.of('Cámaras', 'Portátiles', 'Teléfonos', 'Tablets');
const yearlyTotal = 0;
let label = [];
let monthEliminated = false;


// Colecciones para mostrar en gráficos.
const monthlyLabelsSet = new Set();
const monthlySalesArray = [];
const monthlySalesMap = new Map();
const monthlySalesProduct = new Map();

// Gráfico de Barras
let monthlySalesCamera = []; // Las variables del gráfico las inicializamos como arrays
let monthlySalesLaptop = []; 
let monthlySalesPhone = []; 
let monthlySalesTablet = []; 
let monthlyLabels = [];
let monthlySalesChart = new Chart(monthCtx, {
  type: 'bar',
  data: {
    labels: monthlyLabels,
    datasets: [{
      label: 'Cámaras',
      data: [],
      backgroundColor: 'rgba(238, 184, 104, 1)',
      borderWidth: 0
    },
    {
      label: 'Portátiles',
      data: [],
      backgroundColor: 'rgba(75, 166, 223, 1)',
      borderWidth: 0
    },
    {
      label: 'Teléfonos',
      data: [],
      backgroundColor: 'rgba(239, 118, 122, 1)',
      borderWidth: 0
    },
    {
      label: 'Tablets',
      data: [],
      backgroundColor: 'rgba(40, 167, 69, 1)',
      borderWidth: 0
    }
  ]
},
options: {
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true
      }
    }]
  }
}
});

// Pie
// Las etiquetas y valores de vent ya están definidos anteriormente en el apartado de variables
let deptSalesChart = new Chart(deptCtx, {
  type: 'pie',
  data: {
    labels: deptLabels,
    datasets: [{
      label: 'Número de ventas',
      data: deptSales,
      backgroundColor: [
        'rgba(238, 184, 104, 1)',
        'rgba(75, 166, 223, 1)',
        'rgba(239, 118, 122, 1)',
        'rgba(40, 167, 69, 1)',
      ],
      borderWidth: 0,
    }],
  },
  options: {},
});

/* Calculo de totales */
function addYearlyTotal(a, b, c) {
  return a + b + c;
}

function initMonthlyTotalSales() {
  // Definimos las variables que representan el total de cada producto
  let totalCamara = 0;
  let totalPhone = 0;
  let totalLaptop = 0;
  let totalTablet = 0;
  let total = 0;

  //Si el tamaño del map principal es 0, el total de las ventas será 0.
  if (monthlySalesMap.size == 0) {
    total = 0;

    /**En caso contrario, recorremos el map principal y asignamos los valores a las variables anteriores.
     * El valor de estas variables se iran acumulando.
    */

  } else {
    monthlySalesMap.forEach((value, key) => {
      value.forEach((innerValue, innerKey) => {

        if (innerKey === "camera") {
          totalCamara += innerValue;
        } else if (innerKey === "phone") {
          totalPhone += innerValue;
        } else if (innerKey === "laptop") {
          totalLaptop += innerValue;

        } else if (innerKey === "tablet") {
          totalTablet += innerValue;
        }

        total = totalCamara + totalLaptop + totalPhone + totalTablet;
      });

    });
  }

  yearlyLabel.innerHTML = total + "€";
}

initMonthlyTotalSales();


/* Ventas por encima de 5000 */
function findOver5000() {
  let position = -1;
  const quantity = monthSales.find((elem, index) => {
    if (elem > 5000) {
      position = index;
      return true;
    }
    return false;
  });
  alert(`Cantidad: ${quantity} Posición: ${position}`);
}

// Modificamos la función del reseteo para que la página vuelva a estar como al principio
function resetMonthlySales(){
	monthlySalesMap.clear();
  monthlySalesChart.data.labels = [];
  monthlySalesChart.update();
	monthlySalesChart.reset();
	monthlySalesChart.render();
  yearlyLabel.innerHTML = 0 + "€";  
	initMonthlyTotalSales();
}

// Añadir ventas al gráfico
function addSale() {
  
try{    
  // Validación de datos de entrada
if (newMonth.value && newAmount.value && newProduct.value) {    
  // Insertar la venta en la estructura de mapas:
  if(monthlySalesMap.has(newMonth.value)){
    let currentMonthlySales = monthlySalesMap.get(newMonth.value);
    if(currentMonthlySales.has(newProduct.value)){
      // caso 3: mes registado y la categoría

      // Recuperar la cantidad en base a la categoría
      let currentAmount = currentMonthlySales.get(newProduct.value);      
      // Sumar la nueva cantidad a la recuperada
      currentMonthlySales.set(newProduct.value, currentAmount + Number.parseInt(newAmount.value));
      // Registrar en el mapa la suma de ambas cantidades
      monthlySalesMap.set(newMonth.value, currentMonthlySales);
    }
    else{
      // caso 2: tenemos registrado el mes, pero no la categoría

      // Añadir la cantidad al mapa que acabamos de recuperar
      currentMonthlySales.set(newProduct.value, Number.parseInt(newAmount.value));
      monthlySalesMap.set(newMonth.value, currentMonthlySales);
    }
  } 
  else{
  // Caso 1: no tenemos ni producto ni el mapa 
  // Crear un nuevo mapa
  let newProductSales = new Map();
  // Insertar la cantidad con la clave de la categoria en el mapa
  newProductSales.set(newProduct.value, Number.parseInt(newAmount.value));
  // Insertar este mapa en el mapa principal con clave el mes que acabamos de recibir 
  monthlySalesMap.set(newMonth.value, newProductSales);
  } 
} else {
  //Lanzamos mensaje de error si no he han rellenado alguno de los campos.
  throw {
    name: "MonthError",
    message: "Faltan campos por rellenar."
  };
}
// Actualizar los totales

initMonthlyTotalSales();// Rediseñando para recuperar los totales de la estructura de mapas (ver arriba)
// Podría realizarse con una estructura de bucles anidados o de llamadas al método forEach()

// Actualizar los gráficos
updateCharts();

}
catch (error){
alert(error.message);
}  
finally {
  // Reseteo de formulario
  cleanAddSaleForm();
}   
}

function updateCharts() {

  // Variables para utilizar en la gráfica.
  let monthyLabels = [];
  let productLabels = [];
  let valueCamera = 0;
  let valueLaptop = 0;
  let valuePhone = 0;
  let valueTablet = 0;

  let valueCamera2 = 0;
  let valuePhone2 = 0;
  let valueLaptop2 = 0;
  let valueTablet2 = 0;

  //Etiquetas de los meses y categorias
  //Obtenemos las claves del mapa principal, que en este caso son los meses. 
  monthyLabels = Array.from(monthlySalesMap.keys());

  //Asignamos a la variables productLabels las etiquetas de los gráficos, este caso las categorías.
  productLabels = ["Cámaras", "Portátiles", "Teléfonos", "Tablets"];


  /**Estructura de control para comprobar que el map principal tiene valores.
   * Si no tiene valores, asignamos los valores de las gráficas a 0 para que 
   * la gráfica no tenga valores.
   */
  if (monthEliminated && monthlySalesMap.size == 0) {
    valueCamera = 0;
    valueLaptop = 0;
    valuePhone = 0;
    valueTablet = 0;

    // Actualizar valores en los arrays en la posición del mes.
    monthlySalesCamera = [];
    monthlySalesLaptop = [];
    monthlySalesPhone = [];
    monthlySalesTablet = [];

    let dataCamera = {
      label: "Cámaras",
      data: monthlySalesCamera,
      backgroundColor: 'rgba(238, 184, 104, 1)',
      borderWidth: 0
    };

    let dataLaptop = {
      label: "Portátiles",
      data: monthlySalesLaptop,
      backgroundColor: 'rgba(75, 166, 223, 1)',
      borderWidth: 0
    };

    let dataPhone = {
      label: "Teléfonos",
      data: monthlySalesPhone,
      backgroundColor: 'rgba(239, 118, 122, 1)',
      borderWidth: 0
    };

    let dataTablet = {
      label: "Tablet",
      data: monthlySalesTablet,
      backgroundColor: 'rgba(40, 167, 69, 1)',
      borderWidth: 0
    };

    // Actualizamos los datasets del gráfico de barras.

    monthlySalesChart.data.datasets = [dataCamera, dataLaptop, dataPhone, dataTablet];
    monthlySalesChart.data.labels = monthyLabels;

  } else {


    // Obtener valores para cada categoría en el mes actual.
    /**Estructura de control para cuando no exista el mes, los valores para el gráfico se actualicen a 0. */
    if (monthlySalesMap.has(newMonth.value)) {
      valueCamera = monthlySalesMap.get(newMonth.value).get("camera");
      valueLaptop = monthlySalesMap.get(newMonth.value).get("laptop");
      valuePhone = monthlySalesMap.get(newMonth.value).get("phone");
      valueTablet = monthlySalesMap.get(newMonth.value).get("tablet");


    } else {
      valueCamera = 0;
      valueLaptop = 0;
      valuePhone = 0;
      valueTablet = 0;
    }


    // Actualizar valores en los arrays en la posición del mes.
    monthlySalesCamera[monthyLabels.indexOf(newMonth.value)] = valueCamera;
    monthlySalesLaptop[monthyLabels.indexOf(newMonth.value)] = valueLaptop;
    monthlySalesPhone[monthyLabels.indexOf(newMonth.value)] = valuePhone;
    monthlySalesTablet[monthyLabels.indexOf(newMonth.value)] = valueTablet;



    // Creamos los datasets para el gráfico.
    let dataCamera = {
      label: "Cámaras",
      data: monthlySalesCamera,
      backgroundColor: 'rgba(238, 184, 104, 1)',
      borderWidth: 0
    };

    let dataLaptop = {
      label: "Portátiles",
      data: monthlySalesLaptop,
      backgroundColor: 'rgba(75, 166, 223, 1)',
      borderWidth: 0
    };

    let dataPhone = {
      label: "Teléfonos",
      data: monthlySalesPhone,
      backgroundColor: 'rgba(239, 118, 122, 1)',
      borderWidth: 0
    };

    let dataTablet = {
      label: "Tablets",
      data: monthlySalesTablet,
      backgroundColor: 'rgba(40, 167, 69, 1)',
      borderWidth: 0
    };

    // Actualizamos los datasets del gráfico de barras.

    monthlySalesChart.data.datasets = [dataCamera, dataLaptop, dataPhone, dataTablet];
    monthlySalesChart.data.labels = monthyLabels;

  }

  //Actualización del gráfico de pie.

  /**Estructura de control para comprobar que el map principal tiene valores.
   * Si no tiene valores, asignamos los valores de las gráficas a 0 para que 
   * la gráfica no tenga valores.
   */
  if (monthEliminated && monthlySalesMap.size == 0) {
    valueCamera2 = 0;
    valuePhone2 = 0;
    valueLaptop2 = 0;
    valueTablet2 = 0;
  } else {

    // Acumular los valores anteriores con los nuevos.
    monthlySalesMap.forEach((value, key) => {
      value.forEach((innerValue, innerKey) => {

        if (innerKey === "camera") {
          valueCamera2 += innerValue;
        } else if (innerKey === "phone") {
          valuePhone2 += innerValue;
        } else if (innerKey === "laptop") {
          valueLaptop2 += innerValue;
        } else if (innerKey === "tablet") {
          valueTablet2 += innerValue;
        }

      });
    });
  }

  // Actualizar el gráfico de pie
  deptSales = [valueCamera2, valueLaptop2, valuePhone2, valueTablet2];
  deptSalesChart.data.datasets[0].data = deptSales;


  // Modificar las etiquetas de productos si es necesario.
  for (let i = 0; i < productLabels.length; i++) {
    switch (productLabels[i]) {
      case "camera":
        productLabels[i] = "Cámaras";
        break;
      case "phone":
        productLabels[i] = "Télefonos";
        break;
      case "laptop":
        productLabels[i] = "Portátiles";
        break;
      case "tablet":
        productLabels[i] = "Tablets";
        break;
    }
  }

  if (productLabels.length !== 4) {
    productLabels = ["Cámaras", "Portátiles", "Teléfonos", "Tablets"];
  }


  deptSalesChart.data.labels = productLabels;
  deptSalesChart.update();
  monthlySalesChart.update();

}


function cleanAddSaleForm() {
  newMonth.value = '';
  newAmount.value = '';
}



function getSalesMonths(){
	monthlyLabelsSet.forEach(function (month){
		console.dir(month);
		alert(month);
	});
}
// Función para dibujar el select con las ventas mensuales
function drawSelectMontlySales() {
  // Seleccionamos el elemento usando jQuery
  let removeSales = $("#removeSales");

  // Limpiamos el select antes de agregar las nuevas opciones
  removeSales.empty();

  // Iteramos sobre el array de meses y agregamos cada opción al select
  let optionAdded = false;
  for (let [month, categoryMap] of monthlySalesMap.entries()) {
    // Verificamos si el mes tiene valores, tanto en categorias y ventas.
    if (categoryMap.size > 0) {
      // Creamos el elemento option con jQuery.
      let opt = $("<option>").val(month).text(month + ": " + categoryMap.size);
      // Añadimos el elemento al select.
      removeSales.append(opt);
      // Verificamos que se ha añadido una opción.
      optionAdded = true;
    }
  }

  /**Si no se agregó ninguna opción, significa que no hay valores en ningún mes  
   *Limpiaremos el select.*/

  if (!optionAdded) {
    removeSales.empty();
  }
}

//Función para eliminar las ventas de las colecciones y actualizar los gráficos.
function removeMonthlySale() {
  try {
    // Se obtiene el valor seleccionado del mes y la categoría
    let selectedMonth = document.getElementById("removeSales").value;
    let selectedRadio = document.querySelector('input[name="inlineRadioOptions1"]:checked');

    //Estructura de control para comprobar que se ha seleccionado una categoría para eliminar sus ventas.
    if (selectedRadio === null) {
      throw "No has seleccionado ninguna categoria."
    }
    else {
      selectedCategory = selectedRadio.value;
    }

    // Verifica que el mes y la categoría estén definidos.
    if (selectedMonth && selectedCategory) {
      // Verifica si el mes existe en el map principal.
      if (monthlySalesMap.has(selectedMonth)) {
        // Obtén el mapa de categorías y ventas para el mes seleccionado.
        let categoryMap = monthlySalesMap.get(selectedMonth);

        // Verifica si la categoría existe en el mapa.
        if (categoryMap && categoryMap.has(selectedCategory)) {
          // Elimina la categoría del mapa.
          categoryMap.delete(selectedCategory);

          // Elimina el mes del map principal, en caso de que sea necesario.
          if (!monthlySalesMap.get(selectedMonth).size) {
            monthlySalesMap.delete(selectedMonth);

            monthEliminated = true;
          }
          // Actualización de los gráficos.
          updateCharts();

          // Actualizamos las ventas totales y el select.
          initMonthlyTotalSales();
          drawSelectMontlySales();

          //En caso de que no existan ventas de una categoría en el mes seleccionado, se lanza este mensaje de error.
        } else {
          throw "No existen ventas de esa categoría."
        }
      }
    }
  } catch (error) {
    alert(error);
  }
}



