import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Mis Alertas', url: '/dashboard' },
        { titulo: 'Gestión de Carreras', url: '/career-report'},
        { titulo: 'Gestión de CRDE', url: '/reasons-crde' },
        { titulo: 'Gestión de Estatus de Alertas', url: '/estatus-alerta'},
        { titulo: 'Registro de Alertas', url: '/registro-alerta'},
        { titulo: 'Gestión de Asignaturas', url: '/subjects' },
        { titulo: 'Gestión de Modalidades', url: '/modality' },
        { titulo: 'Seguimiento Alerta', url: '/Tracking-alerts' },
        { titulo: 'ProgressBar', url: '/progress' },
        { titulo: 'Graficas', url: '/graficas1' },
        { titulo: 'Promesas', url: '/promesas'},
        { titulo: 'Rxjs', url: '/rxjs' },
      
      ]
    }
  ];

  constructor() { }
}
