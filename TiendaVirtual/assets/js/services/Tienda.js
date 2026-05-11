import { Producto } from "../models/Producto.js";

export class Tienda {
  // Administra el catalogo y delega operaciones de compra al carrito.
  constructor(carrito) {
    this.catalogo = [];
    this.carrito = carrito;
  }

  // Carga inicial de productos (simula una fuente de datos).
  cargarProductos() {
    this.catalogo = [
      new Producto(1, "Laptop Ultra 14", 1299.99, "💻", "Computo"),
      new Producto(2, "Monitor Curvo 27\"", 389.5, "🖥️", "Computo"),
      new Producto(3, "Teclado Mecanico RGB", 119.99, "⌨️", "Gaming"),
      new Producto(4, "Mouse Inalambrico Pro", 69.9, "🖱️", "Gaming"),
      new Producto(5, "Auriculares Noise Cancel", 249.0, "🎧", "Audio"),
      new Producto(6, "Smartwatch Neo", 189.0, "⌚", "Wearables"),
      new Producto(7, "Tablet Sketch 11", 549.0, "📱", "Movil"),
      new Producto(8, "Camara 4K Stream", 159.0, "📷", "Creacion")
    ];
  }

  // Obtiene categorias unicas para construir el filtro en la UI.
  obtenerCategorias() {
    const categorias = this.catalogo.map((producto) => producto.categoria);
    return [...new Set(categorias)];
  }

  // Filtra el catalogo por categoria seleccionada.
  filtrarPorCategoria(categoria) {
    if (!categoria || categoria === "todos") {
      return this.catalogo;
    }

    return this.catalogo.filter((producto) => producto.categoria === categoria);
  }

  // Filtra por texto usando el nombre del producto.
  buscarPorNombre(texto, productosBase = this.catalogo) {
    const termino = texto.trim().toLowerCase();

    if (!termino) {
      return productosBase;
    }

    return productosBase.filter((producto) => producto.nombre.toLowerCase().includes(termino));
  }

  // Busca producto por id y lo envia al carrito.
  agregarAlCarrito(idProducto, cantidad = 1) {
    const producto = this.catalogo.find((item) => item.id === Number(idProducto));

    if (producto) {
      this.carrito.agregarProducto(producto, cantidad);
    }
  }
}
