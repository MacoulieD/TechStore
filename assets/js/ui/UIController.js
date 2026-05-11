export class UIController {
  // Conecta la logica de negocio con los elementos visuales.
  constructor(tienda, elements) {
    this.tienda = tienda;
    this.elements = elements;
  }

  // Flujo de arranque de la interfaz.
  inicializar() {
    this.tienda.cargarProductos();
    this.poblarFiltroCategorias();
    this.renderizarCatalogo(this.tienda.catalogo);
    this.tienda.carrito.renderizar();
    this.registrarEventos();
    this.actualizarEstadoCompra();
  }

  // Crea opciones del select de categoria de forma dinamica.
  poblarFiltroCategorias() {
    const categorias = this.tienda.obtenerCategorias();

    categorias.forEach((categoria) => {
      const option = document.createElement("option");
      option.value = categoria;
      option.textContent = categoria;
      this.elements.filtroCategoria.appendChild(option);
    });
  }

  // Asocia eventos del catalogo, carrito y filtros.
  registrarEventos() {
    // Delegacion de evento para botones "Agregar" del catalogo.
    this.elements.catalogoGrid.addEventListener("click", (event) => {
      const boton = event.target.closest("button[data-add-id]");

      if (!boton) {
        return;
      }

      this.tienda.agregarAlCarrito(boton.dataset.addId, 1);
      this.actualizarEstadoCompra();
    });

    // Delegacion de evento para botones "Eliminar" del carrito.
    this.elements.carritoItems.addEventListener("click", (event) => {
      const boton = event.target.closest("button[data-remove-id]");

      if (!boton) {
        return;
      }

      this.tienda.carrito.eliminarProducto(Number(boton.dataset.removeId));
      this.actualizarEstadoCompra();
    });

    // Limpia todos los items del carrito.
    this.elements.btnVaciar.addEventListener("click", () => {
      this.tienda.carrito.vaciarCarrito();
      this.actualizarEstadoCompra();
    });

    // Confirma la compra, muestra total y vacia el carrito.
    this.elements.btnComprar.addEventListener("click", () => {
      if (this.tienda.carrito.items.length === 0) {
        alert("Tu carrito esta vacio. Agrega productos antes de comprar.");
        return;
      }

      const total = this.tienda.carrito.calcularTotal().toFixed(2);
      alert(`Compra realizada con exito. Total pagado: $${total}`);
      this.tienda.carrito.vaciarCarrito();
      this.actualizarEstadoCompra();
    });

    // Reacciona al cambio de categoria.
    this.elements.filtroCategoria.addEventListener("change", () => {
      this.aplicarFiltros();
    });

    // Reacciona a la escritura en la busqueda.
    this.elements.buscarProducto.addEventListener("input", () => {
      this.aplicarFiltros();
    });
  }

  // Aplica filtros combinados y vuelve a pintar el catalogo.
  aplicarFiltros() {
    const categoria = this.elements.filtroCategoria.value;
    const texto = this.elements.buscarProducto.value;

    const porCategoria = this.tienda.filtrarPorCategoria(categoria);
    const resultado = this.tienda.buscarPorNombre(texto, porCategoria);

    this.renderizarCatalogo(resultado);
  }

  // Renderiza tarjetas del catalogo a partir de una lista de productos.
  renderizarCatalogo(productos) {
    this.elements.catalogoGrid.innerHTML = "";

    productos.forEach((producto) => {
      const card = document.createElement("article");
      card.className = "product-card";
      card.innerHTML = `
        <div class="product-card__media" aria-hidden="true">${producto.imagen}</div>
        <h3 class="product-card__name">${producto.nombre}</h3>
        <p class="product-card__category">${producto.categoria}</p>
        <div class="product-card__bottom">
          <span class="price">$${producto.precio.toFixed(2)}</span>
          <button class="btn btn--add" type="button" data-add-id="${producto.id}">Agregar al carrito</button>
        </div>
      `;
      this.elements.catalogoGrid.appendChild(card);
    });

    // Mensaje vacio cuando no hay resultados de filtro/busqueda.
    if (productos.length === 0) {
      const emptyResults = document.createElement("p");
      emptyResults.className = "carrito__empty";
      emptyResults.textContent = "No hay productos que coincidan con la busqueda actual.";
      this.elements.catalogoGrid.appendChild(emptyResults);
    }
  }

  // Activa o desactiva el boton de compra segun contenido del carrito.
  actualizarEstadoCompra() {
    this.elements.btnComprar.disabled = this.tienda.carrito.items.length === 0;
  }
}
