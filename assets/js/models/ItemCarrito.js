export class ItemCarrito {
  // Representa una linea del carrito: producto + cantidad.
  constructor(producto, cantidad = 1) {
    this.producto = producto;
    this.cantidad = cantidad;
  }

  // Retorna el total parcial del item.
  subtotal() {
    return this.producto.precio * this.cantidad;
  }
}
