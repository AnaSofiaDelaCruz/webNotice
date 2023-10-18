import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent {
  constructor(private route: ActivatedRoute) { }
  ngOnInit() {
    this.route.params.subscribe(params => {
      const parametro = params['parametro']; // Obtiene el valor del parámetro
      // Utiliza el valor del parámetro en Componente B según tus necesidades
      alert("TEnemos este dato:"+parametro)
    });
    
  }
}
