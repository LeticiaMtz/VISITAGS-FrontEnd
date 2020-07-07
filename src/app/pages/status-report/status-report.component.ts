import { Component, OnInit } from '@angular/core';
import { AlertStatusModel } from 'src/app/models/alert-status.model';

@Component({
  selector: 'app-status-report',
  templateUrl: './status-report.component.html',
  styleUrls: ['./status-report.component.css']
})
export class StatusReportComponent implements OnInit {

  estatus: AlertStatusModel[] = [];
  searchText: any;
  pageActual: number;
  cargando: boolean;
  refresh: boolean = false;
  actualizar: boolean = false;
  idEstatus: string;
  title: string;
  regTerm: boolean = false;
  activo: boolean = true;
  arrayEstatus = [];

  constructor() { }

  ngOnInit(): void {
  }

  actualizarEstatus(dato: boolean, id: string) {}

  exportAsXLSX() {}

  exportPDF() {}

}
