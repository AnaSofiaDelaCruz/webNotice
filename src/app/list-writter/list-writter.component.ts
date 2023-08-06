import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-writter',
  templateUrl: './list-writter.component.html',
  styleUrls: ['./list-writter.component.css'],
})
export class ListWritterComponent {
  public active: boolean = true;
  esAdmin = false;
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const rol = localStorage.getItem('rol');
    if (rol === 'administrador' || rol === 'Administrador') {
      this.esAdmin = true;
    }
  }
  constructor(public router: Router) {}
  cerrarSesion(): void {
    this.router.navigate(['/login']);
  }

  setActive(): void {
    this.active = !this.active;
  }
}
