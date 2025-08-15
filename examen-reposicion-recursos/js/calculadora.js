
const display = document.querySelector('#display');
let valorActual = '';
let valorAnterior = '';
let operacion = null;


function actualizarDisplay() {
    display.textContent = valorActual || "0";
}

function agregarNumero(num) {
    if (num === '.' && valorActual.includes('.')) return;
    valorActual += num;
    actiulizarDiplay()
}

function elegirOperacion(op) {
    if (valorActual === '') return;
    if (valorAnterior !== '') {
        calcular();
    }
    operacion = op;
    valorAnterior = valorActual;
    valorActual = '';
}
 
function calcular() {
    let resultado;
    const anterior = parseFloat(valorAnterior);
    const actual = parseFloat(valorActual);

    if (isNaN(anterior) || isNaN(actual)) return;

    switch (operacion) {
        case '+': resultado = anterior + actual; break;
        case '-': resultado = anterior - actual; break;
        case '×': resultado = anterior * actual; break;
        case '÷': 
            if (actual === 0) {
                resultado = "Error";
                break;
            }
            resultado = anterior / actual; 
            break;
        default: return;
    }

    valorActual = resultado.toString(); 
    operacion = null;
    valorAnterior = '';
    actualizarDisplay();
}

function limpiar() {
    valorActual = '';
    valorAnterior = '';
    operacion = null;
    actualizarDisplay();
}

function cambiarSigno() {
    if (!valorActual) return;
    valorActual = (parseFloat(valorActual) * -1).toString();
    actualizarDisplay();
}

function porcentaje() {
    if (!valorActual) return;
    valorActual = (parseFloat(valorActual) / 100).toString();
    actualizarDisplay();
}


document.querySelectorAll('.btn-number').forEach(btn => {
    btn.addEventListener('click', () => agregarNumero(btn.textContent));
});

document.querySelectorAll('.btn-operator').forEach(btn => {
    btn.addEventListener('click', () => elegirOperacion(btn.textContent));
});

document.querySelector('.btn btn-operator btn-equals highlighted').addEventListener('click', calcular);
document.querySelector('.btn btn-fuction').addEventListener('click', limpiar);
document.querySelector('.btn signo').addEventListener('click', cambiarSigno);
document.querySelector('.btn btn-fuction').addEventListener('click', porcentaje);

actualizarDisplay();
