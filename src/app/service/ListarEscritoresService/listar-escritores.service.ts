import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListarEscritoresService {
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
  public listarEscritoresFuncion(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/escritor`, {
      headers: this.headers,
    });
  }
  public encontrarEscritorFuncion(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/find/escritor/${id}`, {
      headers: this.headers,
    });
  }

  public actualizarEscritorFuncion(id: any, formulario:FormGroup): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/update/${id}`,formulario, {
      headers: this.headers,
    });
  }
}
