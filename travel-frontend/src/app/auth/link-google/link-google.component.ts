import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../_services/auth.service";

@Component({
  selector: 'app-link-google',
  templateUrl: './link-google.component.html',
  styleUrls: ['./link-google.component.css']
})
export class LinkGoogleComponent implements OnInit {

  googleLinkForm: FormGroup;
  passwordVisible: boolean = false;

  error: string = '';
  progress: boolean = false;

  idToken: string = '';

  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    let username;
    this.route.params.subscribe(params => {
      username = params.email;
      this.idToken = params.token;
    });

    this.googleLinkForm = this.formBuilder.group({
      username: [username],
      password: ['', [Validators.required]]
    });

  }

  ngOnInit(): void {
  }

  linkGoogleAccount(): void {
    this.error = '';
    if (this.googleLinkForm.valid) {
      this.progress = true;
      const auth = {
        username: this.username?.value,
        password: this.password?.value,
        idToken: this.idToken
      }
      this.auth.linkGoogleAccount(auth).subscribe(
        () => {
          this.router.navigate(['/']);
        },
        error => {
          console.log(error);
          this.error = error;
        }
      ).add(() => this.progress = false);
    }
  }

  get username(): AbstractControl | null {
    return this.googleLinkForm.get('username');
  }

  get password(): AbstractControl | null {
    return this.googleLinkForm.get('password');
  }

}
