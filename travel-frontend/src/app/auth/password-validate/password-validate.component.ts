import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-password-validate',
  templateUrl: './password-validate.component.html',
  styleUrls: ['./password-validate.component.css']
})
export class PasswordValidateComponent implements OnInit {

  @Input() password: string = '';

  constructor() { }

  ngOnInit(): void {
    console.log(this.password);
  }

  checkPasswordLength(): boolean {
    return this.password.length >= 8;
  }

  checkCapitalLetters(): boolean {
    return !!this.password.match(/[A-Z]+/);
  }

  checkDigits(): boolean {
    return !!this.password.match(/[1-9]+/);
  }

}
