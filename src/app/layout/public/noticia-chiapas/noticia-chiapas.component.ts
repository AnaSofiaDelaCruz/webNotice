import { Component } from '@angular/core';

@Component({
  selector: 'app-noticia-chiapas',
  templateUrl: './noticia-chiapas.component.html',
  styleUrls: ['../noticia-nacional/noticia-nacional.component.css'],
})
export class NoticiaChiapasComponent {
  public active: boolean = true;
  setActive(): void {
    this.active = !this.active;
  }
}
