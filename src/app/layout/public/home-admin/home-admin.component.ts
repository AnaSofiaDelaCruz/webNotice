import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css'],
})
export class HomeAdminComponent {
  public activar: boolean = true;
  public active: boolean = true;

  AlternarMenu(): void {
    this.activar = !this.activar;
  }

  setActive(): void {
    this.active = !this.active;
  }

  cerrarSesion() {
    // Borra los datos del localStorage
    localStorage.clear();
  }
}
