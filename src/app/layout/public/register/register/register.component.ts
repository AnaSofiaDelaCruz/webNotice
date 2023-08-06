import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/service/AlertService/alert.service';
import { RegistroService } from 'src/app/service/RegistroService/registro.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  public registroForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private registroService: RegistroService,
    private alertService: AlertService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.initForm();
  }

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

  private registrarUsuario() {
    if (this.registroForm.valid) {
      this.registroService.registrar(this.registroForm.value).subscribe(
        (response) => {
          if (response && response.message === 'Registro exitoso') {
            this.alertService.showSuccess(
              'Bienvenido',
              'Gracias por registrarse'
            );
            this.router.navigate(['/login']);
          }
        },
        (error) => {
          this.handleError(error);
        }
      );
    }
  }
  private handleError(error: any) {
    if (error.status === 409) {
      this.alertService.ShowErrorAlert('No se encontró la categoría');
    } else if (error.status === 503) {
      this.alertService.ShowErrorAlert('Intentelo más tarde');
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
  
  public Registro(): void {
    this.registrarUsuario();
  }
}
