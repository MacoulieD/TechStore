import { ItemCarrito } from "../models/ItemCarrito.js";

export class Carrito {
  // Mantiene estado del carrito y actualiza su vista en el DOM.
  constructor(itemsContainer, totalElement, emptyTemplate) {
    this.items = [];
    this.itemsContainer = itemsContainer;
    this.totalElement = totalElement;
    this.emptyTemplate = emptyTemplate;
  }

  // Agrega un producto nuevo o incrementa cantidad si ya existe.
  agregarProducto(producto, cantidad = 1) {
    const existente = this.items.find((item) => item.producto.id === producto.id);

    if (existente) {
      existente.cantidad += cantidad;
    } else {
      this.items.push(new ItemCarrito(producto, cantidad));
    }

    this.renderizar();
  }

  // Elimina por id y vuelve a pintar el carrito.
  eliminarProducto(id) {
    this.items = this.items.filter((item) => item.producto.id !== id);
    this.renderizar();
  }

  // Calcula el total acumulado de todos los items.
  calcularTotal() {
    return this.items.reduce((acc, item) => acc + item.subtotal(), 0);
  }

  // Reinicia el carrito completo.
  vaciarCarrito() {
    this.items = [];
    this.renderizar();
  }

  // Renderizado dinamico del carrito usando creacion de nodos.
  renderizar() {
    this.itemsContainer.innerHTML = "";

    if (this.items.length === 0) {
      // Si no hay items, muestra el estado vacio desde el template.
      const emptyNode = this.emptyTemplate.content.cloneNode(true);
      this.itemsContainer.appendChild(emptyNode);
    } else {
      // Si hay items, crea una tarjeta por producto del carrito.
      this.items.forEach((item) => {
        const row = document.createElement("article");
        row.className = "carrito-item";
        row.innerHTML = `
          <div class="carrito-item__row">
            <span class="carrito-item__name">${item.producto.nombre}</span>
            <button class="btn btn--remove" data-remove-id="${item.producto.id}" type="button">Eliminar</button>
          </div>
          <div class="carrito-item__row carrito-item__meta">
            <span>Cantidad: ${item.cantidad}</span>
            <span>Subtotal: $${item.subtotal().toFixed(2)}</span>
          </div>
        `;

        this.itemsContainer.appendChild(row);
      });
    }

    // Actualiza el total visible al final de cada cambio.
    this.totalElement.textContent = `$${this.calcularTotal().toFixed(2)}`;
  }
}
