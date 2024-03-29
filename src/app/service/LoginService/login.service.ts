import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:8080'; // URL de la API
  private headers: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) {}

  login(usuario: FormGroup): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/login`, usuario).pipe(
      map((response: any) => {
        console.log(response);
        if (response != null) {
          const token = response.token;
          const rol = response.rol;
          localStorage.setItem('token', token);
          localStorage.setItem('rol', rol);
          return response;
        }
        return null;
      })
    );
  }
}
