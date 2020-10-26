import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Login } from '../../models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  selectedLogin: Login;
  logins: Login[];
  usrToken: string;
  readonly URL_API = 'http://localhost:3000/api/Users/login';

  constructor(private http: HttpClient, private router: Router) { 
    this.selectedLogin = new Login();
  }

  postLogin(user){
    return this.http.post(this.URL_API, user);
  }

  loggedIn(){
    if (localStorage.getItem('aa_token')) {
      return true
    }else{
      return false
    }
  }

  getToken(){
    return localStorage.getItem('aa_token');
  }

  logout(){
    localStorage.removeItem('aa_token');
    // this.router.navigate(['/'])
  }

  isAuthenticated(): boolean{
    this.usrToken = localStorage.getItem('aa_token');
    return this.usrToken !== null && this.usrToken !== undefined;
  }

}
