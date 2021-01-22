import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  arrColabFInal: any[] = [];
  personas: any[] = [];
  arrAlertas: any[] = [];
  semanas: any[] = [];

  constructor(private alertaService: AlertService, private carrerasService: CareersService, private especialidadService: SpecialtyService, private asignaturaService: SubjectsService, private reasonsService: ReasonsService, private modalityService: ModalityService, private router: Router, private _userService: UserManagementService, private cdr: ChangeDetectorRef ) { }

  ngOnInit(): void {
    this.ngAfterViewInit();
    this.arrAlumnos.push({ strMatricula: '', strNombreAlumno: ''});
    this.arrColaboradores.push({_id: ''});
    let token = localStorage.aa_token;
    let tokenDecoded = jwt_decode(token);
    this.alerta.idUser = tokenDecoded.user._id;
    this.alerta.idEstatus = environment.nuevo;
    this.getAll();
    for (let i = 1; i <= 16; i++) {
      this.semanas.push({
        _id: i,
        strNombre: `Semana ${i}`,
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

  addAlumno(formaAlumno: NgForm) {
    this.ngAfterViewInit();
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

  addColaborador(formaColaborador: NgForm, evento: any) {
    this.ngAfterViewInit();
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
    }
  }

  eliminarColaborador(formaColaborador: NgForm,index: number) {
    formaColaborador.form.removeControl( `_id${index}`);
    this.arrColaboradores.splice(index, 1);
    Toast.fire({
      icon: 'warning',
      title: `¡El campo fué eliminado!`
    });
    this.ngAfterViewInit();
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
        persona.blnStatus && this.personas.push({
            _id: persona._id,
            strNombre: `${persona.strName} ${persona.strLastName}`
          });
      }
    }).catch((err) => {
      Toast.fire({
        icon: 'warning',
        title: err.error ? err.error.msg : err
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
      fd.append('idAsignatura', this.alerta.idAsignatura);
      fd.append('idCarrera', this.alerta.idCarrera);
      fd.append('idEspecialidad', this.alerta.idEspecialidad);
      fd.append('strGrupo', this.alerta.strGrupo);
      fd.append('chrTurno', this.alerta.chrTurno);
      fd.append('idModalidad', this.alerta.idModalidad);
      fd.append('strDescripcion', this.alerta.strDescripcion);
      fd.append('nmbSemana', this.alerta.nmbSemana.toString());

      let crdes = '';

      if (this.alerta.arrCrde !== null) {
        for (let crde = 0; crde < this.alerta.arrCrde.length; crde++) {
          crdes +=  this.alerta.arrCrde[crde] + ',';
        }
      }

      fd.append('arrCrde', crdes.slice(0,-1));

      let colaboradores = '';
      
      for (const colaborador of this.arrColaboradores) {
        let id = colaborador._id[0];
        if (id !== '' && typeof id !== 'undefined') colaboradores += id + ',';
      }
      if(colaboradores !== '' && typeof colaboradores !== 'undefined' && colaboradores.length > 23) fd.append('arrInvitados', colaboradores.slice(0,-1));

      let matriculas = '';
      let nombresAlumnos = '';

      for (const alumno of this.arrAlumnos) {
        matriculas += alumno.strMatricula + ',';
        nombresAlumnos += alumno.strNombreAlumno + ',';
      }

      for (let i = 0; i < this.documentos.length; i++) {
        fd.append('strFileEvidencia', this.documentos[i]);
      }

      fd.append('strMatricula', matriculas.slice(0,-1));
      fd.append('strNombreAlumno', nombresAlumnos.slice(0,-1));

      this.alertaService.postAlerta(fd).then((data: any) => {

        Toast.fire({
          icon: 'success',
          title: data.msg
        });
      }).catch((err) => {
        Toast.fire({
          icon: 'error',
          title: err.error ? err.error.msg : err
        });
        forma.reset();
      });

      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 1000);
    }
  }

  getArchivos(archivos: any) {
    this.documentos.push(archivos);
  }

  eliminarArchivo(archivo: any) {
    const index = this.documentos.indexOf(archivo);
    this.documentos.splice(index, 1);
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
      Toast.fire({
        icon: 'error',
        title: err.error ? err.error.msg : err
      });
    });
  }

  getEspecialidad(idEspecialidad: string) {
    this.especialidades = [];

    this.especialidadService.getSpecialties(idEspecialidad).then((especialidades: any) => {
      for (const especials of especialidades.cnt.rutas) {
        this.especialidades.push({
          strNombre: especials.strEspecialidad,
          _id: especials._id
        });
      }
    }).catch((err) => {
      Toast.fire({
        icon: 'error',
        title: err.error ? err.error.msg : err
      });
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
      Toast.fire({
        icon: 'error',
        title: err.error ? err.error.msg : err
      });
    });
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
      Toast.fire({
        icon: 'error',
        title: err.error ? err.error.msg : err
      });
    });
  }

  getConductasRiesgo() {
    this.reasonsService.getReasons().then((razones: any) => {
      this.razones = razones.cnt;
      for (const razon of this.razones) {
        for (const motivo of razon.aJsnMotivo) {
          motivo['blnStatus'] && this.motivos.push(motivo);
        }
      }
    }).catch((err) => {
      Toast.fire({
        icon: 'error',
        title: err.error ? err.error.msg : err
      });
    });
  }

}
