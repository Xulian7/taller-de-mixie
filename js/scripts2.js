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
        // Si la clase es 'fill.mixd', asegurarse de que el primer número no sea 0
        if (rowClass === 'fill.mixd' && index === 0 && randomValue === 0) {
            randomValue = Math.floor(Math.random() * 9) + 1; // Genera un número entre 1 y 9
        }
        input.value = randomValue;
    });
}

// Función para generar ambas filas y habilitar el botón "Ver resultado"
function generateBothRows() {
    // Pedir número de cifras del dividendo
    let dividendDigits = parseInt(prompt('Por favor, dime el número de cifras del dividendo (entre 2 y 4):'));
    while (isNaN(dividendDigits) || dividendDigits < 2 || dividendDigits > 4) {
        dividendDigits = parseInt(prompt('Número inválido. Por favor, ingresa un número entre 2 y 4:'));
    }

    // Pedir número de cifras del divisor
    let divisorDigits = parseInt(prompt('Por favor, dime el número de cifras del divisor (entre 1 y 3):'));
    while (isNaN(divisorDigits) || divisorDigits < 1 || divisorDigits > 3) {
        divisorDigits = parseInt(prompt('Número inválido. Por favor, ingresa un número entre 1 y 3:'));
    }

    clearGrid(); // Limpiar el grid de operaciones

    // Generar números aleatorios para el dividendo
    fillRow('fill.mixd', dividendDigits);

    // Generar números aleatorios para el divisor
    fillRow('fill.mix', 1); // Generar el primer número del divisor (input de clase 'fill.mix')
    if (divisorDigits > 1) {
        // Generar los números adicionales para el divisor en los inputs de clase 'fill.mox'
        fillRow('fill.mox', divisorDigits - 1);
    }

    // Habilitar el botón "Ver resultado"
    const resultButton = document.getElementById('verResultado');
    if (resultButton) {
        resultButton.disabled = false; // Habilitar el botón
        resultButton.textContent = 'Ver resultado'; // Restaurar el texto
    }

    // Validar la divisibilidad (si esta función está definida)
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

        // Eliminar la clase 'highlight' de los inputs
        input.classList.remove('highlight');
    });

    // Seleccionar todos los elementos con las clases 'uno', 'dos', 'tres', y 'quatro'
    const cells = document.querySelectorAll('.uno, .dos, .tres, .quatro');
    cells.forEach(cell => {
        cell.textContent = ''; // Limpiar el contenido de texto de las celdas
    });

    // Limpiar la clase 'highlight' de las flechas
    const arrows = document.querySelectorAll('.cell-arrow');
    arrows.forEach(arrow => {
        arrow.style.opacity = '0'; // Ocultar las flechas
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
    // Obtener los valores de los inputs para el dividendo (mixd) y divisor (mix y mox)
    const row1Inputs = document.querySelectorAll('.input-cell.fill.mixd'); // Dividendo
    const row2MixInput = document.querySelector('.input-cell.fill.mix'); // Primer dígito del divisor
    const row2MoxInputs = document.querySelectorAll('.input-cell.fill.mox'); // Otros dígitos del divisor

    // Construir el dividendo como un número
    const number1 = parseInt(Array.from(row1Inputs).map(input => input.value).join(''), 10);

    // Construir el divisor como un número
    let divisorArray = [row2MixInput.value]; // Comienza con el valor de fill.mix
    row2MoxInputs.forEach(input => {
        if (input.value.trim() !== '') {
            divisorArray.push(input.value.trim());
        }
    });
    const number2 = parseInt(divisorArray.join(''), 10);

    // Obtener el resultado ingresado por el usuario
    const userInputs = document.querySelectorAll('.input-cell.res');
    let userResult = '';
    userInputs.forEach(input => {
        const value = input.value.trim();
        if (value !== '') {
            userResult += value;
        }
    });

    // Convertir el resultado del usuario a un número
    const userResultNumber = parseInt(userResult, 10);

    // Calcular el cociente y el residuo
    const quotient = Math.floor(number1 / number2);
    const remainder = number1 % number2;

    // Elementos HTML para mostrar resultados
    const resultElement = document.getElementById('result');
    const resultButton = document.getElementById('verResultado');
    const gifContainer = document.getElementById('gifContainer');

    // Validar si el resultado ingresado es correcto
    if (userResultNumber === quotient) {
        resultElement.textContent = `¡Correcto! El resultado de la división es ${quotient} y el residuo es ${remainder}.`;
        incrementScore(); // Incrementar el puntaje
        resultButton.disabled = true; // Desactivar el botón
        resultButton.textContent = 'Resultado validado'; // Cambiar el texto del botón
        reproducirAudio('rightans'); // Reproducir audio de respuesta correcta

        // Mostrar GIF por 4 segundos
        gifContainer.style.display = 'block';
        setTimeout(() => {
            gifContainer.style.display = 'none';
        }, 4000);
    } else {
        resultElement.textContent = `No es correcto, revisa. Resultado esperado: ${quotient}, Residuo esperado: ${remainder}.`;
        reproducirAudio('wrongans'); // Reproducir audio de respuesta incorrecta
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



