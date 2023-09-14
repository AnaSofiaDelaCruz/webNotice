import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotaService {
  private apiUrl = 'http://localhost:8080'; // URL de la API
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

  CrearNota(notaData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/registrar/nota`, notaData, {
      headers: this.headers,
    });
  }
  ListNotasAdmi(): Observable<any> {
    this.id = this.http.get(
      `${this.apiUrl}/api/noticias/fecha/${localStorage.getItem('rol')}`,
      {
        headers: this.headers,
      }
    );
    localStorage.setItem('id', this.id);
    return this.id;
  }
  BuscarNota(termino: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/buscar/nota?q=${termino}`);
  }

  BuscarNotaId(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/noticia/${id}`);
  }

  ActualizarNota(id: any, nota: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/actualizar/nota/${id}`, nota, {
      headers: this.headers,
    });
  }
}
