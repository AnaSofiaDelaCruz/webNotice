import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}

  showErrorAlert(message: string): void {
    Swal.fire({
      title: 'Error',
      text: message,
      icon: 'error',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK!',
    });
  }

  prueba() {
    Swal.fire({
      title: '¡Crea tu primera Nota!',
      // iconHtml: '<i class="fas fa-heart"></i>',
      icon: 'success',
      showConfirmButton: false,
      timer: 2500,
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
  showSuccess(message: string): void {
    Swal.fire({
      icon: 'success',
      title: message,
      text: '¡Gracias por utilizar nuestra página de noticias!',
    });
  }
}
