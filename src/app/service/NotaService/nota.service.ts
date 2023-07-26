import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NOTA } from 'src/app/interfaces/nota';

@Injectable({
  providedIn: 'root',
})
export class NotaService {
  private headers: HttpHeaders;
  private apiUrl = 'http://localhost:8080'; // URL de la API
  private bandera = false;

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
  private checkRol(): number {
    const rol = localStorage.getItem('rol');
    if (rol === 'administrador') {
      return 1;
    } else if (rol === 'escritor') {
      return 2;
    }
    return 0;
  }

  private setAuthorizationHeader(token: string): void {
    this.headers = this.headers.set('Authorization', `Bearer ${token}`);
  }

  CrearNota(notaData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/registrar/nota`, notaData, {
      headers: this.headers,
    });
  }

  ActualizarNota(notaData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/actualizr/nota/`, notaData, {
      headers: this.headers,
    });
  }
}
