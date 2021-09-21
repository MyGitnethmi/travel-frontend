import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../environments/environment.prod";
import {CustomValidatorsService} from "../../_services/custom-validators.service";
import {AuthService} from "../../_services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  passwordResetForm: FormGroup;

  error: string = '';
  progress: boolean = false;

  token: string = '';

  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {

    this.route.params.subscribe(params => {
      if (params?.token) {
        this.token = params.token
      } else {
        router.navigate(['../login'], {relativeTo: this.route});
      }
    });

    this.passwordResetForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      newPassword: ['', [Validators.required, Validators.pattern(environment.passwordValidator)]],
      confirmPassword: ['', [Validators.required]]
    }, {validators: CustomValidatorsService.passwordValidator()});

  }

  ngOnInit(): void {
  }

  resetPassword(): void {
    this.error = '';
    if (this.passwordResetForm.valid && this.token) {
      this.progress = true;
      const data = {
        username: this.username?.value,
        password: this.newPassword?.value,
        token: this.token
      }
      this.auth.resetPassword(data).subscribe(
        () => {
          this.router.navigate(['/']).then(() => {
            this.snackBar.open("Password reset successfully..!", "Close", {duration: 3000});
          });
        },
        error => this.error = error.message
      ).add(() => this.progress = false);
    }
  }

  get username(): AbstractControl | null {
    return this.passwordResetForm.get('username');
  }

  get newPassword(): AbstractControl | null {
    return this.passwordResetForm.get('newPassword');
  }

  get confirmPassword(): AbstractControl | null {
    return this.passwordResetForm.get('confirmPassword');
  }

}
