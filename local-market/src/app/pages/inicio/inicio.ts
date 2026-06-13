import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Navbar } from '../../components/navbar/navbar';
import { Footer } from '../../components/footer/footer';
import { ProductCard } from '../../components/product-card/product-card';
import { Toast } from '../../components/toast/toast';
import { CarritoService } from '../../services/carrito';
import { FavoritosService } from '../../services/favoritos';

@Component({
  selector: 'app-inicio',
  imports: [CommonModule, RouterLink, Navbar, Footer, ProductCard, Toast],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio {
  slideActual = 0;
  cantidadCarrito = 0;
mostrarToast = false;
mensajeToast = '';

productosDestacados = [
  {
    nombre: 'Canasta de frutas',
    vendedor: 'Frutería López',
    precio: 120,
    categoria: 'Alimentos',
    imagen: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=500',
  },
  {
    nombre: 'Camisa de lino',
    vendedor: 'Moda Local',
    precio: 280,
    categoria: 'Ropa',
    imagen: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=500',
  },
  {
    nombre: 'Audífonos Bluetooth',
    vendedor: 'TecnoShop',
    precio: 450,
    categoria: 'Tecnología',
    imagen: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
  },
  {
    nombre: 'Maceta artesanal',
    vendedor: 'Artesanías del Pueblo',
    precio: 150,
    categoria: 'Hogar',
    imagen: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500',
  },
];

categoriaSeleccionada = 'Todos';

get productosFiltradosInicio() {
  return this.productosDestacados.filter((producto) => {
    return (
      this.categoriaSeleccionada === 'Todos' ||
      producto.categoria === this.categoriaSeleccionada
    );
  });
}

filtrarCategoria(categoria: string) {
  this.categoriaSeleccionada = categoria;
}



agregarCarrito() {
  this.carritoService.agregarProducto();

  this.mensajeToast = 'Producto agregado al carrito';
  this.mostrarToast = true;

  setTimeout(() => {
    this.mostrarToast = false;
  }, 2500);
}

agregarFavorito() {
  this.favoritosService.agregarFavorito();

  this.mensajeToast = 'Producto agregado a favoritos';
  this.mostrarToast = true;

  setTimeout(() => {
    this.mostrarToast = false;
  }, 2500);
}

  slides = [
    {
      etiqueta: 'OFERTA ESPECIAL',
      titulo: 'Frutas y verduras frescas',
      texto: 'Hasta 20% de descuento en productos locales.',
      imagen: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=900',
    },
    {
      etiqueta: 'PRODUCTOS LOCALES',
      titulo: 'Compra cerca de tu comunidad',
      texto: 'Apoya a pequeños vendedores y negocios locales.',
      imagen: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=900',
    },
    {
      etiqueta: 'ARTESANÍAS',
      titulo: 'Hecho por manos locales',
      texto: 'Encuentra productos únicos de vendedores de tu zona.',
      imagen: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=900',
    },
    {
      etiqueta: 'MODA LOCAL',
      titulo: 'Ropa y accesorios',
      texto: 'Descubre prendas y accesorios de vendedores cercanos.',
      imagen: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=900',
    },
    {
      etiqueta: 'HOGAR',
      titulo: 'Productos para tu casa',
      texto: 'Encuentra artículos útiles para tu hogar.',
      imagen: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900',
    },
  ];

  constructor(
  private carritoService: CarritoService,
  private favoritosService: FavoritosService
) {
  setInterval(() => {
    this.siguienteSlide();
  }, 5000);
}

  siguienteSlide() {
    this.slideActual = (this.slideActual + 1) % this.slides.length;
  }

  anteriorSlide() {
    this.slideActual =
      this.slideActual === 0 ? this.slides.length - 1 : this.slideActual - 1;
  }

  irSlide(index: number) {
    this.slideActual = index;
  }
}
