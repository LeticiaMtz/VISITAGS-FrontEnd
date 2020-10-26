import { Component, OnInit } from '@angular/core';
import { CareersService } from '../../services/careers/careers.service';
import { CareerModel } from '../../models/career';
import { AlertModel } from '../../models/alert.model';
import { AlertService } from '../../services/alert/alert.service';
import { SpecialtyService } from '../../services/specialties/specialty.service';
import { SubjectsService } from '../../services/subjects/subjects.service';
import { UserManagementService } from '../../services/user-manegement/user-management.service';
import { User } from '../../models/user.model';
import { AlertStatusService } from '../../services/alert-status/alert-status.service';
import { AlertStatusModel } from 'src/app/models/alert-status.model';
import { Router } from '@angular/router';
import { PdfServiceService } from '../../services/PDF/pdf-service.service';
import * as jwt_decode from 'jwt-decode';
import { ExportDataService } from 'src/app/services/excel/export-to-excel.service';
import Swal from 'sweetalert2';
import { SpecialtyModel } from 'src/app/models/specialty';
import * as moment from 'moment';
import { BehaviorModel } from '../../models/behavior.model';
import { element } from 'protractor';
import { environment } from 'src/environments/environment.prod';

declare var $: any;

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 4000
});

@Component({
  selector: 'app-alert-monitor',
  templateUrl: './alert-monitor.component.html',
  styleUrls: ['./alert-monitor.component.css']
})
export class AlertMonitorComponent implements OnInit {

  nuevo: string = environment.nuevo;
  enProgreso: string = environment.seguimiento;
  cerrado: string = environment.cerrado;
  finalizado: string = environment.finalizado;

  carreras: any[] = [];
  especialidades: any[] = [];
  asignaturas: any[] = [];
  alertas: AlertModel[] = [];
  cargando: boolean = true;
  searchText: any;
  pageActual: number;
  carrera: any;
  alerta: AlertModel = new AlertModel();
  profesores: User[] = [];
  arrEstatus: AlertStatusModel[] = [];
  idCarrera: string;
  idAsignatura: string;
  idEspecialidad: string;
  idUser: string;
  idEstatus: string;
  // createdAt: Date;
  fecha2: Date;
  arrAlerta: any[] = [];
  token: any;
  tokenDecoded: any;
  title: string = 'Reporte Alertas';
  filtro: boolean = false;
  specialities: SpecialtyModel[] = [];
  alerts: any[] = [];
  strEspecialidad: string;
  especi: SpecialtyModel[] = [];
  idSpecialty: string;
  specialty: SpecialtyModel = new SpecialtyModel();
  

  constructor( private router: Router, private _carrerasService: CareersService, private _alertService: AlertService, private _espService: SpecialtyService, private _asigService: SubjectsService, private _userService: UserManagementService, private _estatusService: AlertStatusService, private _PdfService: PdfServiceService, private excelService: ExportDataService, private _specialityService: SpecialtyService) { }

  ngOnInit(): void {
    setTimeout(() => {
      $('.selectpicker').selectpicker('refresh');
    }, 0);
    this.token = localStorage.aa_token;
    this.tokenDecoded = jwt_decode(this.token);
    this.getCarreras();
    this.getAsignaturas();
    this.getProfesores();
    this.getEstatus();

  }

  getCarreras() {
    this._carrerasService.getCareers().then((carreras: any) => {
      setTimeout(() => {
        $('.selectpicker').selectpicker('refresh');
      }, 0);
      this.carreras = carreras.cnt;
    }).catch((err) => {
      Toast.fire({
        icon: 'warning',
        title: `¡${err.error.msg}!`
      });
    });
  }

  getEspecialidades(idCarrera: string) {
    this._espService.getSpecialties(idCarrera).then((data: any) => {
      setTimeout(() => {
        $('.selectpicker').selectpicker('refresh');
      }, 0);
      this.especialidades = data.cnt.rutas;
      this.getAlertas();
    }).catch((err) => {
      Toast.fire({
        icon: 'warning',
        title: `¡${err.error.msg}!`
      });
    });
  }

  getAsignaturas() {
    this._asigService.getAsignatura().then((data: any) => {
      setTimeout(() => {
        $('.selectpicker').selectpicker('refresh');
      }, 0);
      for (const asignatura of data.cnt) {
        this.asignaturas.push({
          _id: asignatura._id,
          strNombre: asignatura.strAsignatura
        });
      }
    }).catch((err) => {
      Toast.fire({
        icon: 'warning',
        title: `¡${err.error.msg}!`
      });
    });
  }

  getProfesores() {
    this._userService.getUsuarios().then((data: any) => {
      setTimeout(() => {
        $('.selectpicker').selectpicker('refresh');
      }, 0);
      this.profesores = data.cnt;
    }).catch((err) => {
      Toast.fire({
        icon: 'warning',
        title: `¡${err.error.msg}!`
      });
    });
  }

