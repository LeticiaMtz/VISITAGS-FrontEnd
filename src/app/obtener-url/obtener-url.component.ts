import { Component, OnInit } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { ActivatedRoute, Router } from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-obtener-url',
  templateUrl: './obtener-url.component.html',
  styleUrls: ['./obtener-url.component.css']
})
export class ObtenerUrlComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { 
    init_plugins();
  }

  ngOnInit(): void {
    let ruta = jwt_decode(this.activatedRoute.snapshot.params.token);

    console.log(ruta);

    if (!localStorage.getItem('aa_token')) {
      this.router.navigate(['/login']);
      localStorage.setItem('aa_rutaTemporal', ruta.url);
    } else {
      let usuario = jwt_decode(localStorage.getItem('aa_token'));
      let idUser = usuario.user._id;
      this.router.navigateByUrl(`${ruta.url}/${idUser}`);
    }
  }

}
