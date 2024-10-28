import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventoService } from '../service/evento.service';
import { EventoDTORequest } from '../model/eventoDTO'; 

@Component({
  selector: 'app-insertar',  
  templateUrl: './insertar.component.html',
  styleUrls: ['./insertar.component.css']
})
export class InsertarComponent {
  evento: EventoDTORequest = {
    nombre: '',
    descripcion: '',
    fechaevento: '',  
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

  /**
   * onSubmit: Método que se ejecuta cuando el formulario es enviado.
   * - Formatea la fecha del evento en el formato 'YYYY-MM-DD HH:MM'.
   * - Verifica los datos del evento e imprime en consola los datos a enviar.
   * - Llama al servicio `EventoService` para crear un nuevo evento.
   * - Muestra un mensaje de éxito si el evento es creado correctamente o un mensaje de error si ocurre un problema.
   */
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

    // Llama al servicio para crear el evento
    this.eventoService.crearEvento(this.evento).subscribe(
      response => {
        console.log('Evento creado:', response);
        this.mensaje = '¡Evento creado con éxito!'; // Asigna un mensaje de éxito
        this.resetFormulario(); // Reinicia el formulario después de la creación
      },
      error => {
        console.error('Error al crear el evento');
        this.mensaje = 'Error al crear el evento. Intenta de nuevo.'; // Mensaje de error
      }
    );
  }

  /**
   * resetFormulario: Método privado que reinicia el formulario del evento.
   * Se usa para limpiar los campos después de que el evento se haya creado correctamente.
   */
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

  /**
   * irALista: Método que redirige al usuario a la lista de eventos.
   * Utiliza el router para navegar a la ruta '/listar'.
   */
  irALista(): void {
    this.router.navigate(['/listar']); 
  }
}



