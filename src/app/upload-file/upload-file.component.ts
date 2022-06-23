import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEventType, HttpParams, HttpRequest } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Constants } from '../Constants';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  fileName = '';
  selectedFile ? : File;
  message?: string;
  year: string = '';
  month : string = '';
  upload_form : FormGroup;
  uploadSuccessful? : Boolean;

  monthList = Constants.MONTHS;
  
  @Output() public onUploadFinished = new EventEmitter();

  constructor(private http: HttpClient, formBuilder : FormBuilder){

    this.upload_form = formBuilder.group({
      'year': [null, Validators.required],
      'month': [ undefined , Validators.required]
    });
  
  }
  ngOnInit(): void {
  }

  onFileSelected(event: any ) {

    this.selectedFile = event.target.files[0];      
    if (this.selectedFile) {
        this.fileName = this.selectedFile.name;
        console.log("filename" + this.fileName);
    }
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.upload_form.controls[controlName].hasError(errorName);
  }

  upload() {
    // validations not shown
    const formData = new FormData();
    if(this.selectedFile)
        formData.append('file', this.selectedFile ?? this.selectedFile);
    console.log(this.year);
    console.log(this.month);
    const params = new HttpParams();



    this.http.post('http://localhost:5053/api/AccountBalances/UploadFile', formData , { params :  {year: this.year, month: this.month}, responseType : "text", observe: 'events'})
    .subscribe({
      next: (event) => {
        if (event.type === HttpEventType.Response) {
        this.uploadSuccessful = true;
        this.message = 'Upload successful.';
        this.onUploadFinished.emit(event.body);
      }
    },
    error: (err: HttpErrorResponse) => {
      if(err.status == 400){
        this.uploadSuccessful = false;
        this.message = err.error;
      }
        
      console.log(err);
    }
  });
}


}
