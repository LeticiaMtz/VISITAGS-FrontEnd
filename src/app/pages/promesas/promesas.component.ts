import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {

    this.contarTres().then( (msj) => {
      console.log('Termino', msj);
    }).catch( (err) => {
      console.log('Error en la promesa', err);
    });
  }

  ngOnInit() {
  }

  contarTres(): Promise<boolean> {

    return new Promise( (resolve, reject) => {
      let contador = 0;
      let intervalo = setInterval( () => {
        contador += 1;
        if ( contador === 1 ) {
          resolve();
          clearInterval(intervalo);
        } else {
          reject();
        }
      }, 3000);
    });

  }

}
