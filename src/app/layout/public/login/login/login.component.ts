import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit {
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
