import { Component, OnInit } from '@angular/core';
import { FormGroup,ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
 import { DataService } from './../../data.service';
 import { Observable } from 'rxjs';
 import 'rxjs/add/operator/map';
 import { Router } from '@angular/router';
 import { HttpClient } from '@angular/common/http';
import { userAdd } from './../../models/user-add'
import { registration } from 'app/models/registration';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  public reg_Obj: registration;
  public list: any = [];
  public _id:string;
  userInfoVo:any;
  
  // myForm = new FormGroup({
  //   firstName: new FormControl('',Validators.required),
  //   lastName: new FormControl('',Validators.required),
  //   cell: new FormControl('',Validators.required),
  //   email: new FormControl('',Validators.required),
  //   password: new FormControl('',Validators.required),
    
  //  });
  constructor(private http: HttpClient,private router:Router,private newservice:DataService,route: ActivatedRoute) { 
    this._id = route.snapshot.params['_id'];
    console.log(this._id)
  }
  

  ngOnInit() {
    this.newservice.currentMessage.subscribe(res=> {
      console.log('xxxxxxx xxxxxxx xxxxxxxx getInfo',res);
      this.userInfoVo = res;
    })
    console.log(this.userInfoVo )
    // this.add()
    const name=localStorage.getItem('list');
    this.list=JSON.parse(name);
    console.log(this.list);
  }
  add(){
    alert(1)
    // this.userInfoVo.value._id = this.userInfoVo._id;
    console.log('user detail',this.userInfoVo);
    localStorage.setItem('list',JSON.stringify(this.userInfoVo));
    this.newservice.registerUser(this.userInfoVo).subscribe(resultArray => {
      console.log("res",resultArray);
      
      this.reg_Obj = resultArray;
      // console.log(this.reg_Obj)
      this.router.navigate(['/table-list'])
     
     })
  }

}
