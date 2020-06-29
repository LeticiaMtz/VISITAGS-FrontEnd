import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CareersService } from '../../../services/careers/careers.service';
import { CareerModel } from 'src/app/models/career';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';





@Component({
  selector: 'app-update-career',
  templateUrl: './update-career.component.html',
  styleUrls: ['./update-career.component.css']
})
export class UpdateCareerComponent implements OnInit {

  @Output() optionCancel = new EventEmitter();
  @Output() refresh = new EventEmitter();
  @Input() idCareer: string;

  career: CareerModel = new CareerModel();

  constructor(private carrerService: CareersService) { }

  ngOnInit(): void {
    this.getCarrer();
    console.log(this.idCareer);
  }


  updateCareer(form: NgForm){
    this.carrerService.putCareer(this.idCareer, this.career).then(res => {
      console.log(res);
      console.log(this.career.blnStatus);

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Carrera actualizada Exitosamente',
        showConfirmButton: false,
        timer: 1500
      })

      this.optionCancel.emit(false);
      this.refresh.emit(true);
    }).catch(err => {
      console.log(err);
    });
  }

  getCarrer(){
    this.carrerService.getCarrerByid(this.idCareer).then((res: any) => {
      this.career = res.cnt[0];
      // console.log(res);
      console.log(res.cnt[0]);
      console.log(this.career);
    }).catch(err => {
      console.log(err);
    });
  }

  updateCanceled(){
    this.optionCancel.emit(false);
  }

}
