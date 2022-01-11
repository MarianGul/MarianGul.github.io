function checkOut() {
    if (nombre.value === '') {
        formError(nombre);
    } else {
        formCorrecto(nombre);
    }

    if (email.value === '') {
        formError(email);
    } else {
        formCorrecto(email);
    }

    if (telefono.value === '') {
        formError(telefono);
       
    } else {
        formCorrecto(telefono);
    }

    if (direccion.value === '') {
        formError(direccion);
    } else {
        formCorrecto(direccion);
    }

}

function formError (elemento) {
    let errorParent = elemento.parentElement;
    errorParent.classList.add('error');
    let errorContenedor = errorParent.querySelector('.errorContainer');
    errorContenedor.innerText = mensaje;
}

function formCorrecto (elemento) {
    let errorParent = elemento.parentElement;
    errorParent.classList.remove('error');
    let errorContenedor = errorParent.querySelector('.errorContainer');
    errorContenedor.innerText = '';
}

function mostrarCarrito () {
    let carritoItems = localStorage.getItem("carrito");
    carritoItems = JSON.parse(carritoItems);
    let productContainer = document.querySelector("#productosFinales ul");
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
          </li>
            `;
        });
    }

}

function totalCompra () {
    let carritoItems = localStorage.getItem("carrito");
    carritoItems = JSON.parse(carritoItems);
    let suma = carritoItems.map(item => item.precio).reduce((a, b) => a + b, 0);
    let totalCompra = document.querySelector('.total-valor')
    totalCompra.textContent = `$${suma}`;
}

function validar () {
    let formInputs = formCheckout.querySelectorAll('.form-group');
    let resultado = true;
    formInputs.forEach((inputs) => {
        if(inputs.classList.contains('error')) {
            resultado = false;
        }
    });

    return resultado;
}

let nombre = document.getElementById('nombre');
let email = document.getElementById('email');
let telefono = document.getElementById('telefono');
let direccion = document.getElementById('direccion');
let mensaje = 'Campo Obligatorio';
let input = document.querySelectorAll('.form-control');

input.forEach(item => {
    item.addEventListener("keyup", checkOut);
})

let formCheckout = document.getElementById('form-checkout');

formCheckout.addEventListener('submit', (e) => {
    e.preventDefault();
    checkOut();
    if(validar() == true) {
        var modalGracias = document.getElementById('gracias')
        var modal = bootstrap.Modal.getOrCreateInstance(modalGracias) // Returns a Bootstrap modal instance
        modal.show();
    } 

});

let carrito = [];
let directorioImagen = 'imgs/'
mostrarCarrito();
totalCompra();