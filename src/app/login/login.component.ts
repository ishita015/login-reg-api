import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"; 
import { login } from 'app/models/login';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { AuthService } from '../auth/auth.services' 
import { DataService } from './../data.service';
 
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
 
  public log_Obj: login;
  submitted: boolean;
  loginForm = new FormGroup({
    email: new FormControl('',[Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]),
    password: new FormControl('',Validators.required),
  });
  constructor(private http: HttpClient,private router:Router,private newservice:DataService,private auth:AuthService ) { }

  ngOnInit() {
    this.newservice.listUsers().subscribe((resultArray: any) => {
      console.log('xxxxxxxx xxxxxxxx xxxxxxxx response is ', resultArray);
    });

  }

  login() {
    alert(1)
    this.submitted = true;
    console.log(this.loginForm.value);
        if (this.loginForm.value.email  === undefined || this.loginForm.value.email === '' ||
        this.loginForm.value.password === undefined || this.loginForm.value.password === '') {
        } else {
          this.newservice.login(this.loginForm.value).subscribe((resultArray: any) => {
            console.log('xxxx xxxxxxxxxxx res is ', resultArray.body);
            this.log_Obj = resultArray
          // console.log('xxxxxxxxxxxxx', resultArray.json())
          // console.log('xxxxxxx xxx xxx res', resultArray.json().token);
           const token = localStorage.setItem('token', JSON.stringify(resultArray.token));
          const list = localStorage.setItem('list', JSON.stringify(resultArray.body));
          this.router.navigate(['/table-list']);
         })
      }
      this.submitted = false;
      if (this.loginForm.invalid) {
       return;
      }
   }
  
  register(){
     this.router.navigate(['/registration-form']);
  }
}


