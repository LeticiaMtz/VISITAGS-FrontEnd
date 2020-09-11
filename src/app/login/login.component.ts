import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { LoginService } from '../services/login/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';



declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  rememberIt: boolean;
  errorType: any;

  constructor( private router: Router, private loginService: LoginService) { }

  ngOnInit() {
    init_plugins();

    if(localStorage.getItem('aa_strEmail')){
      this.user.setValue({
        strEmail: localStorage.getItem('aa_strEmail'),
        strPassword: '',
        rememberMe: true
      });
      this.rememberIt=true;
    }
    if(!this.rememberIt){
      localStorage.removeItem('aa_strEmail');
    }
  }

  user = new FormGroup({
    strEmail: new FormControl('', [Validators.required, Validators.pattern("^[_A-Za-z\\+]+(\\.[_A-Za-z]+)*@utags.edu.mx$")]),
    strPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
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
        console.log(dataJson.token);

        // if ( dataJson.user.blnStatus === false ) {
        //   this.router.navigate(['/login']);
        //   Swal.fire({
        //     text: `Aun no has sido aprobado por el administrador, intenta mas tarde`,
        //     icon: 'error',
        //     confirmButtonText: 'Aceptar'
        //   });

        // } else {
          localStorage.setItem('aa_token', dataJson.token);

          if(dataJson.token) {

            if (this.user.value.rememberMe) {
              localStorage.setItem('aa_strEmail', this.user.value.strEmail);
            } else {
              localStorage.removeItem('aa_strEmail');
            }
  
            this.router.navigate(['/dashboard']);
            console.log(dataJson);
            Swal.fire({
              title: `Hola ${dataJson.cnt.strName} bienvenido`,
              icon: 'success',
              showConfirmButton: false,
              timer: 1500
            });
          } else {
            Swal.fire({
              text: `Lo sentimos no encontramos la cuenta ${dataJson.cnt.strEmail}.`,
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
            console.log('Algo salio mal');
            console.log(this.invalidEmail);
            console.log(this.invalidPassword);
          }
        },
      err => {


        if (err.status !== 0) {
          
      
          this.errorType = err.error.msg;
          console.log(this.errorType);
          
        } else {
          //Este error puede surgir si el servidor no esta ejecutandose o por un mal consumo o llamado de la API.
          this.errorType = `${err.name}: ERROR_DE_CONEXIÓN Error al conectar con el servidor`;
        }

        Swal.fire({
          text: this.errorType,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });

        console.log(err);
      });
    } else {

      Swal.fire({
        title: 'Error!',
        text: 'Lo sentimos no encontramos la cuenta.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  }

}
