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
  evento: any = {};
  eventoForm!: FormGroup; // Formulario reactivo
  mensaje: string | null = null;
  mensajeError: string | null = null; // Mensaje de error
  mensajeExito: string | null = null; // Mensaje de éxito
  minDate: string = '';  // Variable para almacenar la fecha mínima

  constructor(
    private eventoService: EventoService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder // Inyectamos FormBuilder
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); // Obtener el ID del evento de la ruta

    // Inicializar el formulario
    this.eventoForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      descripcion: ['', Validators.required],
      fechaevento: ['', Validators.required],
      preciomin: [0, [Validators.required, Validators.min(0)]], // Establece un valor por defecto
      preciomax: [0, [Validators.required, Validators.min(0)]],
      genero: ['', [Validators.required, Validators.maxLength(50)]],
      localidad: ['', [Validators.required, Validators.maxLength(50)]],
      activo: [false]
    });

    // Cargar los datos del evento
    this.eventoService.getEventoMap(id).subscribe(
      (data) => {
        this.eventoForm.patchValue(data); // Cargar los datos en el formulario
      },
      (error) => {
        console.error('Error al obtener el evento:', error);
        this.mensaje = 'Error al cargar el evento.';
      }
    );

    // Establecer la fecha mínima a la fecha actual
    const today = new Date();
    this.minDate = this.formatDate(today);  // Llamar a la función para formatear la fecha
  }

  // Función para formatear la fecha como 'YYYY-MM-DDTHH:MM' (el formato requerido por input type="datetime-local")
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`; // Asegúrate de que sea el formato correcto
  }

  onSubmit(): void {
    if (this.eventoForm.valid) {
      const id = Number(this.route.snapshot.paramMap.get('id')); // Obtener el ID del evento

      // Convertir la fecha al formato adecuado
      const eventoData = this.eventoForm.value;
      const date = new Date(eventoData.fechaevento);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      eventoData.fechaevento = `${year}-${month}-${day} ${hours}:${minutes}`; // Cambia esto si tu API necesita otro formato

      console.log('Datos a enviar:', eventoData); // Imprimir datos antes de enviar

      // Llamar al servicio para actualizar el evento
      this.eventoService.editarEvento(eventoData, id).subscribe(
        (response) => {
          console.log('Evento editado:', response);
          this.mensaje = 'Evento editado correctamente.'; // Mensaje de éxito
          this.router.navigate(['/listar']); // Redirigir a la lista después de editar
        },
        (error) => {
          console.error('Error al editar el evento:', error);
          this.mensaje = 'Error al editar el evento.'; // Manejar el error
        }
      );
    }
  }

  irALista(): void {
    this.router.navigate(['/listar']); // Asegúrate de que la ruta '/listar' está definida
  }
}


