import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AlertService } from 'src/app/service/AlertService/alert.service';
import { CategoriaService } from 'src/app/service/CategoriaService/categoria.service';
import { DashboardService } from 'src/app/service/DashboardService/dashboard.service';
import { NotaService } from 'src/app/service/NotaService/nota.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent {
  lista_categoria = [];
  lista_subcategoria = [];
  seleccionado: string = '';
  public notaCompleta: { items: any[]; itemPaths: string[] }[] = [];
  ngOnInit(): void {
    this.cargar_categorias();
    this.cargar_subcategorias();
    this.cargar_noticias();
  }
  constructor(
    private servicio_categorias: CategoriaService,
    private servicio_dashboard: DashboardService,
    private servicio_alertas: AlertService,
    private servicio_notas: NotaService,
    private router: Router
  ) {}

  private cargar_categorias() {
    console.log('Ola');
    this.servicio_categorias.ListCategorias().subscribe(
      (res) => {
        this.lista_categoria = res.categoria;
        console.log(this.lista_categoria);
      },
      (error) => {
        console.log('Error al cargar las categorias');
      }
    );
  }

  private cargar_subcategorias() {
    console.log('Ola');
    this.servicio_categorias.ListSubCategorias().subscribe(
      (res) => {
        this.lista_subcategoria = res.subcategoria;
        console.log(this.lista_subcategoria);
      },
      (error) => {
        console.log('Error al cargar las categorias');
      }
    );
  }

  private cargar_noticias() {
    this.servicio_dashboard.ListNotas().subscribe((response) => {
      this.notaCompleta = response.noticias.map((noticia) => ({
        ...noticia,
        itemPaths: noticia.items.map((item: { path: any }) => item.path),
        item: noticia.items.map((item: { nombre: any }) => item.nombre),
      }));
      console.log('Esto tiene nota completa', this.notaCompleta);
    });
  }

  public eliminar_noticia(id: string) {
    let rol = localStorage.getItem('rol');

    console.log('Este es el ID de la publicación: ', id);

    this.servicio_alertas
      .AlertWarningDelete('¿Esta seguro de eliminar esta noticia?')
      .then((respuesta) => {
        if (respuesta.value) {
          this.servicio_dashboard.EliminarNoticia(id, rol).subscribe(
            (res) => {
              res.message === 'Noticia eliminada';
              this.servicio_alertas.showSuccess(
                'Operación exitosa',
                'La publicación fue eliminada exitosamente'
              );
              this.cargar_noticias();
            },
            (error) => {
              console.log('> Hay error al eliminar: ', error);
            }
          );
        } else {
          this.servicio_alertas.ShowErrorAlert('Operación Cancelada');
        }
      });
  }

  public editar_noticia(id: string) {
    this.router.navigate(['/writerEdit/', id], {
      queryParams: { parametro1: id },
    });
  }
}
