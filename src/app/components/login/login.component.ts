import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
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
    if(localStorage.getItem('email')){
      this.user.setValue({
        email: localStorage.getItem('email'),
        password: '',
        rememberMe: true
      });
      if(!this.rememberIt){
        localStorage.removeItem('email');
      }
    }
  }

  user = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern("^[_A-Za-z\\+]+(\\.[_A-Za-z]+)*@utags.edu.mx$")]),
    password: new FormControl('', [Validators.required]),
    rememberMe: new FormControl(this.rememberIt)
  });
  
  regexp = new RegExp('^[_A-Za-z\\+]+(\\.[_A-Za-z]+)*@utags.edu.mx$');

  get invalidEmail(){
    return this.user.get('email').invalid && this.user.get('email').touched;
  }

  get invalidPassword(){
    return this.user.get('password').invalid && this.user.get('password').touched;
  }
  
  get valueEmail(){
    return this.user.get('email')
  }
  get valuePassword(){
    return this.user.get('password')
  }

  //get valueRememberMe(){
  //  return this.user.get('rememberMe')
  //}

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
            localStorage.setItem('email', this.user.value.email);
          }
          
          Swal.fire({
            title: 'success',
            text: `Hola ${dataJson.UserName} bienvenido`,
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          });

          this.router.navigate(['/main/home']);
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
