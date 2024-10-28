export interface Evento {
    id: number;
    nombre: string;
    descripcion: string;
    fechaevento: string;
    preciomax: number;
    preciomin: number;
    genero: string;
    localidad: string;
    activo: boolean;
  }