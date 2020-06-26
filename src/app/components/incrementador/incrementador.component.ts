import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress', {static: false}) txtProgress: ElementRef;

  @Input('nombre') leyenda: string = 'Leyenda';
  @Input('cantidad') porcentaje: number = 50;

  @Output() modificaValor: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onChange( nuevoValor: number ) {

    // let elementHTML: any = document.getElementsByName('porcentaje')[0];
    // console.log(elementHTML.value);

    if ( nuevoValor >= 100 ) {
      this.porcentaje = 100;
    } else if ( nuevoValor <= 0) {
      this.porcentaje = 0;
    } else {
      this.porcentaje = nuevoValor;
    }

    // elementHTML.value = Number(this.porcentaje);
    this.txtProgress.nativeElement.value = this.porcentaje;

    this.modificaValor.emit( this.porcentaje );
  }

  addValor( value: number ) {

    if ( this.porcentaje >= 100 && value > 0 ) {
      this.porcentaje = 100;
      return;
    }

    if ( this.porcentaje <= 0 && value < 0 ) {
      this.porcentaje = 0;
      return;
    }

    this.porcentaje = this.porcentaje + value;

    this.modificaValor.emit( this.porcentaje );

    this.txtProgress.nativeElement.focus();
  }

}
