import { Injectable } from '@angular/core';
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorsService {

  constructor() { }

  static passwordValidator() {

    return (formGroup: FormGroup) => {

      const password = formGroup.get('newPassword');
      const confirmPassword = formGroup.get('confirmPassword');

      if (password && password.touched && confirmPassword) {

        if (password.value !== confirmPassword.value) {
          confirmPassword.setErrors({passwordMismatch: true});
        } else {
          confirmPassword.setErrors(null);
        }

      }

    }

  }

}
