import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/service/AlertService/alert.service';
import { CategoriaService } from 'src/app/service/CategoriaService/categoria.service';
import { DashboardService } from 'src/app/service/DashboardService/dashboard.service';
import { ListarEscritoresService } from 'src/app/service/ListarEscritoresService/listar-escritores.service';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css'],
})
export class AdministradorComponent {
  public cantidadEscritores: number = 0;
  public escritores = [];
  public active: boolean = true;
  esAdmin = false;
  public notaCompleta: { items: any[]; itemPaths: string[] }[] = [];
  public categoriaLista = [];
  public subcategoriaLista = [];
  ngOnInit(): void {
    this.activarEscritores();
    this.cargar_noticias();
    this.listar();
    console.log('Esto tiene localstorage:', localStorage.getItem('rol'));
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const rol = localStorage.getItem('rol');
    if (rol === 'administrador' || rol === 'Administrador') {
      this.esAdmin = true;
    }
  }
  constructor(
    public router: Router,
    private enlistar: ListarEscritoresService,
    private alertas: AlertService,
    private servicio_dashboard: DashboardService,
    private categoriaService: CategoriaService
  ) {}

  public activarEscritores() {
    const seccionCategorias = document.getElementById('seccion_categorias');
    const seccionEscritores = document.getElementById('seccion_escritores');
    seccionEscritores?.classList.remove('esconder');

    const seccionPubs = document.getElementById('seccion_publicaciones');
    seccionPubs?.classList.add('esconder');

    var checkbox1 = document.getElementById(
      'checkEscritores'
    ) as HTMLInputElement;
    var botonEscritores = document.getElementById(
      'botonEscritores'
    ) as HTMLButtonElement;
    checkbox1.checked = true;
    if (checkbox1.checked) {
      botonEscritores.classList.add('boton_seleccionado');
    }

    var checkbox2 = document.getElementById('checkPubs') as HTMLInputElement;
    var boton_pubs = document.getElementById('boton_pubs') as HTMLButtonElement;

    checkbox2.checked = false;
    boton_pubs.classList.remove('boton_seleccionado');

    var checkbox3 = document.getElementById(
      'checkCategorias'
    ) as HTMLInputElement;
    var boton_categorias = document.getElementById(
      'boton_categorias'
    ) as HTMLButtonElement;

    checkbox3.checked = false;
    boton_categorias.classList.remove('boton_seleccionado');
    seccionCategorias?.classList.add('esconder');
  }

  public activar_pubs() {
    const seccionCategorias = document.getElementById('seccion_categorias');
    const seccionPubs = document.getElementById('seccion_publicaciones');
    seccionPubs?.classList.remove('esconder');
    const seccionEscritores = document.getElementById('seccion_escritores');
    var checkbox2 = document.getElementById('checkPubs') as HTMLInputElement;
    var boton_pubs = document.getElementById('boton_pubs') as HTMLButtonElement;
    checkbox2.checked = true;
    if (checkbox2.checked) {
      boton_pubs.classList.add('boton_seleccionado');
      seccionEscritores?.classList.add('esconder');
    }

    var checkbox1 = document.getElementById(
      'checkEscritores'
    ) as HTMLInputElement;
    var botonEscritores = document.getElementById(
      'botonEscritores'
    ) as HTMLButtonElement;

    checkbox1.checked = false;
    botonEscritores.classList.remove('boton_seleccionado');

    var checkbox3 = document.getElementById(
      'checkCategorias'
    ) as HTMLInputElement;
    var boton_categorias = document.getElementById(
      'boton_categorias'
    ) as HTMLButtonElement;

    checkbox3.checked = false;
    boton_categorias.classList.remove('boton_seleccionado');
    seccionCategorias?.classList.add('esconder');
  }

