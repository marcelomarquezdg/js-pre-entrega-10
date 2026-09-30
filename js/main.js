//Obtener inventario desde localStorage o JSON

async function obtenerInventario() {

    const mensaje = document.getElementById("mensaje");
    mensaje.textContent = "Cargando guitarras...";

    try {
        const inventarioGuardado = localStorage.getItem("inventario");

        if (inventarioGuardado) {
            return JSON.parse(inventarioGuardado);
        }

        const respuesta = await fetch("./data/guitarras.json");

        if (!respuesta.ok) {
            throw new Error("No se pudo cargar el inventario");
        }

        const datos = await respuesta.json();

        localStorage.setItem("inventario", JSON.stringify(datos));

        return datos;

    } catch (error) {
        console.error("Error al obtener el inventario");

        return [];

    } finally {
        mensaje.textContent = "";
    }
}


const carrito = JSON.parse(localStorage.getItem("carrito")) ?? [];


function imprimirGuitarrasEnHTML(lista) {

    const contenedorGuitarras = document.getElementById("contenedor-guitarras");

    contenedorGuitarras.innerHTML = "";

    lista.forEach(guitarra => {

        const { marca, modelo, anio, precio, stock } = guitarra;

        const card = document.createElement("article");

        card.classList.add("card");

        card.innerHTML = `
            <p>Marca: ${marca}</p>
            <h3>Modelo: ${modelo}</h3>
            <p>Año: ${anio}</p>
            <p>Precio: $${precio}</p>
            <p>Stock: ${stock}</p>

            <button class="card-boton">
                Agregar al carrito
            </button>
        `;

        contenedorGuitarras.appendChild(card);

        const btnAgregar = card.querySelector(".card-boton");

        btnAgregar.addEventListener("click", () => {

            carrito.push(guitarra);

            localStorage.setItem("carrito", JSON.stringify(carrito));

            const mensaje = document.getElementById("mensaje");

            mensaje.textContent = "Se agregó " + marca + " " + modelo + " al carrito.";
        });
    });
}

// Iniciar tienda

async function iniciarTienda() {

    const inventario = await obtenerInventario();

    const guitarrasDisponibles = inventario.filter(
        guitarra => guitarra.stock > 0
    );

    imprimirGuitarrasEnHTML(guitarrasDisponibles);

    const inputBusqueda = document.getElementById("busqueda");

    inputBusqueda.addEventListener("input", () => {

        const textoBusqueda = inputBusqueda.value.toLowerCase();

        const guitarrasFiltradas = guitarrasDisponibles.filter(guitarra =>
            guitarra.marca.toLowerCase().includes(textoBusqueda) ||
            guitarra.modelo.toLowerCase().includes(textoBusqueda)
        );

        imprimirGuitarrasEnHTML(guitarrasFiltradas);
    });
}

iniciarTienda();

// Pop up en index con setimeout

const popupPromocion = document.getElementById("popup-promocion");
const btnCerrarPopup = document.getElementById("cerrar-popup");

setTimeout(() => {
    popupPromocion.style.display = "flex";
}, 3000);

btnCerrarPopup.addEventListener("click", () => {
    popupPromocion.style.display = "none";
});

