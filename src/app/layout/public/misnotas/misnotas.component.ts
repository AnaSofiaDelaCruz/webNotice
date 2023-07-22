import { HttpErrorResponse } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faSearch,
  faEdit,
  faTrash,
  faFileText,
  faChild,
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
  public NotasAdmi = false;
  faSearch = faSearch;
  faEdit = faEdit;
  faTrash = faTrash;
  faFileText = faFileText;
  faChildCombatant = faChild;
  constructor(
    private router: Router,
    private lisNotasService: ListNoteService,
    private alertService: AlertService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.checkToken();
    this.CheckButton();
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

  ChangeStatus() {
    this.NotasAdmi = !this.NotasAdmi;
  }

  CheckButton() {
    if (this.NotasAdmi) {
      this.ListNotaAdmi();
    } else {
      this.ListNota();
    }
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

  DeleteNota(id: number) {
    const rol = localStorage.getItem('rol')!;
    this.alertService
      .AlertWarningDelete('¿Desea eliminarlo?. Recuerde que no se recuperará')
      .then(
        (result) => {
          this.lisNotasService.DeleteNotas(id, rol).subscribe((response) => {
            console.log(response.message, ' response');
            if (response.message === 'Noticia eliminada') {
              this.alertService.showSuccess('Eliminado', 'Nota eliminada');
              this.ListNota();
            }
          });
        },
        (error) => {
          this.handleError(error);
        }
      );
  }

  ListNotaAdmi() {
    this.lisNotasService.ListNotasAdmi().subscribe(
      ({ noticias }: any) => {
        noticias.forEach((nota: NOTA) => {
          nota.descripcion = this.getDescripcionHTML(nota.descripcion);
        });
        this.notas = noticias;
      },
      (error) => {
        this.handleError(error);
      }
    );
  }

  private handleError(error: any) {
    if (error.status === 404) {
      this.alertService.showErrorAlert('No se encontró la categoría');
    } else if (error.status === 401) {
      this.alertService.showErrorAlert('No tiene permiso para estar aquí');
    } else if (error.status === 500) {
      this.alertService.showErrorAlert('Intente más tarde por favor');
    }
  }

  CrearNota() {
    this.router.navigate(['/crearnota']);
  }
}
