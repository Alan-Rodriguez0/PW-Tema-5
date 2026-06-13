import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mis-pedidos',
  imports: [CommonModule],
  templateUrl: './mis-pedidos.html',
  styleUrl: './mis-pedidos.css',
})
export class MisPedidos {
  pedidos = [
    {
      id: 1,
      producto: 'Canasta de frutas',
      fecha: '15 Septiembre 2026',
      total: 120,
      estado: 'Entregado',
    },
    {
      id: 2,
      producto: 'Audífonos Bluetooth',
      fecha: '18 Septiembre 2026',
      total: 450,
      estado: 'En camino',
    },
    {
      id: 3,
      producto: 'Laptop HP',
      fecha: '20 Septiembre 2026',
      total: 8500,
      estado: 'Procesando',
    },
  ];
}