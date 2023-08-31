import { Component } from '@angular/core';

@Component({
  selector: 'app-noticia-opinion',
  templateUrl: './noticia-opinion.component.html',
  styleUrls: [
    '../noticia-nacional/noticia-nacional.component.css',
  ],
})
export class NoticiaOpinionComponent {
  public active: boolean = true;
  setActive(): void {
    this.active = !this.active;
  }
}
