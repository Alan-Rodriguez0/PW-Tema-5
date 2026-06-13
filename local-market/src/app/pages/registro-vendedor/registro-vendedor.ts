import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { supabase } from '../../supabase/supabase';

@Component({
  selector: 'app-registro-vendedor',
  imports: [CommonModule, FormsModule],
  templateUrl: './registro-vendedor.html',
  styleUrl: './registro-vendedor.css',
})
export class RegistroVendedor {
  solicitudEnviada = false;
  enviando = false;

  nombreNegocio = '';
  responsable = '';
  telefono = '';
  correo = '';
  ubicacion = '';
  tipoProductos = '';
  modalidad = 'Solicitar aprobación del administrador';

  async enviarSolicitud() {

  if (this.enviando || this.solicitudEnviada) return;
  this.enviando = true;
  console.log('Botón presionado');
  const { data: sessionData } =
    await supabase.auth.getSession();
  const user = sessionData.session?.user;
  const { error } = await supabase
    .from('solicitudes_vendedor')
    .insert({

      auth_id: user?.id ?? null,
      nombre_negocio: this.nombreNegocio,
      responsable: this.responsable,
      telefono: this.telefono,
      correo: this.correo,
      ubicacion: this.ubicacion,
      tipo_productos: this.tipoProductos,
      modalidad: this.modalidad,
      estado: 'pendiente',

    });

  this.enviando = false;
  if (error) {
    console.log(error);
    alert(
      'Error al enviar solicitud: ' +
      error.message
    );
    return;

  }
  this.solicitudEnviada = true;

}
}
