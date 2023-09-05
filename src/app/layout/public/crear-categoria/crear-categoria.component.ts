import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    private categoriaService: CategoriaService,
    private router: Router
  ) {}
  public categoriaForm!: FormGroup;
  tipoSeleccionado: string = 'Sin seleccionar';
  public categoriaLista = [];
  public subcategoriaLista = [];
  ngOnInit(): void {
    this.FormInit();
    this.ListaCategory();
    this.ListSubCategory();
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
          if (response.message === 'Categoria creada') {
            this.alertService.showSuccess('Categoria', 'Categoria creada');
            this.categoriaForm.reset();
            this.ListaCategory();
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

            this.alertService.MinShowSucces("Creador","Subcategoría")
            this.ListSubCategory();
            this.categoriaForm.reset();
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
        this.categoriaLista = res.categoria;
      },
      (error) => {
        this.handleError;
      }
    );
  }
  private ListSubCategory() {
    this.categoriaService.ListSubCategorias().subscribe(
      (res) => {
        this.subcategoriaLista = res.subcategoria;
      },
      (error) => {
        this.handleError(error);
      }
    );
  }

  public irEditar() {
    this.router.navigate(["/editarCategoria"])
  }
}
