
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
        nombre:"Old Prince Perro",
        categoria:categorias[0],
        precio:3500,
        stock:50,
        descripcion: "Alimento balanceado"
    },
    {
        nombre:"Balanced Gato",
        categoria:categorias[1],
        precio:3000,
        stock:50,
        descripcion: "Alimento balanceado"
    }
]

let orden = listaProductos.sort(function(a, b){return a.precio - b.precio});

for(let listaProductos of orden){

console.log(`Lista de productos de menor a mayor precio:\nNombre: ${listaProductos.nombre}\nPrecio: ${listaProductos.precio}`);
   
}