import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
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
  ListNotas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/noticias`);
  }
  ListNotasByCategoria(categoria: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/findby/${categoria}`);
  }
  ListNotasByFecha(fecha: Date): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/prueba/${fecha}`);
  }
}
