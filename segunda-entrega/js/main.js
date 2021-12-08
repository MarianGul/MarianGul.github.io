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
        <input class="cantidad" type="number" value="1" min="1">
        <a class="btn btn-compra btn-sm" data-id="${productos.id}">Comprar</a>
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

function agregarCarrito(e) {
    let productoId = e.target.dataset.id;
    let target = e.target;
    let targetContenedor = target.parentNode;
    let cantidad = targetContenedor.querySelector(".cantidad").value;
    let productoElegido = listaProductos.filter(productos => productos.id == productoId);

    for (let productos of productoElegido){
        let producto = {
            id:productos.id,
            nombre: productos.nombre,
            descripcion:productos.descripcion,
            imagen: productos.imagen,
            precio: productos.precio,
            cantidad:parseInt(cantidad)
        }

            let productosLocales = JSON.parse(localStorage.getItem('carrito')) || [];
            let match = productosLocales.find(function (item) {
                return item['id'] === producto.id;
            });
            if (match) {
                match['cantidad'] += producto.cantidad;
                match['precio'] += producto.precio * producto.cantidad;
            } else {
                producto = {
                    id:productos.id,
                    nombre: productos.nombre,
                    descripcion:productos.descripcion,
                    imagen: productos.imagen,
                    precio: productos.precio,
                    cantidad:parseInt(cantidad)
                };
                productosLocales.push(producto);
            }
            localStorage.setItem('carrito', JSON.stringify(productosLocales));
        
    }
}

function mostrarCarrito () {
    let cartItems = localStorage.getItem("carrito");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector("#carrito ul");
    productContainer.innerHTML = '';

    if(cartItems && productContainer) {
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
            <img src="${directorioImagen}${item.imagen}" width="80">
            <div class="carrito-data">
              <p class="carrito-nombre">${item.nombre}</p>
              <p class="carrito-descripcion">${item.descripcion}</p>
            </div>
            <div class="carrito-precio">
            $${item.precio}
            </div>
            <span class="badge bg-primary rounded-pill">${item.cantidad}</span>
            <i class="delete" data-id="${item.id}"></i>
          </li>
            `;
        });
    }

    if(cartItems == '') {
        productContainer.innerHTML += `<li class="list-group-item">El carrito de compras esta vacio.</li>`;
    }
}

function carritoNumeros () {
    let cartItems = localStorage.getItem("carrito");
    cartItems = JSON.parse(cartItems);
    let numberCarrito = document.getElementById('total');

    if (cartItems === null) {
        numberCarrito.style.display = 'none';
    } else {
        numberCarrito.style.display = 'block';
        let suma = cartItems.map(item => item.cantidad).reduce((a, b) => a + b, 0);
        numberCarrito.textContent = suma;
    }
}

function removeItem (e) {
    let cartItems = localStorage.getItem("carrito");
    let resultadoCarrito = JSON.parse(cartItems);
    let productContenedor = e.target.parentNode;
    let productId = e.target.dataset.id;

    for (let i = 0; i < resultadoCarrito.length; i++) {
        if (resultadoCarrito[i].id == productId) {
            resultadoCarrito.splice(i, 1);
        }
    }
    resultadoCarrito = JSON.stringify(resultadoCarrito);
    localStorage.setItem("carrito", resultadoCarrito);
    productContenedor.remove();

    let getDelete = document.querySelectorAll('.delete');
    if(getDelete.length == 0) {
        let productContainer = document.querySelector("#carrito ul");
        productContainer.innerHTML = `<li class="list-group-item">El carrito de compras esta vacio.</li>`;
    }

    carritoNumeros();
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
carritoNumeros();

let carrito = [];

/*boton comprar*/
let btnCompra = document.querySelectorAll(".btn-compra");

for(let boton of btnCompra){
    boton.addEventListener("click" , agregarCarrito);
    boton.addEventListener("click" , carritoNumeros);
}

/*boton mostrar carrito*/
let botonCarrito = document.getElementById('mostrarCarrito');
botonCarrito.addEventListener("click" , mostrarCarrito);

/*boton borrar*/
document.addEventListener('click',function(e){
    if(e.target && e.target.getAttribute('class') == 'delete'){
        removeItem (e);
     }
 });




