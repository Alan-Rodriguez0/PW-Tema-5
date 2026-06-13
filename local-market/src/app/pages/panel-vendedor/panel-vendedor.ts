import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { supabase } from '../../supabase/supabase';
import { LucideImage } from '@lucide/angular';

@Component({
  selector: 'app-panel-vendedor',
  imports: [CommonModule, FormsModule, RouterLink, LucideImage],
  templateUrl: './panel-vendedor.html',
  styleUrl: './panel-vendedor.css',
})
export class PanelVendedor {
  productos: any[] = [];
  publicando = false;
  editando = false;
  productoEditandoId: number | null = null;

  archivoSeleccionado: File | null = null;
  previewImagen = '';

  nuevoProducto = {
    nombre: '',
    precio: 0,
    categoria: 'Alimentos',
    descripcion: '',
    imagen: '',
    estado: 'Activo',
  };

  constructor(private cdr: ChangeDetectorRef) {
    this.obtenerProductos();
  }

  async obtenerProductos() {
    const { data: sessionData } = await supabase.auth.getSession();
    const user = sessionData.session?.user;

    if (!user) return;

    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .eq('auth_id', user.id);

    if (error) {
      console.log(error);
      return;
    }

    this.productos = data;
    this.cdr.detectChanges();
  }

  async agregarProducto() {
  if (this.publicando) return;

  if (this.nuevoProducto.nombre.trim() === '' || this.nuevoProducto.precio <= 0) {
    alert('Completa el nombre y precio del producto');
    return;
  }

  this.publicando = true;

  const { data: sessionData } = await supabase.auth.getSession();
  const user = sessionData.session?.user;

  if (!user) {
    alert('Debes iniciar sesión');
    this.publicando = false;
    return;
  }

  const { data: perfil } = await supabase
    .from('usuarios')
    .select('nombre')
    .eq('auth_id', user.id)
    .single();

  let imagenUrl = this.nuevoProducto.imagen;

  if (this.archivoSeleccionado) {
    const nombreArchivo = `${Date.now()}-${this.archivoSeleccionado.name}`;

    const { error: uploadError } = await supabase.storage
      .from('productos')
      .upload(nombreArchivo, this.archivoSeleccionado);

    if (uploadError) {
      console.log(uploadError);
      alert('Error al subir imagen');
      this.publicando = false;
      return;
    }

    const { data } = supabase.storage
      .from('productos')
      .getPublicUrl(nombreArchivo);

    imagenUrl = data.publicUrl;
  }

  const { error } = await supabase
    .from('productos')
    .insert({
      nombre: this.nuevoProducto.nombre,
      precio: this.nuevoProducto.precio,
      categoria: this.nuevoProducto.categoria,
      descripcion: this.nuevoProducto.descripcion,
      imagen: imagenUrl || 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=500',
      auth_id: user.id,
      vendedor: perfil?.nombre || user.email,
      estado: 'Activo',
    });

  if (error) {
    console.log(error);
    alert('Error al publicar producto: ' + error.message);
    this.publicando = false;
    return;
  }

  this.nuevoProducto = {
    nombre: '',
    precio: 0,
    categoria: 'Alimentos',
    descripcion: '',
    imagen: '',
    estado: 'Activo',
  };

  this.archivoSeleccionado = null;
  this.previewImagen = '';

  await this.obtenerProductos();

  this.publicando = false;
  this.cdr.detectChanges();
}

  async eliminarProducto(producto: any) {
    const { error } = await supabase
      .from('productos')
      .delete()
      .eq('id', producto.id);

    if (error) {
      console.log(error);
      alert('Error al eliminar producto');
      return;
    }

    this.productos = this.productos.filter((p) => p.id !== producto.id);
    this.cdr.detectChanges();
  }

  editarProducto(producto: any) {
  this.editando = true;
  this.productoEditandoId = producto.id;

  this.nuevoProducto = {
    nombre: producto.nombre,
    precio: producto.precio,
    categoria: producto.categoria,
    descripcion: producto.descripcion,
    imagen: producto.imagen,
    estado: producto.estado,
  };
}
async guardarCambios() {
  if (!this.productoEditandoId) return;

  this.publicando = true;

  const { error } = await supabase
    .from('productos')
    .update({
      nombre: this.nuevoProducto.nombre,
      precio: this.nuevoProducto.precio,
      categoria: this.nuevoProducto.categoria,
      descripcion: this.nuevoProducto.descripcion,
      imagen: this.nuevoProducto.imagen,
      estado: this.nuevoProducto.estado,
    })
    .eq('id', this.productoEditandoId);

  if (error) {
    console.log(error);
    alert('Error al actualizar producto');
    this.publicando = false;
    return;
  }

  this.editando = false;
  this.productoEditandoId = null;

  this.nuevoProducto = {
    nombre: '',
    precio: 0,
    categoria: 'Alimentos',
    descripcion: '',
    imagen: '',
    estado: 'Activo',
  };

  await this.obtenerProductos();

  this.publicando = false;
  this.cdr.detectChanges();
}

seleccionarImagen(event: any) {

  const archivo = event.target.files[0];
  if (!archivo) return;
  this.archivoSeleccionado = archivo;
  const reader = new FileReader();
  reader.onload = () => {
    this.previewImagen = reader.result as string;
    this.cdr.detectChanges();

  };

  reader.readAsDataURL(archivo);

}

soltarImagen(event: DragEvent) {
  event.preventDefault();

  const archivo = event.dataTransfer?.files[0];

  if (!archivo) return;

  this.archivoSeleccionado = archivo;

  const reader = new FileReader();

  reader.onload = () => {
    this.previewImagen = reader.result as string;
    this.cdr.detectChanges();
  };

  reader.readAsDataURL(archivo);
}
}
