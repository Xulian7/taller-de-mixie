// Función para generar un número aleatorio con un número específico de cifras y asegurarse de que la primera cifra no sea 0
function generateRandomNumber(digits) {
    if (digits < 1) return 0; // Validación de entrada
    const min = Math.pow(10, digits - 1); // Mínimo valor para las cifras especificadas
    const max = Math.pow(10, digits) - 1; // Máximo valor para las cifras especificadas
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Función para rellenar una fila con un número aleatorio, acomodando las cifras en orden inverso
function fillRowWithRandomNumber(rowClass, digits) {
    const inputs = document.querySelectorAll(`.${rowClass}`);
    const randomNumber = generateRandomNumber(digits).toString();
    inputs.forEach((input, index) => {
        const reversedIndex = inputs.length - 1 - index; // Índice inverso
        input.value = randomNumber[reversedIndex] || ''; // Asignar dígito en orden inverso
    });
}

// Función para solicitar cifras al usuario y validar la entrada
function promptDigits(promptText, minDigits, maxDigits) {
    let digits;
    do {
        digits = parseInt(prompt(`${promptText} (entre ${minDigits} y ${maxDigits} cifras):`), 10);
    } while (isNaN(digits) || digits < minDigits || digits > maxDigits);
    return digits;
}

// Función principal para generar ambas filas y habilitar el botón
function generateBothRows() {
    clearGrid(); // Limpiar el grid de operaciones
    
    // Solicitar al usuario las cifras para el multiplicando y el multiplicador
    const multiplicandDigits = promptDigits('Ingrese el número de cifras para el multiplicando', 2, 3);
    const multiplierDigits = promptDigits('Ingrese el número de cifras para el multiplicador', 1, 3);
    // Generar números aleatorios basados en las cifras especificadas
    fillRowWithRandomNumber('row1', multiplicandDigits); // Generar para la fila 1 (multiplicando)
    fillRowWithRandomNumber('row2', multiplierDigits); // Generar para la fila 2 (multiplicador)
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
    // Convierte los inputs de las filas en un número de cualquier cantidad de cifras
    const number1 = Array.from(row1Inputs).map(input => input.value).join('');
    const number2 = Array.from(row2Inputs).map(input => input.value).join('');
    // Verifica que ambos números sean válidos y no vacíos
    if (number1.length > 0 && number2.length > 0 && !isNaN(number1) && !isNaN(number2)) {
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
            resultElement.textContent = `No es correcto, revisa. Resultado esperado: ${resultFromMultiplication}`;
            reproducirAudio('wrongans'); // Reproducir el audio de respuesta incorrecta
        }
    } else {
        document.getElementById('result').textContent = 'Completa todos los campos con números válidos.';
    }
}

// Función para limpiar el grid de operaciones
function clearGrid() {
    const inputs = document.querySelectorAll('.input-cell');
    inputs.forEach(input => {
        input.value = ''; // Limpiar el contenido de cada input
    });
    document.getElementById('result').textContent = '';
    clearAux1('rowa'); // Limpiar el grid auxiliar de la fila 1
    clearAux1('rowb'); // Limpiar el grid auxiliar de la fila 2
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

// Seleccionar todos los inputs con la clase final-result
const finalResults = document.querySelectorAll('.final-result');

// Función para limpiar el realce
function clearHighlight() {
    const allInputs = document.querySelectorAll('.input-cell, .cell-tiny');
    allInputs.forEach(input => {
        input.style.backgroundColor = ''; // Restaurar color original
    });
}

finalResults.forEach(input => {
    input.addEventListener('focus', () => {
        // Limpiar cualquier realce previo
        clearHighlight();

        // Extraer las clases "pos" del input actual
        const activeClasses = Array.from(input.classList);
        const colClass = activeClasses.find(cls => cls.startsWith('pos')); // Ejemplo: "pos1"

        if (colClass) {
            // Resaltar las celdas de la columna coincidente
            const colInputs = document.querySelectorAll(`.input-cell.${colClass}`);
            colInputs.forEach(input => {
                input.style.backgroundColor = 'lightblue';
            });

            // Resaltar las celdas de rowb si la columna del partial-result es < 3
            const targetRowb = `rowb.${colClass}`; // Ejemplo: "rowb.pos1"
            const rowaInputs = document.querySelectorAll(`.cell-tiny.${targetRowb}`);
            
            const colNumber = colClass.match(/\d+/g);
            const targetRowbx = `rowb.pos${parseInt(colNumber) + 1}`;
            const rowaInputsx = document.querySelectorAll(`.cell-tiny.${targetRowbx}`);

            rowaInputs.forEach(input => {
                input.style.backgroundColor = 'lightblue';
            });

            rowaInputsx.forEach(input => {
                input.style.backgroundColor = '#FFB6C1';  // Rosa claro (lightpink)
            });
        }
    });

    input.addEventListener('blur', () => {
        // Limpiar el realce al perder el foco
        clearHighlight();
    });
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
            if (colNumber >= 1 && colNumber <= 3) {
                const targetRowa = `rowa.c${colNumber - 1}`; // Ejemplo: "rowa.c1"
                const rowaInputs = document.querySelectorAll(`.cell-tiny.${targetRowa}`);
                const targetRowax = `rowa.c${colNumber}`;
                const rowaxInputs = document.querySelectorAll(`.cell-tiny.${targetRowax}`);

                rowaInputs.forEach(input => {
                    input.style.backgroundColor = 'lightblue';
                });

                rowaxInputs.forEach(input => {
                    input.style.backgroundColor = '#FFB6C1';  // Rosa claro (lightpink)
                });

            }
        }
    });

    input.addEventListener('blur', () => {
        // Limpiar el realce al perder el foco
        clearHighlight();
    });
});

