import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AlertStatusService {

  url = environment.urlGlobal;

  constructor( private http: HttpClient) { }

  getAllStatus() {
    return this.http.get(`${this.url}/`).toPromise();
  }

  getStatusId() {
    return this.http.get(`${this.url}/`).toPromise();
  }

  postStatus(estatus: AlertStatusService) {
    return this.http.post(`${this.url}/`, estatus).toPromise();
  }

  putStatus(id: string, data: AlertStatusService) {
    return this.http.put(`${this.url}//id`, data).toPromise();
  }
}
