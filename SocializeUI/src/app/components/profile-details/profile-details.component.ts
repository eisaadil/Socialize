import {Component, Input} from "@angular/core";
import {User} from "../../models/user.model";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'sc-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent {

  constructor(public userService: UserService) {
  }

  @Input() selectedUser: User = this.userService.getCurrentUser();

  ngOnInit() {
  }

}
