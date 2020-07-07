import { Component, OnInit } from '@angular/core';
import { AlertStatusModel } from '../../../models/alert-status.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-update-status',
  templateUrl: './update-status.component.html',
  styleUrls: ['./update-status.component.css']
})
export class UpdateStatusComponent implements OnInit {

  estatus: AlertStatusModel = new AlertStatusModel();

  constructor() { }

  ngOnInit(): void {
  }

  updateStatus(forma: NgForm) {}

}
