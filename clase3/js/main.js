let productos = prompt('Ingrese los productos que quiere comprar.\nCuando termine coloque ESC.\nProducto:');
let total = 0;

    while (productos != 'ESC') {

        if(productos != '') {
            console.log(productos);
            total = total + 1;
            productos = prompt('Producto:');

        } else {
            console.log('Error: no ha ingresado todos los productos. Intentelo otra vez.');
            break;
        }
    }

console.log(`Total Productos: ${total}`); 