import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {LoginService} from '../../services/login.service';
import {User} from '../../models/user'; 
import { NgForm } from '@angular/forms';
declare let M: any;
@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css'],
  providers: [UserService, LoginService]
})
export class UserSettingsComponent implements OnInit {
  arrUser: Array<any> = [] as Array<JSON>;
  userId:string;
  constructor(public userService:UserService, public loginService: LoginService ) { }
  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    this.userService.getUser()
    .subscribe(res =>{
      console.log(res);
      this.userId = res['UserId'];
      this.userService.getdataUser(this.userId)
      .subscribe(res =>{
        console.log('si se trajo las alertas');
        this.userService.getAlertsData(res['_id'])
        .subscribe(res =>{
          console.log('Aqui empiezan las alertas');
          console.log(res);
          console.log('aqui termian las alertas');
          
        })
        
        console.log('los values del user: ');
        
        console.log(res);
        this.arrUser.push(res)
        console.log('el array tiene');
        console.log(this.arrUser);
        
        
      });
    });
  }

  editUser(user: User){
    this.userService.selectedUser = user;
  }

  confirmEdit(form: NgForm){
    if (form.value._id) {
      this.userService.putUser(form.value)
      .subscribe(res => {
        console.log(res);
        this.resetForm(form);
        M.toast({html: 'Updated Successfuly'})
        // this.getUser();
      });
    }
  }


  deleteUser(_id:string){
    if (confirm('Are you sure you want to delete it?')) {
      this.userService.deleteUser(_id)
      .subscribe(res => {
        console.log(res);
        // this.getUser();
        this.loginService.logout();
        M.toast({html: 'Deleted successfuly'})
      });}
    }


    resetForm(form?: NgForm){
      if (form) {
        form.reset();
        this.userService.selectedUser = new User();
      }
    }
}
