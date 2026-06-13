import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { supabase } from '../../supabase/supabase';

@Component({
  selector: 'app-panel-admin',
  imports: [CommonModule, RouterLink],
  templateUrl: './panel-admin.html',
  styleUrl: './panel-admin.css',
})
export class PanelAdmin {
  solicitudes: any[] = [];
  procesando = false;

  constructor(
  private cdr: ChangeDetectorRef
) {
  this.obtenerSolicitudes();

}

  async obtenerSolicitudes() {
  const { data, error } = await supabase
    .from('solicitudes_vendedor')
    .select('*');

  console.log('Solicitudes:', data);
  console.log('Error solicitudes:', error);

  if (error) {
    console.log(error);
    return;
  }

  this.solicitudes = data;
  this.cdr.detectChanges();
}
  async aprobar(solicitud: any) {

  if (this.procesando) return;
  this.procesando = true;
  solicitud.estado = 'aprobado';
  this.cdr.detectChanges();
  const { error: solicitudError } =
    await supabase
      .from('solicitudes_vendedor')
      .update({
        estado: 'aprobado'
      })
      .eq('id', solicitud.id);

  if (solicitudError) {
    console.log(solicitudError);
    this.procesando = false;

    return;

  }

  const { error: usuarioError } =
    await supabase
      .from('usuarios')
      .update({
        rol: 'vendedor'
      })
      .eq('auth_id', solicitud.auth_id);

  if (usuarioError) {
    console.log(usuarioError);

  }
  this.procesando = false;

}

  async rechazar(solicitud: any) {

  if (this.procesando) return;
  this.procesando = true;
  solicitud.estado = 'rechazado';
  this.cdr.detectChanges();
  const { error } =
    await supabase
      .from('solicitudes_vendedor')
      .update({
        estado: 'rechazado'
      })
      .eq('id', solicitud.id);
  if (error) {
    console.log(error);
  }

  this.procesando = false;

}
}
