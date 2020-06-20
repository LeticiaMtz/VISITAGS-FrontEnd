import { Component, OnInit,  Input } from '@angular/core';
import {FilesService} from '../../services/files.service';
import {AlertService} from '../../services/alert.service';
import {RegisterService} from '../../services/register.service';
import {CommentsService} from '../../services/comments.service';
import {Comments} from '../../models/comments';
import {User} from '../../models/register'; 
import { NgForm } from '@angular/forms';
import {Alert} from '../../models/alert';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

declare let M: any;



@Component({
  selector: 'app-my-follow-up',
  templateUrl: './my-follow-up.component.html',
  styleUrls: ['./my-follow-up.component.css'],
  providers: [AlertService, RegisterService, CommentsService]
 
})



export class MyFollowUpComponent implements OnInit {
  listAlerts: Array<any> = [];
  listComments: Array<any> = [];
  listFiles: Array<string> = [];
  check: boolean;
  id_alert: string;
  message: string;
  userId:string;
  name:string;
  alertId:string;
  push:string
  comentario = {
    comment: '',
    alert: '',
    id_alert: ''
  }
  constructor( ) { 
  }
  
  ngOnInit() {
  }
}
