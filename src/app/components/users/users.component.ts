import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { from } from 'rxjs';
import { NgForm } from '@angular/forms';
import {Router } from '@angular/router'

declare let M: any;
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserService]
})
export class UsersComponent implements OnInit {
  checkB:Boolean;
  repetPassword:String
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
    
  
      var elems = document.querySelectorAll('select');
      var instances = M.FormSelect.init(elems);
    
  }

  check(event){
    console.log(event.explicitOriginalTarget.checked);
    this.checkB = event.explicitOriginalTarget.checked
  }

  addUser(form: NgForm){
    if (this.repetPassword != this.userService.selectedUser.password) {
      M.toast({html: 'Error las contraseñas no son iguales, no creamos tu usuario 😕'})
      this.router.navigate(['/users'])
    }else if (this.regexp.test(this.userService.selectedUser.email)){
      this.userService.postUser(form.value)
      .subscribe(res => {
        console.log(res);
        let data = JSON.stringify(res);
        let dataJson = JSON.parse(data);
        localStorage.setItem('token', dataJson.token);
      });
    }else{
      M.toast({html: 'Error el correo no cumple con las condiciones, no creamos tu usuario 😕'})
      this.router.navigate(['/users'])
    }
   
  }

 

}
