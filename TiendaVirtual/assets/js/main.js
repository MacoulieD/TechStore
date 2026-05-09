import { Carrito } from "./services/Carrito.js";
import { Tienda } from "./services/Tienda.js";
import { UIController } from "./ui/UIController.js";

// Referencias a elementos del DOM que usara toda la aplicacion.
const elements = {
  catalogoGrid: document.getElementById("catalogo-grid"),
  filtroCategoria: document.getElementById("filtro-categoria"),
  buscarProducto: document.getElementById("buscar-producto"),
  carritoItems: document.getElementById("carrito-items"),
  carritoTotal: document.getElementById("carrito-total"),
  btnVaciar: document.getElementById("btn-vaciar"),
  btnComprar: document.getElementById("btn-comprar"),
  emptyCartTemplate: document.getElementById("empty-cart-template")
};

// Se crean las instancias principales siguiendo arquitectura POO.
const carrito = new Carrito(elements.carritoItems, elements.carritoTotal, elements.emptyCartTemplate);
const tienda = new Tienda(carrito);
const ui = new UIController(tienda, elements);

// Punto de entrada: carga datos, pinta interfaz y registra eventos.
ui.inicializar();
