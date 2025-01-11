// Función para rellenar los inputs con números aleatorios
function fillRow(rowClass) {
    const inputs = document.querySelectorAll(`.${rowClass}`);
    inputs.forEach(input => {
        input.value = Math.floor(Math.random() * 10); // Número aleatorio entre 0 y 9
    });
}

// Función para generar ambas filas y habilitar el botón
function generateBothRows() {
    clearGrid(); // Limpiar el grid de operaciones
    clearAux1('rowa'); // Limpiar el grid auxiliar de la fila 1
    clearAux1('rowb'); // Limpiar el grid auxiliar de la fila 2
    fillRow('row1'); // Genera números aleatorios para la fila 1
    fillRow('row2'); // Genera números aleatorios para la fila 2
    
    // Intentar habilitar el botón "Ver resultado"
    const resultButton = document.getElementById('verResultado');
    if (resultButton) {
        resultButton.disabled = false; // Habilitar el botón
        resultButton.textContent = 'Ver resultado'; // Restaurar el texto
    }
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
        const resultElement = document.getElementById('result');
        const resultButton = document.getElementById('verResultado'); // Asegúrate de que tu botón tenga este ID
        
        if (userResult === resultFromMultiplication.toString()) {
            resultElement.textContent = `¡Correcto! El resultado de la multiplicación es ${resultFromMultiplication}`;
            incrementScore(); // Incrementar el score
            // Desactivar el botón
            resultButton.disabled = true;
            resultButton.textContent = 'Resultado validado'; // Cambiar el texto del botón si lo deseas
            reproducirAudio('rightans'); // Reproducir el audio de respuesta correcta
        } else {
            resultElement.textContent = `La multiplicación no coincide. Resultado esperado: ${resultFromMultiplication}`;
            reproducirAudio('wrongans'); // Reproducir el audio de respuesta incorrecta
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

function reproducirAudio(idAudio) {
    // Seleccionar el elemento de audio por su ID
    const audio = document.getElementById(idAudio);
    
    // Reproducir el audio
    if (audio) {
        audio.play();
    }
}