import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-writer',
  templateUrl: './new-writer.component.html',
  styleUrls: ['./new-writer.component.css'],
})
export class NewWriterComponent {
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
