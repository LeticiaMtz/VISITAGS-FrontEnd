import { SpecialtyService } from '../../services/specialties/specialty.service';
import { Component, OnInit } from '@angular/core';
import { SpecialtyModel } from '../../models/specialty';
import { ActivatedRoute, Router } from '@angular/router';
import { CareersService } from '../../services/careers/careers.service';



@Component({
  selector: 'app-specialty-report',
  templateUrl: './specialty-report.component.html',
  styleUrls: ['./specialty-report.component.css']
})
export class SpecialtyReportComponent implements OnInit {

  specialties: SpecialtyModel[] = [];
  pageActual: number;
  searchText: any;
  actualizar: boolean = false;
  cargando: boolean;
  refresh: boolean;
  idCareer: string;
  idSpecialty: string;
  activo: boolean = true;


  constructor(private specialtyService: SpecialtyService, private careersService: CareersService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.idCareer = this.activatedRoute.snapshot.params.id; 
    this.getSpecialties(this.idCareer);   
  }

  getSpecialties(id: string){
    this.careersService.getCarrerByid(id).then((res:any) => {
      console.log(res.cnt[0].aJsnEspecialidad);
      this.specialties = res.cnt[0].aJsnEspecialidad;
    }).catch(err => {
      console.log(err);
    });
  }

  actualizarEspecialidad(value: boolean, _id: string){
    this.actualizar = value;
    this.idSpecialty = _id
  }

  refreshTable(e){
    this.refresh = e;
    if (this.refresh){
      this.ngOnInit();
    }
  }

  updateCanceled(e){
    this.actualizar = e;
  }


  exportPDF(){

  }

  exportAsXLSX(){
    
  }

}
