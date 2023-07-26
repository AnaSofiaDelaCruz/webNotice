export interface NOTA {
  id?: number;
  titulo: string;
  descripcion: string;
  autor?: string;
  fecha?: string;
  categoriaID: number;
  subcategoriaID: number;
  rol: string;
 items: string; // FileList para manejar las imágenes seleccionadas
}
