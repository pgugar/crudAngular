import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventoService } from '../service/evento.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  evento: any = {}; // Almacena los datos del evento
  eventoForm!: FormGroup; // Formulario reactivo
  mensaje: string | null = null; // Almacena mensajes de éxito o error
  minDate: string = '';  // Fecha mínima para el campo de fecha de evento

  constructor(
    private eventoService: EventoService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder 
  ) {}

  /**
   * ngOnInit: Método del ciclo de vida que se ejecuta al inicializar el componente.
   * - Obtiene el `id` del evento desde la URL.
   * - Crea el formulario reactivo con validaciones.
   * - Llama a `getEventoMap` para cargar los datos del evento y rellenar el formulario.
   * - Calcula la fecha mínima permitida para el evento.
   */

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); 

  // Inicializa el formulario con validaciones
    this.eventoForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      descripcion: ['', Validators.required],
      fechaevento: ['', Validators.required],
      preciomin: [0, [Validators.required, Validators.min(0)]], 
      preciomax: [0, [Validators.required, Validators.min(0)]],
      genero: ['', [Validators.required, Validators.maxLength(50)]],
      localidad: ['', [Validators.required, Validators.maxLength(50)]],
      activo: [false]
    });

    // Obtiene los datos del evento y los carga en el formulario
    this.eventoService.getEventoMap(id).subscribe(
      (data) => {
        this.eventoForm.patchValue(data); // Asigna los valores obtenidos al formulario
      },
      (error) => {
        console.error('Error al obtener el evento:', error);
        this.mensaje = 'Error al cargar el evento.'; // Muestra mensaje en caso de error
      }
    );

    const today = new Date();
    this.minDate = this.formatDate(today); // Establece la fecha mínima permitida
  }

  /**
   * formatDate: Formatea un objeto `Date` en una cadena compatible con el campo de fecha del formulario.
   * El formato devuelto es `yyyy-MM-ddTHH:mm`.
   * @param date - Objeto de tipo `Date` a formatear.
   * @returns La fecha formateada en cadena.
   */


  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`; 
  }

  /**
   * onSubmit: Se ejecuta cuando el formulario es enviado.
   * - Verifica si el formulario es válido.
   * - Formatea la fecha del evento.
   * - Llama a `editarEvento` del servicio para actualizar los datos del evento en el servidor.
   * - Muestra mensajes de éxito o error y redirige a la lista de eventos si la edición fue exitosa.
   */

  onSubmit(): void {
    if (this.eventoForm.valid) {
      const id = Number(this.route.snapshot.paramMap.get('id')); // Obtiene el ID desde la URL

       // Formatea la fecha del evento antes de enviarla al servidor
      const eventoData = this.eventoForm.value;
      const date = new Date(eventoData.fechaevento);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      eventoData.fechaevento = `${year}-${month}-${day} ${hours}:${minutes}`; 

      console.log('Datos a enviar:', eventoData); 

      // Llama al servicio para editar el evento
      this.eventoService.editarEvento(eventoData, id).subscribe(
        (response) => {
          console.log('Evento editado:', response);
          this.mensaje = 'Evento editado correctamente.'; // Mensaje de éxito
          this.router.navigate(['/listar']); // Redirige a la lista de eventos
        },
        (error) => {
          console.error('Error al editar el evento:', error);
          this.mensaje = 'Error al editar el evento.'; // Mensaje de error
        }
      );
    }
  }

   /**
   * irALista: Redirige al usuario a la lista de eventos.
   * Utiliza el router para navegar a la ruta '/listar'.
   */

  irALista(): void {
    this.router.navigate(['/listar']); 
  }
}


