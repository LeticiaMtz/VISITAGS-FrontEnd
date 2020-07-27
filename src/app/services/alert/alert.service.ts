import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { AlertModel } from '../../models/alert.model';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  readonly URL = environment.urlGlobal;

  constructor(private http: HttpClient) { }

  postAlerta( alerta: any, fd: any) {
    console.log(alerta);
    return this.http.post(`${this.URL}/alerts/registrar`, fd).toPromise();
  }
}
