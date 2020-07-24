import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';
import { FileModel } from 'src/app/models/file.model';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});


@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent implements OnInit {

  @ViewChild('myPond') myPond: any;
  @Output() archivosObtenidos = new EventEmitter();
  evidencias: FileModel[] = [];
  evidencia: FileModel;

  constructor() { }

  ngOnInit() {
  }

  // tslint:disable-next-line: member-ordering
  pondOptions = {
    class: 'my-filepond',
    multiple: true,
    labelIdle: 'Arrasta tus documentos aqui',
    acceptedFileTypes: '',
    allowImagePreview: true
  };

  // tslint:disable-next-line: member-ordering
  pondFiles = [];

  pondHandleInit() {
    console.log('FilePond has initialised', this.myPond);
  }

  pondHandleAddFile(event: any) {
    let archivo = event.file.source;
    this.evidencia = {
      strNombre: archivo.name,
      strFileEvidencia: archivo,
      blnActivo: true
    };
    this.evidencias.push(this.evidencia);
    this.archivosObtenidos.emit(this.evidencias);
  }
}
