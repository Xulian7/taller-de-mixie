function validateDivisibility() {
    const dividendInputs = document.querySelectorAll('.fill.mixd');
    const divisorInputs = document.querySelectorAll('.fill.mix');
    
    // Obtener el divisor completo
    const divisor = parseInt(Array.from(divisorInputs).map(input => input.value).join(''), 10);
    if (isNaN(divisor) || divisor === 0) {
        alert('El divisor no puede ser 0 o estar vacío.');
        return;
    }

    // Restablecer cualquier resaltado previo
    dividendInputs.forEach(input => input.classList.remove('highlight'));

    // Validación basada en si el número compuesto es suficiente para dividirse
    let currentNumber = 0; // Número acumulado del dividendo
    let highlightedIndex = -1; // Índice del último número sombreado

    for (let i = 0; i < dividendInputs.length; i++) {
        const digit = parseInt(dividendInputs[i]?.value || 0, 10);
        currentNumber = currentNumber * 10 + digit; // Agregar dígito al número actual

        // Resaltar si el número es mayor o igual al divisor
        if (currentNumber >= divisor) {
            for (let j = 0; j <= i; j++) {
                dividendInputs[j].classList.add('highlight');
            }
            highlightedIndex = i; // Guardamos el índice donde se realizó el sombreado
            break; // Una vez que tenemos un número válido, dejamos de buscar
        }
    }

    // A partir del índice donde se dejó de sombrear, comenzamos a escuchar los inputs de resid
    const residClasses = ['resid.one', 'resid.two', 'resid.three', 'resid.four'];

    // Iterar sobre las clases resid y agregar los eventos de escucha
    residClasses.forEach((residClass, classIndex) => {
        const residInputs = document.querySelectorAll(`.${residClass}`);

        residInputs.forEach((input, inputIndex) => {
            input.addEventListener('input', () => {
                // Llamar a la validación con el valor de inputIndex y la clase actual
                const selectedInputs = Array.from(residInputs).slice(0, inputIndex + 1);
                const compositeNumber = parseInt(selectedInputs.map(input => input.value).join(''), 10);

                // Validar si el número compuesto es menor que el divisor
                if (compositeNumber < divisor) {
                    // Resaltar el siguiente input de la clase 'fill.mixd' si existe y no está vacío
                    const fillMixdInputs = document.querySelectorAll('.fill.mixd');
                    const nextInput = fillMixdInputs[inputIndex + 1];
                
                    if (nextInput && nextInput.value.trim() !== '') {  // Verifica si el siguiente input no está vacío
                        nextInput.classList.add('highlight');
                    }
                }                
            });
        });
    });
}


// Función para verificar si el input tiene la clase 'highlight' y cambiar la opacidad de la flecha
function checkAndUpdateArrow(inputElement) {
    // Obtener la clase que contiene el identificador (como 'A1', 'B2', 'C3')
    const inputClass = Array.from(inputElement.classList).find(cls => /^[A-Z]\d$/.test(cls));  // Buscar clase que sea algo como 'A1', 'B2', etc.
    
    if (inputClass) {
        // Buscar la flecha correspondiente usando la clase
        const arrowElement = document.querySelector(`.cell-arrow.${inputClass}`);
        
        if (arrowElement) {
            // Si el input tiene la clase 'highlight', hacemos la flecha visible
            if (inputElement.classList.contains('highlight')) {
                arrowElement.style.opacity = '1';  // Flecha visible
            } else {
                arrowElement.style.opacity = '0';  // Flecha oculta
            }
        }
    }
}

// Observamos los cambios en la clase 'highlight' de los inputs
const inputCells = document.querySelectorAll('.input-cell.fill.mixd');
inputCells.forEach(input => {
    // Crear un observador de mutaciones para escuchar cambios en las clases del input
    const observer = new MutationObserver(() => checkAndUpdateArrow(input));  // Llamar la función cuando hay cambios
    observer.observe(input, { attributes: true, attributeFilter: ['class'] });  // Observamos los cambios en la clase
});




