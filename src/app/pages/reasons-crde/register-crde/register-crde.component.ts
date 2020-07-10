import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ReasonsCrdeService } from 'src/app/services/reasons-crde/reasons-crde.service';
import { NgForm } from '@angular/forms';
import { ReasonsModel } from 'src/app/models/reasons-crde';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});


@Component({
  selector: 'app-register-crde',
  templateUrl: './register-crde.component.html',
  styleUrls: ['./register-crde.component.css']
})
export class RegisterCrdeComponent implements OnInit {

  @Output() refresh = new EventEmitter();
  reasons: ReasonsModel = new ReasonsModel();
  isActive: boolean;

  constructor(private reasonsService: ReasonsCrdeService) { }

  ngOnInit(): void {
  }

  saveReason(form: NgForm) {
    this.reasonsService.postReasons(this.reasons).then(res => {
      Toast.fire({
        icon: 'success',
        title: `¡La carrera ${this.reasons.strCategoria} se registró exitosamente!`
      });
      form.reset();
      this.refresh.emit(true);
    }).catch(err => {
      console.log(err);
      Toast.fire({
        icon: 'error',
        title: `No fué posible registrar la carrera`
      });
    });
  }

}


