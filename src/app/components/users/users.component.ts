import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { from } from 'rxjs';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import {Router } from '@angular/router'
import { User } from '../../models/user';




declare let M: any;
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserService]
})
export class  UsersComponent implements OnInit {
  checkB:Boolean;
user:User = new User();
  repetPassword:String;

  regexp = new RegExp('^[_A-Za-z\\+]+(\\.[_A-Za-z]+)*@utags.edu.mx$');
  // user = {
  //   name : '',
  //   lastname: '',
  //   motherlastname: '',
  //   email:'',
  //   password: '',
  //   role: ''
  // }
  constructor(public userService: UserService, public router:Router) {

   }

  ngOnInit(): void {
    
  
  //    var elems = document.querySelectorAll('select');
    //  var instances = M.FormSelect.init(elems);
    
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
      this.router.navigate(['/users'])
    }else if (this.regexp.test(this.user.strEmail)){
     console.log(form.value);
      this.userService.postUser(form.value)
      .subscribe(res => {
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
      });
    }else{
      Swal.fire({
        title: 'Error!',
        text: 'Error el correo no cumple con las condiciones, no creamos tu usuario 😕',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
      this.router.navigate(['/users'])
      
    }
   

  }

  
 

}
