import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

@Component({
  selector: 'app-tracking-alerts',
  templateUrl: './tracking-alerts.component.html',
  styleUrls: ['./tracking-alerts.component.css']
})
export class TrackingAlertsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
