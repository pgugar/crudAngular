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

  constructor(private eventoService: EventoService, private router: Router) {} // Inyectar Router
  
  ngOnInit(): void {
    this.obtenerEventos();
  }

  obtenerEventos(): void {
    this.eventoService.getEventos().subscribe(
      (data: Evento[]) => {
        this.eventos = data; 
      },
      error => console.log(error)
    );
  }

  verDetalles(id: number): void {
    this.router.navigate(['/detalle', id]);
  }

  irAInsertarEvento(): void {
    this.router.navigate(['/insertar']);
  }

  editarDetalles(id: number): void {
    this.router.navigate(['/editar', id]); 
  }

  borrarEvento(id:number): void{
    this.router.navigate(['/eliminar',id]);
  }




}


