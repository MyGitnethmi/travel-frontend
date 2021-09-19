import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../_services/auth.service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password-request.component.html',
  styleUrls: ['./reset-password-request.component.css']
})
export class ResetPasswordRequestComponent implements OnInit {

  passwordResetForm: FormGroup;

  error: string = '';
  progress: boolean = false;

  emailSent: boolean = false;

  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {

    let email;
    this.route.params.subscribe(params => email = params?.email);

    this.passwordResetForm = this.formBuilder.group({
      username: [email, [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
  }

  sendPasswordResetEmail(): void {
    this.error = '';
    if (this.passwordResetForm.valid) {
      this.progress = true;
      this.auth.sendPasswordResetEmail(this.username?.value).subscribe(
        () => {
          this.emailSent = true;
        },
        error => {
          this.error = error.message;
        }
      ).add(() => this.progress = false);
    }
  }

  get username(): AbstractControl | null {
    return this.passwordResetForm.get('username');
  }

}
