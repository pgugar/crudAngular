import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Importar Router
import { EventoService } from '../service/evento.service';
import { Evento } from '../model/evento';

@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.css']
})
export class EliminarComponent {
  id: number | undefined;
  mensaje: string | undefined;

  constructor(
    private eventoService: EventoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Obtén el ID de la URL
    this.id = +this.route.snapshot.paramMap.get('id')!;
  }

  borrarEvento(): void {
    if (this.id) {
      this.eventoService.borrarEvento(this.id).subscribe(
        response => {
          console.log('Evento eliminado', response);
          this.mensaje = 'Evento eliminado correctamente';
          this.router.navigate(['/listar']); // Redirige a la lista de eventos tras eliminar
        },
        error => {
          console.error('Error al eliminar el evento', error);
          this.mensaje = 'Error al eliminar el evento';
        }
      );
    }
  }

}





