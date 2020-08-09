import { TrackingAlertsService } from '../../services/tracking-alerts/tracking-alerts.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { AlertModel } from '../../models/alert.model';
import { User } from '../../models/user.model';
import { environment } from 'src/environments/environment.prod';




const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

@Component({
  selector: 'app-tracking-alerts',
  templateUrl: './tracking-alerts.component.html',
  styleUrls: ['./tracking-alerts.component.css']
})
export class TrackingAlertsComponent implements OnInit {

  nuevo: string = environment.nuevo;
  cerrado: string = environment.cerrado;
  finalizado: string = environment.finalizado;
  enProgreso: string = environment.seguimiento;

  //alert: AlertModel = new AlertModel();
  arrayAlert: AlertModel = new AlertModel();
  arrayUser: User [] = [];
  userName: string;
  idAlert: string;
  idUser: string;

  constructor(private trackingAlertsService: TrackingAlertsService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.idAlert = this.activatedRoute.snapshot.params.id;
    console.log(this.idAlert,'-------------------------alerta');
    this.getAlertTracking(this.idAlert);
  }

  getAlertTracking(idAlert: string){
    this.trackingAlertsService.getAlertTracking(idAlert).then((res: any) => {
      this.idUser = res.cnt.idUser;
      console.log(res.cnt.idUser, '----------------------idUser');
      console.log(res.cnt,'arreglo alerta');
      this.arrayAlert = res.cnt;
      // this.trackingAlertsService.getPersona(this.idUser).then((res: any) => {
      //   this.userName = `${res.cnt[0].strName} ${res.cnt[0].strLastName} ${res.cnt[0].strMotherLastName};`
      //   this.arrayUser = res.cnt[0];
      //   res.cnt[0].aJsnEvidencias.FileModel.forEach(element => {
      //     console.log(element);
      //   });
      //   console.log(res.cnt[0],'arreglo usuario');
      // }).catch(err => {
      //   console.log(err);
      // });
    }).catch(err => {
      console.log(err);
    });
  }

}
