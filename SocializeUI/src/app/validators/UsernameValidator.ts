import {Injectable} from "@angular/core";
import {UserService} from "../services/user.service";
import {FormControl} from "@angular/forms";

@Injectable()
export class UsernameValidator {

  constructor(public userService: UserService) {
  }

  usernameAvailabilityValidator(control: FormControl): { [key: string]: any } {
    let userName: string = control.value;
    if (this.userService.isLoggedIn() && userName == this.userService.getCurrentUser().username) //if its the logged in user
      return Promise.resolve(null);
    return new Promise(resolve => {
      this.userService.isUsernameAvailable(userName).subscribe((res) => {
        console.log(res);
        if (res.status == 1) {
          resolve(null);
        }
        else {
          console.log("ALREADY USED");
          resolve({"usernameInUse": true});
        }
      }, (error) => {
        console.log("Server error");
        resolve({"serverError": true});
      });
    });

  }
}
