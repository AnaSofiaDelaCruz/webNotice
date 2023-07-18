import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  faSearch,
  faEdit,
  faTrash,
  faFileText,
} from '@fortawesome/free-solid-svg-icons';
import { CATEGORIA } from 'src/app/interfaces/categoria';
import { AlertService } from 'src/app/service/AlertService/alert.service';
import { CategoriaService } from 'src/app/service/CategoriaService/categoria.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
})
export class CategoriasComponent implements OnInit {
  constructor(
    private alertService: AlertService,
    private categoriaService: CategoriaService
  ) {}
  public categorias: any = [];
  private categoriaCreate: CATEGORIA = {
    id: 0,
    Nuevacategoria: '',
  };
  faSearch = faSearch;
  faEdit = faEdit;
  faTrash = faTrash;
  faFileText = faFileText;

  ngOnInit(): void {
    this.checkToken();
    this.ListCategoria();
  }

  private checkToken(): void {
    const rol = localStorage.getItem('rol');
    // Realiza las acciones necesarias con el token
  }

  ListCategoria() {
    this.categoriaService.ListCategoria().subscribe(
      (response: any) => {
        console.log('RESPONSE ', response, ' su tipo es ', typeof response);
        this.categorias = response.categoria;
      },
      (error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.alertService.showErrorAlert('No Tiene permiso de estar aqui');
        } else if (error.status === 500) {
          this.alertService.showErrorAlert('Intente mas tarde por favor');
        }
      }
    );
  }

  CrearCategoria() {
    this.createSampleValue(true,this.categoriaCreate);
  }
  Actualizar(categoria: CATEGORIA) {
    console.log();
    this.createSampleValue(false, categoria);
  }
  Borrar(id: number) {
    this.alertService
      .AlertWarningDelete(
        '¿Estás seguro de que quieres eliminar esta categoría?'
      )
      .then(
        (result) => {
          if (result.isConfirmed) {
            this.categoriaService.DeleteCategoria(id).subscribe((response) => {
              this.ListCategoria();
              this.alertService.showSuccess(
                'Eliminado',
                'La categoría ha sido eliminada correctamente'
              );
            });
          }
        },
        (error: HttpErrorResponse) => {
          if (error.status === 404) {
            this.alertService.showErrorAlert('No existe la categoria a borrar');
          } else if (error.status === 401) {
            this.alertService.showErrorAlert('No deberia estar aca');
          } else if (error.status === 500) {
            this.alertService.showErrorAlert('Regrese mas tarde');
          }
        }
      );
  }

  buscarCategorias(termino: string) {
    this.categoriaService.buscarCategoria(termino).subscribe(
      (response: any) => {
        console.log(response);
        this.categorias = response.categoria;
      },
      (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.alertService.showErrorAlert('No se encontro la categoria');
        } else if (error.status === 401) {
          this.alertService.showErrorAlert('No deberia estar aqui');
        } else if (error.status === 500) {
          this.alertService.showErrorAlert('Intente mas tarde');
        }
      }
    );
  }

  createSampleValue(bandera: boolean, categoria:CATEGORIA) {
    Swal.fire({
      title: 'Guardar texto',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      showLoaderOnConfirm: true,
      preConfirm: (texto) => {
        this.categoriaCreate = texto;
        if (bandera) {
          return this.categoriaService.CreateCategoria(this.categoriaCreate);
        } else {
          console.log('si entro a false ', this.categoriaCreate);
          return this.categoriaService.UpdateCategoria(categoria);
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    })
      .then((result) => {
        if (result.isConfirmed) {
          this.ListCategoria();
          Swal.fire({
            title: 'Categoria Guardada',
            icon: 'success',
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          title: 'Error al guardar el Categoria',
          text: error.message,
          icon: 'error',
        });
      });
  }
}
