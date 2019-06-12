import { Component, Input, OnInit } from '@angular/core';
import { FormGroup,ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

 import { registration } from 'app/models/registration';
 import { DataService } from './../data.service';
 import { Observable } from 'rxjs';
 import 'rxjs/add/operator/map';
 import { Router } from '@angular/router';
@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {
  
  @Input() reg_Obj: registration;
  submitted: boolean;
  registerForm : FormGroup;
  caseEdit: boolean = false;
   
  constructor(private http: HttpClient,private router:Router,private newservice:DataService ) { 
   this.registerForm = new FormGroup({
      firstName: new FormControl('',Validators.required),
      lastName: new FormControl('',Validators.required),
      cell: new FormControl('',Validators.required),
      email: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required),
      
     });
  }

  ngOnInit() {
    this._reset();
  }
  
  public reg() {
    this.submitted=true;
    if(this.registerForm.value.firstName == undefined || this.registerForm.value.firstName == '' || 
    this.registerForm.value.lastName == undefined || this.registerForm.value.lastName == '' || 
    this.registerForm.value.cell == undefined || this.registerForm.value.cell == '' ||
    this.registerForm.value.email == undefined || this.registerForm.value.email == '' || 
    this.registerForm.value.password == undefined || this.registerForm.value.password == ''){ 
      alert(2)
     
    }
    else{
    console.log(this.registerForm.value);
    this.newservice.registerUser(this.registerForm.value).subscribe(resultArray => {
      this.reg_Obj = resultArray;
      console.log(this.reg_Obj)
      if (this.caseEdit == true) {
        console.log('check', this.caseEdit);
        localStorage.setItem('current-user', JSON.stringify(this.registerForm));
      }
      this.router.navigate(['/login'])
     
     })
    }
    this.submitted=false;
    if (this.registerForm.invalid){
     return;
    }
  }
  private _reset() {
    if (null == this.reg_Obj) {
      this.reg_Obj = <registration>{};
      this.caseEdit = false;
      console.log('if');
    } else {
      this.caseEdit = true;
      console.log('else');
      
    }
  }
}
