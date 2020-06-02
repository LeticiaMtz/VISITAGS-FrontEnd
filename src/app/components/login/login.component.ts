import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormGroup, FormControl, Validators  } from '@angular/forms';
declare let M: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  regexp = new RegExp('^[_A-Za-z\\+]+(\\.[_A-Za-z]+)*@utags.edu.mx$');
  get primEmail(){
    return this.user.get('email')
  }
  get primPass(){
    return this.user.get('password')
  }
  user = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern("^[_A-Za-z\\+]+(\\.[_A-Za-z]+)*@utags.edu.mx$")]),
      password: new FormControl('', [Validators.requiredTrue])  //"^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@utags.edu.mx$"
    });  
  constructor(public router: Router, public loginService: LoginService) { }
  // user = {
  //   email:  this.primEmail.value,
  //   password: this.primPass.value
  // };
  ngOnInit(): void {
    console.log(this.user);
    
  }
 

  // login(form: NgForm){
  //   this.loginService.postLogin(form.value)
  //   .subscribe(res  =>{
  //     console.log('losvalues');
  //     console.log(form.value);
  //     let data = JSON.stringify(res);
  //     let dataLogin = JSON.parse(data);
  //     console.log(dataLogin.User);
  //     console.log(data);
  //     console.log(res);
  //     // this.router.navigate(['/main/home']);
  //     console.log(Object.keys(res));
  //     if (dataLogin.UserEmail){
  //       this.router.navigate(['/main/home']);
  //     }else{
  //       console.log('Error not found');
        
  //     }
 
      
  //   })
  // }
  // paver(){
  //   console.log(this.userEmails.value);
  // }


  login(){
    if (this.regexp.test(this.primEmail.value)) {
      
    
      this.loginService.postLogin(this.user.value)
      .subscribe(res =>{
        console.log(res);
        let data = JSON.stringify(res);
        let dataJson = JSON.parse(data);
        localStorage.setItem('token', dataJson.token)
        if(dataJson.token){
          M.toast({html: '¡Hola ' + dataJson.UserName +' bienvenido!. 😃'})
          this.router.navigate(['/main/home']);
        }else{
          M.toast({html: 'Lo sentimos no encontramos la cuenta. 😥'})
          console.log('Something was wrong :(');
          console.log(this.primEmail.value);
          console.log(this.primPass.value);
          
          
        }
        

        
      },
      err =>console.log(err)
      )
      
    }else{
      M.toast({html: 'Lo sentimos no encontramos la cuenta. 😥'})
    }

  }


}
