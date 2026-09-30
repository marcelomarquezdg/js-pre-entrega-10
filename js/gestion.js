class Guitarra {
    constructor(marca, modelo, anio, precio, id, stock) {
        this.marca = marca;
        this.modelo = modelo;
        this.anio = anio;
        this.precio = precio;
        this.id = id;
        this.stock = stock;
    }

    aplicarDescuento(porcentaje) {
        this.precio = this.precio * (1 - porcentaje / 100);
    }
}

// Guitarras precargadas

const guitarra1 = new Guitarra("Fender", "Stratocaster", 1996, 700, 102, 20);
const guitarra2 = new Guitarra("Gibson", "Les Paul", 1960, 1200, 103, 14);
const guitarra3 = new Guitarra("Ibanez", "AR Standard", 2001, 650, 104, 0);
const guitarra4 = new Guitarra("PRS", "Custom 24", 2018, 1500, 105, 0);
const guitarra5 = new Guitarra("Epiphone", "Casino", 1965, 850, 106, 12);
const guitarra6 = new Guitarra("Fender", "Telecaster", 2010, 900, 107, 8);

const inventarioInicial = [
    guitarra1,
    guitarra2,
    guitarra3,
    guitarra4,
    guitarra5,
    guitarra6,
];

// Recuperar inventario desde localStorage

const inventarioGuardado = JSON.parse(localStorage.getItem("inventario"));

let inventario = inventarioGuardado ?? inventarioInicial;

if (inventarioGuardado === null) {
    localStorage.setItem("inventario", JSON.stringify(inventarioInicial));
}

// Guardar inventario en localStorage

function guardarInventario() {
    localStorage.setItem("inventario", JSON.stringify(inventario));
}

// Id para nuevas guitarras

let siguienteId = 108;

for (let i = 0; i < inventario.length; i++) {
    if (inventario[i].id >= siguienteId) {
        siguienteId = inventario[i].id + 1;
    }
}


// Mostrar guitarras en el HTML

function imprimirGuitarrasEnHTML(lista) {

    const contenedorGuitarras = document.getElementById("contenedor-guitarras");

    contenedorGuitarras.innerHTML = "";

    lista.forEach(guitarra => {

        const { id, marca, modelo, anio, precio, stock } = guitarra;

        const card = document.createElement("article");

        card.classList.add("card");

        card.innerHTML = `
            <p>ID: ${id}</p>
            <p>Marca: ${marca}</p>
            <h3>Modelo: ${modelo}</h3>
            <p>Año de fabricación: ${anio}</p>
            <p>Precio: $${precio}</p>
            <p>Stock: ${stock}</p>

            <button class="card-boton">
                Eliminar guitarra
            </button>
        `;

        contenedorGuitarras.appendChild(card);

        // Boton eliminar guitarra

        const btnEliminar = card.querySelector(".card-boton");
        btnEliminar.addEventListener("click", () => {

            const indice = inventario.indexOf(guitarra);

            inventario.splice(indice, 1);

            guardarInventario();

            const mensaje = document.getElementById("mensaje");

            mensaje.textContent =
                "Se eliminó " + guitarra.marca + " " + guitarra.modelo + " correctamente.";

            imprimirGuitarrasEnHTML(inventario);
        });
    });
}

// Mostrar el inventario al cargar la pagina

imprimirGuitarrasEnHTML(inventario);

// Agregar una nueva guitarra desde el formulario

function obtenerGuitarraDelForm() {

    const formParaGuitarra = document.getElementById("form-agregar-guitarra");

    formParaGuitarra.addEventListener("submit", (e) => {

        e.preventDefault();

        const inputMarca = document.getElementById("input-marca").value;
        const inputModelo = document.getElementById("input-modelo").value;

        const inputAnio = Number(
            document.getElementById("input-anio").value
        );

        const inputPrecio = Number(
            document.getElementById("input-precio").value
        );

        const inputStock = Number(
            document.getElementById("input-stock").value
        );

        const mensaje = document.getElementById("mensaje");

        //Validacion

        if (
            inputMarca.trim() === "" ||
            inputModelo.trim() === "" ||
            inputAnio <= 0 ||
            inputPrecio <= 0 ||
            inputStock < 0
        ) {
            mensaje.textContent = "Completá correctamente todos los campos.";
            return;
        }

        //Creacion de nueva guitarra

        const nuevaGuitarra = new Guitarra(
            inputMarca,
            inputModelo,
            inputAnio,
            inputPrecio,
            siguienteId,
            inputStock
        );

        inventario.push(nuevaGuitarra);

        guardarInventario();

        siguienteId++;

        imprimirGuitarrasEnHTML(inventario);

        mensaje.textContent =
            "Se agregó " + inputMarca + " " + inputModelo + " correctamente.";


        formParaGuitarra.reset();
    });
}

obtenerGuitarraDelForm();

// Buscar guitarra por marca o modelo

const inputBusqueda = document.getElementById("busqueda");

inputBusqueda.addEventListener("input", () => {

    const textoBusqueda = inputBusqueda.value.toLowerCase();

    const guitarrasFiltradas = inventario.filter(guitarra =>
        guitarra.marca.toLowerCase().includes(textoBusqueda) ||
        guitarra.modelo.toLowerCase().includes(textoBusqueda)
    );

    imprimirGuitarrasEnHTML(guitarrasFiltradas);
});