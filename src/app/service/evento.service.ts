import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Evento } from '../model/evento';
import { catchError, map } from 'rxjs/operators'; 
import { EventoDTORequest } from '../model/eventoDTO';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private baseUrl = 'http://localhost:4444/eventos'; // URL de tu microservicio Spring Boot

  constructor(private http: HttpClient) { }

  // Método para obtener todos los eventos
  getEventos(): Observable<Evento[]> {
    return this.http.get<{ data: Evento[] }>(this.baseUrl).pipe(
      map(response => response.data)
    );
  }

  getEvento(id: number): Observable<EventoDTORequest> {
    return this.http.get<EventoDTORequest>(`${this.baseUrl}/${id}`).pipe(
      catchError(err => {
        console.error('Error al obtener el evento:', err);
        return throwError(() => new Error('Error al obtener el evento: ' + err.message));
      })
    );
  }

  crearEvento(evento: EventoDTORequest): Observable<Evento> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    return this.http.post<Evento>(this.baseUrl, evento, { headers })
      .pipe(
        catchError(err => {
          console.error('Error al crear el evento:', err);
          return throwError(() => new Error('Error al crear el evento: ' + err.message));
        })
      );
  }

  editarEvento(evento: Evento, id: number): Observable<Evento> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    return this.http.put<Evento>(`${this.baseUrl}/${id}`, evento, { headers })
      .pipe(
        catchError(err => {
          console.error('Error al editar el evento:', err);
          return throwError(() => new Error('Error al editar el evento: ' + err.message));
        })
      );
  }

  borrarEvento(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url);
  }
  
  }







