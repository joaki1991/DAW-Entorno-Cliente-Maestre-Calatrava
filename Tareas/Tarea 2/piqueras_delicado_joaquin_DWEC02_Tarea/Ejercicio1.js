// Función para ordenar el array usando el algoritmo de burbuja
function ordenarArray() {
    const array = [29, 34, 16, 2, 58, 85, 11, 67, 93]; // Se pueden cambiar estos valores por el array que se desee

    /* Mostrar el array original el cual aparecerá en el div con el id específico, 
    para ello hago uso del método .join e indico que los núemros irán separados por comas*/
    document.getElementById('arrayOriginal').innerText = array.join(', ');

    // Creación del algoritmo de burbuja
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                // Intercambiar elementos si están en el orden incorrecto
                const temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }
        }
    }

    // Mostrar el array ordenado en el div correspondiente
    document.getElementById('arrayOrdenado').innerText = array.join(', ');
}