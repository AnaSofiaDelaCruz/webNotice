import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { CATEGORIA } from 'src/app/interfaces/categoria';
import { NOTA } from 'src/app/interfaces/nota';
import { SUBCATEGORIA } from 'src/app/interfaces/subCategoria';
import { AlertService } from 'src/app/service/AlertService/alert.service';
import { CategoriaService } from 'src/app/service/CategoriaService/categoria.service';
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
    images: '',
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
  constructor(
    private categoriaService: CategoriaService,
    private subCategoriaService: SubCategoriaService,
    private alertService: AlertService,
    private notaService: NotaService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.ListCategoria();
    this.ListSubCategoria();
    this.initializeForm();
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
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      categoriaID: ['', Validators.required],
      subcategoriaID: ['', Validators.required],
      images: [''],
      // Otras propiedades de la nota, si es necesario
    });
  }

  CrearNota() {
    const formData = new FormData();
    formData.append('titulo', this.notaForm.get('titulo')!.value);
    formData.append('descripcion', this.notaForm.get('descripcion')!.value);
    formData.append('categoriaID', this.notaForm.get('categoriaID')!.value);
    formData.append(
      'subcategoriaID',
      this.notaForm.get('subcategoriaID')!.value
    );
    formData.append('rol', localStorage.getItem('rol')!);

    // Agregar todas las imágenes seleccionadas al FormData
    this.selectedImages.forEach((image) => {
      formData.append('images', image);
    });

    this.notaService.CrearNota(formData).subscribe(
      (response) => {
        this.notaForm.reset();
        this.selectedImages = []; // Limpiar el arreglo después de guardar la nota
      },
      (error) => {
        this.handleError(error);
      }
    );
  }

  // Función para manejar la selección de imágenes
  selectImages(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.files) {
      this.selectedImages = [];
      for (let i = 0; i < input.files.length; i++) {
        this.selectedImages.push(input.files[i]);
      }
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
