import { Injectable } from '@angular/core';
// library that get data from the server
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  selectedUser: User;
  users: User[];
  readonly URL_API = 'http://localhost:3000/users';
  readonly UserProfile = 'http://localhost:3000/users/profile'
  readonly alerts = 'http://localhost:3000/users/data'
  constructor(private http: HttpClient) { 
    this.selectedUser = new User();
  }

  // GET Data from the server


  getUsers() {
    return this.http.get(this.URL_API);
  }

  getUser(){
    return this.http.get(this.UserProfile);
  }

  getdataUser(_id :string){
    return this.http.get(this.URL_API + `/${_id}`)
  }

  getAlertsData(_id :string){
    return this.http.get(this.alerts+ `/${_id}`)
  }
  postUser(User: User){
    return this.http.post(this.URL_API, User);
  }


  putUser(user: User){
    return this.http.put(this.URL_API + `/${user._id}`, user);
  }
  deleteUser(_id: string){
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}
