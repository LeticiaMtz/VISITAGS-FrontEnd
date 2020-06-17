import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormGroup, FormControl, Validators  } from '@angular/forms';
import { ClassField } from '@angular/compiler';
import Swal from 'sweetalert2';
//let rememberIt;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  rememberIt: boolean;

  constructor(public router: Router, public loginService: LoginService) {
  }

  ngOnInit(): void {
    if(localStorage.getItem('strEmail')){
      this.user.setValue({
        strEmail: localStorage.getItem('strEmail'),
        strPassword: '',
        rememberMe: true
      });
      this.rememberIt=true;
    }
    if(!this.rememberIt){
      localStorage.removeItem('strEmail');
  }
  
  }

  user = new FormGroup({
    strEmail: new FormControl('', [Validators.required, Validators.pattern("^[_A-Za-z\\+]+(\\.[_A-Za-z]+)*@utags.edu.mx$")]),
    strPassword: new FormControl('', [Validators.required]),
    rememberMe: new FormControl(this.rememberIt)
  });
  
  regexp = new RegExp('^[_A-Za-z\\+]+(\\.[_A-Za-z]+)*@utags.edu.mx$');

  get invalidEmail(){
    return this.user.get('strEmail').invalid && this.user.get('strEmail').touched;
  }

  get invalidPassword(){
    return this.user.get('strPassword').invalid && this.user.get('strPassword').touched;
  }
  
  get valueEmail(){
    return this.user.get('strEmail')
  }
  get valuePassword(){
    return this.user.get('strPassword')
  }

  login(){
    if (this.regexp.test(this.valueEmail.value)) {
      
      this.loginService.postLogin(this.user.value)
      .subscribe(res =>{
        console.log(res);
        let data = JSON.stringify(res);
        let dataJson = JSON.parse(data);
        localStorage.setItem('token', dataJson.token)

        if(dataJson.token){

          if(this.user.value.rememberMe){
            localStorage.setItem('strEmail', this.user.value.strEmail);
          }else{
            localStorage.removeItem('strEmail');
          }

          this.router.navigate(['/pages/home']);

          Swal.fire({
            title: 'success',
            text: `Hola ${dataJson.UserName} bienvenido`,
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          });

        }else{

          Swal.fire({
            title: 'Error!',
            text: 'Lo sentimos no encontramos la cuenta.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });

          console.log('Algo salio mal :(');
          console.log(this.invalidEmail);
          console.log(this.invalidPassword);
        }    
      },
      err =>console.log(err));    
    }else{

      Swal.fire({
        title: 'Error!',
        text: 'Lo sentimos no encontramos la cuenta.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  }
}
