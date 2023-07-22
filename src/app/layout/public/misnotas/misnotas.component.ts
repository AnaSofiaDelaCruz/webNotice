import { HttpErrorResponse } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faSearch,
  faEdit,
  faTrash,
  faFileText,
} from '@fortawesome/free-solid-svg-icons';
import { NOTA } from 'src/app/interfaces/nota';

import { AlertService } from 'src/app/service/AlertService/alert.service';
import { ListNoteService } from 'src/app/service/ListNoteService/list-note-service.service';

@Component({
  selector: 'app-mis-notas',
  templateUrl: './misnotas.component.html',
  styleUrls: ['./misnotas.component.css'],
})
export class MisNotasComponent implements OnInit {
  public notas: NOTA[] = [];

  faSearch = faSearch;
  faEdit = faEdit;
  faTrash = faTrash;
  faFileText = faFileText;

  constructor(
    private router: Router,
    private lisNotasService: ListNoteService,
    private alertService: AlertService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.checkToken();
    this.ListNota();
  }

  private checkToken(): void {
    const rol = localStorage.getItem('rol');
    // Realiza las acciones necesarias con el token
  }

  getDescripcionHTML(descripcion: SafeHtml): string {
    return (
      this.sanitizer.sanitize(0 /* TrustedResourceUrl */, descripcion) || ''
    );
  }

  ListNota() {
    this.lisNotasService.ListNotas().subscribe(
      ({ noticias }: any) => {
        noticias.forEach((nota: NOTA) => {
          nota.descripcion = this.getDescripcionHTML(nota.descripcion);
        });
        this.notas = noticias;
      },
      (error: HttpErrorResponse) => {
        if (error.status === 500) {
          this.alertService.showErrorAlert('Servicio caído. Vuelva más tarde.');
        } else if (error.status === 404) {
          this.alertService.prueba();
        }
      }
    );
  }

  CrearNota() {
    this.router.navigate(['/crearnota']);
  }
}
