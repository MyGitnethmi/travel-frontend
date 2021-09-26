import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";




@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  phoneNum= new FormControl('',[Validators.required, Validators.pattern("(09)[0-9 ]{9}")]);
  imageSrc = "./assets/images/logo.png";
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  urls = new Array<string>();
  filesToUpload: Array<File> = [];

  constructor(
    private _formBuilder: FormBuilder
  ) {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required, Validators.pattern("[0-9 ]{12}")]
    });
  }

  getErrorNumber(){
    if (this.phoneNum.hasError('required')){
      return 'You must enter a value';
    }
    return this.phoneNum.hasError('phoneNum') ? 'Not a valid phoneNum' : '';
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  ngOnInit() {

  }

  selectedFile = null;
    onFileSelected(event:any) {
    this.selectedFile=event.target.files[0];
  }
  onImageUpload(){
    console.log("Image up" )

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
              this.imageSrc = e.target.result;
              console.log(e.target);
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
