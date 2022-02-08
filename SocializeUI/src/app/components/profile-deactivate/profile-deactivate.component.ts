import {Component, OnInit} from "@angular/core";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'sc-profile-deactivate',
  templateUrl: './profile-deactivate.component.html',
  styleUrls: ['./profile-deactivate.component.css']
})
export class ProfileDeactivateComponent implements OnInit {
  errorCode: number = 0;

  constructor(public userService: UserService) {
  }

  ngOnInit() {
  }

  loading: boolean = false;

  deactivateAccount() {
    this.loading = true;
    this.userService.deactivateAccount().then((res) => {
      let status = JSON.parse(res.toString()).status;
      this.loading = false;
      if (status == 1) {
        alert("User successfully deleted");
        this.userService.signOut();
      }
      else {
        this.errorCode = 1;
      }
    }).catch((res) => {
      this.errorCode = 2;
      this.loading = false;
    });
  }

}
