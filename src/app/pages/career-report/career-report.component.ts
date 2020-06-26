import { Component, OnInit } from '@angular/core';
import { CareersService } from '../../services/careers/careers.service';
import { Career } from '../../models/career';
import Swal from 'sweetalert2';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';

@Component({
  selector: 'app-career-report',
  templateUrl: './career-report.component.html',
  styleUrls: ['./career-report.component.css']
})
export class CareerReportComponent implements OnInit {

  careers: Career[] = [];
  searchText: any;
  pageActual: number;
  cargando: boolean;
  actualizar: boolean = false;
  idAdmin: string;
  correoAdmin: string;
  title: string;
  regTerm: boolean = false;


  constructor(private careerService: CareersService) { }

  ngOnInit(): void {

    this.careers = [
      {
        strName: "Matematicas",
        blnStatus: true 
      },
      {
        strName: "Español",
        blnStatus: true
      },
      {
        strName: "Ingles",
        blnStatus: true
      },
      {
        strName: "Programacion",
        blnStatus: true
      },
      {
        strName: "Base de Datos",
        blnStatus: true
      }
    ]
  }
  
  actualizarCarrera(valueUpdate: boolean){
    this.actualizar = valueUpdate;
    
  }

  updateCanceled(e){
    console.log(e);
    this.actualizar = e;
  }

  exportPDF(){

  }

  exportAsXLSX(){

  }

}
