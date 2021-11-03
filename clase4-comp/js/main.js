
//Si gano 10 veces tiene un premio de 500 puntos.
function calcularPremioFinal (partidas) {
    if (partidas == 10) {
        let premio = 500;
        return premio;
    } else {
        let premio = 0;
        return premio;
    }
}

//Si gano + de 5 veces ademas tiene un premio de 150 puntos.
function bonoPuntos (partidas) {
    if(partidas > 5) {
        let bono = 150;
        return bono;
    } else {
        let bono = 0;
        return bono;
    }
}

//Por cada juego ganado suma 100 puntos.
const puntos = (a,b) => a * b;

let partidas = parseInt(prompt('Ingresa la cantidad de partidas que ganaste las ultimas 10 veces que jugaste a Valorant:'));
let resultado = puntos(partidas, 100) + bonoPuntos(partidas) + calcularPremioFinal(partidas);
console.log(`Total de puntos ganados: ${resultado}`);

