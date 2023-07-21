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

  showSuccess(message: string): void {
    Swal.fire({
      icon: 'success',
      title: message,
      text: '¡Gracias por utilizar nuestra página de noticias!',
    });
  }
}
