import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventoService } from '../service/evento.service';
import { EventoDTORequest } from '../model/eventoDTO'; // Importa el modelo

@Component({
  selector: 'app-insertar',  // Cambia el selector si es necesario
  templateUrl: './insertar.component.html',
  styleUrls: ['./insertar.component.css']
})
export class InsertarComponent {
  evento: EventoDTORequest = {
    nombre: '',
    descripcion: '',
    fechaevento: '',  // Mantener como string en formato YYYY-MM-DD
    preciomax: 0,
    preciomin: 0,
    genero: '',
    localidad: '',
    activo: true 
  };

  mensaje: string | null = null; // Mensaje para mostrar al usuario
  minDate: string; // Atributo para la fecha mínima

  constructor(private eventoService: EventoService, private router: Router) {
    const ahora = new Date();
    this.minDate = ahora.toISOString().slice(0, 16); // Establece la fecha mínima como la fecha actual en formato YYYY-MM-DDTHH:MM
  }

  onSubmit() {
    if (this.evento.fechaevento) {
      const date = new Date(this.evento.fechaevento);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');

      this.evento.fechaevento = `${year}-${month}-${day} ${hours}:${minutes}`;
    }

    // Verifica los datos antes de enviarlos
    console.log('Datos a enviar:', this.evento);

    this.eventoService.crearEvento(this.evento).subscribe(
      response => {
        console.log('Evento creado:', response);
        this.mensaje = '¡Evento creado con éxito!'; // Asigna un mensaje de éxito
        // Opcional: Reiniciar el formulario después de la creación
        this.resetFormulario();
      },
      error => {
        console.error('Error al crear el evento');
        this.mensaje = 'Error al crear el evento. Intenta de nuevo.'; // Mensaje de error
      }
    );
  }

  // Método para reiniciar el formulario
  private resetFormulario() {
    this.evento = {
      nombre: '',
      descripcion: '',
      fechaevento: '',
      preciomax: 0,
      preciomin: 0,
      genero: '',
      localidad: '',
      activo: true 
    };
  }

  irALista(): void {
    this.router.navigate(['/listar']); // Asegúrate que la ruta '/listar' está definida
  }
}



