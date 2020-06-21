import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../services/register.service';
import { from } from 'rxjs';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import {Router } from '@angular/router'
import { User } from '../models/register';
import { environment } from '../../environments/environment.prod';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [RegisterService]
})
export class  RegisterComponent implements OnInit {
  checkB:Boolean;
user:User = new User();
  repetPassword:String;

  regexp = new RegExp('^[_A-Za-z\\+]+(\\.[_A-Za-z]+)*@utags.edu.mx$');

  constructor(public registerService: RegisterService, public router:Router) {

   }

  ngOnInit(): void { 
  }

  check(event){
    console.log(event.explicitOriginalTarget.checked);
    this.checkB = event.explicitOriginalTarget.checked
  }


  addUser(form: NgForm){
    console.log(this.user);

    if (this.repetPassword != this.user.strPassword) {
      Swal.fire({
        title: 'Error!',
        text: 'Error las contraseñas no son iguales, no creamos tu usuario 😕',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
      this.router.navigate(['/register'])
    }else if (this.regexp.test(this.user.strEmail)){
     console.log(form.value);
      this.registerService.postUser(form.value)
      .then(res => {
        console.log(res);
        let data = JSON.stringify(res);
        let dataJson = JSON.parse(data);
        localStorage.setItem('token', dataJson.token);
        Swal.fire({
          title: 'Correct!',
          text: 'Usuario registrado correctamente 😃',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        })

        this.router.navigate(['/login']);
      })
      .catch(err => {
        Swal.fire({
          title: 'Error!',
          text: 'Error el correo no cumple con las condiciones, no creamos tu usuario 😕',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
        this.router.navigate(['/register']) 
      })
    }
  }
}
