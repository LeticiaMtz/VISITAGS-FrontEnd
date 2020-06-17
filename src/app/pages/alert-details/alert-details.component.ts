import { Component, OnInit  } from '@angular/core';
import {AlertService} from '../../services/alert.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { NgForm } from '@angular/forms';
import {CommentsService} from '../../services/comments.service';
import {Comments} from '../../models/comments';
declare let M: any;
@Component({
  
  selector: 'app-alert-details',
  templateUrl: './alert-details.component.html',
  styleUrls: ['./alert-details.component.css']
})

export class AlertDetailsComponent implements OnInit {
  datos_alerta: any;
  id_alert: string
  alert_array:  Array<any> = [];
  listComment: Array<string> = [];
  constructor(public alertService:AlertService, private activatedRoute: ActivatedRoute, public commentService: CommentsService ) { 

  }

 
  ngOnInit(){
    this.listComment;
    this.activatedRoute.queryParams.subscribe(params => {
      this.id_alert = params['_id'];
      console.log("el id de los params es");
      
      console.log(this.id_alert); // Print the parameter to the console. 
  });
    this.alertService.getAlert(this.id_alert)
    .subscribe(res =>{
      console.log('el response de mi id alerta');
      console.log(res);
      this.alert_array.push(res['datosAlerta'])
      this.listComment.push(res['comentarios']);
      console.log('el array de lo comentarios tiene la siguiente estructura');
      console.log( this.listComment);
      
    })
 
  }

  addComment(form : NgForm){
    this.alertService.getAlert(this.id_alert)
    .subscribe(res =>{
      console.log('el response de mi id alerta');
      this.datos_alerta=  res['datosAlerta']
      console.log(this.datos_alerta._id);
    
      this.alertService.postAlertComment(form.value, this.datos_alerta._id)
      .subscribe(res =>{
        console.log('el comentario respondio esto: ');
        console.log(res);
        console.log('mic omentario es lo siguiente:!!!!!!!!!');
        M.toast({html: 'Comentario agregado'})
        // this.listComment.push(res['comment'])
        location.reload(); 
      })

  })
  }
 

}
