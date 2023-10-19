import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/service/DashboardService/dashboard.service';
@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css'],
})
export class ResultadosComponent {
  public notasEncontradas: { items: any[]; itemPaths: string[] }[] = [];
  public cantidad = 0;
  constructor(
    private route: ActivatedRoute,
    private dashboardService: DashboardService,
    private router: Router,
  ) {}
  busqueda = '';
  ngOnInit() {
    this.route.params.subscribe((params) => {
      const parametro = params['id']; // Obtiene el valor del parámetro
      // Utiliza el valor del parámetro en Componente B según tus necesidades
      this.busqueda = parametro;
    });
    this.Buscar()
  }

  public Buscar() {
    this.dashboardService.BuscarNota(this.busqueda).subscribe((response) => {
      // Almacenar las notas encontradas y cambiar el estado de busquedaRealizada
      this.notasEncontradas = response.noticias.map((noticia) => ({
        ...noticia,
        itemPaths: noticia.items.map((item: { path: any }) => item.path),
        item: noticia.items.map((item: { nombre: any }) => item.nombre),
      })); // Asegúrate de que response contenga las notas buscadas
      this.cantidad = this.notasEncontradas.length;
    });
  }

  public LeerNota(id: string) {
    this.router.navigate(['/news', id], {
      queryParams: { parametro1: id },
    });
  }
}
