import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/service/AlertService/alert.service';
import { CategoriaService } from 'src/app/service/CategoriaService/categoria.service';

@Component({
  selector: 'app-crear-categoria',
  templateUrl: './crear-categoria.component.html',
  styleUrls: ['./crear-categoria.component.css'],
})
export class CrearCategoriaComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private categoriaService: CategoriaService
  ) {}
  public categoriaForm!: FormGroup;
  tipoSeleccionado: string = 'Sin seleccionar';
  public categoriaLista = [];
  ngOnInit(): void {
    this.FormInit();
    this.ListaCategory();
  }

  public FormInit() {
    this.categoriaForm = this.fb.group({
      Nuevacategoria: ['', Validators.required],
      Tipo: ['Sin seleccionar', Validators.required],
    });
  }

  public RegistrarCategoria() {
    if (this.categoriaForm.valid) {
      const tipoSeleccionado = this.categoriaForm.get('Tipo')?.value;
      if (tipoSeleccionado === 'categoria') {
        this.CrearCategorias();
      } else if (tipoSeleccionado === 'subcategoria') {
        this.CrearSubCategorias();
      } else {
        this.alertService.ShowErrorAlert(
          'Invalido, eliga entre categoria o subcategoria'
        );
      }
    } else {
      this.alertService.ShowErrorAlert('No deje campos vacioas');
    }
  }

  private CrearCategorias() {
    this.categoriaService
      .RegistrarCategoria(this.categoriaForm.value)
      .subscribe(
        (response) => {
          console.log(response.message);
          if (response.message === 'Categoria creada') {
            this.alertService.showSuccess('Categoria', 'Categoria creada');
            this.categoriaForm.reset();
          }
        },
        (error) => {
          this.handleError(error);
        }
      );
  }

  private CrearSubCategorias() {
    this.categoriaService
      .RegistrarSubCategoria(this.categoriaForm.value)
      .subscribe(
        (response) => {
          if (response.message === 'Subcategoría creada') {
            this.alertService.showSuccess(
              'Subcategoría',
              'Subcategoría creada'
            );
          }
        },
        (error) => {
          this.handleError(error);
        }
      );
  }

  private handleError(error: any) {
    if (error.status === 401) {
      this.alertService.ShowErrorAlert('Token invalido');
    } else if (error.status === 500) {
      this.alertService.ShowErrorAlert('Intentelo más tarde');
    }
  }

  private ListaCategory() {
    this.categoriaService.ListCategorias().subscribe(
      (res) => {
        console.log(res);
        console.log(res.categoria);

        this.categoriaLista = res.categoria;
        console.log(this.categoriaLista, ' este es mi array');
      },
      (error) => {
        this.handleError;
      }
    );
  }
}
