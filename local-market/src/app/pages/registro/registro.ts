import { Component } from '@angular/core';
import { supabase } from '../../supabase/supabase';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  imports: [RouterLink, FormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})

export class Registro {

  constructor(private router: Router) {}

  correo = '';
  password = '';
  nombre = '';
  telefono = '';
  rol = 'usuario';

  async registrarse() {

  const { data, error } = await supabase.auth.signUp({

    email: this.correo,
    password: this.password,

  });

  if (error) {

    console.log(error);
    return;

  }

  const user = data.user;

  if (user) {

    const { error: insertError } = await supabase
      .from('usuarios')
      .insert({

        auth_id: user.id,
        nombre: this.nombre,
        telefono: this.telefono,
        rol: this.rol,
      });
    console.log(insertError);

  }
  console.log(data);
  this.router.navigate(['/login']);

}
}
