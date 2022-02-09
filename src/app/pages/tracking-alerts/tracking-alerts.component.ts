import { TrackingAlertsService } from "../../services/tracking-alerts/tracking-alerts.service";
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import * as jwt_decode from "jwt-decode";
import Swal from "sweetalert2";
import { AlertModel } from "../../models/alert.model";
import { User } from "../../models/user.model";
import { SubjectModel } from "../../models/subjects.model";
import { environment } from "src/environments/environment.prod";
import { ModalityModel } from "../../models/modality.model";
import { TrackingAlertModel } from "../../models/tracking.model";
import { AlertStatusModel } from "../../models/alert-status.model";
import { AlertStatusService } from "../../services/alert-status/alert-status.service";
import { NgForm } from "@angular/forms";
import { ReasonsService } from "../../services/reasons-crde/reasons-crde.service";
import { ReasonsModel } from "src/app/models/reasons-crde.model";
import { FileModel } from "../../models/file.model";
import { ChangeDetectorRef } from "@angular/core";
import { UserManagementService } from "../../services/user-manegement/user-management.service";

declare var $: any;

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
});

@Component({
  selector: "app-tracking-alerts",
  templateUrl: "./tracking-alerts.component.html",
  styleUrls: ["./tracking-alerts.component.css"],
})
export class TrackingAlertsComponent implements OnInit {
  @ViewChild("comentarios") content: ElementRef;
  @ViewChild("formaColaboradores") formaColaboradores: NgForm;
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
  strCarrera: string;
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
  documento: any[] = [];
  refresh: boolean = false;
  resetImage = false;
  url: string;
  objPriEstatus: AlertModel = new AlertModel();
  EstatusActualizado: string;
  surName: string = "";
  agregar: boolean = false;
  arrColaboradores: any[] = [];
  arrColabFinal: any[] = [];
  personas: any[] = [];
  arrMatriculas: any[] = [];
  arrAlumnos: any[] = [];
  nmbSemana: any;

  constructor(
    private trackingAlertsService: TrackingAlertsService,
    private alertStatusService: AlertStatusService,
    private reasonsService: ReasonsService,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private _userService: UserManagementService
  ) {
    localStorage.removeItem("aa_rutaTemporal");
  }

  ngOnInit(): void {
    setTimeout(() => {
      $(".selectpicker").selectpicker("refresh");
    }, 0);
    let token = localStorage.aa_token;
    this.idAlert = this.activatedRoute.snapshot.params.id;
    this.idRol = this.activatedRoute.snapshot.params.idR;
    this.tokenDecoded = jwt_decode(token);
    this.obtenerAlerta(this.idAlert);
    this.obtenerEstatus();
    this.obtenerSeguimiento(this.idAlert);
    this.documento = [];
    this.arrColaboradores.push({ _id: "" });
    this.getPersonas();
    this.objTracking.idEstatus = this.enProgreso;
    this.bottom();
  }

  obtenerAlerta(idAlert: string) {
    this.trackingAlertsService.getAlertData(idAlert).then((res: any) => {
      this.arrMatriculas = res.cnt[0].strMatricula;
      this.arrAlumnos = res.cnt[0].strNombreAlumno;
      this.objAlert = res.cnt[0];
      this.strCarrera = res.cnt[0].idCarrera.strCarrera;
      this.objUser = res.cnt[0].idUser;
      this.objSubject = res.cnt[0].idAsignatura;
      this.objModality = res.cnt[0].idModalidad;
      this.arrReasons = res.cnt[0].arrCrde;
      this.arrFiles = res.cnt[0].aJsnEvidencias;
      this.principalStatus = res.cnt[0].idEstatus._id;
      this.nmbSemana = res.cnt[0].nmbSemana;
      if (this.objUser.strMotherLastName) {
        this.surName = this.objUser.strMotherLastName;
      }
      this.userName = `${this.objUser.strName} ${this.objUser.strLastName} ${this.surName}`;
    }).catch((err) => {
      Toast.fire({
        icon: "error",
        title: err.error ? err.error.msg : err
      });
    });
  }

