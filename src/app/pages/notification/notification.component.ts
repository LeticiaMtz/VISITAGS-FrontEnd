import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { PdfServiceService } from '../../services/PDF/pdf-service.service';
import { ExportDataService } from '../../services/excel/export-to-excel.service';
import { UserManagementService } from '../../services/user-manegement/user-management.service';
import { User } from 'src/app/models/user.model';
import { element, browser } from 'protractor';
import { CareersService } from '../../services/careers/careers.service';
import { CareerModel } from 'src/app/models/career';
import { RoleModel } from '../../models/role.model';
import { RolesService } from '../../services/roles/roles.service';
import { NgForm } from '@angular/forms';
import { SpecialtyModel } from 'src/app/models/specialty';
declare var $: any;

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})

export class NotificationComponent implements OnInit {

  @Input() paquetito: any;
  @Input() usermanagementModel: User[];
  @Output() salida = new EventEmitter();
  @Output() refresh = new EventEmitter();

  usuarios: User[] = [];
  searchText: any;
  pageActual: number;
  cargando: boolean;
  actualizar: boolean = false;
  idUser: string;

  name: string;
  strLastName: String;
  strMotherLastName: String;
  title: string;
  regTerm: boolean = false;
  activo: boolean = true;
  arrayUser = [];
  carreras: CareerModel[] = [];
  userManag: User = new User();
  seleccionado: boolean = false;

  check = true;


  isActive: boolean;
  @Output() optionCancel = new EventEmitter();

  user: User = new User();
  claveUsuario: string;
  public role = '';
  status = '';
  arrEspecialidadPermiso = [];


  constructor(private usermanagementService: UserManagementService,
    private route: Router, private _PdfService: PdfServiceService,
    private userService: UserManagementService, private rolesService: RolesService,
    private _excelService: ExportDataService,
    private activatedRoute: ActivatedRoute,
    private carreraService: CareersService) { 
      //obtener por params el idUsuario
      let idUser = activatedRoute.snapshot.params.idUsuario
    // this.idUser = '5fb436bb68e2a20a907094d4';
    //obtener datos de ese usuario
    // this.getUsuario(this.idUser);
    }
  ngOnInit(): void {
    setTimeout(() => {
      $('.selectpicker').selectpicker('refresh');
    }, 0);

    this.status = '';
    this.arrayUser = [];
    this.title = 'Reporte de Gestión de Usuarios';
    this.getCarreras();
    this.idUser = this.activatedRoute.snapshot.params.id;
    this.getUsuario(this.idUser);
  }
  getCarreras() {
    this.carreraService.getCareers().then((res: any) => {
      this.carreras = res['cnt'];
    })
  }
  getCarrerasByUser() {
    this.carreraService.getCareers().then((res: any) => {
      var count = 0;
      this.carreras = res['cnt'];
      this.carreras.forEach(carrera => {
        var i = 0;
        for (let carreras of carrera.aJsnEspecialidad) {
          for (let ids of this.arrEspecialidadPermiso) {
            if (carreras['_id'] == ids) {
              i++;
              carreras.check = true;
            }
            if (i == carrera.aJsnEspecialidad.length) {
              carrera.check = true;
            }
          }
        }

      });
    });
  }

