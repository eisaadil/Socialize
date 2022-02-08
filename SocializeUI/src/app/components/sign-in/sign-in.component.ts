import {Component, OnInit} from "@angular/core";
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";


@Component({
  selector: 'sc-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  public loading: boolean = false;
  public signInForm = this.fb.group({
    username: ["", [Validators.minLength(1), Validators.required]],
    password: ["", [Validators.minLength(1), Validators.required]]
  });

  /* ERROR CODE: 0 -- No error,  1 -- Wrong Credentials, 2 -- Server Error */
  public errorCode = 0;

  constructor(public fb: FormBuilder, public userService: UserService, public router: Router) {
  }

  ngOnInit() {
  }

  signInSubmit(event) {
    this.loading = true;
    let formData = this.signInForm.value;

    let userName = this.signInForm.controls.username.value;
    let password = this.signInForm.controls.password.value;

    this.userService.signIn(userName, password).then((res) => {
      let responseJSON = JSON.parse(res.toString());
      let authenticated: boolean = false;
      if (JSON.parse(res.toString()).status == 1) authenticated = true;

      this.loading = false;

      if (authenticated) {
        console.log("Before storing sesssion: " + JSON.stringify(responseJSON.data));
        localStorage.setItem('currentUser', JSON.stringify(responseJSON.data));
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
