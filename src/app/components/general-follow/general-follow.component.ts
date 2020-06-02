import { Component, OnInit } from '@angular/core';
import {AlertService} from '../../services/alert.service';
import {FilesService} from '../../services/files.service';
import {Alert} from '../../models/alert';
@Component({
  selector: 'app-general-follow',
  templateUrl: './general-follow.component.html',
  styleUrls: ['./general-follow.component.css'],
  providers: [AlertService]
})
export class GeneralFollowComponent implements OnInit {
  listFiles: Array<string> = [];
  check: boolean;
  constructor(public alertService: AlertService, public fileService:FilesService ) { }

  ngOnInit(): void {
    this.fileService.uploadForm = this.fileService.formBuilder.group({
      profile: ['']
    });
    this.getAlerts();
  }


  getAlerts(){
    this.alertService.getAlerts()
    .subscribe(res =>{
      this.alertService.alerts = res as Alert[];
      console.log(res);
    })

  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // console.log(event.target.files);
      
      this.fileService.uploadForm.get('profile').setValue(file);
    }
  }
  cambio(event){
    console.log(event.explicitOriginalTarget.checked);
    this.check = event.explicitOriginalTarget.checked
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.fileService.uploadForm.get('profile').value);
    this.fileService.uploadFiles(formData)
    .subscribe(res =>{
      console.log(res);
      this.listFiles = [];
      this.listFiles.push(res['fileName']);
      console.log(this.listFiles);
    })
  }  

}
