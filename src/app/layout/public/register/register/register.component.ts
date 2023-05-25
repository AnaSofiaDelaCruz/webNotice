import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent  {
  public myForm!: FormGroup;

  constructor(private fb:FormBuilder){}
  ngOnInit(): void {
    this.myForm = this.createMyForm();
  }
   private createMyForm():FormGroup{
    return this.fb.group({
      user:[],
      password:[]
    });
   }

   public submitFormulario(){
    alert("enviado");
    console.log(this.myForm.value);
   }

}

