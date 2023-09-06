import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/service/AlertService/alert.service';
import { ListarEscritoresService } from 'src/app/service/ListarEscritoresService/listar-escritores.service';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css'],
})
export class EditarPerfilComponent {
  public idEncontrado: any;
  public escritor: any;
  miFormulario!: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private rellenar: ListarEscritoresService,
    private alertas: AlertService,
    private formBuilder: FormBuilder
  ) {
    this.route.queryParams.subscribe((params) => {
      const parametro1 = params['parametro1'];
      this.idEncontrado = parametro1;
    });
  }

  ngOnInit(): void {
    this.recuperarEscritor(this.idEncontrado);
    this.iniciarForm();
  }

  public recuperarEscritor(idEscritor: any) {
    this.rellenar.encontrarEscritorFuncion(idEscritor).subscribe(
      (res) => {
        this.miFormulario.patchValue({
          nombre: res.nombre,
          apellido: res.apellido,
          correo: res.correo,
        });
      },
      (error) => {
        this.handleError;
      }
    );
  }

  private handleError(error: any) {
    if (error.status === 401) {
      this.alertas.ShowErrorAlert(
        'No tienes permiso para acceder a esta sección.'
      );
    }
    if (error.status === 404) {
      this.alertas.ShowErrorAlert('No hay datos.');
    }
    if (error.status === 500) {
      this.alertas.ShowErrorAlert(
        'El servidor no funciona, intentelo mas tarde.'
      );
    }
  }

  private iniciarForm() {
    this.miFormulario = this.formBuilder.group(
      {
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        username: [''],
        correo: ['', [Validators.required]],
        password: ['', [Validators.required]],
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

  public guardarCambios() {
    if (this.miFormulario.valid) {

      this.rellenar
        .actualizarEscritorFuncion(this.idEncontrado, this.miFormulario.value)
        .subscribe((res) => {
          this.alertas.showSuccess(
            'Actualizacion exitosa',
            'El usuario fue actualizado correctamente.'
          );
        });
    } else {
      this.alertas.ShowErrorAlert('¡Existen campos vacios!');
    }
  }
}
