import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/service/AlertService/alert.service';
import { LoginService } from 'src/app/service/LoginService/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.createMyForm();
  }

  private createMyForm(): FormGroup {
    return this.fb.group({
      correo: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  public Iniciar() {
    console.log('A ', this.loginForm.valid);
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value).subscribe(
        (res) => {
          if (res === null) {
            this.alertService.ShowErrorAlert('Error en credenciales');
          } else {
            this.router.navigate(['/home']);
          }
        },
        (error) => {
          this.handleError(error);
        }
      );
    } else {
      this.alertService.ShowErrorAlert('¡Formularios vacios!');
    }
  }

  private handleError(error: any) {
    if (error.status === 401) {
      this.alertService.ShowErrorAlert('No se encontró la categoría');
    } else if (error.status === 503) {
      this.alertService.ShowErrorAlert('No tiene permiso para estar aquí');
    }
  }
  public submitFormulario() {
    this.Iniciar();
  }
}
