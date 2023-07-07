import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { REGISTER } from 'src/interfaces/usuario';
import { RegisterService } from 'src/service/RegisterService/register-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  isAdmin = false;
  isWriter = false;
  isAdminChecked = false;
  isWriterChecked = false;
  registroForm!: FormGroup;
  
  register: REGISTER = {
    nombre: '',
    apellido: '',
    correo: '',
    password: '',
    confirmPassword: '',
    rol: '',
  };

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService
  ) {}

  ngOnInit(): void {
    this.isAdmin = localStorage.getItem('rol') === 'administrador';
    this.isWriter = this.isAdmin;
    this.initForm();
  }

  onCheckboxChange(): void {
    if (this.isAdminChecked) {
      this.isWriterChecked = false;
    }
    if (this.isWriterChecked) {
      this.isAdminChecked = false;
    }
    // Agrega aquí cualquier otra lógica adicional que necesites
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

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password !== confirmPassword ? { passwordMismatch: true } : null;
  }

  registrarUsuario(): void {
    if (this.registroForm.valid) {
      this.register = this.registroForm.value;
      this.registerService.registar(this.register).subscribe(
        (res) => {
          console.log(res);
        },
        (error) => {
          this.showErrorAlert('Error en el servidor');
        }
      );
    } else {
      this.showErrorAlert('No puede dejar campos vacios');
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

  isFieldRequired(field: string): boolean {
    const control = this.registroForm.get(field);
    return (
      control!.hasError('required') && (control!.dirty || control!.touched)
    );
  }

  isFieldInvalid(field: string): boolean {
    const control = this.registroForm.get(field);
    return control!.invalid && (control!.dirty || control!.touched);
  }
}
