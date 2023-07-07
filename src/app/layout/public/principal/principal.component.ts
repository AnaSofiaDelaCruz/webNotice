import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from 'src/service/DashboardService/dashboard-service.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
})
export class PrincipalComponent {
  esAdmin = false;
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const rol = localStorage.getItem('rol');
    if (rol === 'administrador' || rol === 'Administrador') {
      this.esAdmin = true;
    }
  }
  constructor(
    public router: Router,
    private dashBoardService: DashboardService
  ) {}
  cerrarSesion(): void {
    this.dashBoardService.logout();
    this.router.navigate(['/login']);
  }
}
