import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  panelOpenState = false;

  urls = new Array<string>();
  filesToUpload: Array<File> = [];

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  constructor() {

  }

  ngOnInit(): void {
  }


  selectedFile = null;

  onFileSelected(event:any) {
    this.selectedFile=event.target.files[0];
  }

  onUpload() {

  }

  uploadRoomData() {

  }

  changeFiles(event: any){

    this.filesToUpload = event.target.files as Array<File>;
    this.urls = [];
    const files = event.target.files;
    if (files) {
      for (const file of files) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png') {
            if (Number(e.total) > 2e+6) {
              alert('Please make sure that you entered image size is less than 2MB');
              this.filesToUpload = [];
              return;
            } else {
              this.urls.push(e.target.result);
            }
          } else {
            alert('Supported formats: .JPEG .JPG .PNG');
            this.filesToUpload = [];
            return;
          }


        };
        reader.readAsDataURL(file);
      }
    }

  }


}
