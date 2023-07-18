import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-masopciones',
  templateUrl: './masopciones.component.html',
  styleUrls: ['./masopciones.component.css'],
})
export class MasopcionesComponent {
  constructor(private router: Router) {}
  MisNotas() {
    this.router.navigate(['/misnotas']);
  }
  CrearNota() {
    this.router.navigate(['/crearnota']);
  }
  Categorias() {
    this.router.navigate(['/categoria']);
  }
  SubCategorias() {
    this.router.navigate(['/subcategoria']);
  }
}
