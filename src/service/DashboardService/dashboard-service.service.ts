import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor() {}
  logout() {
    // Eliminar el token almacenado
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    localStorage.clear();
  }
}
