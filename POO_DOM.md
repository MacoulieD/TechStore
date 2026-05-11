# POO y DOM en la Tienda Virtual

El proyecto usa Programacion Orientada a Objetos y manipulacion del DOM para funcionar como una tienda virtual interactiva.

## POO aplicada

- `Producto`: representa cada producto con `id`, `nombre`, `precio`, `imagen` y `categoria`.
- `ItemCarrito`: guarda un producto y su cantidad, y calcula su subtotal.
- `Carrito`: agrega, elimina, vacia y renderiza productos; tambien calcula el total.
- `Tienda`: carga productos, filtra por categoria, busca por nombre y envia productos al carrito.
- `UIController`: conecta la logica con la interfaz y coordina el flujo de la aplicacion.

## Manipulacion del DOM

- Se usan `getElementById()` para seleccionar los elementos principales.
- Se usan `addEventListener()` para responder a agregar, eliminar, vaciar, comprar, filtrar y buscar.
- El catalogo se genera desde JavaScript con `createElement()` y contenido dinamico.
- El carrito se vuelve a pintar cada vez que cambia su estado.
- El estado vacio se muestra con un `template`.

## Pasos importantes

1. Se cargan los productos en el catalogo.
2. Se crean objetos con POO.
3. Se renderiza el catalogo en pantalla.
4. El usuario agrega productos al carrito.
5. El carrito actualiza el total y la vista en tiempo real.
6. El usuario puede eliminar, vaciar o comprar.

## Resultado

La tienda cumple con el uso de POO y DOM porque organiza la logica en clases, crea elementos dinamicamente y actualiza la interfaz sin recargar la pagina.
