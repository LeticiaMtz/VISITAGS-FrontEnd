import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { ExportDataService } from 'src/app/services/excel/export-to-excel.service';
import { PdfServiceService } from 'src/app/services/PDF/pdf-service.service';
import { UserManagementService } from 'src/app/services/user-manegement/user-management.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment.prod';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
 });

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  rolUsuario = environment.roles.profesor;
  users: User[] = [];
  searchText: any;
  pageActual: number;
  cargando: boolean;
  refresh: boolean = false;
  actualizar: boolean = false;
  idUsuario: string;
  title: string;
  arrayUser = [];
  activo: boolean = true;

  constructor(private userManagementService: UserManagementService,private _PdfService: PdfServiceService, private _excelService: ExportDataService) {}

  ngOnInit(): void {
    this.getUsuarios();
    this.title = 'Gestion de Usuarios';
  }

  getUsuarios() {
    this.cargando=true;
    this.arrayUser = [];
    this.userManagementService.getUsuarios().then((res: any) => {
      this.cargando=false;
      this.users = res.cnt;
      for (const c of this.users) {
        let element = [
          c.strName.replace(/\:null/gi,':""'),
          c.strLastName.replace(/\:null/gi,':""'),
          c.idRole['strRole'].replace(/\:null/gi,':""'),
        ];
        this.arrayUser.push(element);
      }
    }).catch(err => {
      Toast.fire({
        icon: 'warning',
        title: err.error ? err.error.msg : err
      });
    });
  }

  actualizarUsuario(valueUpdate: boolean, _id: string){
    this.actualizar = valueUpdate;
    this.idUsuario = _id;
  }

  refreshTable(e) {
    this.refresh = e;
    if (this.refresh){
      this.ngOnInit();
    }
  }

  updateCanceled(e) {
    this.actualizar = e;
  }


  exportPDF() {
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
      text: "Apellido",
      style: "tableHeader",
      bold: true,
      fillColor: "#2a3e52",
      color: "#ffffff",
      size: 13,
    },
    {
      text: "Rol",
      style: "tableHeader",
      bold: true,
      fillColor: "#2a3e52",
      color: "#ffffff",
      size: 13,
    }
  ];
  this._PdfService.generatePdf(
    this.title,
    header,
    this.arrayUser,
    "center"
    
  );

}

exportAsXLSX() {
  if (this.users.length !== 0) {
    let jsonobject = JSON.stringify(this.users);
    jsonobject = jsonobject.replace(/strName/gi, 'Nombre');
    jsonobject = jsonobject.replace(/strLastName/gi, 'Primer Apellido');
    jsonobject = jsonobject.replace(/strMotherLastName/gi, 'Segundo Apellido');
    const jsonobject2 = JSON.parse(jsonobject);
    const count = Object.keys(jsonobject2).length;
    for (let i = 0; i < count; i++) {
      delete jsonobject2[i].arrEspecialidadPermiso;
      delete jsonobject2[i].idRole;
      delete jsonobject2[i].strEmail;
      delete jsonobject2[i].strPassword;
      delete jsonobject2[i].createdAt;
      delete jsonobject2[i].updatedAt;
      delete jsonobject2[i].blnStatus;
      delete jsonobject2[i].aJsnEspecialidad;
      delete jsonobject2[i]._id;
      delete jsonobject2[i].__v;
      delete jsonobject2[i].blnNotificaciones;
      
    }
    this._excelService.exportAsExcelFile(jsonobject2, `${this.title}`);
  }

}
 }