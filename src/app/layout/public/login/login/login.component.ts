import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { LOGIN } from 'src/app/interfaces/usuario';
import { LoginService } from 'src/app/service/LoginService/login.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/service/AlertService/alert.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public myForm!: FormGroup;
  login: LOGIN = {
    correo: '',
    password: '',
  };

  constructor(
    private fb: FormBuilder,
    protected loginService: LoginService,
    public router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.myForm = this.createMyForm();
  }

  private createMyForm(): FormGroup {
    return this.fb.group({
      correo: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  iniciarSesion(): void {
    if (this.myForm.valid) {
      this.login = this.myForm.value;
      this.loginService.login(this.login).subscribe(
        (res) => {
          console.log('respuesta ', res);
          if (res === null) {
            this.alertService.showErrorAlert('Error en credenciales');
          } else {
            this.router.navigate(['/home']);
          }
        },
        (error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.alertService.showErrorAlert(
              'Registrate para leer las ultimas Notas'
            );
          } else if (error.status === 503) {
            this.alertService.showErrorAlert('Error servidor');
          }
        }
      );
    } else {
      this.alertService.showErrorAlert('Los campos no pueden estar vacíos');
    }
  }

  public submitFormulario() {
    this.iniciarSesion();
  }
}
