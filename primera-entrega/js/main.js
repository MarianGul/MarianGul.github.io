//Productos

let categorias = ['perro', 'gato'];

let listaProductos = [
    {   
        id:1,
        nombre:"Excellent Gato Chicken & Rice",
        categoria:categorias[1],
        precio:2500,
        stock:0,
        descripcion: "Alimento balanceado"
    },
    {   
        id:2,
        nombre:"Alimento Old Prince Novel Gato Adulto",
        categoria:categorias[1],
        precio:1500,
        stock:10,
        descripcion: "Alimento balanceado"
    },
    {   
        id:3,
        nombre:"Alimento Pro Plan Pollo Perro Adulto",
        categoria:categorias[0],
        precio:2000,
        stock:0,
        descripcion: "Alimento balanceado"
    },
    {
        id:4,
        nombre:"Excellent Perro Chicken & Rice",
        categoria:categorias[0],
        precio:1200,
        stock:10,
        descripcion: "Alimento balanceado"
    },
    {
        id:5,
        nombre:"Alimento Old Prince Perro Adulto",
        categoria:categorias[0],
        precio:2300,
        stock:10,
        descripcion: "Alimento balanceado"
    },
    {   
        id:6,
        nombre:"Alimento VitalCat Balanced para Gato Adulto",
        categoria:categorias[1],
        precio:1500,
        stock:10,
        descripcion: "Alimento balanceado"
    },

]

class productos {
    constructor (id, nombre, categoria, precio, stock, descripcion) {
        this.id = parseInt(id);
        this.nombre = nombre;
        this.categoria = categoria;
        this.precio = parseFloat(precio);
        this.stock = parseInt(stock);
        this.descripcion = descripcion;
    }


}


function preguntarCategoria () {
    filtroCategoria = prompt("Ingresa si tenes un perro o un gato para ver que productos tenemos disponibles:");
    return  filtroCategoria.toLowerCase();

}


function seleccionarCategoria(filtroCategoria) {
    return listaProductos.filter(productos => productos.categoria == filtroCategoria && productos.stock > 0);
}

function seleccionarProducto (productos) {
    let lista = "Elegi el producto que queres para tu mascota: \n";
    productos.forEach((producto) => {
    lista += producto.id + "." + producto.nombre + ":$ " + producto.precio + "\n";
    });
    let opcion = parseInt(prompt(lista));
    return opcion;
}



function chequearStock(idProducto, cantidad) {
    let checkId = listaProductos.filter(productos => productos.id == idProducto);
    for (let productos of checkId) {
        if (productos.stock != 0 && productos.stock < cantidad) {
            alert('No tenemos suficientes unidades para hacer la compra.\nNos quedan:' + productos.stock + ' unidades');
            return false;
        
        } else if (productos.stock == 0) {
            alert('No tenemos stock disponible');
            return false;
        }
        else {
            productos.stock = productos.stock - cantidad;
            return true;
        }
    }
}

function calcularEnvio (idProducto, cantidad) {
    let checkId = listaProductos.filter(productos => productos.id == idProducto);
    for (let productos of checkId) {
        let cantidadPrecio = productos.precio * cantidad;
        if(cantidadPrecio >= 2500) {
            envio = 0;
        } else {
            envio = 350;
        }
        return envio;
    }
}


function monstrarProducto (idProducto, cantidad, envio) {
    let checkId = listaProductos.filter(productos => productos.id == idProducto);
    for (let productos of checkId) {
        let cantidadPrecio = productos.precio * cantidad;
        alert('Producto: ' + productos.nombre + '\nPrecio: ' + cantidadPrecio + '\nEnvio: ' + envio + '\nPrecio Total: ' + (cantidadPrecio+envio));
    }
}


function iniciarCompra () {
    let categoria = preguntarCategoria();
    let productos = seleccionarCategoria(categoria);
    if (productos.length === 0) {
        return alert('No tenemos productos para tu mascota');
    }

    let idProducto = seleccionarProducto(productos);

    let cantidad = parseInt(prompt('Que cantidad vas a comprar?'));
    let stock = chequearStock(idProducto, cantidad);
    if(stock === false) {
        return;
    }
    let envio = calcularEnvio(idProducto, cantidad);
    monstrarProducto(idProducto, cantidad, envio);
    alert('Gracias por comprar en nuestro Pet Store.')

}

iniciarCompra();

