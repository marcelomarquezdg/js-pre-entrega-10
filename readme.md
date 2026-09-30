# Tienda de guitarras

Simulador de una tienda de guitarras desarrollado en JavaScript.

## Funcionalidades

- Visualización de guitarras disponibles
- Búsqueda por marca o modelo
- Carrito de compras
- Agregar y eliminar productos del carrito
- Vaciar carrito
- Gestión de inventario
- Persistencia de datos con localStorage
- Carga inicial del inventario desde un archivo JSON local con fetch
- Uso de async/await para la carga de datos
- Manejo de errores con try-catch-finally
- Notificaciones con Toastify
- Confirmaciones con SweetAlert2
- Popup promocional con setTimeout

## Páginas

- `index.html`: tienda principal
- `pages/carrito.html`: carrito de compras
- `pages/gestion.html`: gestión del inventario

## Datos

El inventario inicial se encuentra en:

- `data/guitarras.json`

Los cambios realizados desde la gestión se guardan en `localStorage`.

## Cómo ejecutar el proyecto

Se recomienda utilizar un servidor local, por ejemplo Live Server desde Visual Studio Code, ya que el proyecto utiliza `fetch` para cargar el archivo JSON local.