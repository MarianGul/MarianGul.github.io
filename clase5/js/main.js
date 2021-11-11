class productos {
    constructor (nombre, categoria, subcategoria, precio, stock, descripcion) {
        this.nombre = nombre;
        this.categoria = categoria;
        this.subcategoria = subcategoria;
        this.precio = parseFloat(precio);
        this.stock = parseInt(stock);
        this.descripcion = descripcion;
    }

    seleccionMascota(categoria) {
        return this.categoria == categoria;
    }

}

let productoUno = new productos("Pro Plan Gato Kitten", "gato", "Alimento", 2500, 100, "Alimento balanceado");
let productoDos = new productos("Royal Canin Perro Adulto", "perro", "Alimento", 3000, 50, "Alimento balanceado");

let mascota = prompt("Ingresa si tenes un perro o un gato para ver que alimentos tenemos disponibles:");
mascota = mascota.toLowerCase();

function mascotaProducto () {
    if(productoUno.seleccionMascota(mascota)) {
    console.log("Producto: " + productoUno.nombre + "\nPrecio: " + productoUno.precio + "\nDescripción:" + productoUno.descripcion);

} else if (productoDos.seleccionMascota(mascota)) {
    console.log("Producto: " + productoDos.nombre + "\nPrecio: " + productoDos.precio + "\nDescripción:" + productoDos.descripcion);

} else {
    console.log('No tenemos productos para tu mascota.');
}
}

mascotaProducto();