import { Injectable } from '@angular/core';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}
  ShowErrorAlert(message: string): void {
    Swal.fire({
      title: 'Error',
      text: message,
      icon: 'error',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK!',
    });
  }

  AlertWarningDelete(mensaje: string) {
    return Swal.fire({
      title: '¿Estás seguro?',
      text: mensaje,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    });
  }
  ShowConfirmationAlert(
    title: string,
    message: string,
    confirmText: string,
    cancelText: string
  ) {
    Swal.fire({
      icon: 'warning',
      title: title,
      text: message,
      showCancelButton: true,
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
    }).then((result) => {
      if (result.isConfirmed) {
        this.showSuccess('CORRECTO', 'Esta nota no tendra imagendes');
      } else if (result.isDismissed) {
        console.log('Se hizo clic en ' + cancelText);
      }
    });
  }
  Animado(titulo: String) {
    Swal.fire({
      title: '¡Crea tu primera Nota!',
      icon: 'success',
      showConfirmButton: false,
      timer: 1500,
      didOpen: (modal) => {
        setTimeout(() => {
          modal.style.opacity = '1';
          modal.style.transform = 'scale(1)';
          modal.style.transition = 'opacity 0.5s, transform 0.5s';
        }, 100);
      },
      willClose: (modal) => {
        modal.style.opacity = '0';
        modal.style.transform = 'scale(0.5)';
      },
    }).then(() => {
      console.log('Animación personalizada completada');
    });
  }

  showSuccess(title: string, text: string): void {
    Swal.fire({
      icon: 'success',
      title: title,
      text: text,
    });
  }

  MinShowSucces(message: string, title?: string) {
    const options: SweetAlertOptions = {
      icon: 'success',
      title: title || 'Success',
      text: message,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    };

    Swal.fire(options);
  }

  InputAlert(tittle?: string): Promise<string | null> {
    return new Promise((resolve) => {
      Swal.fire({
        title: tittle,
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off',
        },
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        showLoaderOnConfirm: false,
      }).then((result) => {
        if (result.isConfirmed) {
          const valor_input = result.value;
          resolve(valor_input);
        } else {
          resolve(null);
        }
      });
    });
  }
}
