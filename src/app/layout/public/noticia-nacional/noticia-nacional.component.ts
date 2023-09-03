import { Component } from '@angular/core';

@Component({
  selector: 'app-noticia-nacional',
  templateUrl: './noticia-nacional.component.html',
  styleUrls: ['./noticia-nacional.component.css'],
})
export class NoticiaNacionalComponent {
  public active: boolean = true;
  setActive(): void {
    this.active = !this.active;
  }
}
