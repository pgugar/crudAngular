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
  evento: Evento | null = null; // Inicializa evento como nulo

  constructor(
    private route: ActivatedRoute,
    private eventoService: EventoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('ID del evento:', id); // Para depuración
    this.obtenerEvento(id);
  }

  obtenerEvento(id: number): void {
    this.eventoService.getEvento(id).subscribe(
      (response: any) => { // Cambia `Evento` a `any` temporalmente
        if (response.data) { // Verifica que `data` exista
          this.evento = response.data; // Asigna el evento desde `response.data`
        } else {
          console.error('No se encontraron datos del evento');
        }
        console.log('Datos del evento:', this.evento); // Para depuración
      },
      error => {
        console.error('Error al obtener el evento:', error);
        // Manejo de errores aquí (puedes agregar una notificación o redirigir)
      }
    );
  }
  

  irALista(): void {
    this.router.navigate(['/listar']); // Asegúrate que la ruta '/listar' está definida
  }
}




