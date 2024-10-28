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

  /**
   * getEventos: Método que obtiene todos los eventos desde el microservicio.
   * @returns {Observable<Evento[]>} Un observable que emite la lista de eventos.
   */
  getEventos(): Observable<Evento[]> {
    return this.http.get<{ data: Evento[] }>(this.baseUrl).pipe(
      map(response => response.data) // Mapea la respuesta para obtener solo los datos
    );
  }

  /**
   * getEvento: Método que obtiene un evento específico por su ID.
   * @param id - El ID del evento a obtener.
   * @returns {Observable<Evento>} Un observable que emite el evento solicitado.
   */
  getEvento(id: number): Observable<Evento> {
    return this.http.get<Evento>(`${this.baseUrl}/${id}`).pipe(
      catchError(err => {
        console.error('Error al obtener el evento:', err);
        return throwError(() => new Error('Error al obtener el evento: ' + err.message));
      })
    );
  }

  /**
   * getEventoMap: Método que obtiene un evento específico por su ID, mapeando la respuesta.
   * @param id - El ID del evento a obtener.
   * @returns {Observable<Evento>} Un observable que emite el evento solicitado.
   */
  getEventoMap(id: number): Observable<Evento> {
    return this.http.get<{ data: Evento }>(`${this.baseUrl}/${id}`).pipe(
      map(response => response.data), // Mapea la respuesta para obtener solo los datos
      catchError(err => {
        console.error('Error al obtener el evento:', err);
        return throwError(() => new Error('Error al obtener el evento: ' + err.message));
      })
    );
  }

  /**
   * crearEvento: Método que crea un nuevo evento.
   * @param evento - El evento a crear, representado como un objeto EventoDTORequest.
   * @returns {Observable<Evento>} Un observable que emite el evento creado.
   */
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

  /**
   * editarEvento: Método que edita un evento existente.
   * @param evento - El evento actualizado a enviar al servidor.
   * @param id - El ID del evento a editar.
   * @returns {Observable<Evento>} Un observable que emite el evento editado.
   */
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

  /**
   * borrarEvento: Método que elimina un evento por su ID.
   * @param id - El ID del evento a eliminar.
   * @returns {Observable<any>} Un observable que representa la respuesta de la eliminación.
   */
  borrarEvento(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url); // Realiza la eliminación sin necesidad de manejo de errores aquí
  }
}








