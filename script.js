// Función para rellenar los inputs con números aleatorios
function fillRow(rowClass) {
    const inputs = document.querySelectorAll(`.${rowClass}`);
    inputs.forEach(input => {
        input.value = Math.floor(Math.random() * 10); // Número aleatorio entre 0 y 9
    });
}

function generateBothRows() {
    fillRow('row1'); // Genera números aleatorios para la fila 1
    fillRow('row2'); // Genera números aleatorios para la fila 2
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
            incrementScore(); // Incrementar el score
        } else {
            document.getElementById('result').textContent = `La multiplicación no coincide. Resultado esperado: ${resultFromMultiplication}`;
        }
    } else {
        document.getElementById('result').textContent = 'Completa todos los campos con números válidos de tres cifras.';
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

let score = 0;
let heladoCount = 0;
// Función para incrementar el score
function incrementScore() {
    score += 1;
    document.getElementById('score-label1').textContent = score;

    // Verificar si el score es mayor o igual a 5
    if (score >= 5) {
        heladoCount += 1;
        document.getElementById('score-label2').textContent = heladoCount;
        score = 0;  // Reiniciar el score después de sumar un helado
    }
}


// Obténer los elementos de audio
const sonidoClic = document.getElementById('sonidoClic');
const risaClic = document.getElementById('RisaClic');

// Agrega eventos a los botones para reproducir el sonido correspondiente
document.getElementById('nuevoEjercicio').addEventListener('click', () => {
    sonidoClic.currentTime = 0; // Reinicia el sonido
    sonidoClic.play();         // Reproduce el sonido 'boing'
});

document.getElementById('verResultado').addEventListener('click', () => {
    risaClic.currentTime = 0; // Reinicia el sonido
    risaClic.play();          // Reproduce el sonido 'smile'
});