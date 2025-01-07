// Función para rellenar los inputs con números aleatorios
function fillRow(rowClass) {
    const inputs = document.querySelectorAll(`.${rowClass}`);
    inputs.forEach(input => {
        input.value = Math.floor(Math.random() * 10); // Número aleatorio entre 0 y 9
    });
}

// Función para realizar la multiplicación
function multiplyNumbers() {
    // Obtiene los números de las filas
    const row1Inputs = document.querySelectorAll('.row1');
    const row2Inputs = document.querySelectorAll('.row2');

    // Convierte los inputs en un número de tres cifras
    const number1 = Array.from(row1Inputs).map(input => input.value).join('');
    const number2 = Array.from(row2Inputs).map(input => input.value).join('');

    // Valida que los números sean válidos
    if (number1.length === 3 && number2.length === 3 && !isNaN(number1) && !isNaN(number2)) {
        const result = parseInt(number1) * parseInt(number2);
        document.getElementById('result').textContent = result;
    } else {
        document.getElementById('result').textContent = 'Error: Completa todos los campos con números válidos.';
    }
}

// Función para limpiar el grid de operaciones
function clearGrid() {
    const inputs = document.querySelectorAll('.input-cell');
    inputs.forEach(input => {
        input.value = ''; // Limpiar el contenido de cada input
    });
}
