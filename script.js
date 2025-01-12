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
            // Mostrar el GIF por 4 segundos
            const gifContainer = document.getElementById('gifContainer');
            gifContainer.style.display = 'block'; // Mostrar el GIF
            setTimeout(() => {
                gifContainer.style.display = 'none'; // Ocultar el GIF después de 4 segundos
            }, 3000);
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

const imagen = document.getElementById('imagen-fija');
const audio = document.getElementById('risas');

imagen.addEventListener('click', function() {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
        audio.currentTime = 0;  // Para reiniciar el audio cuando se hace clic nuevamente
    }
});

// Seleccionar todos los inputs con la clase partial-result
const partialResults = document.querySelectorAll('.partial-result');

// Función para limpiar el realce
function clearHighlight() {
    const allInputs = document.querySelectorAll('.input-cell, .cell-tiny');
    allInputs.forEach(input => {
        input.style.backgroundColor = ''; // Restaurar color original
    });
}

partialResults.forEach(input => {
    input.addEventListener('focus', () => {
        // Limpiar cualquier realce previo
        clearHighlight();

        // Extraer las clases "fn" y "cn" del input actual
        const activeClasses = Array.from(input.classList);
        const rowClass = activeClasses.find(cls => cls.startsWith('f')); // Ejemplo: "f1"
        const colClass = activeClasses.find(cls => cls.startsWith('c')); // Ejemplo: "c3"

        if (rowClass && colClass) {
            // Convertir las clases para que coincidan con input-cell
            const targetRow2 = `row1.${colClass.replace('c', 'col')}`; // Ejemplo: "row2.col3"
            const targetRow1 = `row2.${rowClass.replace('f', 'col')}`; // Ejemplo: "row1.col1"

            // Resaltar las celdas de la fila 2, columna N
            const row2Inputs = document.querySelectorAll(`.input-cell.${targetRow2}`);
            row2Inputs.forEach(input => {
                input.style.backgroundColor = 'lightblue';
            });

            // Resaltar las celdas de la fila 1, fila M
            const row1Inputs = document.querySelectorAll(`.input-cell.${targetRow1}`);
            row1Inputs.forEach(input => {
                input.style.backgroundColor = 'lightblue';
            });

            // Resaltar las celdas de rowa si la columna del partial-result es < 3
            const colNumber = parseInt(colClass.replace('c', '')); // Obtener número de columna (ej. c1 -> 1)
            if (colNumber < 3) {
                const targetRowa = `rowa.c${colNumber}`; // Ejemplo: "rowa.c1"
                const rowaInputs = document.querySelectorAll(`.cell-tiny.${targetRowa}`);
                rowaInputs.forEach(input => {
                    input.style.backgroundColor = 'lightblue';
                });
            }
        }
    });

    input.addEventListener('blur', () => {
        // Limpiar el realce al perder el foco
        clearHighlight();
    });
});
