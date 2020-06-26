import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  progressOne: number = 20;
  progressTwo: number = 90;

  constructor() { }

  ngOnInit() {
  }

  modificaValor( event: number ) {
    console.log('Event:', event);
  }

}
