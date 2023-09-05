import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/service/DashboardService/dashboard.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
})
export class PrincipalComponent implements OnInit {
  public active: boolean = true;
  public notaCompleta: { items: any[]; itemPaths: string[] }[] = []; // Anotación de tipo
  public notasLimitadas: { items: any[]; itemPaths: string[] }[] = []; //!Notas de arriba

  public notaAbajo: { items: any[]; itemPaths: string[] }[] = []; // Anotación de tipo
  public notasAbajoLimitadas: { items: any[]; itemPaths: string[] }[] = []; //!Notas de abajo
  public fechaActual: string = '';
  tokenEnLocalStorage: boolean = false;
  esAdmin = false;

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.tokenEnLocalStorage = true;
    }
    this.ListaNotas();
    this.NotaDelDia();
  }
  constructor(
    private router: Router,
    private dashboardService: DashboardService
  ) {}
  cerrarSesion(): void {
    localStorage.removeItem('token');
    this.tokenEnLocalStorage = false;
    this.router.navigate(['/login']);
  }

  private ListaNotas() {
    this.dashboardService.ListNotas().subscribe((response) => {
      this.notaCompleta = response.noticias.map((noticia) => ({
        ...noticia,
        itemPaths: noticia.items.map((item: { path: any }) => item.path),
        item: noticia.items.map((item: { nombre: any }) => item.nombre),
      }));
      this.notasLimitadas = this.notaCompleta.slice(0, 2);
    });
  }
  public FiltrarNota(categoria: string) {
    if (
      categoria === 'Noticias del día' ||
      categoria === 'noticias del dia' ||
      categoria === 'Noticias del dia'
    ) {
      this.NotaDelDia();
    } else {
      this.NotaOtros(categoria);
    }
  }

  private NotaDelDia() {
    this.dashboardService.ListNotas().subscribe((response) => {
      this.notaAbajo = response.noticias.map((noticia) => ({
        ...noticia,
        itemPaths: noticia.items.map((item: { path: any }) => item.path),
        item: noticia.items.map((item: { nombre: any }) => item.nombre),
      }));
      this.notasAbajoLimitadas = this.notaAbajo.slice(0, 19);
    });
  }

  private NotaOtros(categoria: string) {
    this.dashboardService
      .ListNotasByCategoria(categoria)
      .subscribe((response) => {
        if (response && response.noticia) {
          this.notaAbajo = response.noticia.map((noticia) => ({
            ...noticia,
            itemPaths: noticia.items.map((item: { path: any }) => item.path),
          }));
          this.notasAbajoLimitadas = this.notaAbajo.slice(0, 19);
        } else {
        }
      });
  }

  setActive(): void {
    this.active = !this.active;
  }
}
