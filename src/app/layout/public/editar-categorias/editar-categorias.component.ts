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
        console.log("Esto tiene mi subcategoria:",this.datosObtenidos);
        
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


  public mostrarPrimerH1:boolean = true;

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
}
