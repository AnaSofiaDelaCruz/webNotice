import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LeerNoticiaService } from 'src/app/service/LeerNoticiaService/leer-noticia.service';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-basenews',
  templateUrl: './basenews.component.html',
  styleUrls: ['./basenews.component.css'],
})
export class BasenewsComponent implements OnInit {
  public idEncontrado: any;
  public notita: any; // Cambia el tipo de notita a 'any' ya que no sabemos la estructura exacta de la respuesta
  public firstTwoImages: any[] = []; // Agregamos un arreglo para las dos primeras imágenes
  mostrarCarrusel: boolean = false;
  allImages: any[] = [];
  indiceDiapositivaActiva = 0;

  constructor(
    private route: ActivatedRoute,
    private leerNota: LeerNoticiaService,
    private router: Router // private modalService: NgModal
  ) {
    this.route.queryParams.subscribe((params) => {
      const parametro1 = params['parametro1'];
      this.idEncontrado = parametro1;
    });
  }
  ngOnInit(): void {
    this.LecturaNoticia();
    console.log(this.indiceDiapositivaActiva, ' indice');
    console.log(this.allImages.length, ' allimages');
  }

  public ocultarBoton = false;
  private LecturaNoticia() {
    this.leerNota.LeerNota(this.idEncontrado).subscribe((response) => {
      if (response && response.noticia) {
        console.log(response);

        this.notita = response.noticia;
        if (this.notita.items.length > 2) {
          console.log('Hay mas de 2 imagenes');
        } else {
          console.log('Solo hay una imagen');
          this.ocultarBoton = true;
        }
        this.allImages = this.notita.items;
        console.log(this.allImages.length," en lectura noticia");

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
  abrirCarrusel() {
    console.log(this.allImages);

    // Mostrar el modal del carrusel
    this.mostrarCarrusel = true;
  }

  cerrarCarrusel() {
    // Cerrar el modal del carrusel
    this.mostrarCarrusel = false;
  }
}
