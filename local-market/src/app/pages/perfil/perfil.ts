import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { supabase } from '../../supabase/supabase';

@Component({
  selector: 'app-perfil',
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil {
  editando = false;

  usuario = {
    nombre: '',
    correo: '',
    telefono: '',
    direccion: '',
    rol: '',
  };

  constructor() {
    this.obtenerPerfil();
  }

  async obtenerPerfil() {
    const { data: sessionData } = await supabase.auth.getSession();
    const user = sessionData.session?.user;

    if (!user) return;

    const { data: perfil, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('auth_id', user.id)
      .single();

    if (error) {
      console.log(error);
      return;
    }

    this.usuario.nombre = perfil.nombre;
    this.usuario.correo = user.email ?? '';
    this.usuario.telefono = perfil.telefono;
    this.usuario.direccion = perfil.direccion ?? 'Sin dirección registrada';
    this.usuario.rol = perfil.rol;
  }

  cambiarModo() {
    this.editando = !this.editando;
  }
}