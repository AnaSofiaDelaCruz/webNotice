import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { NOTA } from 'src/app/interfaces/nota';

@Component({
  selector: 'app-crearnota',
  templateUrl: './crearnota.component.html',
  styleUrls: ['./crearnota.component.css'],
})
export class CrearnotaComponent implements OnInit {
  public notaForm!: FormGroup;
  public nota: NOTA = {
    titulo: '',
    descripcion: '',
    categoriaID: 0,
    subcategoriaID: 0,
  };
  editorConfig = {
    height: 500,
    menubar: 'file edit view',
    plugins: 'advlist autolink lists link image charmap print preview anchor',
    toolbar:
      'undo redo | formatselect | bold italic backcolor underline | \
      alignleft aligncenter alignright alignjustify | \
      bullist numlist outdent indent | removeformat | charmap | link | table | help',
  };
  constructor() {}
  ngOnInit(): void {}
  CrearNota(forma: NgForm) {
    // Lógica para guardar la nota
    console.log(forma.value);
  }
}
