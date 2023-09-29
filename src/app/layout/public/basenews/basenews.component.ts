import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LeerNoticiaService } from 'src/app/service/LeerNoticiaService/leer-noticia.service';

@Component({
  selector: 'app-basenews',
  templateUrl: './basenews.component.html',
  styleUrls: ['./basenews.component.css'],
})
export class BasenewsComponent implements OnInit {
  public idEncontrado: any;
  public notita: any; // Cambia el tipo de notita a 'any' ya que no sabemos la estructura exacta de la respuesta
  public firstTwoImages: any[] = []; // Agregamos un arreglo para las dos primeras imágenes

  constructor(
    private route: ActivatedRoute,
    private leerNota: LeerNoticiaService,
    private router: Router
  ) {
    this.route.queryParams.subscribe((params) => {
      const parametro1 = params['parametro1'];
      this.idEncontrado = parametro1;
    });
  }
  ngOnInit(): void {
    this.LecturaNoticia();
  }

  public ocultarBoton = false;
  private LecturaNoticia() {
    this.leerNota.LeerNota(this.idEncontrado).subscribe((response) => {
      if (response && response.noticia) {
        this.notita = response.noticia;
        if (this.notita.items.length > 2) {
          console.log('Hay mas de 2 imagenes');
        } else {
          console.log('Solo hay una imagen');
          this.ocultarBoton = true;
        }
        this.firstTwoImages = this.notita.items.slice(0, 2);
      }
    });
  }
  Redireccionar() {
    if (
      localStorage.getItem('rol') === 'administrador' ||
      localStorage.getItem('rol') === 'escritor'
    ) {
      this.router.navigate(['/homeAdmin']);
    } else {
      this.router.navigate(['/home']);
    }
  }
}
