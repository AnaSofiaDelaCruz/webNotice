import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-writer',
  templateUrl: './home-writer.component.html',
  styleUrls: ['./home-writer.component.css'],
})
export class HomeWriterComponent implements OnInit {
  tokenEnLocalStorage: boolean = false;
  ngOnInit(): void {}
  constructor(private router: Router) {}
  cerrarSesion() {
    if (this.tokenEnLocalStorage) {
      localStorage.removeItem('token');
      this.tokenEnLocalStorage = false;
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
