import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CareersService } from '../../../services/careers/careers.service';
import { CareerModel } from '../../../models/career';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
 });

@Component({
  selector: 'app-register-subjects',
  templateUrl: './register-subjects.component.html',
  styleUrls: ['./register-subjects.component.css']
})
export class RegisterSubjectsComponent implements OnInit {

 
  @Output() refresh = new EventEmitter();
  career: CareerModel = new CareerModel();
  isActive: boolean;
  

  constructor(private careersService: CareersService) { }

  ngOnInit(): void {
  }

  saveCareer(form: NgForm) {
    this.careersService.postCarrer(this.career).then(res => {
      Toast.fire({
        icon: 'success',
        title: `¡La carrera ${this.career.strCarrera} se registró exitosamente!`
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