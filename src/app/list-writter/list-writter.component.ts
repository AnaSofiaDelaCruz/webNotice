import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ListarEscritoresService } from '../service/ListarEscritoresService/listar-escritores.service';
import { AlertService } from '../service/AlertService/alert.service';

@Component({
  selector: 'app-list-writter',
  templateUrl: './list-writter.component.html',
  styleUrls: ['./list-writter.component.css'],
})
export class ListWritterComponent {
  public cantidadEscritores: number = 0;
  public escritores = [];
  public active: boolean = true;
  esAdmin = false;
  ngOnInit(): void {
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
    private alertas: AlertService
  ) {}
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
    console.log('Esto tiene idEscritor: ', idEscritor);
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
}
