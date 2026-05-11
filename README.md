# Tienda Virtual TechNova

Aplicacion web de tienda virtual desarrollada con HTML, CSS y JavaScript puro.
El proyecto aplica Programacion Orientada a Objetos (POO), renderizado dinamico del DOM y manejo de eventos en tiempo real.

## Objetivo del proyecto

Construir una experiencia de compra interactiva donde:

- El catalogo se genera desde JavaScript.
- El carrito se actualiza en tiempo real.
- El usuario puede agregar, eliminar, vaciar y comprar productos.
- La interfaz es responsive y visualmente coherente con una tienda de tecnologia.

## Estructura de carpetas

```text
TiendaVirtual/
|- index.html
|- README.md
|- assets/
    |- css/
    |  |- styles.css
    |- js/
         |- main.js
         |- models/
         |  |- Producto.js
         |  |- ItemCarrito.js
         |- services/
         |  |- Carrito.js
         |  |- Tienda.js
         |- ui/
             |- UIController.js
```

## Arquitectura general

El proyecto usa una separacion por capas:

1. Models
    Define estructuras de datos base (Producto, ItemCarrito).
2. Services
    Contiene logica de negocio y estado (Tienda, Carrito).
3. UI
    Maneja renderizado del catalogo y enlace con eventos del DOM (UIController).
4. Entry Point
    main.js instancia objetos y arranca la aplicacion.

## Clases y funciones (detalle)

### 1) Modelo Producto

Archivo: assets/js/models/Producto.js

Responsabilidad:

- Representar un producto del catalogo.

Propiedades:

- id: identificador unico.
- nombre: nombre comercial del producto.
- precio: valor numerico del producto.
- imagen: emoji o URL de imagen.
- categoria: categoria de clasificacion (ej: Computo, Audio, Gaming).

Constructor:

- constructor(id, nombre, precio, imagen, categoria = "General")

### 2) Modelo ItemCarrito

Archivo: assets/js/models/ItemCarrito.js

Responsabilidad:

- Representar una linea dentro del carrito (producto + cantidad).

Propiedades:

- producto: instancia de Producto.
- cantidad: unidades agregadas.

Metodos:

- subtotal(): retorna producto.precio * cantidad.

### 3) Servicio Carrito

Archivo: assets/js/services/Carrito.js

Responsabilidad:

- Gestionar estado del carrito y renderizarlo en el DOM.

Propiedades principales:

- items: arreglo de ItemCarrito.
- itemsContainer: contenedor DOM donde se pintan los items.
- totalElement: nodo DOM donde se muestra el total.
- emptyTemplate: template para estado de carrito vacio.

Metodos:

- agregarProducto(producto, cantidad = 1)
   Si el producto existe, incrementa cantidad; si no existe, agrega nueva linea.
   Al final, llama a renderizar().

- eliminarProducto(id)
   Quita el item por id de producto y vuelve a renderizar.

- calcularTotal()
   Suma subtotales de todos los items.

- vaciarCarrito()
   Limpia el arreglo items y vuelve a renderizar.

- renderizar()
   Pinta dinamicamente el estado actual del carrito:
   - Si esta vacio: muestra template de estado vacio.
   - Si tiene items: crea tarjetas con nombre, cantidad, subtotal y boton Eliminar.
   - Siempre actualiza el total final.

### 4) Servicio Tienda

Archivo: assets/js/services/Tienda.js

Responsabilidad:

- Administrar catalogo y ofrecer filtros/busqueda.
- Delegar la accion de compra parcial al servicio Carrito.

Propiedades:

- catalogo: arreglo de Producto.
- carrito: instancia de Carrito.

Metodos:

- cargarProductos()
   Inicializa el catalogo con productos de tecnologia.

- obtenerCategorias()
   Retorna categorias unicas para poblar el select de filtro.

- filtrarPorCategoria(categoria)
   Retorna productos por categoria, o todo el catalogo si categoria es "todos".

