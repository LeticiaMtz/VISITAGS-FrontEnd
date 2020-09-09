import { TrackingAlertsService } from '../../services/tracking-alerts/tracking-alerts.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';
import { AlertModel } from '../../models/alert.model';
import { User } from '../../models/user.model';
import { SubjectModel } from '../../models/subjects.model';
import { environment } from 'src/environments/environment.prod';
import { ModalityModel } from '../../models/modality.model';
import { TrackingAlertModel } from '../../models/tracking.model';
import { AlertStatusModel } from '../../models/alert-status.model';
import { AlertStatusService } from '../../services/alert-status/alert-status.service';
import { NgForm } from '@angular/forms';
import { ReasonsService } from '../../services/reasons-crde/reasons-crde.service';
import { ReasonsModel } from 'src/app/models/reasons-crde.model';
import { FileModel } from '../../models/file.model';

declare var $: any;



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
  arrTracking: TrackingAlertModel[] = [];
  arrFiles: FileModel[] = [];
  arrEstatus: AlertStatusModel[] = [];
  arrReasons: ReasonsModel[] = [];
  objTracking: TrackingAlertModel = new TrackingAlertModel();
  objModality: ModalityModel = new ModalityModel();
  objSubject: SubjectModel = new SubjectModel();
  objAlert: AlertModel = new AlertModel();
  objUser: User = new User();
  asignatura: string;
  tokenDecoded: any;
  idPersona: string;
  userName: string;
  idAlert: string;
  idRol: string;
  principalStatus: string;
  idUltimo: string;
  isEmpty: any;
  idUser: string;
  documento: any;
  refresh: boolean = false;
  resetImage = false;
  url: string;
  objPriEstatus: AlertModel = new AlertModel();
  EstatusActualizado: string; 
  surName: string = '';
  

  constructor(private trackingAlertsService: TrackingAlertsService, private alertStatusService: AlertStatusService, private reasonsService: ReasonsService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    setTimeout(() => {
      $('.selectpicker').selectpicker('refresh');
      }, 0);
    let token = localStorage.token;
    this.idAlert = this.activatedRoute.snapshot.params.id;
    this.idRol = this.activatedRoute.snapshot.params.idR;
    this.tokenDecoded = jwt_decode(token);
    this.obtenerAlerta(this.idAlert);
    this.obtenerEstatus();
    this.obtenerSeguimiento(this.idAlert);
  }

  obtenerAlerta(idAlert: string){
    this.trackingAlertsService.getAlertData(idAlert).then((res: any) => {
      this.objAlert = res.cnt[0];
      this.objUser = res.cnt[0].idUser;
      this.objSubject = res.cnt[0].idAsignatura;
      this.objModality = res.cnt[0].idModalidad;
      this.arrReasons = res.cnt[0].arrCrde;
      this.arrFiles = res.cnt[0].aJsnEvidencias;
      if (this.objUser.strMotherLastName == "undefined"){
        this.surName = this.objUser.strMotherLastName;
      }
      this.userName = `${this.objUser.strName} ${this.objUser.strLastName} ${this.surName}`;
    }).catch(err => {
      console.log(err);
    });
  }

  obtenerEstatus(){
    this.alertStatusService.getAllStatusByRol(this.idRol).then((res: any) => {
      this.arrEstatus = res.cnt;
      setTimeout(() => {
        $('.selectpicker').selectpicker('refresh');
      }, 0);
    }).catch(err => {
      console.log(err);
    });
  }

  obtenerSeguimiento(id: string){
    this.trackingAlertsService.getSeguimiento(id).then((res: any) => {
      this.arrTracking = res.cnt.aJsnSeguimiento;
      if(this.arrTracking.length > 0){
        this.arrTracking.sort((one, two) => (one > two ? -1 : 1));//Ordena comentarios de mas viejo a nuevo.
        this.principalStatus = this.arrTracking[this.arrTracking.length-1].idEstatus;//La alerta obtiene el estatus de el último comentario.
      }else{
        this.principalStatus = this.nuevo;
      }
    }).catch(err => {
      console.log(err);
    });
  }

  obtenerArchivos(archivos: any) {
    this.documento = archivos;
  }

  comentarAlerta(form: NgForm){
    this.resetImage = true;
    let fd = new FormData();
    fd.append('idUser', this.tokenDecoded.user._id);
    this.EstatusActualizado = this.objTracking.idEstatus;
    // console.log(data, 'DATA');
    fd.append('idEstatus', this.objTracking.idEstatus);
    console.log(this.objTracking.idEstatus);
    fd.append('strComentario', this.objTracking.strComentario);
    // if(this.objTracking.aJsnEvidencias !== null){
    //   for(let i = 0; i < this.objTracking.aJsnEvidencias.lenght; i++){
        fd.append('strFileEvidencia', this.documento);
    //   }
    // }

    this.trackingAlertsService.RegistrarSeguimiento(this.idAlert, fd).then((res: any) => {

      setTimeout(() => {
        this.resetImage = false;
        this.documento = '';
      }, 0);
  
      console.log('Parece que funciono');
      console.log(res.cnt);
      this.ngOnInit();
      this.objPriEstatus.idEstatus = this.EstatusActualizado;
   
      this.trackingAlertsService.actualizarEstatus(this.idAlert, this.objPriEstatus).then((res: any)=>{
        console.log(res, 'STATUS');
      }).catch(err =>{
        console.log(err, 'ERROR')
      })
  
    }).catch(err => {
      setTimeout(() => {
        this.resetImage = false;
      }, 0);
      console.log(err);
    })
    form.reset();
    form.controls.idEstatus.setValue(undefined);
  }

  descargarArchivoT(nameFile: string){
    this.trackingAlertsService.getFileTracking(nameFile);
  }

  descargarArchivoE(nameFile: string){
    this.trackingAlertsService.getFileEvidence(nameFile);
  }
}
