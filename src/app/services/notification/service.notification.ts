import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  readonly URL = environment.urlGlobal;


  constructor(private http: HttpClient) { }

  getUsuariosByid(idUsers: string){
    return this.http.get(`${this.URL}/Users/obtener/${idUsers}`).toPromise();
  }

  getUsuarioEspecialidad(idUsers: string){
    return this.http.get(`${this.URL}/Users/obtenerEspecialidad/${idUsers}`).toPromise();
  }
  
  putUsuarioEspecialidad(idUsers: string, especilidad: any[]){
    let aJsnEspecialidad = {
      "aJsnEspecialidad": especilidad 
      
    }
    return this.http.put(`${this.URL}/Users/asignar-especialidad/${idUsers}`, aJsnEspecialidad).toPromise();

   
  }




}