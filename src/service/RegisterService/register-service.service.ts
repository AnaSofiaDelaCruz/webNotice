import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { REGISTER } from 'src/interfaces/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
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

  registrar(registro: REGISTER): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/register`, registro);
  }

  registrarAdministrador(registro: REGISTER): Observable<any> {
    console.log(registro)
    return this.http.post(`${this.apiUrl}/api/register/admi`, registro, {
      headers: this.headers,
    });
  }
}
