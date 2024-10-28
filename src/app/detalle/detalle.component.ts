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

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('ID del evento:', id); 
    this.obtenerEvento(id);
  }

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
  

  irALista(): void {
    this.router.navigate(['/listar']); 
  }
}





