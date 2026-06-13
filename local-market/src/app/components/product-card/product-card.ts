import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  @Input() producto: any;
  @Output() agregar = new EventEmitter<any>();
  @Output() favoritoAgregado = new EventEmitter<void>();

  favorito = false;

  agregarAlCarrito() {
    this.agregar.emit(this.producto);
  }

  toggleFavorito() {
  this.favorito = !this.favorito;

  if (this.favorito) {
    this.favoritoAgregado.emit();
  }
}
}
