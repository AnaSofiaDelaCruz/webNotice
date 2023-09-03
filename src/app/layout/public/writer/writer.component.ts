import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-writer',
  templateUrl: './writer.component.html',
  styleUrls: ['./writer.component.css'],
})
export class WriterComponent implements OnInit {
  public notaForm!: FormGroup; // Declara el FormGroup

  constructor(private fb: FormBuilder) {} // Inyecta FormBuilder en el constructor

  ngOnInit(): void {
    this.notaForm = this.fb.group({
      descripcion: [''], // Agrega el control 'descripcion' al FormGroup
    });
  }
  editorConfig = {
    height: 500,
    with: 500,
    menubar: 'file edit view',
    plugins: 'advlist autolink lists link image charmap print preview anchor',
    toolbar:
      'undo redo | formatselect | bold italic backcolor underline | \
      alignleft aligncenter alignright alignjustify | \
      bullist numlist outdent indent | removeformat | charmap | link | table | help',
  };

  selectImages(event: any) {}

  public CrearNota() {}
  public activar: boolean = true;

  public AlternarMenu(): void {
    this.activar = !this.activar;
  }
}
