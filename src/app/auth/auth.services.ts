import { Injectable } from '@angular/core';
// import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable()
export class AuthService {
  constructor() {}
  // ...
  public isAuthenticated(): boolean {
    const token = this.getToken();
    // const token = localStorage.getItem('token');
    let x = false;
    if(token){
        return true
    }
  return false
    // Check whether the token is expired and return
    // true or false
    // return !this.jwtHelper.isTokenExpired(token);
  }
  public getToken(): string {
    return JSON.parse(localStorage.getItem('token'));
  }
}
