import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-usuarios-admin',
  templateUrl: './menu-usuarios-admin.component.html',
  styleUrls: ['./menu-usuarios-admin.component.css']
})
export class MenuUsuariosAdminComponent {
  public probarBoton() {
    alert("El boton funciona")
  }
}
