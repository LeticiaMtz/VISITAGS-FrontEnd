import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertStatusModel } from '../../../models/alert-status.model';

@Component({
  selector: 'app-register-status',
  templateUrl: './register-status.component.html',
  styleUrls: ['./register-status.component.css']
})
export class RegisterStatusComponent implements OnInit {

  estatus: AlertStatusModel = new AlertStatusModel();

  constructor() { }

  ngOnInit(): void {
  }

  saveStatus(forma: NgForm) {}

}
