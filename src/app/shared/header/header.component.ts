import { Component, OnInit } from '@angular/core';
import { Router, ɵangular_packages_router_router_a } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }


  logout(){
    localStorage.removeItem('token')
    this._router.navigate(['/login']);
  }
}
