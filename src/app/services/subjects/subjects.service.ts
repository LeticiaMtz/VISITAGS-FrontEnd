import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { SubjectModel } from '../../models/subjects';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {


  readonly URL = environment.urlGlobal;


  constructor(private http: HttpClient) { }


  getCareers(){
    return this.http.get(`${this.URL}/carreras/obtener`).toPromise();
  }

  getCarrerByid(idCarrera: string){
    return this.http.get(`${this.URL}/carreras/obtener/${idCarrera}`).toPromise();
  }

  postCarrer(subject:SubjectModel ){
    return this.http.post(`${this.URL}/carreras/registrar`, subject).toPromise();
  }

  putCareer(idCareer: string, subject: SubjectModel){
    return this.http.put(`${this.URL}/carreras/actualizar/${idCareer}`, subject).toPromise();
  }

}