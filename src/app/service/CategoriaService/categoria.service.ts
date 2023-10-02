import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private apiUrl = 'http://localhost:8080'; // URL de la API
  private headers: HttpHeaders;
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

  public RegistrarCategoria(Nuevacategoria: FormGroup): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/api/crear/categoria`,
      Nuevacategoria,
      {
        headers: this.headers,
      }
    );
  }
  public RegistrarSubCategoria(Nuevacategoria: FormGroup): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/api/crear/subcategoria`,
      Nuevacategoria,
      {
        headers: this.headers,
      }
    );
  }
  public ListCategorias(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/categorias`, {
      headers: this.headers,
    });
  }
  public ListSubCategorias(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/subcategoria`, {
      headers: this.headers,
    });
  }

  public EliminarCategoriaFuncion(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/borrar/categoria/${id}`, {
      headers: this.headers,
    });
  }

  public EliminarSubCategoriaFuncion(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/borrar/subcategoria/${id}`, {
      headers: this.headers,
    });
  }

  public EditarCategoriaFuncion(id: any, categoria: any): Observable<any> {
    const body = { id: id, categoria: categoria };
    return this.http.put(`${this.apiUrl}/api/actualizar/categoria`, body, {
      headers: this.headers,
    });
  }

  public EditarSubCategoriaFuncion(id: any, subcategoria: any): Observable<any> {
    const body = { id: id, subcategoria: subcategoria };
    return this.http.put(`${this.apiUrl}/api/actualizar/subcategoria`, body, {
      headers: this.headers,
    });
  }
}
