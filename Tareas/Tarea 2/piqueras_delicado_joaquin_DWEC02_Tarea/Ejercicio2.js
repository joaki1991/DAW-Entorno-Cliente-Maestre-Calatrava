function ordenarArray() {
    const array = [9, 42, 61, 2.5, 83, 15, 21, 57, 23]; 
    // Se pueden cambiar estos valores por el array que se desee, para comprobar el mensaje de error, he introducido un número decimal

    // Mostrar el array original
    document.getElementById('arrayOriginal').innerText = array.join(', ');
    //Defino las variables precisas para mi bucle while    
    let i = 0;
    let error = false;

    /* En primer lugar vamos a verificar si el array contiene elementos no enteros y en caso de contenerlos, 
    mostrar el error en pantalla */
    while (i < array.length) {
        if (!Number.isInteger(array[i])) {
            document.getElementById('mensajeError').innerText = 'Error: El array contiene elementos que no son enteros.';
            error = true;
            break;
        }
        i++;
    }
    /* En caso de que no hubiese ningún error y por tanto los números fuesen enteros, 
    continnuaría definiendo el bucle con el siguiente condicional */
    if (!error) {
        let j = 0;
        while (j < array.length - 1) {
            let k = 0;
            while (k < array.length - j - 1) {
                if (array[k] > array[k + 1]) {
                    const temp = array[k];
                    array[k] = array[k + 1];
                    array[k + 1] = temp;
                }
                k++;
            }
            j++;
            /* El bucle while sería igual que el for del ejercicio anterior, 
            pero en este caso tendríamos que definir las variables j y k antes del bucle */
        }

        // Mostrar el array ordenado
        document.getElementById('arrayOrdenado').innerText = array.join(', ');
    }
}