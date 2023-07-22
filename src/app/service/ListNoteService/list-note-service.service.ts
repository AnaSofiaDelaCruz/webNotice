import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NOTA } from 'src/app/interfaces/nota';

@Injectable({
  providedIn: 'root',
})
export class ListNoteService {
  private headers: HttpHeaders;
  private id: any;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.checkToken();
  }
  private checkToken(): void {
    const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local (o de donde lo hayas guardado)
    if (token) {
      this.setAuthorizationHeader(token);
    } else {
    }
  }
  private setAuthorizationHeader(token: string): void {
    this.headers = this.headers.set('Authorization', `Bearer ${token}`);
  }
  private apiUrl = 'http://localhost:8080'; // URL de la API

  ListNotas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/noticias`, {
      headers: this.headers,
    });
  }

  DeleteNotas(id: number, rol: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/borrar/noticia/${id}/${rol}`, {
      headers: this.headers,
    });
  }

  ListNotasAdmi(): Observable<any> {
    this.id = this.http.get(`${this.apiUrl}/api/noticias/administrador`, {
      headers: this.headers,
    });
    console.log(this.id, ' esto es id :D');
    localStorage.setItem('id', this.id);
    return this.id;
  }

  getId() {
    return localStorage.getItem('id');
  }

  listNewEscritor() {}
}
