//Recuperar carrito desde localStorage e implementar try/catch/fianlly

function obtenerCarritoDelStorage() {
    try {
        const carritoGuardado = localStorage.getItem("carrito");

        return carritoGuardado
            ? JSON.parse(carritoGuardado)
            : [];

    } catch (error) {
        console.error("No se pudieron obtener los datos del carrito");

        return [];

    } finally {
        console.log("Fin del bloque try-catch");
    }
}

const carrito = obtenerCarritoDelStorage();

//Calcular total del carrito

function calcularTotal() {

    const total = carrito.reduce((acumulador, guitarra) => acumulador + guitarra.precio, 0);

    const totalCarrito = document.getElementById("total-carrito");

    totalCarrito.textContent =
    carrito.length > 0
        ? "Total: $" + total
        : "El carrito está vacío";
}

// Mostrar carrito en el HTML

function imprimirCarritoEnHTML(lista) {

    const contenedorCarrito = document.getElementById("contenedor-carrito");

    contenedorCarrito.innerHTML = "";

    lista.forEach(guitarra => {

        const { marca, modelo, anio, precio } = guitarra;

        const card = document.createElement("article");

        card.classList.add("card");

        card.innerHTML = `
            <p>Marca: ${marca}</p>
            <h3>Modelo: ${modelo}</h3>
            <p>Año: ${anio}</p>
            <p>Precio: $${precio}</p>
            <button class="card-boton">
                Eliminar del carrito
            </button>
        `;

        contenedorCarrito.appendChild(card);

        const btnEliminar = card.querySelector(".card-boton");

        btnEliminar.addEventListener("click", () => {

            const indice = carrito.indexOf(guitarra);

            carrito.splice(indice, 1);

            localStorage.setItem("carrito", JSON.stringify(carrito));

            imprimirCarritoEnHTML(carrito);
            calcularTotal();
        });
    });
}

// Mostrar carrito al cargar la página

imprimirCarritoEnHTML(carrito);
calcularTotal();

//Vaciar carrito

const btnVaciarCarrito = document.getElementById("vaciar-carrito");

btnVaciarCarrito.addEventListener("click", () => {

    carrito.length = 0;

    localStorage.setItem("carrito", JSON.stringify(carrito));

    imprimirCarritoEnHTML(carrito);
    calcularTotal();

    const mensaje = document.getElementById("mensaje");

    mensaje.textContent = "El carrito se vació correctamente.";
});
