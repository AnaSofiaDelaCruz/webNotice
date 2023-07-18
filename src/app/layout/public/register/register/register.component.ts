import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { RegisterService } from 'src/app/service/RegisterService/register-service.service';
import { AlertService } from 'src/app/service/AlertService/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  // isAdmin = false;
  // isWriter = false;
  // isAdminChecked = false;
  // isWriterChecked = false;
  registroForm!: FormGroup;

  register = {
    nombre: '',
    apellido: '',
    correo: '',
    password: '',
    rolID: 0,
  };

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private alertService: AlertService,
    public router: Router
  ) {}

  ngOnInit(): void {
    // this.isAdmin = localStorage.getItem('rol') === 'administrador';
    // this.isWriter = this.isAdmin;
    this.initForm();
  }

  // onCheckboxChange(): void {
  //   if (this.isAdminChecked) {
  //     this.isWriterChecked = false;
  //   }
  //   if (this.isWriterChecked) {
  //     this.isAdminChecked = false;
  //   }
  //   // Agrega aquí cualquier otra lógica adicional que necesites
  // }

  // private checkRol(): boolean {
  //   return localStorage.getItem('rol') === 'administrador';
  // }

  private initForm(): void {
    this.registroForm = this.fb.group(
      {
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        correo: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  private passwordMatchValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const password = control.get('password')!.value;
    const confirmPassword = control.get('confirmPassword')!.value;
    return password !== confirmPassword ? { passwordMismatch: true } : null;
  }

  public Registro(): void {
    this.registrarUsuario();
  }

  private registrarUsuario(): void {
    if (this.registroForm.valid) {
      this.register = this.registroForm.value;
      this.registerService.registrar(this.register).subscribe(
        (response) => {
          if (response && response.message === 'Registro exitoso') {
            this.alertService.showSuccess(
              'Bienvenido',
              'Gracias por registrarse'
            );
            this.router.navigate(['/login']);
          }
        },
        (error: HttpErrorResponse) => {
          if (error.status === 409) {
            this.alertService.showErrorAlert('Correo ya en uso');
          } else if (error.status === 503) {
            this.alertService.showErrorAlert('Error en el servidor');
          }
        }
      );
    } else {
      this.alertService.showErrorAlert('No puede dejar campos vacíos');
    }
  }

  public isFieldRequired(field: string): boolean {
    const control = this.registroForm.get(field)!;
    return control.hasError('required') && (control.dirty || control.touched);
  }

  public isFieldInvalid(field: string): boolean {
    const control = this.registroForm.get(field)!;
    return control.invalid && (control.dirty || control.touched);
  }
}
