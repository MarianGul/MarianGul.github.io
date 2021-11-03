
function validarGiftCard (giftCard, producto) {

    if (giftCard == 'ABCD') {
        let descuentoProducto =  producto * 0.15; 
        return descuentoProducto;

    } else if (giftCard == 'EFGH') {
        let descuentoProducto =  producto * 0.20;
        return descuentoProducto;

    } else {
        let descuentoProducto = 0;
        return descuentoProducto;
    }
}

function validarEnvio (producto) {

if(producto >= 2500) {
    let envio = 0;
    return envio;

} else {
    let envio = 350;
    return envio;
}
}

let producto = parseFloat(prompt('Ingrese el total de su compra:'));
let giftCard = prompt('Gracias! ¿Tiene cupon de descuento?:');
let descuento = validarGiftCard(giftCard, producto);
let envioFinal = validarEnvio(producto);
let resultado = (producto - descuento) + envioFinal;
console.log(`Subtotal: ${producto}\nDescuento (Gift Card ${giftCard}):${descuento}\nEnvio:${envioFinal}\nTotal:${resultado}`);