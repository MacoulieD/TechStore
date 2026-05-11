export class Producto {
  // Modelo base del catalogo de la tienda.
  constructor(id, nombre, precio, imagen, categoria = "General") {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.imagen = imagen;
    this.categoria = categoria;
  }
}
