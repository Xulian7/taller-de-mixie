function fillRow(rowClass, limit = null) {
    const inputs = document.querySelectorAll(`.${rowClass}`);
    inputs.forEach((input, index) => {
        if (limit !== null && index >= limit) {
            input.value = ''; // Dejar vacío si el índice supera el límite
            return;
        }
        let randomValue = Math.floor(Math.random() * 10); // Número aleatorio entre 0 y 9
        
        // Si la clase es 'fill.mix', asegurarse de que no sea ni 0 ni 1
        if (rowClass === 'fill.mix' && (randomValue === 0 || randomValue === 1)) {
            randomValue = Math.floor(Math.random() * 8) + 2; // Genera un número entre 2 y 9
        }
        
        input.value = randomValue;
    });
}

// Validar divisibilidad y sombrear inputs según el resultado
function validateDivisibility() {
    const dividendInputs = document.querySelectorAll('.fill.mixd');
    const divisorInputs = document.querySelectorAll('.fill.mix');
    
    // Obtener el divisor completo
    const divisor = parseInt(Array.from(divisorInputs).map(input => input.value).join(''), 10);
    if (isNaN(divisor) || divisor === 0) {
        alert('El divisor no puede ser 0 o estar vacío.');
        return;
    }
    
    // Obtener las primeras cifras del dividendo
    const firstNumber = parseInt(dividendInputs[0]?.value || 0, 10);
    const secondNumber = parseInt((dividendInputs[1]?.value || 0) + '', 10);
    const combinedNumber = firstNumber * 10 + secondNumber;

    // Sombrear según divisibilidad
    dividendInputs.forEach(input => input.classList.remove('highlight'));
    if (firstNumber % divisor === 0) {
        dividendInputs[0].classList.add('highlight');
    } else if (combinedNumber % divisor === 0) {
        dividendInputs[0].classList.add('highlight');
        if (dividendInputs[1]) {
            dividendInputs[1].classList.add('highlight');
        }
    }
}

// Función para generar ambas filas y habilitar el botón "Ver resultado"
function generateBothRows() {
    let numElements = parseInt(prompt('Por favor, Dime el número de cifras del dividendo:'));
    
    // Validar el input
    while (isNaN(numElements) || numElements < 2 || numElements > 4) {
        numElements = parseInt(prompt('Número inválido. Por favor, ingresa un número entre 2 y 4:'));
    }

    clearGrid(); // Limpiar el grid de operaciones
    fillRow('fill.mixd', numElements); // Genera números aleatorios para el dividendo, limitado al número ingresado
    fillRow('fill.mix'); // Genera números aleatorios para el divisor (todos los inputs)

    // Intentar habilitar el botón "Ver resultado"
    const resultButton = document.getElementById('verResultado');
    if (resultButton) {
        resultButton.disabled = false; // Habilitar el botón
        resultButton.textContent = 'Ver resultado'; // Restaurar el texto
    }

    // ** Llamar a validateDivisibility inmediatamente después de llenar los inputs **
    validateDivisibility();
}

// Función para limpiar el grid
function clearGrid() {
    const inputs = document.querySelectorAll('.input-cell'); // Seleccionar todos los inputs con la clase 'input-cell'
    inputs.forEach(input => {
        input.value = ''; // Limpiar el valor del input
        
        // Si el input tiene la clase 'partial', eliminar la clase 'has-data'
        if (input.classList.contains('partial')) {
            input.classList.remove('has-data'); // Eliminar la clase 'has-data' para los inputs 'partial'
        }
    });

    // Seleccionar todos los elementos con las clases 'uno', 'dos', 'tres', y 'quatro'
    const cells = document.querySelectorAll('.uno, .dos, .tres, .quatro');
    cells.forEach(cell => {
        cell.textContent = ''; // Limpiar el contenido de texto de las celdas
    });

    
    document.getElementById('result').textContent = ''; // Limpiar el texto del elemento con id 'result'
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


// Selecciona todos los inputs con las clases "input-cell" y "partial"
const inputs = document.querySelectorAll('.input-cell.partial');

inputs.forEach(input => {
    input.addEventListener('input', () => {
        if (input.value.trim() !== '') {
            input.classList.add('has-data'); // Aplica estilo si tiene datos
        } else {
            input.classList.remove('has-data'); // Vuelve al estilo original si está vacío
        }
    });
});


function calculateResult() {
    const row1Inputs = document.querySelectorAll('.input-cell.fill.mixd');
    const row2Inputs = document.querySelectorAll('.input-cell.fill.mix');

    // Obtener los valores del input compuesto
    const inputs = document.querySelectorAll('.input-cell.res');
    let userResult = '';
    inputs.forEach(input => {
        const value = input.value.trim();
        if (value !== '') {
            userResult += value;
        }
    });

    // Convierte los inputs de las filas en un número de tres cifras
    const number1 = parseInt(Array.from(row1Inputs).map(input => input.value).join(''), 10);
    const number2 = parseInt(Array.from(row2Inputs).map(input => input.value).join(''), 10);

    // Calcula el cociente entero y el residuo
    const quotient = Math.floor(number1 / number2);
    const remainder = number1 % number2;

    // Convertir userResult a número para comparación
    const userResultNumber = parseInt(userResult, 10);

    // Elementos HTML
    const resultElement = document.getElementById('result');
    const resultButton = document.getElementById('verResultado');
    const gifContainer = document.getElementById('gifContainer');

    // Verifica si el resultado ingresado es correcto
    if (userResultNumber === quotient) {
        resultElement.textContent = `¡Correcto! El resultado de la división es ${quotient}`;
        incrementScore(); // Incrementar el score
        resultButton.disabled = true; // Desactivar el botón
        resultButton.textContent = 'Resultado validado'; // Cambiar texto del botón
        reproducirAudio('rightans'); // Reproducir audio correcto

        // Mostrar GIF por 4 segundos
        gifContainer.style.display = 'block';
        setTimeout(() => {
            gifContainer.style.display = 'none';
        }, 4000);
    } else {
        resultElement.textContent = `No es correcto, revisa. Resultado esperado: ${quotient}`;
        reproducirAudio('wrongans'); // Reproducir audio incorrecto
    }
}


function verificarDatos() {
    // Revisamos cada grupo
    ['uno', 'dos', 'tres', 'quatro'].forEach(grupo => {
        const inputs = document.querySelectorAll(`.input-cell.partial.${grupo}`);
        const cell = document.querySelector(`.cell.${grupo}`);
        let tieneDatos = false;

        // Verificamos si algún input tiene datos
        inputs.forEach(input => {
            if (input.value.trim() !== '') {
                tieneDatos = true;
            }
        });

        // Actualizamos el texto del div correspondiente
        cell.textContent = tieneDatos ? '-' : '';
    });
}
// Asignamos el evento a todos los inputs
document.querySelectorAll('.input-cell').forEach(input => {
    input.addEventListener('input', verificarDatos);
});

const imagen1 = document.getElementById('imagen1');
        const sonido = document.getElementById('sonido');

        imagen1.addEventListener('mouseenter', () => {
            sonido.currentTime = 0; // Reinicia el sonido
            sonido.play(); // Reproduce el sonido
        });



