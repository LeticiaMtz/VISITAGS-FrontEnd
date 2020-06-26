import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Career } from 'src/app/models/career';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-update-career',
  templateUrl: './update-career.component.html',
  styleUrls: ['./update-career.component.css']
})
export class UpdateCareerComponent implements OnInit {

  @Output() optionCancel = new EventEmitter();

  career: Career = new Career();

  constructor() { }

  ngOnInit(): void {
  }


  updateCareer(form: NgForm){
    
  }

  updateCanceled(){
    this.optionCancel.emit(false);
  }
}
