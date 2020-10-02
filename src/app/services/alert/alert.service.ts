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

  postAlerta(arrfd: any[], arrInvitados: any) {
    return this.http.post(`${this.URL}/alerts/registrar`, arrfd, arrInvitados).toPromise();
  }

  getAlerts(idRol: string, idUser: string){
    return this.http.get(`${this.URL}/alerts/obtenerAlertas/${idRol}/${idUser}`).toPromise();
  }

  getMonitorAlerts(idCarrera: string, idEspecialidad: string, idUser: string, idAsignatura: string, idEstatus: string, createdAt: Date, createdAt1: Date) {
    return this.http.get(`${this.URL}/alerts/obtenerAlertasMonitor/${idCarrera}/${idEspecialidad}/${idUser}/${idAsignatura}/${idEstatus}/${createdAt}/${createdAt1}`).toPromise();
    // /${createdAt}/${createdAt1}
  }
}
