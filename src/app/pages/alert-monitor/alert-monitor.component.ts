import { Component, OnInit } from '@angular/core';
import { CareersService } from '../../services/careers/careers.service';
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
import { environment } from 'src/environments/environment.prod';
import { async } from '@angular/core/testing';
import { map } from 'rxjs/operators';

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
  // todasLasAlertas: AlertModel[] = [];
  cargando: boolean = true;
  searchText: any;
  pageActual: number;
  carrera: any;
  alerta: AlertModel = new AlertModel();
  profesores: any[] = [];
  arrEstatus: AlertStatusModel[] = [];
  idCarrera: string;
  idAsignatura: string;
  idEspecialidad: string;
  idUser: string;
  idEstatus: string;
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
  idCarreraMonitor: string;
  idEspecialidadMonitor: string;
  idAsignaturaMonitor: string;
  idUserMonitor: string;
  idEstatusMonitor: string; 
  mostrarCarreras: boolean = false;
  mostrarProfesor: boolean = false;
  mostrarEspecialidad: boolean = false;
  mostrarEstatus: boolean = false;
  mostrarAsignatura: boolean = false;
  disabled: boolean = false;

  constructor(private router: Router, private _carrerasService: CareersService, private _alertService: AlertService, private _espService: SpecialtyService, private _asigService: SubjectsService, private _userService: UserManagementService, private _estatusService: AlertStatusService, private _PdfService: PdfServiceService, private excelService: ExportDataService, private _specialityService: SpecialtyService) { }

  ngOnInit(): void {
    this.token = localStorage.aa_token;
    this.tokenDecoded = jwt_decode(this.token);
    this.disabled = true;
    this.getCarreras();
    this.getAsignaturas();
    this.getProfesores();
    this.getEstatus();
    this.getValoresFiltro();
  }

  getCarreras() {
    this._carrerasService.getCareers().then((carreras: any) => {
      let carrers = carreras.cnt;
      for (const carrera of carrers) {
        carrera.blnStatus && this.carreras.push({
          _id: carrera._id,
          strNombre: carrera.strCarrera,
          aJsnEspecialidad: carrera.aJsnEspecialidad
        })
      }
      this.mostrarCarreras = true;
    }).catch((err) => {
      Toast.fire({
        icon: 'warning',
        title: err.error ? err.error.msg : err
      });
    });
  }

  getEspecialidades(idCarrera: string) {
    this.disabled = false;


    if (idCarrera !== localStorage.getItem('aa_carreraMonitor')) {
      localStorage.removeItem('aa_especialidadMonitor');
      localStorage.removeItem('aa_asignaturaMonitor');
      localStorage.removeItem('aa_profesorMonitor');
      localStorage.removeItem('aa_estatusMonitor');
      localStorage.removeItem('aa_fechaDesde');
      localStorage.removeItem('aa_fechaHasta');
    
      this.alerta.idEspecialidad = undefined;
      this.alerta.idAsignatura = undefined;
      this.alerta.idUser = undefined;
      this.alerta.createdAt = undefined;
      this.alerta.createdAt1 = undefined;
      this.alerta.idEstatus = undefined;
    
      this.idEspecialidadMonitor = undefined;
      this.idAsignaturaMonitor = undefined;
      this.idUserMonitor = undefined;
      this.idEstatusMonitor = undefined;
      
      this.mostrarProfesor = false;
      this.mostrarEspecialidad = false;
      this.mostrarEstatus = false;
      this.mostrarAsignatura= false;
  
      setTimeout(() => {
        this.mostrarProfesor = true;
        this.mostrarEspecialidad = true;
        this.mostrarEstatus = true;
        this.mostrarAsignatura = true;
      }, 0);
    }
    
    localStorage.setItem('aa_carreraMonitor', idCarrera);
    this._espService.getSpecialties(idCarrera).then(async(data: any) => {
      let especialidades = data.cnt.rutas;
      this.especialidades = especialidades.map(esp => esp = {
        _id: esp._id,
        strNombre: esp.strEspecialidad
      });
      this.mostrarEspecialidad = true;
      this.getAlertas();
    }).catch((err) => {
      Toast.fire({
        icon: 'warning',
        title: err.error ? err.error.msg : err
      });
    });
  }

  getAsignaturas() {
    this._asigService.getAsignatura().then((data: any) => {
      for (const asignatura of data.cnt) {
        asignatura.blnStatus && this.asignaturas.push({
          _id: asignatura._id,
          strNombre: asignatura.strAsignatura
        });
      }
      // setTimeout(() => {
        this.mostrarAsignatura = true;
      // }, 500);
    }).catch((err) => {
      Toast.fire({
        icon: 'warning',
        title: err.error ? err.error.msg : err
      });
    });
  }

  getProfesores() {
    this._userService.getUsuarios().then((data: any) => {
      let profes = data.cnt;
      for (const profesor of profes) {
        profesor.blnStatus && this.profesores.push({
          _id: profesor._id,
          strNombre: `${profesor.strName} ${profesor.strLastName} ${profesor.strMotherLastName ? profesor.strMotherLastName : ''}`
        });
      }
      this.mostrarProfesor = true;
    }).catch((err) => {
      Toast.fire({
        icon: 'warning',
        title: err.error ? err.error.msg : err
      });
    });
  }

  async getAlertas() {
    this.cargando = true;
    this.arrAlertasFinal = [];
    this.alertas = [];
    // this.ejecutarServicioMonitor();

    if (this.alerta.idCarrera === null || this.alerta.idCarrera === undefined) {
      this.alerta.idCarrera = undefined
      Toast.fire({
        icon: 'warning',
        title: 'Selecciona una carrera'
      });
    } else {
      if (this.alerta.idEspecialidad === null) {
        this.alerta.idEspecialidad = undefined
      }
  
      if (this.alerta.idUser === null) {
        this.alerta.idUser = undefined
      }
  
      if (this.alerta.idAsignatura === null) {
        this.alerta.idAsignatura = undefined
      }
  
      if (this.alerta.idEstatus === null) {
        this.alerta.idEstatus = undefined
      }
  
      if (this.alerta.createdAt === null || this.alerta.createdAt === undefined) {
        this.alerta.createdAt = undefined;
      }
  
      if (this.alerta.createdAt1 === null) {
        this.alerta.createdAt1 = undefined
      }
  
      this._alertService.getMonitorAlerts(this.alerta.idCarrera, this.alerta.idEspecialidad, this.alerta.idUser, this.alerta.idAsignatura, this.alerta.idEstatus, this.alerta.createdAt, this.alerta.createdAt1).then(async (data: any) => {
        this.alertas = data.cont.resultados;
        // this.todasLasAlertas = data.cont.resultados;
        this.filtro = true;
        this.cargando = false;
        this.arrAlerta = [];
        
        let carreras = await this._carrerasService.getCareers();
  
        this.arrAlertasFinal = [];
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
  
          let nombre: string;
          let arrayAlumnosCapitalizados = []
          for (nombre of alert.strNombreAlumno) {
            nombre = this.capitalizarNombre(nombre)
            arrayAlumnosCapitalizados.push(nombre);
          }

          let indexSeguimiento = alert.aJsnSeguimiento.length - 1;
          let seguimiento = alert.aJsnSeguimiento[indexSeguimiento];
  
          let element = [
            alert.strMatricula.map(matricula => matricula + ','),
            arrayAlumnosCapitalizados.map(alumno => alumno + ','),
            alert.idCarrera['strCarrera'],
            strEspecialidad,
            alert.idAsignatura['strAsignatura'],
            alert.strGrupo,
            alert.idUser['strName'] + ' ' + alert.idUser['strLastName'],
            alert.arrCrde.map(motivo => motivo.strNombre + ','),
            this.getFecha(alert.createdAt),
            alert.nmbSemana,
            alert.idEstatus['strNombre'],
            seguimiento['strComentario']
          ];
          this.arrAlerta.push(element);
        }
      }).catch((err) => {
        Toast.fire({
          icon: 'error',
          title: err.error ? err.error.msg : err
        });
        this.arrAlertasFinal = [];
        this.cargando = false;
        this.filtro = true;
      });
    }
  }

  getEstatus() {
    this._estatusService.getAllStatus().then((data: any) => {
      this.arrEstatus = data.cnt;
      for (const estatus of data.cnt) {
        estatus.blnStatus && this.arrEstatus.push(estatus);
      }
      this.mostrarEstatus = true;
    }).catch((err) => {
      Toast.fire({
        icon: 'warning',
        title: err.error ? err.error.msg : err
      });
    });
  }

  guardarEspecialidad() {
    localStorage.setItem('aa_especialidadMonitor', this.alerta.idEspecialidad);
    this.getAlertas();
  }

  guardarAsignatura() {
    localStorage.setItem('aa_asignaturaMonitor', this.alerta.idAsignatura);
    this.getAlertas();
  }

  guardarProfesor() {
    localStorage.setItem('aa_profesorMonitor', this.alerta.idUser);
    this.getAlertas();
  }

  guardarEstatus() {
    localStorage.setItem('aa_estatusMonitor', this.alerta.idEstatus);
    this.getAlertas();
  }

  guardarFechaDesde() {
    localStorage.setItem('aa_fechaDesde', this.alerta.createdAt.toString());
    this.getAlertas();
  }

  guardarFechaHasta() {
    localStorage.setItem('aa_fechaHasta', this.alerta.createdAt1.toString());
    this.getAlertas();
  }

  getValoresFiltro() {
    if (localStorage.getItem('aa_carreraMonitor')) {
      this.alerta.idCarrera = localStorage.getItem('aa_carreraMonitor');
      this.alerta.idEspecialidad = localStorage.getItem('aa_especialidadMonitor');
      this.alerta.idAsignatura = localStorage.getItem('aa_asignaturaMonitor');
      this.alerta.idUser = localStorage.getItem('aa_profesorMonitor');
      this.alerta.idEstatus = localStorage.getItem('aa_estatusMonitor');

      if (localStorage.getItem('aa_fechaDesde') === null) {
        this.alerta.createdAt = undefined
      } else {
        this.alerta.createdAt = new Date(localStorage.getItem('aa_fechaDesde'));
      }

      if (localStorage.getItem('aa_fechaHasta') === null) {
        this.alerta.createdAt1 = undefined
      } else {
        this.alerta.createdAt1 = new Date(localStorage.getItem('aa_fechaHasta'));
      }

      this.idCarreraMonitor = this.alerta.idCarrera;
      this.idAsignaturaMonitor = this.alerta.idAsignatura;
      this.idEspecialidadMonitor = this.alerta.idEspecialidad;
      this.idUserMonitor = this.alerta.idUser;
      this.idEstatusMonitor = this.alerta.idEstatus;
  
      setTimeout(() => {
        this.getEspecialidades(this.alerta.idCarrera);
      }, 500);
    }
  }

  resetFiltros() {
    this.disabled = true;
    this.alertas = [];
    this.arrAlertasFinal = [];
    this.especialidades = [];

    localStorage.removeItem('aa_carreraMonitor');
    localStorage.removeItem('aa_especialidadMonitor');
    localStorage.removeItem('aa_asignaturaMonitor');
    localStorage.removeItem('aa_profesorMonitor');
    localStorage.removeItem('aa_estatusMonitor');
    localStorage.removeItem('aa_fechaDesde');
    localStorage.removeItem('aa_fechaHasta');

    this.alerta.idCarrera = undefined;
    this.alerta.idEspecialidad = undefined;
    this.alerta.idAsignatura = undefined;
    this.alerta.idUser = undefined;
    this.alerta.createdAt = undefined;
    this.alerta.createdAt1 = undefined;
    this.alerta.idEstatus = undefined;

    this.idCarreraMonitor = undefined;
    this.idEspecialidadMonitor = undefined;
    this.idAsignaturaMonitor = undefined;
    this.idUserMonitor = undefined;
    this.idEstatusMonitor = undefined;

    this.mostrarCarreras = false;
    this.mostrarProfesor = false;
    this.mostrarEspecialidad = false;
    this.mostrarEstatus = false;
    this.mostrarAsignatura= false;

    setTimeout(() => {
      this.mostrarCarreras = true;
      this.mostrarProfesor = true;
      this.mostrarEspecialidad = true;
      this.mostrarEstatus = true;
      this.mostrarAsignatura = true;
    }, 0);

    Toast.fire({
      icon: 'success',
      title: `¡Filtros Reiniciados!`
    });
    this.filtro = false;
  }

  verAlerta(idAlerta: string) {
    // falta ponerle el id del rol del usuario
    this.router.navigate([`/Tracking-alerts/${idAlerta}/${this.tokenDecoded.user._id}`]);
  }

  verAlumno(alertaId){
    for (const cadaAlerta of this.alertas){     
      if(cadaAlerta._id == alertaId){
        this.arrMatricula = cadaAlerta.strMatricula;
        this.arrAlumno = cadaAlerta.strNombreAlumno;
      }
    } 
  }

  capitalizarNombre(nombre: string) {
    let palabras = nombre.split(' ');
    let textoCapitalizado = '';
    for (const palabra of palabras) {
      textoCapitalizado += palabra.substr(0,1).toUpperCase() + palabra.substr(1).toLowerCase() + ' ';
    }
    return textoCapitalizado;
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
        text: "Alumno(s)",
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
      },
      {
        text: "Ultimo Comentario",
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

    if (this.alertas.length !== 0) {

      for (const alerta of this.alertas) {

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

        let indexSeguimiento = alerta.aJsnSeguimiento.length - 1;
        let seguimiento = alerta.aJsnSeguimiento[indexSeguimiento];

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
          Estatus: alerta.idEstatus['strNombre'],
          'Ultimo Comentario': seguimiento['strComentario']
        });
      }
      this.excelService.exportAsExcelFile(JSON.parse(JSON.stringify(this.jsnObject)), `${this.title}`);
      this.jsnObject = [];
    }
  }

  getFecha(value) {
    return value ? moment(value).format('DD/MM/YYYY') : '';
  }

  // ejecutarServicioMonitor(){
  //   this._alertService.getMonitorAlerts(this.alerta.idCarrera, this.alerta.idEspecialidad, this.alerta.idUser, this.alerta.idAsignatura, this.alerta.idEstatus, this.alerta.createdAt, this.alerta.createdAt1).then( (data: any) => {
  //     this.todasLasAlertas = data.cont.resultados;
  //   });
    //No poner el catch(), no necesario porque este servico ya se esta ejecutando en el metodo getAlertas()
    //este servicio se esta ejecutando para llenar arreglos importantes para mostrar información en el monitor.
  // }
}
