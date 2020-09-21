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
      console.log(err);
    });
  }

  getEspecialidades(idCarrera: string) {
    console.log(idCarrera);
    this._espService.getSpecialties(idCarrera).then((data: any) => {
      setTimeout(() => {
        $('.selectpicker').selectpicker('refresh');
      }, 0);
      this.especialidades = data.cnt.rutas;
      this.getAlertas();
    }).catch((err) => {
      console.log(err);
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
      console.log(err);
    });
  }

  getProfesores() {
    this._userService.getUsuarios().then((data: any) => {
      setTimeout(() => {
        $('.selectpicker').selectpicker('refresh');
      }, 0);
      this.profesores = data.cnt;
    }).catch((err) => {
      console.log(err);
    });
  }

  getAlertas() {
    this._alertService.getMonitorAlerts(this.alerta.idCarrera, this.alerta.idEspecialidad, this.alerta.idUser, this.alerta.idAsignatura, this.alerta.idEstatus, this.alerta.createdAt, this.alerta.createdAt1).then((data: any) => {
      this.alertas = data.cnt;
      this.filtro = true;
      this.cargando = false;
      this.arrAlerta = [];

      for (const alert of this.alertas) {
        this._carrerasService.getCarrerByid(alert.idCarrera['_id']).then((data: any) => {
          this.especi = data.cnt[0].aJsnEspecialidad;
          console.log(this.especi);
          
          this.especi.forEach(element => {
            if (element._id === alert.idEspecialidad){
              console.log(element._id);
              this.specialty.strEspecialidad = element.strEspecialidad;
              console.log(this.specialty.strEspecialidad);
            }
           });
          let element = [
            alert.strNombreAlumno,
            alert.idCarrera['strCarrera'],
            this.specialty.strEspecialidad,
            alert.idAsignatura['strAsignatura'],
            alert.idUser['strName'],
            this.getFecha(alert.createdAt),
            alert.idEstatus['strNombre']
          ];
          this.arrAlerta.push(element);
        }).catch((err) => {
          console.log(err);
        });
      }
      console.log('ArrAlertas PDF', this.arrAlerta);
    }).catch((err) => {
      Toast.fire({
        icon: 'error',
        title: err.error.msg
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
      console.log(err);
    });
  }

  verAlerta(idAlerta: string) {
    // falta ponerle el id del rol del usuario
    this.router.navigate([`/Tracking-alerts/${idAlerta}/${this.tokenDecoded.user._id}`]);
  }

  exportPDF() {
    let header = [
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
        text: "Profesor",
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
        jsnInfo = {};
        jsnInfo = {
          Alumno: alerta.strNombreAlumno,
          Carrera: alerta.idCarrera['strCarrera'],
          // Especialidad: alerta.idE,
          Asignatura: alerta.idAsignatura['strAsignatura'],
          Profesor: alerta.idUser['strName'],
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
