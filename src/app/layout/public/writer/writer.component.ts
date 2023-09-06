import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/service/AlertService/alert.service';
import { CategoriaService } from 'src/app/service/CategoriaService/categoria.service';
import { NotaService } from 'src/app/service/NotaService/nota.service';

@Component({
  selector: 'app-writer',
  templateUrl: './writer.component.html',
  styleUrls: ['./writer.component.css'],
})
export class WriterComponent implements OnInit {
  public notaForm!: FormGroup; // Declara el FormGroup.
  public categories = [];
  public subcategories = [];
  public selectedImages: File[] = [];
  constructor(
    private fb: FormBuilder,
    private categorias: CategoriaService,
    private alertService: AlertService,
    private notaServie: NotaService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {} // Inyecta FormBuilder en el constructor

  ngOnInit(): void {
    this.CrearGroup();
    this.ListCategories();
    this.ListSubCategories();
    if (!this.notaForm.get('id')!.value) {
      this.notaForm.patchValue({ id: null }); // Asegúrate de que el campo id esté vacío
    }
    console.log(localStorage.getItem('token'));
  }
  editorConfig = {
    height: 500,
    with: 500,
    menubar: 'file edit view',
    plugins: 'advlist autolink lists link image charmap print preview anchor',
    toolbar:
      'undo redo | formatselect | bold italic backcolor underline | \
      alignleft aligncenter alignright alignjustify | \
      bullist numlist outdent indent | removeformat | charmap | link | table | help',
  };

  selectImages(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.files) {
      this.selectedImages = [];
      for (let i = 0; i < input.files.length; i++) {
        this.selectedImages.push(input.files[i]);
      }
    }
  }
  private CrearGroup() {
    this.notaForm = this.formBuilder.group({
      id: [''],
      titulo: ['', Validators.required],
      categoriaID: ['Sin seleccionar', Validators.required],
      subcategoriaID: ['Sin seleccionar', Validators.required],
      descripcion: ['', Validators.required],
      images: [''],
    });
  }
  public CrearNota() {
    if (this.notaForm.valid) {
      const formData = new FormData();
      formData.append('titulo', this.notaForm.get('titulo')!.value);
      formData.append('categoriaID', this.notaForm.get('categoriaID')!.value);
      formData.append(
        'subcategoriaID',
        this.notaForm.get('subcategoriaID')!.value
      );
      formData.append('descripcion', this.notaForm.get('descripcion')!.value);
      formData.append('rol', localStorage.getItem('rol')!);
      this.selectedImages.forEach((image) => {
        formData.append('images', image);
      });
      this.notaServie.CrearNota(formData).subscribe(
        (response) => {
          if (response.message === 'Nota creada') {
            this.alertService.MinShowSucces('Nota Publicada', 'Nota creada');
            this.router.navigate(['/homeAdmin']);
          }
        },
        (error) => {}
      );
    } else {
      this.alertService.ShowErrorAlert('No deje campos vacios');
    }
  }
  public activar: boolean = true;

  public AlternarMenu(): void {
    this.activar = !this.activar;
  }
  private ListCategories() {
    this.categorias.ListCategorias().subscribe((response) => {
      this.categories = response.categoria;
    });
  }
  private ListSubCategories() {
    this.categorias.ListSubCategorias().subscribe((response) => {
      this.subcategories = response.subcategoria;
    });
  }

  private handleError(error: any) {
    if (error.status === 401) {
      this.alertService.ShowErrorAlert('Token invalido');
    } else if (error.status === 500) {
      this.alertService.ShowErrorAlert('Intentelo más tarde');
    } else if (error.status === 403) {
      this.alertService.ShowErrorAlert('Token invalido');
    }
  }
}
