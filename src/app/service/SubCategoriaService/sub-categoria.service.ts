import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SUBCATEGORIA } from 'src/app/interfaces/subCategoria';
@Injectable({
  providedIn: 'root',
})
export class SubCategoriaService {
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
  ListSubCategoria(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/subcategoria`, {
      headers: this.headers,
    });
  }
  BuscarSubCategoria(termino: string): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/api/buscar/subcategoria?q=${termino}`,
      {
        headers: this.headers,
      }
    );
  }
  CreateSubCaterogira(categoria: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/crear/subcategoria`, categoria, {
      headers: this.headers,
    });
  }
  DeleteSubCategoria(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/borrar/subcategoria/${id}`, {
      headers: this.headers,
    });
  }
  UpdateSubCategoria(subCategoria: SUBCATEGORIA, id: number) {
    const body = { id: id, subcategoria: subCategoria };
    return this.http.put(`${this.apiUrl}/api/actualizar/subcategoria`, body, {
      headers: this.headers,
    });
  }
}
