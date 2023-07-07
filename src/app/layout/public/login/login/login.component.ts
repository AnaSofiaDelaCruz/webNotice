import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { LOGIN } from 'src/interfaces/usuario';
import { LoginService } from 'src/service/LoginService/login.service';
import { Router } from '@angular/router';

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
    public router: Router
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
            this.showErrorAlert('Error en credenciales');
          } else {
            this.router.navigate(['/home']);
          }
        },
        (error) => {
          console.log('error', error);
          this.showErrorAlert('Ocurrió un error en el servidor');
        }
      );
    } else {
      this.showErrorAlert('Los campos no pueden estar vacíos');
    }
  }

  private showErrorAlert(message: string): void {
    Swal.fire({
      title: 'Error',
      text: message,
      icon: 'error',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK!',
    });
  }

  public submitFormulario() {
    this.iniciarSesion();
  }
}
