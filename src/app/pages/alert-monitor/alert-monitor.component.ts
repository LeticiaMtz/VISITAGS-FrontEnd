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
  todasLasAlertas: AlertModel[] = [];
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
  jsnObject: any[] = [];
  especialidad: SpecialtyModel = new SpecialtyModel();
  arrAlertasFinal: any[] = [];
  arrMatricula: any[] = [];
  arrAlumno: any[] = [];

  constructor(private router: Router, private _carrerasService: CareersService, private _alertService: AlertService, private _espService: SpecialtyService, private _asigService: SubjectsService, private _userService: UserManagementService, private _estatusService: AlertStatusService, private _PdfService: PdfServiceService, private excelService: ExportDataService, private _specialityService: SpecialtyService) { }

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

  async getAlertas() {
    this.arrAlertasFinal = [];
    this.ejecutarServicioMonitor();

    this._alertService.getMonitorAlerts(this.alerta.idCarrera, this.alerta.idEspecialidad, this.alerta.idUser, this.alerta.idAsignatura, this.alerta.idEstatus, this.alerta.createdAt, this.alerta.createdAt1).then(async (data: any) => {
      this.alertas = data.cont.resultados;
      this.filtro = true;
      this.cargando = false;
      this.arrAlerta = [];

      let carreras = await this._carrerasService.getCareers();

      for (const alert of this.alertas) {

        let strEspecialidad = '';
        for (const carrera of this.carreras) {
          let encontrado = await carrera.aJsnEspecialidad.find(especialidad => especialidad._id.toString() === alert.idEspecialidad.toString());
          if (encontrado) {
            strEspecialidad = encontrado.strEspecialidad;
            let alerta = {
              alert,
              strEspecialidad
            };
            this.arrAlertasFinal.push(alerta);
          }
        }

        let element = [
          alert.strMatricula.map(matricula => matricula + ','),
          alert.strNombreAlumno.map(alumno => alumno + ','),
          alert.idCarrera['strCarrera'],
          strEspecialidad,
          alert.idAsignatura['strAsignatura'],
          alert.strGrupo,
          alert.idUser['strName'] + ' ' + alert.idUser['strLastName'],
          alert.arrCrde.map(motivo => motivo.strNombre + ','),
          this.getFecha(alert.createdAt),
          alert.nmbSemana,
          alert.idEstatus['strNombre']
        ];
        this.arrAlerta.push(element);

      }
    }).catch((err) => {
      console.log(err);
      Toast.fire({
        icon: 'error',
        title: err.error.cont.error
      });
      this.arrAlertasFinal = [];
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

  resetFiltros() {
    setTimeout(() => {
      $('.selectpicker').val(this.ngOnInit()).selectpicker('refresh');
    }, 0);
    this.alerta.idCarrera = undefined;
    this.alerta.idEspecialidad = undefined;
    this.alerta.idAsignatura = undefined;
    this.alerta.idUser = undefined;
    this.alerta.createdAt = undefined;
    this.alerta.createdAt1 = undefined;
    this.alerta.idEstatus = undefined;
    this.ngOnInit();
    Toast.fire({
      icon: 'success',
      title: `¡Filtros Reiniciados!`
    });
    this.alertas = [];
    this.filtro = false;
  }

  verAlerta(idAlerta: string) {
    // falta ponerle el id del rol del usuario
    this.router.navigate([`/Tracking-alerts/${idAlerta}/${this.tokenDecoded.user._id}`]);
  }

  verAlumno(alertaId){
    for (const cadaAlerta of this.todasLasAlertas){     
      if(cadaAlerta._id == alertaId){
        this.arrMatricula = cadaAlerta.strMatricula;
        this.arrAlumno = cadaAlerta.strNombreAlumno;
      }
    } 
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
        text: "Semana",
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

  async exportAsXLSX() {
    let jsnInfo = {};

    let carreras = await this._carrerasService.getCareers();

    if (this.todasLasAlertas.length !== 0) {

      for (const alerta of this.todasLasAlertas) {

        let matricula = '';
        for (const iterator of alerta.strMatricula) {
          matricula  += iterator + ', ';
        }

        let alumno = '';
        for (const iterator of alerta.strNombreAlumno) {
          alumno += iterator + ', ';
        }

        let motivo = '';
        for (const iterator of alerta.arrCrde) {
          motivo += iterator.strNombre + ', ';
        }

        let strNombre = '';
        for (const carrera of this.carreras) {
          let encontrado = await carrera.aJsnEspecialidad.find(especialidad => especialidad._id.toString() === alerta.idEspecialidad.toString());
          if(encontrado) {
            strNombre = encontrado.strEspecialidad;
          }
        }

        await this.jsnObject.push({
          Matricula: matricula,
          Alumno: alumno,
          Carrera: alerta.idCarrera['strCarrera'],
          Especialidad: strNombre,
          Asignatura: alerta.idAsignatura['strAsignatura'],
          Grupo: alerta.strGrupo,
          Profesor: alerta.idUser['strName'] + ' ' + alerta.idUser['strLastName'],
          Motivo: motivo,
          Fecha: this.getFecha(alerta.createdAt),
          Semana: alerta.nmbSemana,
          Estatus: alerta.idEstatus['strNombre']
        });
      }
      this.excelService.exportAsExcelFile(JSON.parse(JSON.stringify(this.jsnObject)), `${this.title}`);
      this.jsnObject = [];
    }
  }

  getFecha(value) {
    return value ? moment(value).format('DD/MM/YYYY') : '';
  }

  ejecutarServicioMonitor(){
    this._alertService.getMonitorAlerts(this.alerta.idCarrera, this.alerta.idEspecialidad, this.alerta.idUser, this.alerta.idAsignatura, this.alerta.idEstatus, this.alerta.createdAt, this.alerta.createdAt1).then( (data: any) => {
      this.todasLasAlertas = data.cont.resultados;
    });
  }
}
