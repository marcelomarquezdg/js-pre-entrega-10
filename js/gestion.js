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

//Obtener inventario desde localStorage o JSON

async function obtenerInventario() {

    const mensaje = document.getElementById("mensaje");
    mensaje.textContent = "Cargando guitarras...";

    try {
        const inventarioGuardado = localStorage.getItem("inventario");

        if (inventarioGuardado) {
            return JSON.parse(inventarioGuardado);
        }

        const respuesta = await fetch("../data/guitarras.json");

        if (!respuesta.ok) {
            throw new Error("No se pudo cargar el inventario");
        }

        const datos = await respuesta.json();

        localStorage.setItem("inventario", JSON.stringify(datos));

        return datos;

    } catch (error) {
        console.error("Error al obtener el inventario");

        Toastify({
            text: "No se pudo cargar el inventario.",
            duration: 3000,
            gravity: "top",
            position: "right",
            close: true,
            style: {
                background: "#b71c1c"
            }
        }).showToast();

        return [];

    } finally {
        mensaje.textContent = "";
    }
}

let inventario = [];
let siguienteId;

// Guardar inventario en localStorage

function guardarInventario() {
    localStorage.setItem("inventario", JSON.stringify(inventario));
}

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

        //Validacion

        if (
            inputMarca.trim() === "" ||
            inputModelo.trim() === "" ||
            inputAnio <= 0 ||
            inputPrecio <= 0 ||
            inputStock < 0
        ) {
            Toastify({
                text: "Completá correctamente todos los campos.",
                duration: 3000,
                gravity: "top",
                position: "right",
                close: true,
                style: {
                    background: "#b71c1c"
                }
            }).showToast();
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

        Toastify({
            text: "Se agregó " + inputMarca + " " + inputModelo + " correctamente.",
            duration: 3000,
            gravity: "top",
            position: "right",
            close: true,
            style: {
                background: "#18a81f"
            }
        }).showToast();


        formParaGuitarra.reset();
    });
}

// Iniciar gestión de inventario

async function iniciarGestion() {

    inventario = await obtenerInventario();

    siguienteId = 108;

    for (let i = 0; i < inventario.length; i++) {
        if (inventario[i].id >= siguienteId) {
            siguienteId = inventario[i].id + 1;
        }
    }

    imprimirGuitarrasEnHTML(inventario);

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
}

iniciarGestion();

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

            Toastify({
                text: "Se eliminó " + guitarra.marca + " " + guitarra.modelo + " correctamente.",
                duration: 3000,
                gravity: "top",
                position: "right",
                close: true,
                style: {
                    background: "#e65100"
                }
            }).showToast();

            imprimirGuitarrasEnHTML(inventario);
        });
    });
}


