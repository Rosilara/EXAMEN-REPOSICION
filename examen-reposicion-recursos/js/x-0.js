

const celdas = document.querySelectorAll('.cell x');
const mensaje = document.querySelector('#game-info'); 
const marcadorX = document.querySelector('#scoreplayer-x');
const marcadorO = document.querySelector('#scoreplayer-0');

let turno = 'X';
let juegoActivo = true;
let tablero = ["", "", "", "", "", "", "", "", ""];
let puntuacion = { X: 0, O: 0 };


const combinacionesGanadoras = [
    [0,1,2], [3,4,5], [6,7,8], 
    [0,3,6], [1,4,7], [2,5,8], 
    [0,4,8], [2,4,6]           
];


function manejarClick(e) {
    const ind = e.target.dataset.index;

    
    if (tablero[ind] !== "" || !juegoActivo) return;

    
    tablero[ind] = turno;
    e.target.textContent = turno;

    if (revisarVictoria()) {
        mensaje.textContent = `Gana ${turno}! `;
        puntuacion[turno]++;
        actualizarMarcador();
        juegoActivo = false;
        resaltarLineaGanadora();
    } else if (tablero.every(c => c !== "")) {
        mensaje.textContent = "¡Empate! ";
        juegoActivo = false;
    } else {
        turno = turno === 'X' ? 'O' : 'X';
        mensaje.textContent = `Turno de: ${turno}`;
    }
}

function revisarVictoria() {
    return combinacionesGanadoras.some(combinacion => {
        const [a,b,c] = combinacion;
        return tablero[a] && tablero[a] === tablero[b] && tablero[a] === tablero[c];
    });
}
function obtenerLineaGanadora() {
    return combinacionesGanadoras.find(combinacion => {
        const [a,b,c] = combinacion;
        return tablero[a] && tablero[a] === tablero[b] && tablero[a] === tablero[c];
    });

}


function actualizarMarcador() {
    marcadorX.textContent = puntuacion.X;
    marcadorO.textContent = puntuacion.O;
}


celdas.forEach(celda => {
    celda.addEventListener('click', manejarClick);
});
document.querySelector('#btnReiniciar').addEventListener('click', reiniciarJuego);

