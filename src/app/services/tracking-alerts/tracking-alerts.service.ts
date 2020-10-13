import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { AlertModel } from 'src/app/models/alert.model';
// import { TrackingAlertModel } from '../../models/tracking.model';
// import { ReasonsModel } from '../../models/reasons-crde.model';

@Injectable({
  providedIn: 'root'
})
export class TrackingAlertsService {

  url = environment.urlGlobal;

  constructor(private http :HttpClient) { }

  // getAlertTracking(idAlert: string){
  //   return this.http.get(`${this.url}/Alerts/obtener/${idAlert}`).toPromise();
  // }

  getAlertData(id: string){
    return this.http.get(`${this.url}/Alerts/obtenerAlerta/${id}`).toPromise();
  }

  getSeguimiento(idAlert: string){
    return this.http.get(`${this.url}/seguimiento/obtener/${idAlert}`).toPromise();
  }

  RegistrarSeguimiento(idAlerta: string, comentario: FormData) {
    return this.http.post(`${this.url}/seguimiento?idAlerta=${idAlerta}`, comentario).toPromise();
  }

  getFileTracking(fileName: string) {
    window.open(`${this.url}/descargarArchivo/descargaSeguimiento/${fileName}`, '_blank');
  }

  getFileEvidence(fileName: string) {
    window.open(`${this.url}/descargarArchivo/descargaEvidencia/${fileName}`, '_blank');
  }

  actualizarEstatus(idAlert: string, modality: AlertModel) {
    return this.http.put(`${this.url}/alerts/actualizarEstatus/${idAlert}`, modality).toPromise();
  }
}