import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { supabase } from '../../supabase/supabase';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  correo = '';
  password = '';

  constructor(private router: Router) {}

  async iniciarSesion() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: this.correo,
      password: this.password,
    });

    if (error) {
      console.log(error);
      alert('Correo o contraseña incorrectos');
      return;
    }

    const user = data.user;

const { data: perfil, error: perfilError } = await supabase
  .from('usuarios')
  .select('rol')
  .eq('auth_id', user.id)
  .single();

if (perfilError) {
  console.log(perfilError);
  alert('No se pudo obtener el perfil del usuario');
  return;
}

if (perfil.rol === 'admin') {
  this.router.navigate(['/panel-admin']);
} else {
  this.router.navigate(['/catalogo']);
}
  }
}
