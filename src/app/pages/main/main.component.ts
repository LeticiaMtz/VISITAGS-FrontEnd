import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login.service';
import {RegisterService} from '../../services/register.service';
import {User} from '../../models/register'; 

declare let M: any;
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [RegisterService]
})
export class MainComponent implements OnInit {
  arrUser: Array<any> = [] as Array<JSON>;
  userId:string;
  constructor(public loginService:LoginService, public registerService:RegisterService ) { }

  ngOnInit(): void {
    this.getUser()

  }

  getUser(){
    this.registerService.getUser()
    .subscribe(res =>{
      console.log(res);
      this.userId = res['UserId'];
      this.registerService.getdataUser(this.userId)
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
