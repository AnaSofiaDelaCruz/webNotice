import { Component, OnInit, ViewChild } from '@angular/core';
import {
  faSearch,
  faEdit,
  faTrash,
  faFileText,
} from '@fortawesome/free-solid-svg-icons';
import { AlertService } from 'src/app/service/AlertService/alert.service';
import { SubCategoriaService } from 'src/app/service/SubCategoriaService/sub-categoria.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-subcategorias',
  templateUrl: './subcategorias.component.html',
  styleUrls: ['./subcategorias.component.css'],
})
export class SubcategoriasComponent implements OnInit {
  constructor(
    private alertService: AlertService,
    private SubCategoriaService: SubCategoriaService
  ) {}

  public subcategorias: any = [];
  private idUpdate!: number;
  @ViewChild('inputText') inputText: any;
  faSearch = faSearch;
  faEdit = faEdit;
  faTrash = faTrash;
  faFileText = faFileText;
  ngOnInit(): void {
    this.ListSubCategoria();
  }

  private ListSubCategoria() {
    this.SubCategoriaService.ListSubCategoria().subscribe(
      (response: any) => {
        this.subcategorias = response.subcategoria;
      },
      (error) => this.handleError(error)
    );
  }

  CrearSubCategoria() {
    this.createOrUpdateSubCategoria(true);
  }
  Actualizar(Subcategoria: any) {
    this.idUpdate = Subcategoria.id;
    this.createOrUpdateSubCategoria(false);
  }
  Borrar(id: number) {
    this.alertService
      .AlertWarningDelete(
        '¿Estás seguro de que quieres eliminar esta subcategoría?'
      )
      .then((result) => {
        if (result.isConfirmed) {
          this.SubCategoriaService.DeleteSubCategoria(id).subscribe(
            () => {
              this.ListSubCategoria();
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
  buscarSubCategorias(termino: string) {
    this.SubCategoriaService.BuscarSubCategoria(termino).subscribe(
      (response: any) => {
        console.log(response)
        this.subcategorias = response.subcategoria;
      },
      (error) => {
        this.handleError(error);
        this.ListSubCategoria();
        this.inputText.nativeElement.value = '';
      }
    );
  }

  createOrUpdateSubCategoria(isNew: boolean) {
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
          ? this.SubCategoriaService.CreateSubCaterogira({
              subcategoria: texto,
            })
          : this.SubCategoriaService.UpdateSubCategoria(texto, this.idUpdate);
      },
      allowOutsideClick: () => !Swal.isLoading(),
    })
      .then((result) => {
        if (result.isConfirmed) {
          this.ListSubCategoria();
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
