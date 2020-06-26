import { Component, OnInit } from '@angular/core';
import { Career } from '../../../models/career';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-register-career',
  templateUrl: './register-career.component.html',
  styleUrls: ['./register-career.component.css']
})
export class RegisterCareerComponent implements OnInit {

  career: Career = new Career();

  constructor() { }

  ngOnInit(): void {
  }

  saveCareer(form: NgForm){
    
  }

}
