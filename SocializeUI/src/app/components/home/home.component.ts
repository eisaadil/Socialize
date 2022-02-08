import {Component, OnInit} from "@angular/core";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user.model";

@Component({
  selector: 'sc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public currentUser: User;

  constructor(public userService: UserService) {
  }

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser();
  }


  signOut() {
    this.userService.signOut();
  }

}
