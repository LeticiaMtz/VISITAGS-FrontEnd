import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { BehaviorModel } from 'src/app/models/behavior';
import { ReasonsModel } from 'src/app/models/reasons-crde';
import { BehaviorService } from 'src/app/services/behavior/behavior.service';
import { ReasonsCrdeService } from 'src/app/services/reasons-crde/reasons-crde.service';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

@Component({
  selector: 'app-update-behavior',
  templateUrl: './update-behavior.component.html',
  styleUrls: ['./update-behavior.component.css']
})
export class UpdateBehaviorComponent implements OnInit {

  @Output() optionCancel = new EventEmitter();
  @Output() refresh = new EventEmitter();
  @Input() idReasons: string;
  @Input() idBehavior: string;
  behavior: BehaviorModel = new BehaviorModel();
  reasons: ReasonsModel = new ReasonsModel();

  behaviors: BehaviorModel[] = [];
  strConducta: string;
  blnStatus: boolean;

  constructor(private behaviorService: BehaviorService, private reasonsService: ReasonsCrdeService) { }

  ngOnInit(): void {
    this.getBehavior(this.idReasons);
  }

   getBehavior(idC: string){
    this.reasonsService.getReasonByid(idC).then((res:any) => {
      console.log(res.cnt[0].aJsnMotivo);
      this.behaviors = res.cnt[0].aJsnMotivo;
      this.behaviors.forEach(element => {
        if (element._id === this.idBehavior){
          console.log(element._id);
          this.behavior.strNombre = element.strNombre;
          this.behavior.strClave = element.strClave;
          this.behavior.blnStatus = element.blnStatus;
        }
     });
    }).catch(err => {
      Swal.fire({
        icon: 'error',
        title: `No se pudo obtener la información`
      });
    });
   }

  updateBehavior(forma: NgForm){
    this.behaviorService.putBehavior(this.idReasons, this.idBehavior, this.behavior).then(res => {
      Toast.fire({
        icon: 'success',
        title: `¡La conducta ${this.behavior.strNombre } se actualizó exitosamente!`
      });
      this.optionCancel.emit(false);
      this.refresh.emit(true);
    }).catch(err => {
      Toast.fire({
        icon: 'error',
        title: `No fue posible actualizar la información de la conducta`
      });
    });
  }

  updateCanceled(){
    this.optionCancel.emit(false);
  }

}