  changetodos(carrera: CareerModel) {
    if (this.idUser != undefined) {
    let espe = [];

    if (carrera.check == true) {
        carrera.check = false;
        carrera.aJsnEspecialidad.forEach(especialidad => {
          let index: number = this.arrEspecialidadPermiso.indexOf(especialidad._id);
          if (index !== -1) {
            this.arrEspecialidadPermiso.splice(index, 1);
            especialidad.check = false;
            for(const arrperm of this.arrEspecialidadPermiso){
              for (const carrera of this.carreras) {
                for (const subcategorias of carrera.aJsnEspecialidad) {
                  if (subcategorias._id == arrperm) {
                    espe.push(subcategorias.strEspecialidad);
                  }
                }
            }
            } 
            const excelUsu = this.usuarios.map(item => item.strName).indexOf(this.name);
            this.usuarios[excelUsu].arrEspecialidadPermiso = [{}];
            this.arrEspecialidadPermiso.forEach(per =>{
              this.usuarios[excelUsu].arrEspecialidadPermiso.push(per); 
    
            });
          }
        });
      } else {
        for(const arrperm of this.arrEspecialidadPermiso){
          for (const carrera of this.carreras) {
            for (const subcategorias of carrera.aJsnEspecialidad) {
              if (subcategorias._id == arrperm) {
                espe.push(subcategorias.strEspecialidad);
              }
            }
        }
        }
        carrera.check = true;
        carrera.aJsnEspecialidad.forEach(especialidad => {
          especialidad.check = true;
          if (this.arrEspecialidadPermiso.filter(esp => esp == especialidad._id).length == 0) {
            this.arrEspecialidadPermiso.push(especialidad._id);
            espe.push(especialidad.strEspecialidad);
          }
        });

        // const updae = this.arrayUser.map(item => item[0]).indexOf(this.name);
        // this.arrayUser[updae][3] = espe; 

        const excelUsu = this.usuarios.map(item => item.strName).indexOf(this.name);
        this.usuarios[excelUsu].arrEspecialidadPermiso = [{}];
        this.arrEspecialidadPermiso.forEach(per =>{
          this.usuarios[excelUsu].arrEspecialidadPermiso.push(per);
        });

       

      }
    }
  }

  changeCheck(especialidad: SpecialtyModel) {
    if (this.idUser != undefined) {
      let espe = [];
    
      if (especialidad.check == true) {
        especialidad.check = false;
        this.arrEspecialidadPermiso.filter(esp => esp !== especialidad._id);
        const index: number = this.arrEspecialidadPermiso.indexOf(especialidad._id);
        if (index !== -1) {
          this.arrEspecialidadPermiso.splice(index, 1);
        }
        for(const arrperm of this.arrEspecialidadPermiso){
          for (const carrera of this.carreras) {
            for (const subcategorias of carrera.aJsnEspecialidad) {
              if (subcategorias._id == arrperm) {
                espe.push(subcategorias.strEspecialidad);
              }
            }
    
        }
      } 
        const excelUsu = this.usuarios.map(item => item.strName).indexOf(this.name);
        this.usuarios[excelUsu].arrEspecialidadPermiso = [{}];
        this.arrEspecialidadPermiso.forEach(per =>{
          this.usuarios[excelUsu].arrEspecialidadPermiso.push(per);
        });
      

      } else {
        this.arrEspecialidadPermiso.push(especialidad._id);
        for(const arrperm of this.arrEspecialidadPermiso){
          for (const carrera of this.carreras) {
            for (const subcategorias of carrera.aJsnEspecialidad) {
              if (subcategorias._id == arrperm) {
                espe.push(subcategorias.strEspecialidad);
              }
            }
          }
        }
        especialidad.check = true;
        // const updae = this.arrayUser.map(item => item[0]).indexOf(this.name);
        // this.arrayUser[updae][3] = espe; 
        const excelUsu = this.usuarios.map(item => item.strName).indexOf(this.name);
        this.usuarios[excelUsu].arrEspecialidadPermiso = [{}];
        this.arrEspecialidadPermiso.forEach(per =>{
          this.usuarios[excelUsu].arrEspecialidadPermiso.push(per);
        });
      }
    }
  }

  refreshTable(e) {
    this.refresh = e;
    if (this.refresh) {
      this.ngOnInit();
    }
  }


  actualizarGestiondeUsuarios(valueUpdate: boolean, _id: string) {
    this.actualizar = valueUpdate;
    this.idUser = _id;

  }

  updateCanceled(e) {
    this.actualizar = e;
  }


