import { Component } from '@angular/core';

@Component({
  selector: 'app-writer',
  templateUrl: './writer.component.html',
  styleUrls: ['./writer.component.css'],
})
export class WriterComponent {
  editorConfig = {
    height: 350,
    with: 250,
    menubar: 'file edit view',
    plugins: 'advlist autolink lists link image charmap print preview anchor',
    toolbar:
      'undo redo | formatselect | bold italic backcolor underline | \
      alignleft aligncenter alignright alignjustify | \
      bullist numlist outdent indent | removeformat | charmap | link | table | help',
  };

  selectImages(event: any) {}

  public activar: boolean = true;

  public AlternarMenu(): void {
    this.activar = !this.activar;
  }
}
