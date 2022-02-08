import {Injectable} from "@angular/core";
import {AbstractControl} from "@angular/forms";

@Injectable()
export class RepeatPasswordValidator {
  static checkRepeatPassword(control: AbstractControl) {
    let password = control.get('password').value; // to get value in input tag
    let confirmPassword = control.get('rPassword').value; // to get value in input tag
    console.log(password + " " + confirmPassword);
    if (password != confirmPassword) {
      control.get('rPassword').setErrors({passwordNotMatched: true})
    } else {
      return null
    }
  }
}