  getUsuario(idUsuario: string) {
    let espe = []
    this.arrayUser=[];
    this.usuarios=[];
    this.seleccionado = true;
    this.claveUsuario = idUsuario;
    this.userService.getUsuariosByid(idUsuario).then((data: any) => {

      this.name = data.cnt[0]['strName'];
      this.strLastName = data.cnt[0]['strLastName'];
      this.strMotherLastName = data.cnt[0]['strMotherLastName'];
      this.idUser = data.cnt[0]['_id'];
      this.arrEspecialidadPermiso = data.cnt[0]['arrEspecialidadPermiso'];
      this.role = data.cnt[0].idRole.strRole;
      this.user = data.cnt[0];
      this.status = `${data.cnt[0]['blnStatus']}`;
      this.usuarios.push(data.cnt[0]);
      this.getCarrerasByUser();
      for (const especialidad of this.usuarios[0].arrEspecialidadPermiso) {
        for (const carrera of this.carreras) {
            for (const subcategorias of carrera.aJsnEspecialidad) {
              if (subcategorias._id == especialidad) {
                espe.push(subcategorias.strEspecialidad);
              }
            }
          
        }
      }
      let element = [
        data.cnt[0].strName.replace(/\:null/gi, ':""'),
        data.cnt[0].strLastName.replace(/\:null/gi, ':""'),
        data.cnt[0].strMotherLastName != null ? data.cnt[0].strMotherLastName.replace(/\:null/gi, ':""') : "",
        espe.length > 0 ? espe : []
      ];
       this.arrayUser.push(element);
    }).then((err) => {
      console.log(err);
    });
  }
  actexportPDF() {

    this.exportPDF();
    this.ngOnInit();
  }

  exportPDF() {
 let data = [];
data = [this.arrayUser];
    
    let header = [
      {
        text: "Nombre",
        style: "tableHeader",
        bold: true,
        fillColor: "#2a3e52",
        color: "#ffffff",
        size: 13,
      },
      {
        text: "Apellido Paterno",
        style: "tableHeader",
        bold: true,
        fillColor: "#2a3e52",
        color: "#ffffff",
        size: 13,
      },
      {
        text: "Apellido Materno",
        style: "tableHeader",
        bold: true,
        fillColor: "#2a3e52",
        color: "#ffffff",
        size: 13,
      },
      {
        text: "Especialidades",
        style: "tableHeader",
        bold: true,
        fillColor: "#2a3e52",
        color: "#ffffff",
        size: 13,
      },
    ];
    this._PdfService.generatePdf(
      this.title,
      header,
      this.arrayUser,
      "center",
    );
  }

  async  exportAsXLSX()  {
    let users = [];
    if (this.usuarios.length !== 0) {
      let espe = [];
      let jsonobject = JSON.stringify(this.usuarios);
      espe = [];
      const jsonobject2 = JSON.parse(jsonobject);
      const count = Object.keys(jsonobject2).length;
      for (const j of jsonobject2) {
        for (const especialidad of j.arrEspecialidadPermiso) {
          for (const carrera of this.carreras) {
            for (const subcategorias of carrera.aJsnEspecialidad) {
              if (subcategorias._id == especialidad) {
                espe.push(subcategorias.strEspecialidad);
              }
            }
          }
        }

        let element = {
          "Nombre": j.strName,
          "Apellido Paterno": j.strLastName,
          "Apellido Materno": j.strMotherLastName,
          "Especialidades": JSON.stringify(espe).replace("[", " ").replace("]", "")
        };

      await  users.push(element);
        espe = [];

      }

     await this._excelService.exportAsExcelFile(users, `${this.title}`);
    }

  }

  boton(){
    Swal.fire({
      title: '<strong>Instrucciones</strong>',
      icon: 'info',
      html:
        'El modulo de <b>notificaciones</b> te permite acceder, ' +
        'a las carreras y especialidades que el usuario tiene asignadas ' +
        'con esto se logra que el usuario pueda recibir correos sobre ' +
        'alertas creadas en su especialidad.',
      showCloseButton:  false,
      showCancelButton: false,
      focusConfirm: false,
      confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> Ok!',
    })
  }
  putUsuario(){
    this.usermanagementService.putUsuarioEspecialidad(this.idUser, this.arrEspecialidadPermiso).then(res => {
      Toast.fire({
        icon: 'success',
        title: `¡El usuario ${this.user.strName} se actualizó exitosamente!`
      });
      this.getUsuario(this.idUser);
      this.optionCancel.emit(false);
      this.refresh.emit(true);
    }).catch(err => {
      Toast.fire({
        icon: 'error',
        title: err.error.msg
      });
    });
  }

      // Toast.fire({
      //   icon: 'success',
      //   title: 'Usuario actualizado correctamente!'
      // });
  cancecelar(){

  }

}
