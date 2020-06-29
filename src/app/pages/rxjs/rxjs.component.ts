import { Component, OnInit, OnDestroy } from '@angular/core';
// tslint:disable-next-line: import-blacklist
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {


  subscription: Subscription;

  constructor() {

    this.subscription = this.regresaObservable().pipe(
      retry(2)
    ).subscribe(
      (numero) =>  console.log('Subs', numero),
      (error) => console.log('Error en el observador', error),
        () => console.log('El observador Termino')
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('La pagina se cerró');
    this.subscription.unsubscribe();
  }

  regresaObservable(): Observable<any> {

    return new Observable( (observer: Subscriber<any>) => {

      let contador = 0;

      const intervalo = setInterval(() => {

        contador += 1;
        observer.next( contador );

        // if ( contador === 3) {
        //   clearInterval( intervalo );
        //   observer.complete();
        // }
      }, 1000);
    
    }).pipe(
      map( (resp) => {
        return resp;
      }),

      filter( ( valor, index ) => {
        if ( (valor % 2) === 1 ) {
          return true;
        } else {
          return false;
        }
      })
    );


  }

}
