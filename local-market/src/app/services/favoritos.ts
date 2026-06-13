import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoritosService {

  cantidad = signal(0);

  agregarFavorito() {
    this.cantidad.update(valor => valor + 1);
  }

}