import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CATEGORIA } from 'src/app/interfaces/categoria';
import { NOTA } from 'src/app/interfaces/nota';
import { SUBCATEGORIA } from 'src/app/interfaces/subCategoria';
import { AlertService } from 'src/app/service/AlertService/alert.service';
import { CategoriaService } from 'src/app/service/CategoriaService/categoria.service';
import { ListNoteService } from 'src/app/service/ListNoteService/list-note-service.service';
import { NotaService } from 'src/app/service/NotaService/nota.service';
import { SubCategoriaService } from 'src/app/service/SubCategoriaService/sub-categoria.service';

@Component({
  selector: 'app-crearnota',
  templateUrl: './crearnota.component.html',
  styleUrls: ['./crearnota.component.css'],
})
export class CrearnotaComponent implements OnInit {
  public notaForm!: FormGroup;
  nota: NOTA = {
    id: 0,
    titulo: '',
    descripcion: '',
    autor: '',
    fecha: '',
    categoriaID: 0,
    subcategoriaID: 0,
    rol: '',
    items: '',
  };

  editorConfig = {
    height: 350,
    with: 250,
    menubar: 'file edit view',
    plugins: 'advlist autolink lists link image charmap print preview anchor',
    toolbar:
      'undo redo | formatselect | bold italic backcolor underline | \
      alignleft aligncenter alignright alignjustify | \
      bullist numlist outdent indent | removeformat | charmap | link | table | help',
  };

  categorias!: CATEGORIA[];
  subCategorias!: SUBCATEGORIA[];
  selectedImages: File[] = [];
  id: any;
  constructor(
    private categoriaService: CategoriaService,
    private subCategoriaService: SubCategoriaService,
    private alertService: AlertService,
    private notaService: NotaService,
    private formBuilder: FormBuilder,
    private listNotaService: ListNoteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.ListCategoria();
    this.ListSubCategoria();
    this.initializeForm();
    this.obtenerDatos();
  }
  ListCategoria() {
    this.categoriaService.ListCategoria().subscribe((response) => {
      this.categorias = response.categoria;
    });
  }
  ListSubCategoria() {
    this.subCategoriaService.ListSubCategoria().subscribe((response) => {
      this.subCategorias = response.subcategoria;
    });
  }
  initializeForm() {
    this.notaForm = this.formBuilder.group({
      id: [''],
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      categoriaID: ['', Validators.required],
      subcategoriaID: ['', Validators.required],
      images: [''],
    });
  }

  CrearNota() {
    if (this.notaForm.valid) {
      const formData = new FormData();
      formData.append('titulo', this.notaForm.get('titulo')!.value);
      formData.append('descripcion', this.notaForm.get('descripcion')!.value);
      formData.append('categoriaID', this.notaForm.get('categoriaID')!.value);
      formData.append(
        'subcategoriaID',
        this.notaForm.get('subcategoriaID')!.value
      );
      formData.append('rol', localStorage.getItem('rol')!);
      this.selectedImages.forEach((image) => {
        formData.append('images', image);
      });
      if (this.notaForm.get('id')!.value) {
        formData.append('id', this.notaForm.get('id')!.value);
        this.notaService.ActualizarNota(formData).subscribe(
          (response) => {
            this.router.navigate(['/misnotas']);
          },
          (error) => {
            console.error('Error al actualizar la nota:', error);
            this.handleError(error);
          }
        );
      } else {
        this.notaService.CrearNota(formData).subscribe(
          (response) => {
            this.router.navigate(['/misnotas']);
          },
          (error) => {
            console.error('Error al crear la nota:', error);
            this.handleError(error);
          }
        );
      }
    }
  }

  selectImages(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.files) {
      this.selectedImages = [];
      for (let i = 0; i < input.files.length; i++) {
        this.selectedImages.push(input.files[i]);
      }
    }
  }

  obtenerDatos() {
    const notaId = this.route.snapshot.params['id'];
    if (notaId) {
      this.nota = this.listNotaService.obtenerNotaSeleccionada()!;
      this.notaForm.patchValue(this.nota);
    }
  }

  private handleError(error: any) {
    if (error.status === 404) {
      this.alertService.showErrorAlert('No se encontró la categoría');
    } else if (error.status === 401) {
      this.alertService.showErrorAlert('No tiene permiso para estar aquí');
    } else if (error.status === 500) {
      this.alertService.showErrorAlert('Intente más tarde por favor');
    } else if (error.status === 400) {
      this.alertService.showErrorAlert('Error en imagenes');
    }
  }
}
