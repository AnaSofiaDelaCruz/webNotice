import { Component, OnInit, ViewChild } from '@angular/core';
import {
  faSearch,
  faEdit,
  faTrash,
  faFileText,
} from '@fortawesome/free-solid-svg-icons';
import { CategoriaService } from 'src/app/service/CategoriaService/categoria.service';
import { AlertService } from 'src/app/service/AlertService/alert.service';
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
  private idUpdate!: number;
  @ViewChild('inputText') inputText: any;
  faSearch = faSearch;
  faEdit = faEdit;
  faTrash = faTrash;
  faFileText = faFileText;

  ngOnInit(): void {
    this.ListCategoria();
  }

  ListCategoria() {
    this.categoriaService.ListCategoria().subscribe(
      (response: any) => {
        this.categorias = response.categoria;
      },
      (error) => this.handleError(error)
    );
  }

  CrearCategoria() {
    this.createOrUpdateCategoria(true);
  }

  Actualizar(categoria: any) {
    this.idUpdate = categoria.id!;
    this.createOrUpdateCategoria(false);
  }

  Borrar(id: number) {
    this.alertService
      .AlertWarningDelete(
        '¿Estás seguro de que quieres eliminar esta categoría?'
      )
      .then((result) => {
        if (result.isConfirmed) {
          this.categoriaService.DeleteCategoria(id).subscribe(
            () => {
              this.ListCategoria();
              this.alertService.showSuccess(
                'Eliminado',
                'La categoría ha sido eliminada correctamente'
              );
            },
            (error) => this.handleError(error)
          );
        }
      });
  }

  buscarCategorias(termino: string) {
    this.categoriaService.buscarCategoria(termino).subscribe(
      (response: any) => {
        this.categorias = response.categoria;
      },
      (error) => {
        this.handleError(error);
        this.ListCategoria();
        this.inputText.nativeElement.value = '';
      }
    );
  }

  createOrUpdateCategoria(isNew: boolean) {
    Swal.fire({
      title: isNew ? 'Crear nueva categoría' : 'Actualizar categoría',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: isNew ? 'Crear' : 'Actualizar',
      showLoaderOnConfirm: true,
      preConfirm: (texto) => {
        return isNew
          ? this.categoriaService.CreateCategoria({ Nuevacategoria: texto })
          : this.categoriaService.UpdateCategoria(texto, this.idUpdate);
      },
      allowOutsideClick: () => !Swal.isLoading(),
    })
      .then((result) => {
        if (result.isConfirmed) {
          this.ListCategoria();
          Swal.fire({
            title: isNew ? 'Categoría creada' : 'Categoría actualizada',
            icon: 'success',
          });
        }
      })
      .catch((error) => {
        this.handleError(error);
      });
  }

  private handleError(error: any) {
    if (error.status === 404) {
      this.alertService.showErrorAlert('No se encontró la categoría');
    } else if (error.status === 401) {
      this.alertService.showErrorAlert('No tiene permiso para estar aquí');
    } else if (error.status === 500) {
      this.alertService.showErrorAlert('Intente más tarde por favor');
    }
  }
}
