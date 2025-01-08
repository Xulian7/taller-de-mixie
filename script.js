// Función para rellenar los inputs con números aleatorios
function fillRow(rowClass) {
    const inputs = document.querySelectorAll(`.${rowClass}`);
    inputs.forEach(input => {
        input.value = Math.floor(Math.random() * 10); // Número aleatorio entre 0 y 9
    });
}

// Función para realizar la multiplicación
function validateAndMultiply() {
    // Obtiene los números de las filas
    const row1Inputs = document.querySelectorAll('.row1');
    const row2Inputs = document.querySelectorAll('.row2');

    // Convierte los inputs de las filas en un número de tres cifras
    const number1 = Array.from(row1Inputs).map(input => input.value).join('');
    const number2 = Array.from(row2Inputs).map(input => input.value).join('');

    // Verifica que ambos números tengan 3 cifras y sean válidos
    if (number1.length === 3 && number2.length === 3 && !isNaN(number1) && !isNaN(number2)) {
        const resultFromMultiplication = parseInt(number1) * parseInt(number2);
        
        // Obtener los valores del input compuesto
        const inputs = document.querySelectorAll('.input-cell.final-result');
        let userResult = '';
        inputs.forEach(input => {
            const value = input.value.trim();
            if (value !== '') {
                userResult += value;
            }
        });

        // Verifica si la multiplicación calculada y el resultado ingresado son iguales
        if (userResult === resultFromMultiplication.toString()) {
            document.getElementById('result').textContent = `¡Correcto! El resultado de la multiplicación es ${resultFromMultiplication}`;
        } else {
            document.getElementById('result').textContent = `Error: La multiplicación no coincide. Resultado esperado: ${resultFromMultiplication}`;
        }
    } else {
        document.getElementById('result').textContent = 'Error: Completa todos los campos con números válidos de tres cifras.';
    }
}

// Función para limpiar el grid de operaciones
function clearGrid() {
    const inputs = document.querySelectorAll('.input-cell');
    inputs.forEach(input => {
        input.value = ''; // Limpiar el contenido de cada input
    });
    document.getElementById('result').textContent = '';
    // Considera agregar una confirmación para evitar limpieza accidental
}

// Función para limpiar el grid auxiliar
function clearAux1(rowClass) {
    // Selecciona todos los inputs con la clase pasada como argumento
    const inputs = document.querySelectorAll(`.cell-tiny.${rowClass}`);
    // Verificar si existen inputs con la clase pasada
    if (inputs.length > 0) {
        // Limpiar el contenido de cada input
        inputs.forEach(input => {
            input.value = ''; 
        });
    } else {
        console.log(`No se encontraron elementos con la clase .cell-tiny.${rowClass}`);
    }
}