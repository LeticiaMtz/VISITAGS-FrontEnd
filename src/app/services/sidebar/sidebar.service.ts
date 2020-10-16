import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

rol = environment.roles;

  // menu: any = [
  //   {
  //     titulo: 'Principal',
  //     icono: 'mdi mdi-gauge',
  //     submenu: [
  //       { titulo: 'Mis Alertas', icono: 'fa fa-exclamation-triangle', url: '/dashboard', roles: [this.rol.administrador, this.rol.coordinador, this.rol.director, this.rol.profesor]},
  //       { titulo: 'Gestión de Carreras', icono: 'fa fa-graduation-cap', url: '/career-report', roles: [this.rol.administrador]},
  //       { titulo: 'Gestión de CRDE', icono: 'fa fa-exclamation-circle', url: '/reasons-crde', roles: [this.rol.administrador] },
  //       { titulo: 'Estatus de Alerta', icono: 'fa fa-thermometer-half', url: '/estatus-alerta', roles: [this.rol.administrador] },
  //       { titulo: 'Registro de Alertas', icono: 'fa fa-file', url: '/registro-alerta', roles: [this.rol.administrador, this.rol.coordinador, this.rol.director, this.rol.profesor]},
  //       { titulo: 'Gestión de Asignaturas', icono: 'fa fa-book', url: '/subjects', roles: [this.rol.administrador] },
  //       { titulo: 'Gestión de Modalidades', icono: 'fa fa-sun-o', url: '/modality', roles: [this.rol.administrador] },
  //       { titulo: 'Gestión de Usuarios', icono: 'fa fa-user-o', url: '/user-management', roles: [this.rol.coordinador] },
  //     ]
  //   }
  // ];

  menu: any = [
    { titulo: 'Alertas', icono: 'fa fa-exclamation-circle' ,
    submenu: [
      { titulo: 'Registro de Alertas', icono: 'fa fa-file', url: '/registro-alerta', roles: [this.rol.administrador, this.rol.coordinador, this.rol.director, this.rol.profesor]},
      { titulo: 'Mis Alertas', icono: 'fa fa-exclamation-triangle', url: '/dashboard', roles: [this.rol.administrador, this.rol.coordinador, this.rol.director, this.rol.profesor] },
      { titulo: 'Monitor de Seguimiento', icono: 'fa fa-desktop', roles: [] },
      { titulo: 'Monitor de Alertas', icono: 'fa fa-line-chart', url: '/monitor-alertas', roles: [this.rol.administrador, this.rol.coordinador, this.rol.director, this.rol.profesor] },
    ]
  },
    {
      titulo: 'Catalogos',
      icono: 'mdi mdi-folder-multiple-outline',
      submenu: [

        { titulo: 'Gestión de Carreras', icono: 'fa fa-graduation-cap', url: '/career-report', roles: [this.rol.administrador]},
        { titulo: 'Gestión de CRDE', icono: 'fa fa-exclamation-circle', url: '/reasons-crde', roles: [this.rol.administrador] },
        { titulo: 'Gestión de Asignaturas', icono: 'fa fa-book', url: '/subjects',  roles: [this.rol.administrador] },
        { titulo: 'Gestión de Modalidades', icono: 'fa fa-sun-o', url: '/modality',  roles: [this.rol.administrador] },
        { titulo: 'Estatus de Alerta', icono: 'fa fa-thermometer-half', url: '/estatus-alerta',  roles: [this.rol.administrador]},
      ]
    },
  { titulo: 'Configuración', icono: 'fa fa-cogs' ,
    submenu: [
      { titulo: 'Gestión de Usuarios', icono: 'fa fa-user-o', url: '/user-management', roles: [this.rol.coordinador] },
    ]},
  ];

  constructor() { }
}
