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

declare var $: any;

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
  createdAt: Date;
  fecha2: Date;

  constructor(private _carrerasService: CareersService, private _alertService: AlertService, private _espService: SpecialtyService, private _asigService: SubjectsService, private _userService: UserManagementService, private _estatusService: AlertStatusService) { }

  ngOnInit(): void {
    setTimeout(() => {
      $('.selectpicker').selectpicker('refresh');
    }, 0);
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
    this._alertService.getMonitorAlerts(this.alerta.idCarrera, this.alerta.idEspecialidad, this.alerta.idUser, this.alerta.idAsignatura, this.alerta.idEstatus, this.alerta.createdAt).then((data: any) => {
      this.alertas = data.cnt;
      console.log(this.alertas);
    }).catch((err) => {
      console.log(err);
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

  getFiltroCarrera(idCarrera: string) {}

  getFiltroAsignatura(idAsignatura) {}

  exportPDF() {}

  exportAsXLSX() {}

}
