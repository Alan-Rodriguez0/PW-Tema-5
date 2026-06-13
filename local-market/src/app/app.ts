import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { supabase } from './supabase/supabase';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('local-market');

  constructor() {
    this.verificarSesion();
  }

  async verificarSesion() {
    const { data } = await supabase.auth.getSession();

    console.log('Sesión actual:', data.session);
  }
}
