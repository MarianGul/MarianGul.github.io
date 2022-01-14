//Funciones
function mostrarProductos() {
    let contentedorProductos = document.getElementById('productos-container');
    $.get('productos.json', (respuesta, estado) => {
        if (estado === "success") {
            for (let productos of respuesta) {
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
                <div class="form-cantidad">
                <div class="value-button decrease">-</div>
                <input type="number" class="cantidad number" min="1" value="1" />
                <div class="value-button increase">+</div>
                </div>
                <a class="btn btn-compra btn-sm" data-id="${productos.id}">Comprar</a>
                </div>
                </div>
                `;

                contentedorProductos.appendChild(contenedor);
            }
        }
    })

}

function mostrarFiltro() {

    let active = document.querySelectorAll(".categoria");
    let filtroCategoria;

    for (var i = 0; i < active.length; i++) {
        if (active[i].matches('.active')) {
            filtroCategoria = active[i].dataset.categoria;
        }
    }

    let check = document.querySelectorAll(".form-check-input");
    let filtroSubCategoria;

    for (var i = 0; i < check.length; i++) {
        if (check[i].checked) {
            filtroSubCategoria = check[i].value;
        }
    }

    $.get('productos.json', (respuesta, estado) => {
        if (estado === "success") {
            let contentedorProductos = document.getElementById('productos-container');
            contentedorProductos.innerHTML = '';
            let productosElegidos;
            if (filtroCategoria == 'todos' && filtroSubCategoria == 'todos') {
                productosElegidos = respuesta;

            } else if (filtroCategoria == 'todos') {
                productosElegidos = respuesta.filter(productos => productos.subcategoria == filtroSubCategoria);

            } else if (filtroSubCategoria == 'todos') {
                productosElegidos = respuesta.filter(productos => productos.categoria == filtroCategoria);

            } else {
                productosElegidos = respuesta.filter(productos => productos.categoria == filtroCategoria);
                productosElegidos = productosElegidos.filter(productos => productos.subcategoria == filtroSubCategoria);
            }

            for (let productos of productosElegidos) {
                let contenedor = document.createElement('div');
                contenedor.classList.add('product', 'col-lg-4', 'col-md-6', 'mb-3');
                contenedor.innerHTML = `
                <div class="card">
                <div class="card-image"><img src="${directorioImagen}${productos.imagen}" class="card-img-top" alt="${productos.nombre}" loading="lazy"></div>
                <div class="card-body">
                <h6 class="card-title">${productos.nombre}</h6>
                <small>${productos.descripcion}</small>
                <h4 class="precio">$${productos.precio}</h4>
                </div>
                <div class="card-footer d-flex justify-content-between">
                <div class="form-cantidad">
                <div class="value-button decrease">-</div>
                <input type="number" class="cantidad number" min="1" value="1" />
                <div class="value-button increase">+</div>
                </div>
                <a class="btn btn-compra btn-sm" data-id="${productos.id}">Comprar</a>
                </div>
                </div>
                `;

                contentedorProductos.appendChild(contenedor);
            }
        }
    })

}


function agregarCarrito(e) {
    let productoId = e.target.dataset.id;
    let target = e.target;
    let targetContenedor = target.parentNode;

    $.get('productos.json', (respuesta, estado) => {
        if (estado === "success") {
            let cantidad = targetContenedor.querySelector(".cantidad").value;
            let productoElegido = respuesta.filter(productos => productos.id == productoId);
            for (let productos of productoElegido) {
                let producto = {
                    id: productos.id,
                    nombre: productos.nombre,
                    descripcion: productos.descripcion,
                    imagen: productos.imagen,
                    precio: productos.precio,
                    cantidad: parseInt(cantidad)
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
                        id: productos.id,
                        nombre: productos.nombre,
                        descripcion: productos.descripcion,
                        imagen: productos.imagen,
                        precio: productos.precio * producto.cantidad,
                        cantidad: parseInt(cantidad)
                    };
                    productosLocales.push(producto);
                }
                localStorage.setItem('carrito', JSON.stringify(productosLocales));
            }
            carritoNumeros();
        }
    });
}

function mostrarCarrito () {
    let carritoItems = localStorage.getItem("carrito");
    carritoItems = JSON.parse(carritoItems);
    let productContainer = document.querySelector("#carrito ul");
    let footerCarrito = document.querySelector('.footer-carrito');
    productContainer.innerHTML = '';

    if(carritoItems && productContainer) {
        Object.values(carritoItems).map(item => {
            productContainer.innerHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
            <div class="carrito-img">
            <span class="badge bg-primary rounded-pill">${item.cantidad}</span>
            <img src="${directorioImagen}${item.imagen}" width="80">
            </div>
            <div class="carrito-data">
              <p class="carrito-nombre">${item.nombre}</p>
              <p class="carrito-descripcion">${item.descripcion}</p>
            </div>
            <div class="carrito-precio">
            $${item.precio}
            </div>
            <i class="delete" data-id="${item.id}"></i>
          </li>
            `;
        });

        footerCarrito.style.display = 'block';
    }

    if(carritoItems === null || carritoItems.length === 0) {
        footerCarrito.style.display = 'none';
        productContainer.innerHTML += `<li class="list-group-item">El carrito de compras esta vacio.</li>`;
    }

}

function totalCompra () {
    let carritoItems = localStorage.getItem("carrito");
    carritoItems = JSON.parse(carritoItems);
    if(carritoItems !== null) {
        let suma = carritoItems.map(item => item.precio).reduce((a, b) => a + b, 0);
        let totalCompra = document.querySelector('.total-valor')
        totalCompra.textContent = `$${suma}`;
    }

}

function carritoNumeros () {
    let carritoItems = localStorage.getItem("carrito");
    carritoItems = JSON.parse(carritoItems);
    let numeroCarrito = document.getElementById('total');

    if (carritoItems === null || carritoItems.length === 0) {
        numeroCarrito.style.display = 'none';
    } else {
        numeroCarrito.style.display = 'block';
        let suma = carritoItems.map(item => item.cantidad).reduce((a, b) => a + b, 0);
        numeroCarrito.textContent = suma;
    }
}

function borrarItem (e) {
    let carritoItems = localStorage.getItem("carrito");
    let resultadoCarrito = JSON.parse(carritoItems);
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
        let footerCarrito = document.querySelector('.footer-carrito');
        footerCarrito.style.display = 'none';
    }

    carritoNumeros();
}

