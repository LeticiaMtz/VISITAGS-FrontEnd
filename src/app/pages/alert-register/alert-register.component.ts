import { Component, OnInit } from '@angular/core';
import { AlertModel } from '../../models/alert.model';
import { FormArray, FormBuilder, NgForm } from '@angular/forms';
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
import { UserManagementService } from '../../services/user-manegement/user-management.service';
import { User } from 'src/app/models/user.model';


declare var $: any;

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 4000
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
  carreras: any[] = [];
  especialidades: any[] = [];
  razones: ReasonsModel[] = [];
  modalidades: any[] = [];
  chooseSpeciality: boolean = false;
  asignaturas: any[] = [];
  idPersona: string;
  documentos: any[] = [];
  motivos: any[] = [];
  arrAlumnos: any[] = [];
  arrColaboradores: any[] = [];
  personas: any[] = [];

  // tslint:disable-next-line: max-line-length
  constructor(private alertaService: AlertService, private carrerasService: CareersService, private especialidadService: SpecialtyService, private asignaturaService: SubjectsService, private reasonsService: ReasonsService, private modalityService: ModalityService, private router: Router, private _userService: UserManagementService ) { }

  ngOnInit(): void {
    this.arrAlumnos.push({ strMatricula: '', strNombreAlumno: ''});
    this.arrColaboradores.push({_id: ''});
    console.log(this.arrColaboradores.length);
    let token = localStorage.aa_token;
    let tokenDecoded = jwt_decode(token);
    this.alerta.idUser = tokenDecoded.user._id;
    this.alerta.idEstatus = environment.nuevo;
    this.getAll();
  }

  addAlumno(formaAlumno: NgForm) {
    if (formaAlumno.invalid) {
      Toast.fire({
        icon: 'warning',
        title: 'Algunos campos no fueron llenados'
      });
    } else {
      this.arrAlumnos.push({ strMatricula: '', strNombreAlumno: '' });
      Toast.fire({
        icon: 'success',
        title: `¡Nuevos Campos Creados!`
      });
    }
  }

  eliminarAlumno(index: number) {
    this.arrAlumnos.splice(index, 1);
    Toast.fire({
      icon: 'warning',
      title: `¡El campo fué eliminado!`
    });
  }

  addColaborador(formaColaborador: NgForm) {
    console.log(formaColaborador);
    if (formaColaborador.invalid) {
      Toast.fire({
        icon: 'warning',
        title: 'No se ha seleccionado un colaborador'
      });
    } else {
      this.arrColaboradores.push({_id: ''});
      Toast.fire({
        icon: 'success',
        title: `¡Nuevos Campos Creados!`
      });
      console.log(this.arrColaboradores);
    }
  }

  eliminarColaborador(index: number,formaColaborador: NgForm) {
    console.log(index,formaColaborador.controls);
    this.arrColaboradores.splice(index, 1);
    console.log(this.arrColaboradores);
    formaColaborador.onReset();
    Toast.fire({
      icon: 'warning',
      title: `¡El campo fué eliminado!`
    });
  }

  getAll() {
    this.getCarreras();
    this.getModalidades();
    this.getAsignaturas();
    this.getConductasRiesgo();
    this.getPersonas();
  }

  getPersonas() {
    this._userService.getUsuarios().then((data: any) => {
      
      for (const persona of data.cnt) {
        this.personas.push({
          _id: persona._id,
          strNombre: `${persona.strName} ${persona.strLastName}`
        });
      }
      console.log(this.personas);
    }).catch((err) => {
      Toast.fire({
        icon: 'warning',
        title: `¡${err.msg}!`
      });
    });
  }

  seleccionarTurno(turno: string) {
    this.alerta.chrTurno = turno;
  }

  registrarAlerta(forma: NgForm) {

    if ( forma.invalid ) {
      Toast.fire({
        icon: 'error',
        title: 'No es posible registrar una alerta con uno o mas campos vacíos'
      });
      return false;
    } else {
      let fd = new FormData();

      fd.append('idUser', this.alerta.idUser);
      fd.append('idEstatus', this.alerta.idEstatus);
      fd.append('strMatricula', this.alerta.strMatricula);
      fd.append('strNombreAlumno', this.alerta.strNombreAlumno);
      fd.append('idAsignatura', this.alerta.idAsignatura);
      fd.append('idCarrera', this.alerta.idCarrera);
      fd.append('idEspecialidad', this.alerta.idEspecialidad);

      if (this.alerta.arrCrde !== null) {
        for (let crde = 0; crde < this.alerta.arrCrde.length; crde++) {
          fd.append('arrCrde', this.alerta.arrCrde[crde]);
        }
      }

      fd.append('strGrupo', this.alerta.strGrupo);
      fd.append('chrTurno', this.alerta.chrTurno);
      fd.append('idModalidad', this.alerta.idModalidad);
      fd.append('strDescripcion', this.alerta.strDescripcion);
      // fd.append('strFileEvidencias', this.documentos);
      for(let i = 0; i < this.documentos.length; i++){
        fd.append('strFileEvidencia', this.documentos[i]);
      }

      this.alertaService.postAlerta(fd).then((data) => {
        Toast.fire({
          icon: 'success',
          title: `¡Alerta registrada exitosamente!`
        });
        this.router.navigate(['/dashboard']);
      }).catch((err) => {
        Toast.fire({
          icon: 'error',
          title: err.error.msg
        });
        forma.reset();
      });
    }
  }

  getArchivos(archivos: any) {
    this.documentos.push(archivos)
  }

  getCarreras() {
    this.carrerasService.getCareers().then((carreras: any) => {

      for (const carrera of carreras.cnt) {
        this.carreras.push({
          _id: carrera._id,
          strNombre: carrera.strCarrera
        });
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  getEspecialidad(idEspecialidad: string) {

    console.log(idEspecialidad);
    this.especialidadService.getSpecialties(idEspecialidad).then((especialidades: any) => {

      for (const especials of especialidades.cnt.rutas) {

        console.log('Hola');
        console.log(especials);
        this.especialidades.push({
          strNombre: especials.strEspecialidad,
          _id: especials._id
        });
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  getCrde( idCrde: string) {
    this.alerta.arrCrde = idCrde;
  }

  getModalidades() {
    this.modalityService.getModalidades().then((modalidades: any) => {

      for (const modalidad of  modalidades.cnt) {
        this.modalidades.push({
          _id: modalidad._id,
          strNombre: modalidad.strModalidad
        });
      }

    }).catch((err) => {
      console.log(err);
    })
  }

  getAsignaturas() {
    this.asignaturaService.getAsignatura().then((asign: any) => {

       for (const asignatura of  asign.cnt) {
        this.asignaturas.push({
          _id: asignatura._id,
          strNombre: asignatura.strAsignatura
        });
      }
    }).catch((err)=> {
      console.log(err);
    });
  }

  getConductasRiesgo() {
    this.reasonsService.getReasons().then((razones: any) => {
      this.razones = razones.cnt;
      console.log(this.razones);
      for (const razon of this.razones) {
        for (const motivo of razon.aJsnMotivo) {
          this.motivos.push(motivo);
        }
      }
    }).catch((err) => {
      console.log(err);
    });
    console.log(this.motivos);
  }

}
