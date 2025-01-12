// Seleccionar todos los inputs con la clase partial-result
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
                input.style.backgroundColor = '#FF7F7F';  // Rojo tenue
            });
        }
    });

    input.addEventListener('blur', () => {
        // Limpiar el realce al perder el foco
        clearHighlight();
    });
});


