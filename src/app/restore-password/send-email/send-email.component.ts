import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ChangePasswordService } from 'src/app/services/change-password/change-password.service';


declare function init_plugins();

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent implements OnInit {

  [x: string]: any;
  checkB:Boolean;
  user:User = new User();
    repetPassword:String;  
 
    regexp = new RegExp('^[_A-Za-z\\+]+(\\.[_A-Za-z]+)*@utags.edu.mx$');
  constructor(public router:Router, private sendEmailService: ChangePasswordService) { }
 
  ngOnInit(): void {
    init_plugins();
  }
 
  check(event){
    console.log(event.explicitOriginalTarget.checked);
    this.checkB = event.explicitOriginalTarget.checked
   }
 
   User(form: NgForm, email: string) {
  

       
    this.sendEmailService.sendemail(email).then((data:any) => {
      console.log(data);
      Swal.fire({
        title: 'Correct!',
        text: 'Email enviado correctamente 😃',
        icon: 'success',
        confirmButtonText: 'Aceptar'
     });
    }).catch((err) => {
      console.log(err);
      Swal.fire({
        title: 'Error!',
        text: 'El correo no existe',
        icon: 'error',
        confirmButtonText: 'Aceptar'
     });
    })
  }

}
