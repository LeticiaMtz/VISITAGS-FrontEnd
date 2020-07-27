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
        { titulo: 'Dashboard', url: '/dashboard' },
        { titulo: 'Reporte de Carreas', url: '/career-report'},
        { titulo: 'Motivos CRDE', url: '/reasons-crde' },
        { titulo: 'Catalogo de Estatus de Alertas', url: '/estatus-alerta'},
        { titulo: 'Registro de Incidencias', url: '/registro-alerta'},
        { titulo: 'Asignaturas', url: '/subjects' },
        { titulo: 'Modalidades', url: '/modality' },
        { titulo: 'ProgressBar', url: '/progress' },
        { titulo: 'Graficas', url: '/graficas1' },
        { titulo: 'Promesas', url: '/promesas'},
        { titulo: 'Rxjs', url: '/rxjs' },
      
      ]
    }
  ];

  constructor() { }
}
