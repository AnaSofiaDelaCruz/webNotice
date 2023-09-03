import { Component } from '@angular/core';

@Component({
  selector: 'app-noticias-internacionales',
  templateUrl: './noticias-internacionales.component.html',
  styleUrls: ['./noticias-internacionales.component.css'],
})
export class NoticiasInternacionalesComponent {
  public active: boolean = true;
  setActive(): void {
    this.active = !this.active;
  }
}
