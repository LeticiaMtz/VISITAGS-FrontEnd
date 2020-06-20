import { Component, OnInit } from '@angular/core';
import {AlertService} from '../../services/alert.service';
@Component({
  selector: 'app-general-follow',
  templateUrl: './general-follow.component.html',
  styleUrls: ['./general-follow.component.css'],
  providers: [AlertService]
})
export class GeneralFollowComponent implements OnInit {
  listFiles: Array<string> = [];
  check: boolean;
  constructor( ) { }

  ngOnInit(): void {
  }

}
