import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  cantidad = signal(0);

  agregarProducto() {
    this.cantidad.update(valor => valor + 1);
  }
}