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
}
