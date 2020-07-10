import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { BehaviorModel } from 'src/app/models/behavior';

@Injectable({
  providedIn: 'root'
})
export class BehaviorService {
  readonly URL = environment.urlGlobal;

  constructor(private http: HttpClient) { }


  getBehavior(idReasons: string){
    return this.http.get(`${this.URL}/motivosCrde/obtener/${idReasons}`).toPromise();
  }

  postBehavior(idReasons: string, behaviors: BehaviorModel){
    return this.http.post(`${this.URL}/motivosCrde/registrar/${idReasons}`, behaviors).toPromise();
  }

  putBehavior(idReasons: string, idBehavior: string, behaviors: BehaviorModel){
    return this.http.put(`${this.URL}/motivosCrde/actualizar/${idReasons}/${idBehavior}`, behaviors).toPromise();
  }
}