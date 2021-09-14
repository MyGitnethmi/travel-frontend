import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  passwordVisible: boolean = false;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern(/[A-Za-z]+/)]],
      district: ['', [Validators.required]],
      agreement: [false, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  signup(): void {
    console.log(this.signupForm.value);
  }

  checkPasswordLength(): boolean | null {
    return this.password && this.password.value.length >= 8;
  }

  checkCapitalLetters(): boolean | null {
    return this.password && this.password.value.match(/[A-Z]+/);
  }

  checkDigits(): boolean | null {
    return this.password && this.password.value.match(/[1-9]+/);
  }

  get username(): AbstractControl | null {
    return this.signupForm.get('username');
  }

  get firstName(): AbstractControl | null {
    return this.signupForm.get('firstName');
  }

  get lastName(): AbstractControl | null {
    return this.signupForm.get('lastName');
  }

  get password(): AbstractControl | null {
    return this.signupForm.get('password');
  }

  get district(): AbstractControl | null {
    return this.signupForm.get('district');
  }

}
