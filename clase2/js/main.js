const numero = parseInt(prompt('Ingresa un número entre 1 y 40 para averiguar que personaje de Buffy sos:'));

if((numero >= 1) && (numero <= 10)) {
    alert('Buffy: Cazadora de Vampiros.');
} else if ((numero >= 11) && (numero <= 20)) {
    alert('Willow: Bruja.');
}  else if ((numero >= 21) && (numero <= 30)) {
    alert('Spike: Vampiro.');
}  else if ((numero >= 31) && (numero <= 40)) {
    alert('Giles: Watcher.');
}  else {
    alert('Error: Intentalo otra vez.')
}