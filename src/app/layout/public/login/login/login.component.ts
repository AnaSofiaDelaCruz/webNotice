import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2' //Importacion para las alertas bonitas
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public myForm!: FormGroup;
  email = "";
  pass = "";


  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {
    
    this.myForm = this.createMyForm();
    
  }
  private createMyForm(): FormGroup {
    return this.fb.group({
      user: [],
      password: []
    });
  }

  public submitFormulario() {
    alert("enviado");
    console.log(this.myForm.value);
  }

  public iniciarSesion() {
    
    if (this.email == "" && this.pass == "") {
      Swal.fire({
        title: '¡Error D:!',
        text: 'Los campos estan vacios, por favor ingresa tu correo y contraseña.',
        icon: 'error',
        confirmButtonText: 'Entendido',
        footer: '<a href="/register">¡Si no estas registrado registrate acá!</a>'
      })
    } else {
      Swal.fire({
        title: '¡Identificación exitosa!',
        text: 'Bienvenido de nuevo',
        icon: 'success',
      })
    }
  }
}
