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
import { ModalityService } from '../../services/modality/modality.service';
import { ModalityModel } from 'src/app/models/modality.model';
import { environment } from '../../../environments/environment.prod';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { EventEmitter } from 'protractor';

declare var $: any;

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

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
  modalidades: ModalityModel[] = [];
  chooseSpeciality: boolean = false;
  asignaturas: SubjectModel[] = [];
  idPersona: string;

  // tslint:disable-next-line: max-line-length
  constructor(private alertaService: AlertService, private carrerasService: CareersService, private especialidadService: SpecialtyService, private asignaturaService: SubjectsService, private reasonsService: ReasonsService, private modalityService: ModalityService, private router: Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      $('.selectpicker').selectpicker('refresh');
      }, 0);
      let token = localStorage.token;
      let tokenDecoded = jwt_decode(token);
      this.alerta.idUser = tokenDecoded.user._id;
      this.alerta.idEstatus = environment.idEstatusNuevo;
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
    let fd = new FormData();

    fd.append('idUser', this.alerta.idUser);
    fd.append('idEstatus', this.alerta.idEstatus);
    fd.append('strMatricula', this.alerta.strMatricula);
    fd.append('strNombreAlumno', this.alerta.strNombreAlumno);
    fd.append('idAsignatura', this.alerta.idAsignatura);
    fd.append('idCarrera', this.alerta.idCarrera);
    fd.append('idEspecialidad', this.alerta.idEspecialidad);
    fd.append('strGrupo', this.alerta.strGrupo);
    fd.append('chrTurno', this.alerta.chrTurno);
    fd.append('idModalidad', this.alerta.idModalidad);
    fd.append('strDescripcion', this.alerta.strDescripcion);

    if (this.alerta.aJsnEvidencias !== null) {
      for ( let doc = 0; doc < this.alerta.aJsnEvidencias.length; doc++ ) {
        fd.append('aJsnEvidencias', this.alerta.aJsnEvidencias[doc]);
      }
    }

    this.alertaService.postAlerta(this.alerta, fd).then((data) => {
      console.log(data);
      Toast.fire({
        icon: 'success',
        title: `¡Alerta registrada exitosamente!`
      });
      forma.reset();
      this.alerta.aJsnEvidencias = [];
      this.router.navigate(['/dashboard']);
    }).catch((err) => {
      Toast.fire({
        icon: 'error',
        title: err.error.msg
      });
      forma.reset();
      this.alerta.aJsnEvidencias = [];
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

  getModalidades() {
    this.modalityService.getModalidades().then((modalidades: any) => {
      this.modalidades = modalidades.modalidad;
      setTimeout(() => {
        $('.selectpicker').selectpicker('refresh');
      }, 0);
    }).catch((err) => {
      console.log(err);
    })
  }

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
