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
  selector: 'app-new-writer',
  templateUrl: './new-writer.component.html',
  styleUrls: ['./new-writer.component.css'],
})
export class NewWriterComponent {
  constructor(
    public router: Router,
    private fb: FormBuilder,
    private registroEscritorService: RegistroService,
    private alertaService: AlertService
  ) {}

  cerrarSesion(): void {
    this.router.navigate(['/login']);
  }

  public registroEscritor!: FormGroup;
  public active: boolean = true;
  esAdmin = false;
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const rol = localStorage.getItem('rol');
    if (rol === 'administrador' || rol === 'Administrador') {
      this.esAdmin = true;
    }
    this.registroEscritor = this.fb.group(
      {
        nombres: ['', Validators.required],
        apellidos: ['', Validators.required],
        username: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordMatch }
    );
  }

  private passwordMatch(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')!.value;
    const password2 = control.get('confirmPassword')!.value;
    return password !== password2 ? { passwordMismatch: true } : null;
  }

  setActive(): void {
    this.active = !this.active;
  }

  public registrar() {
    if (this.registroEscritor.valid) {
      console.log("Pasa la validacion vacia")
      this.registroEscritorService
        .registrarEscritor(this.registroEscritor.value)
        .subscribe(
          (res) => {
            console.log('Promesa: ',res);
            if (res === 'Nuevo administrador/escritor creado') {
              this.alertaService.showSuccess(
                'Registro exitoso',
                'El usuario ha sido registrado exitosamente :D'
              );
            }
          },
          (err) => {
            this.handleError(err);
          }
        );
    } else {
      this.alertaService.ShowErrorAlert('Existen campos vacios!');
    }
  }

  private handleError(error: any) {
    if (error.status === 409) {
      this.alertaService.ShowErrorAlert('No se encontró la categoría');
    } else if (error.status === 503) {
      this.alertaService.ShowErrorAlert('Intentelo más tarde');
    }
  }
}
