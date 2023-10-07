import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InternacionalService } from 'src/app/service/FiltradoCategoriaService/internacional.service';

@Component({
  selector: 'app-noticias-internacionales',
  templateUrl: './noticias-internacionales.component.html',
  styleUrls: ['./noticias-internacionales.component.css'],
})
export class NoticiasInternacionalesComponent implements OnInit {
  public nota: { items: any[]; itemPaths: string[] }[] = []; // Anotación de tipo

  ngOnInit(): void {
    this.NoticiasEncontradas();
  }
  constructor(
    private filtradoCategoria: InternacionalService,
    private router: Router
  ) {}
  public active: boolean = true;
  public LeerNota(id: string) {
    this.router.navigate(['/news', id], {
      queryParams: { parametro1: id },
    });
  }
  private NoticiasEncontradas() {
    this.filtradoCategoria
      .ListNotasByCategoria('Internacional')
      .subscribe((response) => {
        if (response && response.noticia) {
          this.nota = response.noticia.map((noticia) => ({
            ...noticia,
            itemPaths: noticia.items.map((item: { path: any }) => item.path),
          }));
          console.log(this.nota);
        } else {
        }
      });
  }
  Home() {
    if (
      localStorage.getItem('rol') === 'administrador' ||
      localStorage.getItem('rol') === 'escritor'
    ) {
      this.router.navigate(['/homeAdmi']);
    } else {
      this.router.navigate(['/home']);
    }
  }
  setActive(): void {
    this.active = !this.active;
  }
}
