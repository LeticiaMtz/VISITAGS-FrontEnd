import { Component, OnInit } from '@angular/core';
import { CareerModel } from 'src/app/models/career';
import { CareersService } from 'src/app/services/careers/careers.service';
import { Router } from '@angular/router';
import { PdfServiceService } from 'src/app/services/PDF/pdf-service.service';
import { ExportDataService } from 'src/app/services/excel/export-to-excel.service';
import { SubjectModel } from 'src/app/models/subjects';
import { SubjectsService } from '../../services/subjects/subjects.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {
  subs: SubjectModel[] = [];
  searchText: any;
  pageActual: number;
  cargando: boolean;
  refresh: boolean = false;
  actualizar: boolean = false;
  idAsig: string;
  correoAdmin: string;
  title: string;
  regTerm: boolean = false;
  activo: boolean = true;
  arrayCareer = [];
  constructor(private subjectsService: SubjectsService, private route: Router, private _PdfService: PdfServiceService, private _excelService: ExportDataService) { }

 
  ngOnInit(): void {
    this.getAsignatura();
    this.title = 'Reposte de Asignaturas';
  }
  
  getAsignatura(){
    this.subjectsService.getAsignatura().then((res: any) => {
      this.subs = res.asignatura;
      for (const c of this.subs) {
        let element = [
          c.strAsignatura.replace(/\:null/gi,':""'),
          c.strSiglas.replace(/\:null/gi,':""')
        ];
        this.arrayCareer.push(element);
      } 
    }).catch(err => {
      console.log(err);
    });
  }

  actualizarAsignatura(valueUpdate: boolean, _id: string){
    this.actualizar = valueUpdate;
    this.idAsig = _id;
  }

  updateCanceled(e) {
    this.actualizar = e;
  }

  refreshTable(e) {
    this.refresh = e;
    if (this.refresh){
      this.ngOnInit();
    }
  }

  exportPDF() {
    let header = [
      {
        text: "Nombre de la Asignatura",
        style: "tableHeader",
        bold: true,
        fillColor: "#2a3e52",
        color: "#ffffff",
        size: 13,
      },
      {
        text: "Siglas",
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
      this.arrayCareer,
      "center"
    );
  }

  exportAsXLSX() {
    if (this.subs.length !== 0) {
      let jsonobject = JSON.stringify(this.subs);
      jsonobject = jsonobject.replace(/strAsignatura/gi, 'Nombre');
      const jsonobject2 = JSON.parse(jsonobject);
      const count = Object.keys(jsonobject2).length;
      for (let i = 0; i < count; i++) {
        delete jsonobject2[i].createdAt;
        delete jsonobject2[i].updatedAt;
        delete jsonobject2[i].blnStatus;
        delete jsonobject2[i]._id;
        delete jsonobject2[i].__v;
      }
      this._excelService.exportAsExcelFile(jsonobject2, `${this.title}`);
    }

  }

}