  public activar_categorias() {
    this.router.navigate(['/crear-categoria']);
    const seccionCategorias = document.getElementById('seccion_categorias');
    const seccionPubs = document.getElementById('seccion_publicaciones');

    const seccionEscritores = document.getElementById('seccion_escritores');
    seccionCategorias?.classList.remove('esconder');
    var checkbox3 = document.getElementById(
      'checkCategorias'
    ) as HTMLInputElement;
    var boton_categorias = document.getElementById(
      'boton_categorias'
    ) as HTMLButtonElement;

    checkbox3.checked = true;
    if (checkbox3.checked) {
      boton_categorias.classList.add('boton_seleccionado');
      seccionEscritores?.classList.add('esconder');
      seccionPubs?.classList.add('esconder');
    }

    var checkbox1 = document.getElementById(
      'checkEscritores'
    ) as HTMLInputElement;
    var botonEscritores = document.getElementById(
      'botonEscritores'
    ) as HTMLButtonElement;

    checkbox1.checked = false;
    botonEscritores.classList.remove('boton_seleccionado');

    var checkbox2 = document.getElementById('checkPubs') as HTMLInputElement;
    var boton_pubs = document.getElementById('boton_pubs') as HTMLButtonElement;

    checkbox2.checked = false;
    boton_pubs.classList.remove('boton_seleccionado');
  }
  cerrarSesion(): void {
    this.router.navigate(['/login']);
  }

  setActive(): void {
    this.active = !this.active;
  }
  public listar() {
    this.enlistar.listarEscritoresFuncion().subscribe(
      (res) => {
        this.escritores = res.message;
        this.cantidadEscritores = this.escritores.length;
        console.log(this.escritores);
      },
      (error) => {
        this.handleError;

        this.handleError(error);
      }
    );
  }

  private handleError(error: any) {
    if (error.status === 401) {
      this.alertas.ShowErrorAlert(
        'No tienes permiso para acceder a esta sección.'
      );
    }
    if (error.status === 404) {
      this.alertas.ShowErrorAlert('No hay datos.');
    }
    if (error.status === 500) {
      this.alertas.ShowErrorAlert(
        'El servidor no funciona, intentelo mas tarde.'
      );
    }
  }

  public encontrarEscritor(idEscritor: any) {
    this.router.navigate(['/editarPerfil/', idEscritor], {
      queryParams: { parametro1: idEscritor },
    });
  }

  public eliminarEscritor(idEscritor: any) {
    // Mostrar una advertencia al usuario antes de eliminar
    this.alertas
      .AlertWarningDelete('¡Alerta! el escritor sera eliminado permanente...')
      .then((result) => {
        if (result.value) {
          // Si el usuario confirma la eliminación, procede con la solicitud DELETE
          this.enlistar.eliminaEscritorFuncion(idEscritor).subscribe(
            (response) => {
              if (response.message === 'Escritor borrado') {
                // Mostrar mensaje de éxito
                this.alertas.showSuccess(
                  'Escritor eliminado',
                  'Escritor borrado exitosamente'
                );

                // Actualizar la lista de escritores u otras acciones necesarias
                this.listar();
              }
              // Maneja la respuesta si es necesario
              console.log('Registro eliminado con éxito', response);
            },
            (error) => {
              // Maneja el error si ocurre uno
              console.error('Error al eliminar el registro', error);
            }
          );
        } else {
          // Si el usuario cancela la eliminación, puedes manejarlo aquí
          console.log('Eliminación cancelada por el usuario');
        }
      });
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

    this.alertas
      .AlertWarningDelete('¿Esta seguro de eliminar esta noticia?')
      .then((respuesta) => {
        if (respuesta.value) {
          this.servicio_dashboard.EliminarNoticia(id, rol).subscribe(
            (res) => {
              res.message === 'Noticia eliminada';
              this.alertas.showSuccess(
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
          this.alertas.ShowErrorAlert('Operación Cancelada');
        }
      });
  }

  public editar_noticia(id: string) {
    this.router.navigate(['/writerEdit/', id], {
      queryParams: { parametro1: id },
    });
  }

  private ListaCategory() {
    this.categoriaService.ListCategorias().subscribe(
      (res) => {
        console.log('Esto tiene res:', res);

        this.categoriaLista = res.categoria;
      },
      (error) => {
        this.handleError(error);
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
}
