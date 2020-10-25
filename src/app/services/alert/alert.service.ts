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

  postAlerta(fd: FormData) {
    return this.http.post(`${this.URL}/alerts/`, fd).toPromise();
  }

  getAlerts(idRol: string, idUser: string){
    return this.http.get(`${this.URL}/alerts/obtenerAlertas/${idRol}/${idUser}`).toPromise();
  }

  // tslint:disable-next-line: max-line-length
  getMonitorAlerts(idCarrera: string, idEspecialidad: string, idUser: string, idAsignatura: string, idEstatus: string, createdAt: any, createdAt1: any) {
    const parametros: any = {};
    if (typeof idCarrera !== 'undefined' && idCarrera !== '') { parametros.idCarrera = idCarrera; }
    if (typeof idEspecialidad !== 'undefined' && idEspecialidad !== '') { parametros.idEspecialidad = idEspecialidad; }
    if (typeof idUser !== 'undefined' && idUser !== '') { parametros.idProfesor = idUser; }
    if (typeof idAsignatura !== 'undefined' && idAsignatura !== '') { parametros.idAsignatura = idAsignatura; }
    if (typeof idEstatus !== 'undefined' && idEstatus !== '') { parametros.idEstatus = idEstatus; }
    if (typeof createdAt !== 'undefined' && createdAt !== '') { parametros.dteFechaInicio = createdAt; }
    if (typeof createdAt1 !== 'undefined' && createdAt1 !== '') { parametros.dteFechaFin = createdAt1; }

    console.log(idEspecialidad);

    return this.http
    .get(
      `${this.URL}/alerts/reporteMonitor`,
      {
        params: parametros
      }).toPromise();
    // /${createdAt}/${createdAt1}
  }
}
