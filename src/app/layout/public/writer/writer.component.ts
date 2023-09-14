import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/service/AlertService/alert.service';
import { CategoriaService } from 'src/app/service/CategoriaService/categoria.service';
import { NotaService } from 'src/app/service/NotaService/nota.service';

@Component({
  selector: 'app-writer',
  templateUrl: './writer.component.html',
  styleUrls: ['./writer.component.css'],
})
export class WriterComponent implements OnInit {
  public idNoticiaEncontrada: any;
  public notaForm!: FormGroup; // Declara el FormGroup.
  public categories = [];
  public subcategories = [];
  public selectedImages: File[] = [];
  public notita: any;

  public editarActivo!: boolean;
  constructor(
    private fb: FormBuilder,
    private categorias: CategoriaService,
    private alertService: AlertService,
    private notaServie: NotaService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private servicio_nota: NotaService
  ) {
    this.route.queryParams.subscribe((params) => {
      const parametro1 = params['parametro1'];
      this.idNoticiaEncontrada = parametro1;
    });
  } // Inyecta FormBuilder en el constructor

  ngOnInit(): void {
    this.CrearGroup();
    this.ListCategories();
    this.ListSubCategories();
    if (!this.notaForm.get('id')!.value) {
      this.notaForm.patchValue({ id: null }); // Asegúrate de que el campo id esté vacío
    }
    console.log(localStorage.getItem('token'));
    this.cargarNoticia();
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
      categoriaID: ['', Validators.required],
      subcategoriaID: ['', Validators.required],
      descripcion: ['', Validators.required],
      images: [''],
    });
  }
  public CrearNota() {
    if (this.editarActivo) {
      this.editarNoticia();
    } else {
      if (this.notaForm.valid) {
        console.log(this.notaForm.get('categoriaID')!.value);
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
          (error) => {
            this.handleError(error);
          }
        );
      } else {
        this.alertService.ShowErrorAlert('No deje campos vacios');
      }
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

  private cargarNoticia() {
    this.editarActivo = true;
    this.servicio_nota
      .BuscarNotaId(this.idNoticiaEncontrada)
      .subscribe((res) => {
        this.notita = res.noticia;
        console.log(this.notita);
        this.notaForm.patchValue(this.notita);
      });
  }

  private editarNoticia() {
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
      console.log("Esto trae selectedImages:",this.selectImages);
      
      this.selectedImages.forEach((image) => {
        formData.append('images', image);
      });
      this.notaServie
        .ActualizarNota(this.idNoticiaEncontrada, formData)
        .subscribe(
          (res) => {
            this.alertService.showSuccess(
              'Cambios guardados',
              'La nota fue editada exitosamente.'
            );
            this.router.navigate(['/statistics']);
          },
          (error) => {
            this.alertService.ShowErrorAlert(error);
          }
        );
    }
    this.editarActivo = false;
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
