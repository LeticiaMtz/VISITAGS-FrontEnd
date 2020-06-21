import { Injectable } from '@angular/core';
// library that get data from the server
import { HttpClient } from '@angular/common/http';
import { User } from '../models/register';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  selectedUser: User;
  users: User[];
  readonly URL = environment.urlGlobal;
  constructor(private http: HttpClient) { 
    this.selectedUser = new User();
  }

  // GET Data from the server


  // getUsers() {
  //   return this.http.get(`${this.URL}/Users/obtener`).toPromise();
  // }

  // getUser(idUser: string){
  //   return this.http.get(`${this.URL}/Users/obtener/${idUser}`).toPromise();
  // }

  postUser(User: User){
    return this.http.post(`${this.URL}/Users/registro`, User).toPromise();
  }

/*
  getAlertsData(_id :string){
    return this.http.get(this.alerts+ `/${_id}`)
  }



  putUser(user: User){
    return this.http.put(this.URL_API + `/${user._id}`, user);
  }
  deleteUser(_id: string){
    return this.http.delete(this.URL_API + `/${_id}`);
  }
  */
}
