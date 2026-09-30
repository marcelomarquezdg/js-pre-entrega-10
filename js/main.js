//Inventario inicial
const inventarioInicial = [
    {
        marca: "Fender",
        modelo: "Stratocaster",
        anio: 1996,
        precio: 700,
        id: 102,
        stock: 20
    },
    {
        marca: "Gibson",
        modelo: "Les Paul",
        anio: 1960,
        precio: 1200,
        id: 103,
        stock: 14
    },
    {
        marca: "Ibanez",
        modelo: "AR Standard",
        anio: 2001,
        precio: 650,
        id: 104,
        stock: 0
    },
    {
        marca: "PRS",
        modelo: "Custom 24",
        anio: 2018,
        precio: 1500,
        id: 105,
        stock: 0
    },
    {
        marca: "Epiphone",
        modelo: "Casino",
        anio: 1965,
        precio: 850,
        id: 106,
        stock: 12
    },
    {
        marca: "Fender",
        modelo: "Telecaster",
        anio: 2010,
        precio: 900,
        id: 107,
        stock: 8
    }
];

// Recuperar inventario desde localStorage

const inventarioGuardado = JSON.parse(localStorage.getItem("inventario"));

const inventario = inventarioGuardado ?? inventarioInicial;

if (inventarioGuardado === null) {
    localStorage.setItem("inventario", JSON.stringify(inventarioInicial));
}

//Guitarras disponibles

const guitarrasDisponibles = inventario.filter(guitarra => guitarra.stock > 0);

// Recuperar carrito desde localStorage

const carrito = JSON.parse(localStorage.getItem("carrito")) ?? [];

// Buscar guitarra por marca o modelo

const inputBusqueda = document.getElementById("busqueda");

inputBusqueda.addEventListener("input", () => {

    const textoBusqueda = inputBusqueda.value.toLowerCase();

    const guitarrasFiltradas = guitarrasDisponibles.filter(guitarra =>
        guitarra.marca.toLowerCase().includes(textoBusqueda) ||
        guitarra.modelo.toLowerCase().includes(textoBusqueda)
    );

    imprimirGuitarrasEnHTML(guitarrasFiltradas);
});

// Mostrar guitarras en el HTML

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

// Mostrar guitarras disponibles al cargar la página

imprimirGuitarrasEnHTML(guitarrasDisponibles);

// Pop up en index con setimeout

const popupPromocion = document.getElementById("popup-promocion");
const btnCerrarPopup = document.getElementById("cerrar-popup");

setTimeout(() => {
    popupPromocion.style.display = "flex";
}, 3000);

btnCerrarPopup.addEventListener("click", () => {
    popupPromocion.style.display = "none";
});

