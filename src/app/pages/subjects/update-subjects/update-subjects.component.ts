import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import Swal from 'sweetalert2';
import { SubjectModel } from '../../../models/subjects';
import { NgForm } from '@angular/forms';
import { SubjectsService } from '../../../services/subjects/subjects.service';





const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

@Component({
  selector: 'app-update-subjects',
  templateUrl: './update-subjects.component.html',
  styleUrls: ['./update-subjects.component.css']
})
export class UpdateSubjectsComponent implements OnInit {

  
  @Output() optionCancel = new EventEmitter();
  @Output() refresh = new EventEmitter();
  @Input() idCareer: string;

  career: SubjectModel = new SubjectModel();

  constructor(private subjectsService: SubjectsService) { }

  ngOnInit(): void {
    this.getCarrer();
  }


  updateCareer(form: NgForm){
    this.subjectsService.putCareer(this.idCareer, this.career).then(res => {
      Toast.fire({
        icon: 'success',
        title: `¡La carrera ${this.career.strCarrera} se actualizó exitosamente!`
      });

      form.reset();
      this.optionCancel.emit(false);
      this.refresh.emit(true);

    }).catch(err => {
      Toast.fire({
        icon: 'error',
        title: `No fue posible actualizar la información de la carrera`
      });
      form.reset();
    });
  }

  getCarrer() {
    this.subjectsService.getCarrerByid(this.idCareer).then((res: any) => {
      this.career = res.cnt[0];
    }).catch(err => {
      Toast.fire({
        icon: 'error',
        title: `No fue posible obtener la información de la carrera`
      });
    });
  }

  updateCanceled(){
    this.optionCancel.emit(false);
  }

}
