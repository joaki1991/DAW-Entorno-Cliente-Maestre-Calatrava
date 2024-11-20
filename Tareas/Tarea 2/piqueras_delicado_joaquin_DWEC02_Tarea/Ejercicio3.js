// Voy a crear una función que permita calcular la operación seleccionada entre dos números introducidos por el usuario
function realizarOperacion() {
    //En primer lugar defino las variables o constantes, las cuales serán obtenidas a partir de los valores que se ingresen en la página
    const numeroA = parseFloat(document.getElementById('numeroA').value);
    const numeroB = parseFloat(document.getElementById('numeroB').value);
    const operacion = document.getElementById('operacion').value;
    let resultado = 0;
    //La variable resultado la iniciaremos en 0 para evitar posibles errores

    /* Para poder realizar las distintas operaciones podría utilizar el condicional if, 
    pero para hacerlo más sencillo, utilizaré la sentencia switch, aplicando las operaciones adecuadas apra cada caso*/
    switch (operacion) {
        case 'suma':
            /* En primer lugar, en caso de no introducir alguno d elos dos números solicitados, 
            tendré que mostrar un mensaje que los solicite. Para esto, crearemos el condicional if que se muestra */
            if (!numeroA || !numeroB){
                document.getElementById('resultado').innerText = 'Por favor ingrese los números con los que desea operar';
                return;
            }
            else{
            resultado = numeroA + numeroB;
            }
            break;
        case 'resta':
            if (!numeroA || !numeroB){
                document.getElementById('resultado').innerText = 'Por favor ingrese los números con los que desea operar';
                return;
            }
            else{
            resultado = numeroA - numeroB;
            }
            break;
        case 'multiplicacion':
            if (!numeroA || !numeroB){
                document.getElementById('resultado').innerText = 'Por favor ingrese los números con los que desea operar';
                return;
            }
            else{
            resultado = numeroA * numeroB;
            }
            break;
        case 'division':
            if (!numeroA || !numeroB){
                document.getElementById('resultado').innerText = 'Por favor ingrese los números con los que desea operar';
                return;
            }
            else{
            resultado = numeroA / numeroB;
            }
            //Como matemáticamente no se puede dividir un número entre 0, en caso de seleccionar 0 en el número b tendremos que indicarlo
            if (numeroB !== 0) {
                resultado = numeroA / numeroB;
            } else {
                document.getElementById('resultado').innerText = 'No se puede dividir por cero';
                return;
            }
            break;
        case 'modulo':
            if (!numeroA || !numeroB){
                document.getElementById('resultado').innerText = 'Por favor ingrese los números con los que desea operar';
                return;
            }
            else{
            resultado = numeroA % numeroB;
            }
            break;
            /* En caso de no sleecionar ninguna opción de las disponibles, 
            con el caso default mostraremos el siguiente mensaje por pantalla */ 
        default:
            document.getElementById('resultado').innerText = 'Seleccione una operación válida';
            return;
    }

    //En caso de cumplir las condiciones marcadas anteriormente mostraremos el resultado obtenido 
    document.getElementById('resultado').innerText = `El resultado es: ${resultado}`;
}