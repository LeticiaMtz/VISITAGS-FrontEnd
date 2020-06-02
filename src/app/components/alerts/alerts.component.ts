import { Component, OnInit, ElementRef ,ViewChild } from '@angular/core';
import {AlertService} from '../../services/alert.service';
import {Alert} from '../../models/alert';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user'; 
import { NgForm } from '@angular/forms';
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas';  

declare let M: any;
// declare let jspdf: any; 



@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css'],
  providers: [AlertService, UserService]
})
export class AlertsComponent implements OnInit {
  searchText; 
  valueCategory = '';
  val:string
  listAlerts: Array<any> = [];
  arr = {
    value: this.val
  }
  userId:string;
  id_user:string;
  constructor(public alertService: AlertService, public userService: UserService) { }


  ngOnInit(){
      // this.valueCategory = "academic";
      
      var elems = document.querySelectorAll('select');
      var instances = M.FormSelect.init(elems);
    
      this.getAlerts();
      this.getUser();
      this.userId = this.alertService.selectedAlert.id_user;
  
  }
  // getUser(){
  //   this.userService.getUser()
  //   .subscribe(res =>{
  //     console.log(res);
  //     this.userId = res['UserId'];
  //     this.userService.getdataUser(this.userId)
  //     .subscribe(res =>{
  //       console.log('si se trajo las alertas');
  //       this.userService.getAlertsData(res['_id'])
  //       .subscribe(res =>{
  //         console.log('Aqui empiezan las alertas');
  //         console.log(res);
  //         console.log('aqui termian las alertas');
          
  //       })
        
  //       console.log('los values del user: ');
        
  //       console.log(res);
        
        
  //     });
  //   });
  // }

  getUser(){
    this.userService.getUser()
    .subscribe(res =>{
      console.log('el user id es:');
      
      console.log(res);
      this.userId = res['UserId'];
      this.alertService.getAlerts()
      .subscribe(res=>{
        console.log('esto solo se ve aqui');
        console.log(typeof res);
        const json = JSON.stringify(res)
        const datajson = JSON.parse(json);
        console.log(' mi json es');
        console.log(datajson);
        
        for (let index = 0; index < datajson.length; index++) {
          // const element = array[index];
          if (datajson[index].id_user === this.userId) {
            console.log('*************************');
            console.log(datajson[index]);
            this.listAlerts.push(datajson[index])
            console.log('asi quedan las alertas');

            console.log(this.listAlerts);
            
          }else{
            console.log('NO ENTRE AL MALDITO IF');
            
          }
        }

      })
    });
  }



  paver(){
    console.log(this.arr);
  }

  optionChanged(event){
    console.log(event.target.value);
    this.valueCategory = event.target.value;
    
    
  }
 

  createReport()  
  {  
    let data = document.getElementById('report');  
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      let imgWidth = 208;   
      let pageHeight = 295;    
      let imgHeight = canvas.height * imgWidth / canvas.width;  
      let heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      let position = 0;  
      pdf.addImage(contentDataURL, 'JPEG', 0, position, imgWidth, imgHeight)  
      pdf.save('Report.pdf'); // Generated PDF 
    });  

  }  

  counter(elem){
    if (elem.value.length > 6) {
      elem.value = elem.value.slice(0,6); 
    }
  }
 

  addAlert(form: NgForm){
    if (form.value._id) {
      this.alertService.putAlert(form.value)
      .subscribe(res => {
        console.log(res);
        this.resetForm(form);
        M.toast({html: 'Alerta actualizada correctamente'})
        this.getAlerts();
        location.reload(); 
        
        
      });
    }else{
      this.alertService.postAlert(form.value)
      .subscribe(res => {
        console.log(res);
        this.resetForm(form);
        M.toast({html: 'Alerta guardada correctamente'})
        this.getAlerts();
        location.reload(); 
      });
    }
   
  }

  getAlerts(){
    this.alertService.getAlerts()
    .subscribe(res =>{
      this.alertService.alerts = res as Alert[];
      console.log(res);
     
      
    })
  }
  editAlert(alert : Alert){
    this.alertService.selectedAlert = alert;
    // this.userService.putUser()
  }
  deleteAlert(_id:string){
    if (confirm('¿Estás seguro de que quieres eliminar la alerta?')) {
      this.alertService.deleteAlert(_id)
      .subscribe(res => {
        console.log(res);
        this.getAlerts();
        
        M.toast({html: 'Alerta eliminada correctamente'})
        location.reload(); 
      });
     

    }

  }


  //clean form after submit
  resetForm(form?: NgForm){
    if (form) {
      form.reset();
      this.alertService.selectedAlert = new Alert();
    }
  }

}
