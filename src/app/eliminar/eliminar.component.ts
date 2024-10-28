import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Importar Router
import { EventoService } from '../service/evento.service';

@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.css']
})
export class EliminarComponent implements OnInit {
  id: number | undefined; // Almacena el ID del evento a eliminar
  mensaje: string | undefined; // Almacena el mensaje de éxito o error

  constructor(
    private eventoService: EventoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  /**
   * ngOnInit: Método del ciclo de vida que se ejecuta cuando el componente es inicializado.
   * - Obtiene el parámetro `id` de la URL usando ActivatedRoute y lo convierte en un número.
   */
  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!; // Obtiene el ID del evento desde la URL
  }

  /**
   * borrarEvento: Método que se encarga de eliminar el evento con el ID obtenido de la URL.
   * - Si el ID existe, se llama al servicio `EventoService` para borrar el evento.
   * - Al completar la acción, muestra un mensaje de éxito o error y redirige a la lista de eventos.
   */
  borrarEvento(): void {
    if (this.id) {
      this.eventoService.borrarEvento(this.id).subscribe(
        response => {
          console.log('Evento eliminado', response);
          this.mensaje = 'Evento eliminado correctamente'; // Muestra mensaje de éxito
          this.router.navigate(['/listar']); // Redirige a la lista de eventos
        },
        error => {
          console.error('Error al eliminar el evento', error);
          this.mensaje = 'Error al eliminar el evento'; // Muestra mensaje de error
        }
      );
    }
  }

}






