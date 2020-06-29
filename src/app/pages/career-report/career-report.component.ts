import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CareersService } from '../../services/careers/careers.service';
import { CareerModel } from '../../models/career';
import { ActivatedRoute, Router } from '@angular/router';
import { ExportToPdfService } from '../../services/pdf/export-to-pdf.service';

@Component({
  selector: 'app-career-report',
  templateUrl: './career-report.component.html',
  styleUrls: ['./career-report.component.css']
})
export class CareerReportComponent implements OnInit {

  careers: CareerModel[] = [];
  searchText: any;
  pageActual: number;
  cargando: boolean;
  refresh: boolean = false;
  actualizar: boolean = false;
  idCareer: string;
  correoAdmin: string;
  title: string;
  regTerm: boolean = false;
  activo: boolean = true;
  arrayCareer = [];


  constructor(private careerService: CareersService, private route: Router, private _PdfService: ExportToPdfService) { }

  ngOnInit(): void {
    this.getCareeers();
  }
  
  getCareeers(){
    this.careerService.getCareers().then((res: any) => {
      this.careers = res.carrera;
      for(const c of this.careers){
        let element = [
          c.strCarrera
        ];
        this.arrayCareer.push(c);
      }
      console.log(this.careers);
    }).catch(err => {
      console.log(err);
    });
  }

  actualizarCarrera(valueUpdate: boolean, _id: string){
    this.actualizar = valueUpdate;
    this.idCareer = _id;
  }

  updateCanceled(e){
    console.log(e);
    this.actualizar = e;
  }

  refreshTable(e){
    this.refresh = e;
    if (this.refresh){
      this.ngOnInit();
    }
  }

  exportPDF(){
    let header = [
      {
        text: "Nombre",
        style: "tableHeader",
        bold: true,
        fillColor: "#2a3e52",
        color: "#ffffff",
        size: 13,
      }
    ];
    this._PdfService.generatePdf(
      "Reporte de Carreras",
      header,
      this.arrayCareer,
      "center",
      'landscape'
    );
  }

  exportAsXLSX(){

  }

}
