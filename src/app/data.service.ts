import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import "rxjs/Rx";
import { Router } from '@angular/router';
import{URL} from './url';
// import 'rxjs/add/operator/map';
import { registration } from 'app/models/registration';
import { userAdd } from 'app/models/user-add';
import { UserList } from './models/detail'
import { login } from 'app/models/login';
import {ApiResponse} from './dto/api-response';
import { BehaviorSubject } from 'rxjs';
@Injectable()
export class DataService {
  private messageSource = new BehaviorSubject('demo');
  currentMessage = this.messageSource.asObservable();
  
  constructor(private http: HttpClient,private router: Router) { }

  changeMessage(userInfoVo: any) {
    this.messageSource.next(userInfoVo)
  }
  
  public registerUser(userInfoVo: registration): Observable<any> {
    console.log('9vvvvvvvvvvvvv99999',userInfoVo);
    
        return this.http.post(URL.REGISTER, userInfoVo);
    }
    public login(loginInfo: login): Observable<any> {
      return this.http.post(URL.LOGIN, loginInfo);
  }
  public addUser(userAddInfo: userAdd): Observable<any> {
    return this.http.post(URL.ADD_USER, userAddInfo);
}
// public listUser(): Observable<any> {
//   return this.http.get(URL.LIST_USER);
// }
public deleteUser(_id: string): Observable<any> {
  return this.http.delete(URL.DELETE_USER + _id );
  }
  public listUser(): Observable<any> {
    return this.http.get(URL.EDIT_USER );
  }

  public listUsers(): Observable<any> {
   return this.http.get(`http://brilliant.3sivbq2yyh.us-east-2.elasticbeanstalk.com/api/cipher/auth/userList`);
  }

}