- buscarPorNombre(texto, productosBase)
   Filtra una lista por coincidencia parcial de nombre.

- agregarAlCarrito(idProducto, cantidad = 1)
   Busca un producto por id y lo agrega al carrito si existe.

### 5) Controlador UI

Archivo: assets/js/ui/UIController.js

Responsabilidad:

- Conectar la logica de negocio con la interfaz visual.
- Manejar eventos y actualizaciones de pantalla.

Metodos:

- inicializar()
   Ejecuta el flujo inicial:
   1. cargarProductos
   2. poblarFiltroCategorias
   3. renderizarCatalogo
   4. renderizar carrito
   5. registrar eventos
   6. actualizar estado del boton Comprar

- poblarFiltroCategorias()
   Inserta en el select las categorias unicas del catalogo.

- registrarEventos()
   Asocia listeners para:
   - Agregar producto al carrito.
   - Eliminar producto del carrito.
   - Vaciar carrito.
   - Comprar ahora.
   - Filtro por categoria.
   - Busqueda por texto.

- aplicarFiltros()
   Combina filtro de categoria + busqueda y vuelve a pintar el catalogo.

- renderizarCatalogo(productos)
   Genera las tarjetas de producto dinamicamente.
   Si no hay resultados, muestra mensaje de estado vacio.

- actualizarEstadoCompra()
   Habilita o deshabilita el boton Comprar segun si hay items en carrito.

## Flujo de eventos del DOM

1. Click en "Agregar al carrito"
    UIController capta el click, llama Tienda.agregarAlCarrito y actualiza estado de compra.

2. Click en "Eliminar"
    UIController llama Carrito.eliminarProducto y actualiza boton Comprar.

3. Click en "Vaciar carrito"
    UIController llama Carrito.vaciarCarrito y desactiva boton Comprar.

4. Click en "Comprar ahora"
    - Si el carrito esta vacio: muestra alerta.
    - Si hay items: muestra total pagado, vacia carrito y actualiza estado.

5. Cambio de categoria / escritura en buscador
    UIController ejecuta aplicarFiltros y repinta catalogo.

## Interfaz y estilos

Archivo: assets/css/styles.css

Caracteristicas visuales:

- Variables CSS para paleta y consistencia.
- Layout principal con CSS Grid (catalogo + carrito).
- Tarjetas con estilo moderno y animaciones suaves.
- Botones con variantes:
   - btn--add (agregar)
   - btn--ghost (vaciar)
   - btn--remove (eliminar)
   - btn--buy (comprar)
- Diseno responsive con media queries para tablet y movil.

## Punto de entrada

Archivo: assets/js/main.js

Funcion:

- Obtiene referencias del DOM.
- Instancia Carrito, Tienda y UIController.
- Llama ui.inicializar() para arrancar toda la app.

## Como ejecutar

1. Abre index.html en un navegador moderno.
2. Navega por el catalogo.
3. Agrega productos al carrito.
4. Prueba eliminar, vaciar y comprar.
5. Usa filtro por categoria y buscador por nombre.

## Checklist de requisitos tecnicos

- POO aplicada con clases: Producto, Carrito, Tienda, ItemCarrito, UIController.
- Seleccion de DOM con getElementById y uso de addEventListener.
- Creacion dinamica de elementos para catalogo y carrito.
- Eventos de agregar, eliminar, vaciar y comprar funcionando.
- Interfaz responsive implementada con Grid/Flexbox.

## Mejoras sugeridas

- Persistencia del carrito con localStorage.
- Carga de productos desde JSON externo o API.
- Manejo de stock por producto.
- Toasts en lugar de alert para feedback de compra.
- Pasarela de pago simulada y resumen de orden.

## Estructura actual validada

La estructura del proyecto ya esta depurada y solo conserva los archivos que aportan al funcionamiento real de la tienda. No se mantienen carpetas vacias ni elementos sin uso.
