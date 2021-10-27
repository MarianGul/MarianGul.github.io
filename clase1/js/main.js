const nombre = prompt('Ingresa tu nombre:');
const precio1 = parseFloat(prompt(`Hola, ${nombre}. \nIngresa el precio de tus productos \nProducto 1:`));
const precio2 = parseFloat(prompt('Producto 2:'));
const total = precio1 + precio2;
const porcentaje = 20;
const porcVal = total - (total * (porcentaje / 100));
alert(`El total de tu compra con el descuento es: \n${porcVal}`);