  getAlertas() {
    this._alertService.getMonitorAlerts(this.alerta.idCarrera, this.alerta.idEspecialidad, this.alerta.idUser, this.alerta.idAsignatura, this.alerta.idEstatus, this.alerta.createdAt, this.alerta.createdAt1).then((data: any) => {
      this.alertas = data.cont.resultados;
      this.filtro = true;
      this.cargando = false;
      this.arrAlerta = [];

      for (const alert of this.alertas) {

        this._carrerasService.getCarrerByid(alert.idCarrera['_id']).then((data: any) => {
          this.especi = data.cnt[0].aJsnEspecialidad;
          this.especi.forEach(element => {
            if (element._id === alert.idEspecialidad){
              this.specialty.strEspecialidad = element.strEspecialidad;
            }
          });

          let element = [
            alert.strMatricula,
            alert.strNombreAlumno,
            alert.idCarrera['strCarrera'],
            this.specialty.strEspecialidad,
            alert.idAsignatura['strAsignatura'],
            alert.strGrupo,
            alert.idUser['strName'],
            alert.arrCrde.map(motivo => motivo.strNombre),
            this.getFecha(alert.createdAt),
            alert.idEstatus['strNombre']
          ];
          this.arrAlerta.push(element);
        }).catch((err) => {
          console.log('1');
          Toast.fire({
            icon: 'warning',
            title: `¡${err.error.msg}!`
          });
        });
      }
    }).catch((err) => {
      console.log(err);
      Toast.fire({
        icon: 'error',
        title: err.error.cont.error
      });
      this.alertas = [];
    });
  }

  getEstatus() {
    this._estatusService.getAllStatus().then((data: any) => {
      setTimeout(() => {
        $('.selectpicker').selectpicker('refresh');
      }, 0);
      this.arrEstatus = data.cnt;
    }).catch((err) => {
      Toast.fire({
        icon: 'warning',
        title: `¡${err.error.msg}!`
      });
    });
  }

  verAlerta(idAlerta: string) {
    // falta ponerle el id del rol del usuario
    this.router.navigate([`/Tracking-alerts/${idAlerta}/${this.tokenDecoded.user._id}`]);
  }

  exportPDF() {
    let header = [
      {
        text: "Matricula",
        style: "tableHeader",
        bold: true,
        fillColor: "#2a3e52",
        color: "#ffffff",
        size: 13,
      },
      {
        text: "Alumno",
        style: "tableHeader",
        bold: true,
        fillColor: "#2a3e52",
        color: "#ffffff",
        size: 13,
      },
      {
        text: "Carrera",
        alignment: "center",
        style: "tableHeader",
        bold: true,
        fillColor: "#2a3e52",
        color: "#ffffff",
        size: 13,
      },
      {
        text: "Especialidad",
        alignment: "center",
        style: "tableHeader",
        bold: true,
        fillColor: "#2a3e52",
        color: "#ffffff",
        size: 13,
      },
      {
        text: "Asignatura",
        alignment: "center",
        style: "tableHeader",
        bold: true,
        fillColor: "#2a3e52",
        color: "#ffffff",
        size: 13,
      },
      {
        text: "Grado/Grupo",
        style: "tableHeader",
        bold: true,
        fillColor: "#2a3e52",
        color: "#ffffff",
        size: 13,
      },
      {
        text: "Profesor",
        style: "tableHeader",
        bold: true,
        fillColor: "#2a3e52",
        color: "#ffffff",
        size: 13,
      },
      {
        text: "Motivos",
        style: "tableHeader",
        bold: true,
        fillColor: "#2a3e52",
        color: "#ffffff",
        size: 13,
      },
      {
        text: "Fecha",
        style: "tableHeader",
        bold: true,
        fillColor: "#2a3e52",
        color: "#ffffff",
        size: 13,
      },
      {
        text: "Estatus",
        style: "tableHeader",
        alignment: "center",
        bold: true,
        fillColor: "#2a3e52",
        color: "#ffffff",
        size: 13,
      }
    ];
    this._PdfService.generatePdf(
      "Reporte de Alertas",
      header,
      this.arrAlerta,
      "center",
      'landscape'
    );

  }

  exportAsXLSX() {
    let jsnInfo = {};
    const jsnObject = [];
  
    if (this.alertas.length !== 0) {

      for (const alerta of this.alertas) {

        let motivo = '';
        for (const iterator of alerta.arrCrde) {
          motivo += iterator.strNombre + ', ';
        }

        jsnInfo = {};
        jsnInfo = {
          Matricula: alerta.strMatricula,
          Alumno: alerta.strNombreAlumno,
          Carrera: alerta.idCarrera['strCarrera'],
          Especialidad: alerta.idEspecialidad,
          Asignatura: alerta.idAsignatura['strAsignatura'],
          Grupo: alerta.strGrupo,
          Profesor: alerta.idUser['strName'],
          Motivo: motivo,
          Fecha: this.getFecha(alerta.createdAt),
          Estatus: alerta.idEstatus['strNombre']
        };

        if (jsnInfo !== '') {
          jsnObject.push(jsnInfo);
        }

      }
        this.excelService.exportAsExcelFile(jsnObject, `${this.title}`);
    }
    }

    getFecha(value){
      return value ? moment(value).format('DD/MM/YYYY') : '';
    }
  }