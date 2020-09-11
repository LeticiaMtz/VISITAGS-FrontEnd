import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/service.index';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  menu: any;
  arrFinal: any[] = [];
  rol: any;
  dashboard = {icono: '', roles: '', titulo: '', url: ''};

  constructor( public _sidebarService: SidebarService) { }

  ngOnInit() {
    const tokenDecoded = jwt_decode(localStorage.getItem('aa_token'));
    this.rol = tokenDecoded.user.idRole;
    // console.log(this.rol);

    let m = {};
    for (let menu of this._sidebarService.menu) {
      let sub = [];
      if(menu.submenu){
        for (let subMenu of menu.submenu) {
          //   console.log(subMenu.roles);
            if (subMenu.roles.indexOf(this.rol) > -1) {
              let subm = {
                icono: subMenu.icono,
                titulo: subMenu.titulo,
                url: subMenu.url
              }
              sub.push(subm);
            }
        }
        console.log(sub);
        console.log(sub.length);
        m = {
          titulo: menu.titulo,
          icono: menu.icono,
          submenus: sub,
          numSub: sub.length
        }
      }else{
        if (menu.roles.indexOf(this.rol) > -1){
          this.dashboard = menu
        }
      }
 
      if(sub.length>0){
        this.arrFinal.push(m);
      }
    }
  }

}
