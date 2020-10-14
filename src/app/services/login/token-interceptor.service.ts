import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = localStorage.getItem('aa_token');

    let request = req;

    if (token) {
      request = req.clone({
        setHeaders: {
          aa_token: token
        }
      });
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {

        if (err.status === 401) {
          Swal.fire(
            'Opsss!',
            'Lo sentimos su sesion ha caducado, por favor vuelva a iniciar sesion',
            'error'
          );
          this.router.navigateByUrl('/login');
        }

        if (err.status === 403) {
          Swal.fire(
            'Opsss!',
            'No cuentas con los permisos necesarios para acceder a este menú.',
            'error'
          );
          this.router.navigateByUrl('/dashboard');
        }

        return throwError( err );

      })
    );
  }

}
