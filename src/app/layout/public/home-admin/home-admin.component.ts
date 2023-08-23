import { Component } from '@angular/core';

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
}
