import {Component, OnInit} from "@angular/core";
import {UserService} from "../../services/user.service";
import {CompleterData, CompleterService} from "ng2-completer";
import {CompleterItem} from "../../directives/completer-item.interface";
import {User} from "../../models/user.model";
import {Router} from "@angular/router";

@Component({
  selector: 'sc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  public searchUserText: string;
  public userList: User[];
  public usernameList: string[];
  public errorCode: number;
  public loading: boolean;

  constructor(public userService: UserService, public router: Router) {
  }

  ngOnInit() {
    this.getAllUsers();
  }

  signOut() {
    this.userService.signOut();
  }

  userSelected(s: CompleterItem) {
    this.router.navigate(['find-people', s.title]);
  }

  getAllUsers() {
    this.userService.getAllUsers().then((res) => {
      let responseJSON = JSON.parse(res.toString());
      let isUserListFetched: boolean = false;
      if (responseJSON.status == 1) isUserListFetched = true;

      this.loading = false;

      if (isUserListFetched) {
        this.errorCode = 0;
        this.userList = responseJSON.data;
        this.userList = this.userList.filter(user => !(new Set([this.userService.getCurrentUser().id])).has(user.id));
        this.usernameList = this.userList.map(function (a) {
          return a.username;
        });
      }
      else {
        this.errorCode = 1;
      }
      this.loading = false;
    }).catch((res) => {
      this.errorCode = 2;
      this.loading = false;
    });
  }

}
