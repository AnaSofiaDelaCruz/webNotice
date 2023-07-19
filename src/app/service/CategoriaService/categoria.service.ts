import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CATEGORIA } from 'src/app/interfaces/categoria';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private headers: HttpHeaders;
  private apiUrl = 'http://localhost:8080'; // URL de la API

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.checkToken();
  }

  private checkToken(): void {
    const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local (o de donde lo hayas guardado)
    if (token) {
      this.setAuthorizationHeader(token);
    }
  }

  private setAuthorizationHeader(token: string): void {
    this.headers = this.headers.set('Authorization', `Bearer ${token}`);
  }

  ListCategoria(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/categorias`, {
      headers: this.headers,
    });
  }

  buscarCategoria(termino: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/buscar?q=${termino}`, {
      headers: this.headers,
    });
  }

  CreateCategoria(categoria: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/crear/categoria`, categoria, {
      headers: this.headers,
    });
  }

  DeleteCategoria(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/borrar/categoria/${id}`, {
      headers: this.headers,
    });
  }

  UpdateCategoria(categoria: CATEGORIA, id: number) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { id: id, categoria: categoria };
    return this.http.put(`${this.apiUrl}/api/actualizar/categoria`, body, {
      headers: this.headers,
    });
  }
}
