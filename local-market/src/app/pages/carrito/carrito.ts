import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { supabase } from '../../supabase/supabase';

@Component({
  selector: 'app-carrito',
  imports: [CommonModule, RouterLink],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',
})
export class Carrito {
  productos: any[] = [];

  constructor(private cdr: ChangeDetectorRef) {
    this.obtenerCarrito();
  }

  async obtenerCarrito() {
    const { data: sessionData } = await supabase.auth.getSession();
    const user = sessionData.session?.user;

    if (!user) return;

    const { data, error } = await supabase
      .from('carrito')
      .select('*')
      .eq('auth_id', user.id);

    if (error) {
      console.log(error);
      return;
    }

    this.productos = data;
    this.cdr.detectChanges();
  }

  async aumentar(producto: any) {
    producto.cantidad++;

    await supabase
      .from('carrito')
      .update({ cantidad: producto.cantidad })
      .eq('id', producto.id);

    this.cdr.detectChanges();
  }

  async disminuir(producto: any) {
    if (producto.cantidad <= 1) return;

    producto.cantidad--;

    await supabase
      .from('carrito')
      .update({ cantidad: producto.cantidad })
      .eq('id', producto.id);

    this.cdr.detectChanges();
  }

  async eliminar(producto: any) {
    const { error } = await supabase
      .from('carrito')
      .delete()
      .eq('id', producto.id);

    if (error) {
      console.log(error);
      return;
    }

    this.productos = this.productos.filter((p) => p.id !== producto.id);
    this.cdr.detectChanges();
  }

  get subtotal() {
    return this.productos.reduce(
      (total, producto) => total + producto.precio * producto.cantidad,
      0
    );
  }

  get envio() {
    return this.productos.length > 0 ? 30 : 0;
  }

  get total() {
    return this.subtotal + this.envio;
  }
}
