import { Component, OnInit } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-obtener-url',
  templateUrl: './obtener-url.component.html',
  styleUrls: ['./obtener-url.component.css']
})
export class ObtenerUrlComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    let ruta = jwt_decode(this.activatedRoute.snapshot.tokenRuta);

    if (!localStorage.getItem(ruta)) {
      this.router.navigate(['/login']);
      localStorage.setItem('aa_rutaTemporal', ruta.url);
    } else {
      this.router.navigateByUrl(ruta.url);
    }
  }

}
