import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CATEGORIA } from 'src/app/interfaces/categoria';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private headers: HttpHeaders;
  private id: any;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.checkToken();
  }
  private checkToken(): void {
    const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local (o de donde lo hayas guardado)
    if (token) {
      console.log('SI we tiene token');
      this.setAuthorizationHeader(token);
    } else {
    }
  }
  private setAuthorizationHeader(token: string): void {
    this.headers = this.headers.set('Authorization', `Bearer ${token}`);
  }
  private apiUrl = 'http://localhost:8080'; // URL de la API

  ListCategoria() {
    return this.http.get(`${this.apiUrl}/api/categorias`, {
      headers: this.headers,
    });
  }

  buscarCategoria(termino: string) {
    return this.http.get(`${this.apiUrl}/api/buscar?q=${termino}`, {
      headers: this.headers,
    });
  }

  CreateCategoria(categoria: CATEGORIA): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { Nuevacategoria: categoria };
    console.log(body, ' body');
    return this.http.post(`${this.apiUrl}/api/crear/categoria`, body, {
      headers: this.headers,
    });
  }

  DeleteCategoria(id: number) {
    return this.http.delete(`${this.apiUrl}/api/borrar/categoria/${id}`, {
      headers: this.headers,
    });
  }

  UpdateCategoria(categoria: CATEGORIA) {
    console.log('SI ENTRO A SERVICE');
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { id: categoria.id, Nuevacategoria: categoria };
    return this.http.put(`${this.apiUrl}/api/actualizar/categoria`, body, {
      headers: this.headers,
    });
  }
}
