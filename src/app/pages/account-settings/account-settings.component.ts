import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings/settings.service';
import * as jwt_decode from 'jwt-decode';
import { UserManagementService } from 'src/app/services/user-manegement/user-management.service';
import { User } from 'src/app/models/user.model';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  usuario:  User = new User();
  notificaciones: boolean; 
  tokenDecoded: any;

  constructor( private _settings: SettingsService, private userManagementService: UserManagementService ) { }

  ngOnInit() {
    this.selectTheme();
    let token = localStorage.aa_token;
    this.tokenDecoded = jwt_decode(token);
    this.getUser();
  }

  getUser() {
    this.userManagementService.getUsuariosByid(this.tokenDecoded.user._id).then((res: any) => {
      this.usuario.blnNotificaciones = res.cnt[0].blnNotificaciones;
      this.notificaciones = this.usuario.blnNotificaciones; 
    }).catch(err => {
      Toast.fire({
        icon: 'error',
        title: err.error.msg
      });
    });
  }

  statusNotification(){
    this.usuario.blnNotificaciones = !this.usuario.blnNotificaciones;
    this.userManagementService.putActualizarNotificacionUsuario(this.tokenDecoded.user._id, this.usuario).then((res: any) => {
      this.notificaciones = this.usuario.blnNotificaciones;
      Toast.fire({
        icon: 'success',
        title: `¡El usuario ${this.usuario.strName} sus notificaciónes!`
      });
    }).catch(err => {
      Toast.fire({
        icon: 'error',
        title: err.error.msg
      });
    });
  }

  onChangeTheme( theme: string, link: any ) {

    this.selectedTheme(link);

    this._settings.aplicarTema( theme );
  }

  selectedTheme( link: any ) {
    let selects: any = document.getElementsByClassName('selector');

    for (let ref of selects) {
      ref.classList.remove('working');
    }

    link.classList.add('working');
  }

  selectTheme() {
    let selects: any = document.getElementsByClassName('selector');

    let tema = this._settings.ajustes.theme;

    for (let ref of selects) {
      if ( ref.getAttribute('data-theme') === tema ) {
        ref.classList.add('working');
        break;
      }
    }
  }

  
}
