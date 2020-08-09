import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { AlertModel } from '../../models/alert.model';

@Injectable({
  providedIn: 'root'
})
export class TrackingAlertsService {

  url = environment.urlGlobal;

  constructor(private http :HttpClient) { }

  getAlertTracking(idAlert: string){
    return this.http.get(`${this.url}/Alerts/obtener/${idAlert}`).toPromise();
  }

  getPersona(idUser){
    return this.http.get(`${this.url}/Users/obtener/${idUser}`).toPromise();
  }

  
}