import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { ReasonsModel } from '../../models/reasons-crde';

@Injectable({
  providedIn: 'root'
})

export class ReasonsCrdeService {
readonly URL = environment.urlGlobal;

  constructor(private http: HttpClient) { }

  getReasons(){
    return this.http.get(`${this.URL}/crde/obtener`).toPromise();
  }

  getReasonByid(idReasons: string){
    return this.http.get(`${this.URL}/crde/obtener/${idReasons}`).toPromise();
  }

  postReasons(reasons:ReasonsModel){
    return this.http.post(`${this.URL}/crde/registrar`,reasons).toPromise();
  }

  putReasons(idReasons:string, reasons:ReasonsModel){
    return this.http.put(`${this.URL}/crde/actualizar/${idReasons}`,reasons).toPromise();
  }

  deleteReasons(idCategoria:string){
    return this.http.delete(`${this.URL}/crde/eliminar/${idCategoria}`).toPromise();
  }



}
