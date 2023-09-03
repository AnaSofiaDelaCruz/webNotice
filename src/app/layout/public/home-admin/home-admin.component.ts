import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/service/AlertService/alert.service';
import { NotaService } from 'src/app/service/NotaService/nota.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css'],
})
export class HomeAdminComponent implements OnInit {
  public activar: boolean = true;
  public active: boolean = true;
  public notaCompleta: { items: any[]; itemPaths: string[] }[] = []; // Anotación de tipo
  @ViewChild('inputText') inputText!: ElementRef;

  ngOnInit(): void {
    this.ListaNoticia();
  }

  constructor(
    private notaService: NotaService,
    private alertService: AlertService
  ) {}

  private ListaNoticia() {
    this.notaService.ListNotasAdmi().subscribe((response) => {
      this.notaCompleta = response.noticias.map((noticia) => ({
        ...noticia,
        itemPaths: noticia.items.map((item: { path: any }) => item.path), // Almacena los paths
      }));
    });
  }

  BuscarNota(termino: string) {
    this.notaService.BuscarNota(termino).subscribe(
      (response) => {
        // Mapear la respuesta para ajustarla al formato de notaCompleta
        this.notaCompleta = response.noticia.map((noticia: any) => ({
          items: noticia.items,
          itemPaths: noticia.items.map((item: any) => item.path),
          titulo: noticia.titulo,
          createdAt: noticia.createdAt,
          descripcion: noticia.descripcion,
        }));
      },
      (error) => {
        this.handleError(error);
        this.ListaNoticia();
        this.inputText.nativeElement.value = '';
      }
    );
  }

  AlternarMenu(): void {
    this.activar = !this.activar;
  }

  setActive(): void {
    this.active = !this.active;
  }

  private handleError(error: any) {
    if (error.status === 401) {
      this.alertService.ShowErrorAlert('Token invalido');
    } else if (error.status === 500) {
      this.alertService.ShowErrorAlert('Intentelo más tarde');
    } else if (error.status === 403) {
      this.alertService.ShowErrorAlert('Token invalido');
    }
  }
}
