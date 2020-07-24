import { Component, OnInit } from '@angular/core';
import { AlertModel } from '../../models/alert.model';
import { NgForm } from '@angular/forms';
import { FileModel } from '../../models/file.model';
import { CareersService } from 'src/app/services/careers/careers.service';
import { CareerModel } from '../../models/career';
import { SpecialtyService } from '../../services/specialties/specialty.service';
import { SpecialtyModel } from 'src/app/models/specialty';
import { SubjectModel } from '../../models/subjects.model';
import { SubjectsService } from '../../services/subjects/subjects.service';
import { AlertService } from '../../services/alert/alert.service';
import * as jwt_decode from 'jwt-decode';
import { BehaviorService } from '../../services/behavior/behavior.service';
import { BehaviorModel } from 'src/app/models/behavior.model';
import { ReasonsService } from '../../services/reasons-crde/reasons-crde.service';
import { ReasonsModel } from 'src/app/models/reasons-crde.model';

declare var $: any;

@Component({
  selector: 'app-alert-register',
  templateUrl: './alert-register.component.html',
  styleUrls: ['./alert-register.component.css']
})
export class AlertRegisterComponent implements OnInit {

  alerta: AlertModel = new AlertModel();
  cacharTurno: string;
  archivos: [] = [];
  archivo: File;
  evidencias: FileModel[] = [];
  evidencia: FileModel;
  carreras: CareerModel[] = [];
  especialidades: SpecialtyModel[] = [];
  razones: ReasonsModel[] = [];
  chooseSpeciality: boolean = false;
  asignaturas: SubjectModel[] = [];
  idPersona: string;

  // tslint:disable-next-line: max-line-length
  constructor(private alertaService: AlertService, private carrerasService: CareersService, private especialidadService: SpecialtyService, private asignaturaService: SubjectsService, private reasonsService: ReasonsService) { }

  ngOnInit(): void {
    setTimeout(() => {
      $('.selectpicker').selectpicker('refresh');
      }, 0);
      let token = localStorage.token;
      let tokenDecoded = jwt_decode(token);
      this.alerta.idPersona = tokenDecoded.user._id
    this.getAll();
  }

  getAll() {
    this.getCarreras();
    this.getModalidades();
    this.getAsignaturas();
    this.getConductasRiesgo();
  }

  seleccionarTurno(turno: string) {
    this.alerta.chrTurno = turno;
  }

  registrarAlerta(forma: NgForm) {
    console.log(this.alerta);
    this.alertaService.postAlerta(this.alerta).then((data) => {
      console.log(data);
      forma.reset();
    }).catch((err) => {
      console.log(err);
    });
  }

  getArchivos(archivos: any) {
    this.alerta.aJsnEvidencias = archivos;
  }

  getCarreras() {
    this.carrerasService.getCareers().then((carrera: any) => {
      this.carreras = carrera.carrera;
      setTimeout(() => {
        $('.selectpicker').selectpicker('refresh');
      }, 0);
    }).catch((err) => {
      console.log(err);
    });
  }

  getEspecialidad(idEspecialidad: string) {
    this.especialidadService.getSpecialties(idEspecialidad).then((especialidades: any) => {
      this.especialidades = especialidades.cont.rutas;
      setTimeout(() => {
        $('.selectpicker').selectpicker('refresh');
      }, 0);
    }).catch((err) => {
      console.log(err);
    });
  }

  getModalidades() {}

  getAsignaturas() {
    this.asignaturaService.getAsignatura().then((asign: any) => {
      this.asignaturas = asign.asignatura;
      setTimeout(() => {
        $('.selectpicker').selectpicker('refresh');
        }, 0);
    }).catch((err)=> {
      console.log(err);
    });
  }

  getConductasRiesgo() {
    this.reasonsService.getReasons().then((razones: any) => {
      this.razones = razones.crde;
      setTimeout(() => {
        $('.selectpicker').selectpicker('refresh');
      }, 0);
    }).catch((err) => {
      console.log(err);
    });
  }

}
