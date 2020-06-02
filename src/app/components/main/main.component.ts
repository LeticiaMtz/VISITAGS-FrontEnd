import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login.service';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user'; 

declare let M: any;
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [UserService]
})
export class MainComponent implements OnInit {
  arrUser: Array<any> = [] as Array<JSON>;
  userId:string;
  constructor(public loginService:LoginService, public userService:UserService ) { }

  ngOnInit(): void {
    this.getUser()

  }

  getUser(){
    this.userService.getUser()
    .subscribe(res =>{
      console.log(res);
      this.userId = res['UserId'];
      this.userService.getdataUser(this.userId)
      .subscribe(res =>{
        console.log('los values del user: ');
        
        console.log(res);
        this.arrUser.push(res)
        console.log('el array tiene');
        console.log(this.arrUser);
        
        
      });
    });
  }

}
