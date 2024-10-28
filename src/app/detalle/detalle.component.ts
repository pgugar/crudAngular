import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventoService } from '../service/evento.service';
import { Evento } from '../model/evento';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  evento: Evento | null = null; 

  constructor(
    private route: ActivatedRoute,
    private eventoService: EventoService,
    private router: Router
  ) {}

  /**
   * ngOnInit: Método del ciclo de vida del componente que se ejecuta al inicializar la vista.
   * Obtiene el parámetro 'id' de la ruta, lo convierte en un número y llama a obtenerEvento para
   * cargar los detalles del evento con ese ID.
   */

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('ID del evento:', id); 
    this.obtenerEvento(id);
  }

  /**
   * obtenerEvento: Llama al servicio EventoService para obtener los detalles del evento con el ID proporcionado.
   * Si los datos se obtienen correctamente, se asignan al objeto `evento`. 
   * Si no se encuentran datos, muestra un error en la consola.
   * @param id - El identificador del evento a obtener.
   */

  obtenerEvento(id: number): void {
    this.eventoService.getEvento(id).subscribe(
      (response: any) => { 
        if (response.data) { 
          this.evento = response.data; 
        } else {
          console.error('No se encontraron datos del evento');
        }
        console.log('Datos del evento:', this.evento); 
      },
      error => {
        console.error('Error al obtener el evento:', error);
      }
    );
  }

  /**
   * irALista: Redirige al usuario de vuelta a la lista de eventos.
   * Utiliza el router para navegar a la URL '/listar'.
   */
  

  irALista(): void {
    this.router.navigate(['/listar']); 
  }
}





