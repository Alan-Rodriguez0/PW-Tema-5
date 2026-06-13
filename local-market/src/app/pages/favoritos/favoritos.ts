import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCard } from '../../components/product-card/product-card';

@Component({
  selector: 'app-favoritos',
  imports: [CommonModule, ProductCard],
  templateUrl: './favoritos.html',
  styleUrl: './favoritos.css',
})
export class Favoritos {
  favoritos = [
    {
      nombre: 'Canasta de frutas',
      vendedor: 'Frutería López',
      precio: 120,
      categoria: 'Alimentos',
      imagen:
        'https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=500',
    },
    {
      nombre: 'Laptop HP',
      vendedor: 'CompuMarket',
      precio: 8500,
      categoria: 'Tecnología',
      imagen:
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500',
    },
  ];
}