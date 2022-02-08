import {Component, OnInit} from "@angular/core";
import {FormBuilder, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {UsernameValidator} from "../../validators/UsernameValidator";
import {RepeatPasswordValidator} from "../../validators/RepeatPasswordValidator";
import {User} from "../../models/user.model";

@Component({
  selector: 'sc-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  fillValues: User = this.userService.getCurrentUser() || new User("", "", "", "");

  ngOnInit() {
    if (this.userService.getCurrentUser() != null) {
      console.log(this.userService.getCurrentUser().fullName);
      this.fillValues = this.userService.getCurrentUser();
    }
  }

  public loading: boolean = false;

  public signUpForm = this.fb.group({
    fullName: [this.fillValues.fullName, [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
    username: [this.fillValues.username, [Validators.required, Validators.minLength(4), Validators.maxLength(10)], this.usernameValidator.usernameAvailabilityValidator.bind(this.usernameValidator)],
    password: [this.fillValues.password, [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
    rPassword: [this.fillValues.password, [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
    email: [this.fillValues.email, [Validators.required, Validators.email]]
  }, {
    validator: RepeatPasswordValidator.checkRepeatPassword
  });

  /* ERROR CODE: 0 -- No error,  1 -- Wrong Credentials, 2 -- Server Error */
  public errorCode = 0;

  constructor(public fb: FormBuilder, private userService: UserService, public router: Router, private usernameValidator: UsernameValidator) {
  }


  checkIfUndefined(x: string) {
    return (typeof x === 'undefined') ? "" : x;
  }


  signUpSubmit(event) {
    this.loading = true;
    let formData = this.signUpForm.value;


    let fullName = this.signUpForm.controls.fullName.value;
    let userName = this.signUpForm.controls.username.value;
    let password = this.signUpForm.controls.password.value;
    let email = this.signUpForm.controls.email.value;
    let user: User = new User(userName, fullName, password, email);
    this.userService.signUp(user).then((res) => {
      let responseJSON = JSON.parse(res.toString());
      console.log("Ran service, here is the data" + res.toString());
      console.log("Ran service, here is the data" + JSON.stringify(responseJSON.data));

      let status = responseJSON.status;
      let user: User = responseJSON.data;

      console.log(user.fullName);

      let signUpSuccess: boolean = false;
      if (status == 1) signUpSuccess = true;

      this.loading = false;

      if (signUpSuccess) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.router.navigate(['/home']);
        this.errorCode = 0;
      }
      else {
        this.errorCode = 1;
      }
      this.loading = false;
    }).catch((res) => {
      console.log("catch response" + res);
      this.errorCode = 2;
      this.loading = false;
    });

    console.log(formData);
  }

}
