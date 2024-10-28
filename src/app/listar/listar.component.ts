import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importar Router
import { EventoService } from '../service/evento.service';
import { Evento } from '../model/evento';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {
  eventos: Evento[] = [];

  constructor(private eventoService: EventoService, private router: Router) {} 


  /**
   * ngOnInit: Método del ciclo de vida del componente que se ejecuta cuando se inicializa el componente.
   * Aquí se llama al método obtenerEventos para cargar los eventos al inicializar la vista.
   */
  
  ngOnInit(): void {
    this.obtenerEventos();
  }

  /**
   * obtenerEventos: Hace una solicitud al servicio EventoService para obtener la lista de eventos desde la API.
   * Los datos obtenidos se asignan al array `eventos` para su visualización en la plantilla.
   * En caso de error, se muestra un mensaje en la consola.
   */

  obtenerEventos(): void {
    this.eventoService.getEventos().subscribe(
      (data: Evento[]) => {
        this.eventos = data; 
      },
      error => console.log(error)
    );
  }

  /**
   * verDetalles: Redirige al componente de detalles de un evento específico usando su `id`.
   * Utiliza el router para navegar a la URL '/detalle/{id}'.
   * @param id - El identificador del evento que se desea ver.
   */

  verDetalles(id: number): void {
    this.router.navigate(['/detalle', id]);
  }

  /**
   * irAInsertarEvento: Redirige a la vista de inserción de un nuevo evento.
   * Utiliza el router para navegar a la URL '/insertar'.
   */

  irAInsertarEvento(): void {
    this.router.navigate(['/insertar']);
  }

   /**
   * editarDetalles: Redirige al componente para editar un evento específico usando su `id`.
   * Utiliza el router para navegar a la URL '/editar/{id}'.
   * @param id - El identificador del evento que se desea editar.
   */

  editarDetalles(id: number): void {
    this.router.navigate(['/editar', id]); 
  }

   /**
   * borrarEvento: Redirige a la vista para eliminar un evento específico usando su `id`.
   * Utiliza el router para navegar a la URL '/eliminar/{id}'.
   * @param id - El identificador del evento que se desea eliminar.
   */

  borrarEvento(id:number): void{
    this.router.navigate(['/eliminar',id]);
  }

}



