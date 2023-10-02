import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/service/AlertService/alert.service';
import { CategoriaService } from 'src/app/service/CategoriaService/categoria.service';
@Component({
  selector: 'app-editar-categorias',
  templateUrl: './editar-categorias.component.html',
  styleUrls: ['./editar-categorias.component.css'],
})
export class EditarCategoriasComponent {
  public datosObtenidos = [];
  constructor(
    private router: Router,
    private categoriaServicio: CategoriaService,
    private alertas: AlertService
  ) {}

  ngOnInit(): void {}

  public regresar() {
    this.router.navigate(['/crear-categoria']);
  }

  private listarCategorias() {
    this.categoriaServicio.ListCategorias().subscribe(
      (res) => {
        this.datosObtenidos = res.categoria;
      },
      (error) => {
        this.alertaError(error);
      }
    );
  }

  private listarSubCategorias() {
    this.categoriaServicio.ListSubCategorias().subscribe(
      (res) => {
        this.datosObtenidos = res.subcategoria;
        console.log('Esto tiene mi subcategoria:', this.datosObtenidos);
      },
      (error) => {
        this.alertaError(error);
      }
    );
  }

  private alertaError(error: any) {
    if (error.status === 401) {
      this.alertas.ShowErrorAlert('Token invalido');
    } else if (error.status === 500) {
      this.alertas.ShowErrorAlert(
        'Ocurrio un problema con el servidor, intentelo mas tarde'
      );
    }
  }

  opcionSeleccinada: string = '0';
  seleccion: string = '';
  public capturar() {
    this.seleccion = this.opcionSeleccinada;
    console.log('Esto tiene:', this.seleccion);
    this.determinar();
  }

  public mostrarPrimerH1: boolean = true;

  public determinar() {
    if (this.seleccion === '1') {
      this.mostrarPrimerH1 = true;
      this.listarCategorias();
    }
    if (this.seleccion === '2') {
      this.listarSubCategorias();
      this.mostrarPrimerH1 = false;
    }
  }

  public eliminarCategoria(idCategoria: any) {
    if (this.mostrarPrimerH1) {
      console.log('Categoria con ID: ', idCategoria);
      this.alertas
        .AlertWarningDelete(
          '¡Atención! la categoria seleccionada será eliminada.'
        )
        .then((res) => {
          if (res.value) {
            this.categoriaServicio
              .EliminarCategoriaFuncion(idCategoria)
              .subscribe(
                (response) => {
                  if (response.message === 'Categoría borrada exitosamente') {
                    this.alertas.showSuccess(
                      'Categoria eliminada exitosamente',
                      'La categoria seleccionada fue eliminada con exito.'
                    );
                    this.listarCategorias();
                  }
                },
                (error) => {
                  console.log('Hubo un error al intentar eliminar: ', error);
                }
              );
          } else {
            console.log('Operacion cancelada.');
          }
        });
    } else {
      console.log('Subcategoria con ID: ', idCategoria);
      this.alertas
        .AlertWarningDelete(
          '¡Atención! la subcategoria seleccionada será eliminada.'
        )
        .then((res) => {
          if (res.value) {
            this.categoriaServicio
              .EliminarSubCategoriaFuncion(idCategoria)
              .subscribe(
                (response) => {
                  if (
                    response.message === 'Subcategoria borrada exitosamente'
                  ) {
                    this.alertas.showSuccess(
                      'Subcategoria eliminada exitosamente',
                      'La subcategoria seleccionada fue eliminada con exito.'
                    );
                    this.listarSubCategorias();
                  }
                },
                (error) => {
                  console.log('Hubo un error al intentar eliminar: ', error);
                }
              );
          } else {
            console.log('Operacion cancelada.');
          }
        });
    }
  }

  public async editar(idCategoria: any) {
    let capturar: string | null;

    if (this.mostrarPrimerH1) {
      capturar = await this.alertas.InputAlert(
        'Cambiar nombre de la categoria'
      );

      this.categoriaServicio
        .EditarCategoriaFuncion(idCategoria, capturar)
        .subscribe((res) => {
          this.alertas.showSuccess(
            'Edición exitosa',
            'La categoria fue actualizada correctamente.'
          );
        });
      this.listarCategorias();
    } else {
      capturar = await this.alertas.InputAlert(
        'Cambiar nombre de la subcategoria'
      );
      this.categoriaServicio
        .EditarSubCategoriaFuncion(idCategoria, capturar)
        .subscribe((res) => {
          this.alertas.showSuccess(
            'Edición exitosa',
            'La subcategoria fue actualizada correctamente.'
          );
        });
      this.listarSubCategorias();
    }

    if (capturar !== null) {
      console.log('Esto obtenemos:', capturar);
    }
  }
}