function productoSeleccionado (e) {
    $('#productoComprado').fadeIn('slow');

    $('#btn-close-producto').click(function() {
        $('#productoComprado').fadeOut('slow');
    });
    let value = e.target.parentNode.querySelector('.cantidad').value;

    setTimeout(function() { 
        $('#productoComprado').fadeOut('slow');
    }, 5000);

    $.get('productos.json', (respuesta, estado) => {
        if (estado === "success") {
        let productoId = e.target.dataset.id;
        let productoElegido = respuesta.filter(productos => productos.id == productoId);
        let productSelectContainer = document.querySelector(".productoComprado-content");
        productSelectContainer.innerHTML = '';

        Object.values(productoElegido).map(item => {
            productSelectContainer.innerHTML += `
            <div class="d-flex justify-content-between align-items-center">
            <div class="carrito-img">
            <span class="badge bg-primary rounded-pill">${value}</span>
            <img src="${directorioImagen}${item.imagen}" width="80">
            </div>
            <div class="carrito-data">
            <p class="carrito-nombre">${item.nombre}</p>
            <p class="carrito-descripcion">${item.descripcion}</p>
            </div>
            <div class="carrito-precio">
            $${item.precio * value}
            </div>
            </div>
            `;
        });

        $('.productoComprado-footer').fadeOut().fadeIn().css('color','#379339');
    }
    });
}

function sumarCantidad(e) {
    let cantidad = e.target.parentNode.querySelector('.cantidad').value;
    cantidad++;
    e.target.parentNode.querySelector('.cantidad').value = cantidad;
  }
  
function restarCantidad(e) {
    let cantidad = e.target.parentNode.querySelector('.cantidad').value;
    cantidad--;
    cantidad < 1 ? cantidad = 1 : '';
    e.target.parentNode.querySelector('.cantidad').value = cantidad;
}



//Botones

let botonesCategoria = document.querySelectorAll(".categoria");

for (let i = 0; i < botonesCategoria.length; i++) {
    botonesCategoria[i].addEventListener("click", function () {
        var currentButton = document.getElementsByClassName("active");
        currentButton[0].className = currentButton[0].className.replace(" active", "");
        this.className += " active";
    });
    botonesCategoria[i].addEventListener("click", function (e) {
        e.preventDefault();
        mostrarFiltro();
    });

}

document.querySelectorAll('.form-check-input').forEach(item => {
    item.addEventListener("click", mostrarFiltro);
})

let containerProducto = document.getElementById('productos-container');
containerProducto.addEventListener('click', function (e) {
    if (e.target.classList.contains('increase')) {
        sumarCantidad(e);
    }

    if (e.target.classList.contains('decrease')) {
        restarCantidad(e);
    }

    if (e.target.classList.contains('btn-compra')) {
        agregarCarrito(e);
        productoSeleccionado(e);

    }
});

let botonCarrito = document.getElementById('mostrarCarrito');

botonCarrito.addEventListener('click', function () {
    mostrarCarrito();
    totalCompra();

});


let containerCarrito = document.getElementById('contentCarrito');

containerCarrito.addEventListener('click', function (e) {
    if (e.target.classList.contains('delete')) {
        borrarItem(e);
        totalCompra();
    }
});

 let directorioImagen = 'imgs/'
 mostrarProductos();
 carritoNumeros();
 $('#productoComprado').hide();

