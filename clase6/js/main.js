
let categorias = ['perro', 'gato'];

let listaProductos = [
    {
        nombre:"Pro Plan Gato Kitten",
        categoria:categorias[1],
        precio:2500,
        stock:100,
        descripcion: "Alimento balanceado"
    },
    {
        nombre:"Royal Canin Perro Adulto",
        categoria:categorias[0],
        precio:2000,
        stock:50,
        descripcion: "Alimento balanceado"
    },
    {
        nombre:"Balanced Gato",
        categoria:categorias[1],
        precio:3000,
        stock:50,
        descripcion: "Alimento balanceado"
    },
    {
        nombre:"Old Prince Perro",
        categoria:categorias[0],
        precio:3500,
        stock:50,
        descripcion: "Alimento balanceado"
    }
]

    class productos {
        constructor (nombre, categoria, precio) {
            this.nombre = nombre;
            this.categoria = categoria;
            this.precio = parseFloat(precio);
            this.stock = parseInt(stock);
            this.descripcion = descripcion;
        }


    }

    let mascota = prompt("Ingresa si tenes un perro o un gato para ver que alimentos tenemos disponibles:");

    let productosResultado = listaProductos.filter(productos => productos.categoria == mascota);

    for(let productos of productosResultado){

        console.log('Nombre: ' + productos.nombre + '\nPrecio: ' + productos.precio + '\nDescripcion: ' + productos.descripcion);
           
    }