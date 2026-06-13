import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideHeart, LucideShoppingCart } from '@lucide/angular';
import { CarritoService } from '../../services/carrito';
import { FavoritosService } from '../../services/favoritos';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, LucideHeart, LucideShoppingCart],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  constructor(
  public carritoService: CarritoService,
  public favoritosService: FavoritosService
) {}
}