  obtenerEstatus() {
    this.alertStatusService
      .getAllStatusByRol(this.idRol)
      .then((res: any) => {
        this.arrEstatus = res.cnt;
        setTimeout(() => {
          $(".selectpicker").selectpicker("refresh");
        }, 0);
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title: err.error ? err.error.msg : err,
        });
      });
  }

  obtenerSeguimiento(id: string) {
    this.trackingAlertsService
      .getSeguimiento(id)
      .then((res: any) => {
        this.arrTracking = res.cnt.aJsnSeguimiento;
        if (this.arrTracking.length > 0) {
          this.arrTracking.sort((one, two) => (one > two ? -1 : 1)); //Ordena comentarios de mas viejo a nuevo.
          //this.principalStatus = this.arrTracking[this.arrTracking.length-1].idEstatus; //La alerta obtiene el estatus de el último comentario.
        } else {
          //this.principalStatus = this.nuevo;
        }
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title: err.error ? err.error.msg : err,
        });
      });
  }

  obtenerArchivos(archivos: any) {
    let archivo = archivos;
    this.documento.push(archivo);
  }

  eliminarArchivo(archivo: any) {
    const index = this.documento.indexOf(archivo);
    this.documento.splice(index, 1);
  }

  comentarAlerta(form: NgForm) {
    if (form.invalid) {
      Toast.fire({
        icon: "error",
        title: "No es posible comentar la alerta, hay campos vacíos",
      });
      return false;
    } else {
      let fd = new FormData();
      let colaboradores = "";

      for (const colaborador of this.arrColaboradores) {
        let id = colaborador._id[0];
        if (id) {
          colaboradores += id + ",";
        }
      }

      this.EstatusActualizado = this.objTracking.idEstatus;
      this.resetImage = true;

      fd.append("idUser", this.tokenDecoded.user._id);
      fd.append("idEstatus", this.objTracking.idEstatus);
      fd.append("strComentario", this.objTracking.strComentario);
      fd.append("arrInvitados", colaboradores.slice(0, -1));

      for (let i = 0; i < this.documento.length; i++) {
        fd.append("strFileEvidencia", this.documento[i]);
      }

      this.trackingAlertsService
        .RegistrarSeguimiento(this.idAlert, fd)
        .then((res: any) => {
          this.arrColaboradores = [];
          // this.getPersonas();
          setTimeout(() => {
            this.resetImage = false;
            this.documento = [];
          }, 0);

          this.ngOnInit();
        })
        .catch((err) => {
          setTimeout(() => {
            this.resetImage = false;
          }, 0);
          Toast.fire({
            icon: "error",
            title: err.error ? err.error.msg : err,
          });
        });
      form.reset();
      form.controls.idEstatus.setValue(undefined);
    }
  }

  ngAfterViewChecked(): void {
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
    this.bottom();
  }

  bottom() {
    this.content
      ? (this.content.nativeElement.scrollTop = this.content.nativeElement.scrollHeight)
      : null;
  }

  descargarArchivoT(nameFile: string) {
    this.trackingAlertsService.getFileTracking(nameFile);
  }

  descargarArchivoE(nameFile: string) {
    this.trackingAlertsService.getFileEvidence(nameFile);
  }

  eliminarColaborador(formaColaborador: NgForm, index: number) {
    formaColaborador.form.removeControl(`_id${index}`);
    this.arrColaboradores.splice(index, 1);
    Toast.fire({
      icon: "warning",
      title: `¡El campo fué eliminado!`,
    });
    this.ngAfterViewInit();
    // this.getPersonas();
  }

  addColaborador(formaColaborador: NgForm) {
    this.ngAfterViewInit();
    if (formaColaborador.invalid) {
      Toast.fire({
        icon: "warning",
        title: "No se ha seleccionado un colaborador",
      });
    } else {
      this.arrColaboradores.push({ _id: "" });
      Toast.fire({
        icon: "success",
        title: `¡Nuevos Campos Creados!`,
      });
    }
  }

  ngAfterViewInit() {
    this.ngAfterContentChecked();
  }

  ngAfterContentChecked(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.cdr.detectChanges();
  }

  getPersonas() {
    this.personas = [];

    this._userService
      .getUsuarios()
      .then((data: any) => {
        for (const persona of data.cnt) {
          persona.blnStatus && this.personas.push({
            _id: persona._id,
            strNombre: `${persona.strName} ${persona.strLastName}`,
          });
        }
      })
      .catch((err) => {
        Toast.fire({
          icon: "warning",
          title: err.error ? err.error.msg : err,
        });
      });
  }
}
