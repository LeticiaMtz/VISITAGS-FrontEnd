import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserManagementService } from 'src/app/services/user-manegement/user-management.service';
import { User} from 'src/app/models/user.model';
import { RoleModel } from 'src/app/models/role.model';
import Swal from 'sweetalert2';
import { RolesService } from 'src/app/services/roles/roles.service';
import { NgForm } from '@angular/forms';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

@Component({
  selector: 'app-update-user-management',
  templateUrl: './update-user-management.component.html',
  styleUrls: ['./update-user-management.component.css']
})
export class UpdateUserManagementComponent implements OnInit {

  @Input() idUsuario: string;
  @Output() optionCancel = new EventEmitter();
  @Output() refresh = new EventEmitter();
  usuario:  User = new User();
  roles: RoleModel[] = [];
  public  role = '';
  idRolUser:string;

  constructor(private userManagementService: UserManagementService, private rolesService: RolesService) { }
  
  ngOnInit(): void {
    this.getUser();
    this.getRoles();
  }

  updateCanceled(){
    this.optionCancel.emit(false);
  }

  getRole(idRol: string) {
    this.rolesService.getRolByid(idRol).then((data: any) => {
      this.role = data.cnt[0]._id;
    }).catch((err) => {
      Toast.fire({
        icon: 'error',
        title: err.error ? err.error.msg : err
      });
    });
  }

  getRoles(){
    this.rolesService.getRoles().then((res: any) => {
      this.roles = res.cnt;
    }).catch(err => {
      Toast.fire({
        icon: 'error',
        title: err.error ? err.error.msg : err
      });
    });
  }

  getUser() {
    this.userManagementService.getUsuariosByid(this.idUsuario).then((res: any) => {
      this.usuario = res.cnt[0];
      console.log(this.usuario.idRole); 
      this.idRolUser=this.usuario.idRole['_id'];
      this.role = this.usuario.idRole['strRole'];
    }).catch(err => {
      Toast.fire({
        icon: 'error',
        title: err.error ? err.error.msg : err
      });
    });
  }

  updateUser(form: NgForm){
    this.userManagementService.putUsuarios(this.idUsuario, this.usuario).then(res => {
      Toast.fire({
        icon: 'success',
        title: `¡El usuario ${this.usuario.strName} se actualizó exitosamente!`
      });
      this.optionCancel.emit(false);
      this.refresh.emit(true);
    }).catch(err => {
      Toast.fire({
        icon: 'error',
        title: err.error ? err.error.msg : err
      });
    });
  }
}

