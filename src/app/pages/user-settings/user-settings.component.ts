import { Component, OnInit } from '@angular/core';
import {RegisterService} from '../../services/register.service';
import {LoginService} from '../../services/login.service';
import {User} from '../../models/register'; 
import { NgForm } from '@angular/forms';
declare let M: any;
@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css'],
  providers: [RegisterService, LoginService]
})
export class UserSettingsComponent implements OnInit {
  arrUser: Array<any> = [] as Array<JSON>;
  userId:string;
  constructor(public registerService:RegisterService, public loginService: LoginService ) { }
  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    this.registerService.getUser()
    .subscribe(res =>{
      console.log(res);
      this.userId = res['UserId'];
      this.registerService.getdataUser(this.userId)
      .subscribe(res =>{
        console.log('si se trajo las alertas');
        this.registerService.getAlertsData(res['_id'])
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
    this.registerService.selectedUser = user;
  }

  confirmEdit(form: NgForm){
    if (form.value._id) {
      this.registerService.putUser(form.value)
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
      this.registerService.deleteUser(_id)
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
        this.registerService.selectedUser = new User();
      }
    }
}
