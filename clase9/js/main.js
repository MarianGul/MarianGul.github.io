//Productos
let directorioImagen = 'imgs/'

let categorias = ['perro', 'gato'];

let subCategoria = ['Alimentos', 'Accesorios', 'Juguetes', 'Cuchas y camas'];

let listaProductos = [
    {   
        id:1,
        nombre:"Excellent Gato Chicken & Rice",
        categoria:categorias[1],
        subcategoria:subCategoria[0],
        precio:2500,
        stock:25,
        descripcion: "Alimento balanceado",
        imagen: "excellent-gato.jpg"
    },
    {   
        id:2,
        nombre:"Old Prince Novel Gato Adulto",
        categoria:categorias[1],
        subcategoria:subCategoria[0],
        precio:1500,
        stock:10,
        descripcion: "Alimento balanceado",
        imagen: "old-prince-gato.jpg"
    },
    {   
        id:3,
        nombre:"Pro Plan Pollo Perro Adulto",
        categoria:categorias[0],
        subcategoria:subCategoria[0],
        precio:2000,
        stock:25,
        descripcion: "Alimento balanceado",
        imagen: "pro-plan.png"
    },
    {
        id:4,
        nombre:"Excellent Perro Chicken & Rice",
        categoria:categorias[0],
        subcategoria:subCategoria[0],
        precio:1200,
        stock:10,
        descripcion: "Alimento balanceado",
        imagen: "excellent.png"
    },
    {
        id:5,
        nombre:"Old Prince Perro Adulto",
        categoria:categorias[0],
        subcategoria:subCategoria[0],
        precio:2300,
        stock:10,
        descripcion: "Alimento balanceado",
        imagen: "old-prince-perro.jpg"
    },
    {   
        id:6,
        nombre:"VitalCat Balanced para Gato Adulto",
        categoria:categorias[1],
        subcategoria:subCategoria[0],
        precio:1500,
        stock:10,
        descripcion: "Alimento balanceado",
        imagen: "balanced-vital-cat.jpg"
    },

]

class productos {
    constructor (id, nombre, categoria, subcategoria, precio, stock, descripcion, imagen) {
        this.id = parseInt(id);
        this.nombre = nombre;
        this.categoria = categoria;
        this.subcategoria = subcategoria;
        this.precio = parseFloat(precio);
        this.stock = parseInt(stock);
        this.descripcion = descripcion;
        this.imagen = imagen;
    }
}

function showProducts () {

    let contentedorProductos = document.getElementById('productos-container');

    for (let productos of listaProductos) {
        
        let contenedor = document.createElement('div');
        contenedor.classList.add('product', 'col-lg-4', 'col-md-6', 'mb-3');
        contenedor.setAttribute("data-categoria", productos.categoria);
        contenedor.setAttribute("data-subcategoria", productos.subcategoria);
        contenedor.innerHTML = `
        <div class="card">
        <div class="card-image"><img src="${directorioImagen}${productos.imagen}" class="card-img-top" alt="${productos.nombre}"></div>
        <div class="card-body">
        <h6 class="card-title">${productos.nombre}</h6>
        <small>${productos.descripcion}</small>
        <h4 class="precio">$${productos.precio}</h4>
        </div>
        <div class="card-footer d-flex justify-content-between">
        <input class="cantidad" type="number" value="1">
        <button class="btn btn-compra btn-sm" data-id="${productos.id}">Comprar</button>
        </div>
        </div>
        `;

        contentedorProductos.appendChild(contenedor);
    }
}

function showSubCategorias () {
    let contenedorSubCategorias = document.getElementById('subcategoria');

    subCategoria.forEach((cat) => {
        let contenedorSubCat = document.createElement('div');
        let number = 0;
        contenedorSubCat.classList.add('form-check');
        contenedorSubCat.innerHTML = `
        <input class="form-check-input" type="radio" name="subcategoria" id="subcategoria${number++}">
        <label class="form-check-label" for="subcategoria${number++}">
         ${cat}
        </label>`
        contenedorSubCategorias.appendChild(contenedorSubCat);
    });

}


function seleccionarCategoria(e) {
    e.preventDefault();
    let filtroCategoria = e.target.dataset.categoria;
    let productosTienda = document.querySelectorAll('.product');

    productosTienda.forEach((product) => {
        if(filtroCategoria == 'todos') {
            product.style.display = 'block';
        } else {
           if(product.getAttribute('data-categoria') == filtroCategoria) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        }
    });

}

let botonesCategoria = document.querySelectorAll(".categoria");

for (let i = 0; i < botonesCategoria.length; i++) {
    botonesCategoria[i].addEventListener("click", function() {
      var currentButton = document.getElementsByClassName("active");
      currentButton[0].className = currentButton[0].className.replace(" active", "");
      this.className += " active";
    });
    botonesCategoria[i].addEventListener("click" , seleccionarCategoria);
  }



showProducts();
showSubCategorias();

/*
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

*/

