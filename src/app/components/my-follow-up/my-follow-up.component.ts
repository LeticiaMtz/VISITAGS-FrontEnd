import { Component, OnInit,  Input } from '@angular/core';
import {FilesService} from '../../services/files.service';
import {AlertService} from '../../services/alert.service';
import {UserService} from '../../services/user.service';
import {CommentsService} from '../../services/comments.service';
import {Comments} from '../../models/comments';
import {User} from '../../models/user'; 
import { NgForm } from '@angular/forms';
import {Alert} from '../../models/alert';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

declare let M: any;



@Component({
  selector: 'app-my-follow-up',
  templateUrl: './my-follow-up.component.html',
  styleUrls: ['./my-follow-up.component.css'],
  providers: [AlertService, UserService, CommentsService]
 
})



export class MyFollowUpComponent implements OnInit {
  listAlerts: Array<any> = [];
  listComments: Array<any> = [];
  listFiles: Array<string> = [];
  check: boolean;
  id_alert: string;
  message: string;
  userId:string;
  name:string;
  alertId:string;
  push:string
  comentario = {
    comment: '',
    alert: '',
    id_alert: ''
  }
  constructor(public router:Router,public commentService: CommentsService, public fileService:FilesService, public alertService: AlertService, public userService: UserService,private route: ActivatedRoute ) { 
    this.alertService.id_global;
    
  }
  
  ngOnInit() {
    this.fileService.uploadForm = this.fileService.formBuilder.group({
      profile: ['']
    });
    this.route.queryParams.subscribe(params => {
      this.name = params['name'];
    }); 

    this.getAlerts();
    this.getUser();
    this.verComentarios()
   
    // this.alertId = this.alertService.selectedAlert._id;
    // this.alertService.selectedAlert.comment = "";
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
  //         this.listAlerts.push(res);
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
            // if(datajson[index].comment.length === 0 ){
            //   console.log('si existe el campo');
            //   console.log(datajson[index].comment);
              
            // }
            
          }else{
            console.log('NO ENTRE AL MALDITO IF');
            
          }
        }
        // const index = datajson.findIndex(item => item.id_user === this.userId);
         
        // console.log('********** esto saca index *********');
        
        // console.log(index)
        // console.log(datajson[index])
      })
    });
  }

  comment( form: NgForm){
    if (form.value._id) {
      console.log(form.value);
      this.comentario.comment = form.value.comment;
      this.comentario.alert = form.value._id;
      this.comentario.id_alert = form.value._id;
      console.log('mi nuevo obj es:' );
    
      
      console.log(this.comentario);
      
      // this.commentService.postComment(this.comentario)
      // .subscribe(res => {
      //   console.log(res);
      //   // this.resetForm(form);
      
        
      //   M.toast({html: 'Comentario agregado'})
      //   this.getAlerts();
      //   // location.reload(); 

      // });  
    }
    //  if (form.value.comment){
        // console.log('entro a el if de nuevo comentario');
        
        // this.alertService.postAlert(form.value.comment)
        // .subscribe(res =>{
        //   console.log('nuevo comentario es: ');
          
        //   console.log(res);
          
        // })
    // }
  
    

  }

  getAlertId(alert : Alert, event){
    this.alertService.selectedAlert = alert;
    console.log(alert);
    this.id_alert = alert._id
    console.log('mi evento es');
    console.log(event.type);
    this.push = event.type;
    
    // this.userService.putUser()
  }
  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // console.log(event.target.files);
      
      this.fileService.uploadForm.get('profile').setValue(file);
    }
  }

  verComentarios(){
    this.commentService.getComments()
    .subscribe(res =>{
      console.log('comentarios de las alertas son');
      console.log(res);
     
      console.log('el alert id es:');
      console.log(this.id_alert);
      this.listComments.push(res)
      
      // this.listComments.push(res)
      // console.log(this.listComments);
      // console.log('el alert id es:');
      // console.log(this.id_alert);
      // this.listComments.push(res)

      
      
    });
  }

  details(_id:string){
    console.log('los details son');
    this.message = _id;
    console.log(_id);
    
    this.router.navigate(['/main/alertDetails'], {queryParams: {_id}})
  }


  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.fileService.uploadForm.get('profile').value);
    this.fileService.uploadFiles(formData)
    .subscribe(res =>{
      console.log(res);
      this.listFiles = [];
      this.listFiles.push(res['fileName']);
      console.log(this.listFiles);
    })

    // this.http.post<any>(this.SERVER_URL, formData).subscribe(
      
    //   res => {console.log(res);this.listFiles = []; this.listFiles.push(res['fileName']); console.log(this.listFiles);
    //   },
    //   (err) => console.log(err)
    // );
  }

  cambio(event){
    console.log(event.explicitOriginalTarget.checked);
    this.check = event.explicitOriginalTarget.checked
  }

  getAlerts(){
    this.alertService.getAlerts()
    .subscribe(res =>{
      this.alertService.alerts = res as Alert[];
      console.log(res);
    
    })
  }




 


}
