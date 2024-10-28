export interface EventoDTORequest {
    nombre: string;
    descripcion: string;
    fechaevento: string; // Asegúrate de que este formato sea correcto
    preciomax: number;
    preciomin: number;
    genero: string;
    localidad: string;
    activo: boolean;
  }
