import { Injectable } from '@angular/core';
import {  FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class FilesService {
  URL = "http://localhost:3000/alerts/file";
  URLdownload: "http://localhost:3000/alerts/download"
  uploadForm: FormGroup;  
  constructor(public formBuilder: FormBuilder,private http : HttpClient) { }

  uploadFiles(formdata){
    return this.http.post(this.URL, formdata)
  }

  downloadFile(fileName: string){
    return this.http.get(this.URLdownload + `/${fileName}`)
  }
}
